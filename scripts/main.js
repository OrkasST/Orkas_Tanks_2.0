import { CollisionBody } from "./physics/CollisionBody.js";
import { ObjectCreator } from "./utilities/ObjectCreator.js";

//UI elem-s
const start = document.getElementById("start");
const starter = document.querySelector(".starter");
const title = document.querySelector(".head");
const menu = document.querySelector("#menu");
const controlButtons = document.querySelector(".mobile_controls");
let scale = 1;
// console.log(controlButtons.children);
//sounds
const theme = document.getElementById("theme");
const shootSnd = document.getElementById("shoot");
const enShootSnd = document.getElementById("enShoot");
const blast = document.getElementById("blast");

//game flags
let gameStarted = false;
let paused = false;

//functional
let ctx = null;
let musicInterval = null;
let gameData = null;
let player = null;
let spawnTime = null;
let prevSetTime = null;
let score = null;
let alive = null;
let imagesToLoad = null;
let images = null;
let id = null;

// let anim = null;
// let image = null;
// let context = null;
// let rotation = 0;
let creator = null;

starter.addEventListener("click", (e) => {
  ``;
  if (!gameStarted) {
    starter.classList.add("_transit");
    starter.classList.add("_full");
    title.classList.add("_transparent");
    if (window.innerWidth < 600) {
      controlButtons.classList.remove("_hidden");
      scale = 0.5;
    }
    setTimeout(() => {
      starter.classList.add("_hidden");
      start.classList.add("_hidden");
      if (!gameStarted) init();
    }, 1000);
    theme.play();
    musicInterval = setInterval(() => {
      theme.currentTime = 0;
    }, 232000);
  }
});
//starting game

function init() {
  screen = document.getElementById("screen");
  screen.width = window.innerWidth;
  screen.height = window.innerHeight;
  ctx = screen.getContext("2d");
  gameData = [[], [], []];
  creator = new ObjectCreator();
  // player = new GameObject({
  //   tag: "player",
  //   params: {
  //     color: "#000000",
  //     width: 64,
  //     height: 64,
  //   },
  // });
  spawnTime = 5000;
  prevSetTime = 0;
  gameStarted = true;
  score = 0;
  alive = true;

  imagesToLoad = {
    // player_tank: "./media/images/Player_Tank_Anim.png",
    player_tank_tower: "./media/images/Tower_01.png",
    player_tank_hull: "./media/images/Hull.png",
    enemy_tank: "./media/images/Enemy_Tank_Anim.png",
    shot: "./media/images/Shot.png",
    explosion: "./media/images/Explosion.png",
    background: "./media/images/pexels-johannes-plenio-1114900.jpg",
  };
  images = {};
  loadImages()
    .then((names) => {
      // console.log(player);
      // player.view.image = images["player_tank"];

      player = creator.create(
        {
          tag: "player",
          x: 0,
          y: 0,
          width: 128,
          height: 128,
          isCollidable: true,
        },
        [images["player_tank_hull"], images["player_tank_tower"]],
        0,
        [512, 512, 588, 588],
        2,
        [
          {
            framelist: "",
            frameListHeight: 512,
            frameListWidth: 2048,
            frameWidth: 512,
            frameHeight: 512,
            duration: 0,
            frameX: 0,
            frameY: 0,
            offsetX: 0,
            offsetY: 0,
            startFrame: 0,
            isRotating: false,
            isInfinit: false,
            log: true,
          },
          {
            framelist: "",
            frameListHeight: 512,
            frameListWidth: 512,
            frameWidth: 512,
            frameHeight: 512,
            duration: 0,
            frameX: -256,
            frameY: -256,
            startFrame: 0,
            isRotating: true,
            isInfinit: false,
          },
        ]
      );
      gameData[0].push(player);
      console.log(player);
      Game(gameData, 0);
    })
    .catch((e) => console.log(e));
}

// main game loop

function Game(data, time) {
  update(data, time);
  render(data);
  id = requestAnimationFrame((time) => {
    Game(gameData, time);
  });
  if (paused) pause();
  if (!alive) death();
}

//updating game data

function update(data, time) {
  collisionCheck(data[0], data[1]);
  enemyAI(data[0].filter((obj) => obj.tag !== "player"));
  if (data[0].length > 0) {
    for (let i = 0; i < data[0].length; i++) {
      if (isOutOfScreen(data[0][i]) && data[0][i].tag === "enemy") {
        creator.destroy(data[0][i]);
        data[0].splice(i, 1);
        i--;
      }
      if (data[0][i]) move(data[0][i]);
    }
  }
  if (data[1].length > 0) {
    for (let i = 0; i < data[1].length; i++) {
      if (data[1][i].time === 0 && time > 0) data[1][i].time = time;
      if (
        time - data[1][i].time > data[1][i].lifeTime ||
        isOutOfScreen(data[1][i])
      ) {
        creator.destroy(data[1][i]);
        data[1].splice(i, 1);
        i--;
        if (data[1].length === 0) break;
      }
      if (data[1][i]) move(data[1][i]);
    }
  }
  if (data[2].length > 0) {
    for (let i = 0; i < data[2].length; i++) {
      if (
        data[2][i].textures[0].duration <= data[2][i].textures[0].currentFrame
      ) {
        creator.destroy(data[2][i]);
        data[2].splice(i, 1);
        i--;
        if (data[2].length === 0) break;
      }
    }
  }
  if (time - prevSetTime > spawnTime) spawnEnemy(time);
}

//rendering game objects

function render(data) {
  clearScreen();
  drawBG();
  data[1].forEach((obj) => draw(obj));
  data[2].forEach((obj) => draw(obj));
  data[0].forEach((obj) => draw(obj));
}

function drawBG() {
  ctx.beginPath();
  ctx.drawImage(
    images["background"],
    0,
    0,
    screen.width,
    screen.height,
    0,
    0,
    screen.width,
    screen.height
  );
  ctx.closePath();
}

function draw(obj) {
  ctx.beginPath();
  ctx.fillStyle = obj.color;
  if (obj.images.length > 0) {
    obj.textures.forEach((tex, i) =>
      tex.frame(obj.images[i].image, obj.images[i].context, 0, 0)
    );
    obj.images.forEach((image) =>
      ctx.drawImage(image.image, obj.x, obj.y, obj.width, obj.height)
    );
  } else ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
  ctx.closePath();
  if (obj.tag === "player") {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "30px serif";
    ctx.fillText(score, obj.x + 30, obj.y + 60);
    ctx.closePath();
  }
}
function clearScreen() {
  ctx.clearRect(0, 0, screen.width, screen.height);
}

//game functions

function pause() {
  cancelAnimationFrame(id);
}

function resume() {
  paused = false;
  Game(gameData, 0);
}

function collisionCheck(objs, shoots) {
  for (let i = 0; i < objs.length; i++) {
    for (let j = 0; j < shoots.length; j++) {
      if (
        // objs[i].x + objs[i].width >= shoots[j].x &&
        // objs[i].y + objs[i].height >= shoots[j].y &&
        // objs[i].x <= shoots[j].x + shoots[j].width &&
        // objs[i].y <= shoots[j].y + shoots[j].height
        objs[i].collider.checkCollision(shoots[j].collider.bodies)
      ) {
        if (
          (objs[i].tag === "player" && shoots[j].tag === "player_shoot") ||
          (objs[i].tag === "enemy" && shoots[j].tag === "enemy_shoot")
        )
          continue;
        else if (objs[i].tag === "player") alive = false;
        else score++;
        explode(objs[i]);
        objs.splice(i, 1);
        i--;
        shoots.splice(j, 1);
        blast.pause();
        blast.currentTime = 0;
        blast.play();
        setTimeout(() => {
          blast.pause();
          blast.currentTime = 0;
        }, 2000);
        break;
      }
    }
  }
}

function isOutOfScreen(obj) {
  if (
    obj.x >= screen.width ||
    obj.x + obj.width <= 0 ||
    obj.y >= screen.height ||
    obj.y + obj.height <= 0
  )
    return true;
  return false;
}

function move(obj) {
  if (obj.movement.status === "moving") {
    switch (obj.movement.direction) {
      case "up":
        obj.y -= obj.movement.speed;
        obj.collider.move(0, -obj.movement.speed);
        break;
      case "left":
        obj.x -= obj.movement.speed;
        obj.collider.move(-obj.movement.speed);
        break;
      case "down":
        obj.y += obj.movement.speed;
        obj.collider.move(0, obj.movement.speed);
        break;
      case "right":
        obj.x += obj.movement.speed;
        obj.collider.move(obj.movement.speed);
        break;
      default:
        break;
    }
  }
}

function shoot(obj, dir) {
  if (obj.tag === "enemy") {
    enShootSnd.pause();
    enShootSnd.currentTime = 0;
    enShootSnd.play();
    setTimeout(() => {
      enShootSnd.pause();
      enShootSnd.currentTime = 0;
    }, 100);
  } else {
    shootSnd.pause();
    shootSnd.currentTime = 0;
    shootSnd.play();
    setTimeout(() => {
      shootSnd.pause();
      shootSnd.currentTime = 0;
    }, 100);
  }
  gameData[1].push(
    /*
    new GameObject({
      tag: obj.tag + "_shoot",
      position: {
        x: obj.x + bulletPositionX(obj.params, dir),
        y: obj.y + bulletPositionY(obj.params, dir),
      },
      params: {
        color: "#FF0000",
        width: 10,
        height: 10,
      },
      movement: {
        direction: dir || obj.movement.direction,
        prevDirection: "none",
        speed: 10,
        status: "moving",
      },
      view: {
        image: images["shot"],
        sx: 0,
        sy: 0,
      },
      lifeTime: 3000,
      shape: 1,
    })
    */
    creator.create(
      {
        lifeTime: 3000,
        shape: 1,
        movement: {
          direction: dir || obj.movement.direction,
          prevDirection: "none",
          speed: 10,
          status: "moving",
        },
        width: 10,
        height: 10,
        x: obj.x + bulletPositionX(obj.width, dir),
        y: obj.y + bulletPositionY(obj.height, dir),
        tag: obj.tag + "_shoot",
        isCollidable: true,
      },
      [images["shot"]],
      0,
      [10, 10],
      1,
      [
        {
          framelist: "",
          frameListHeight: 10,
          frameListWidth: 10,
          frameWidth: 10,
          frameHeight: 10,
          duration: 0,
          frameX: 0,
          frameY: 0,
          startFrame: 0,
          isRotating: false,
          isInfinit: false,
        },
      ]
    )
  );
}

function bulletPositionX(width, dir) {
  switch (dir) {
    case "up":
      return width / 2 - 5;
    case "left":
      return 0;
    case "down":
      return width / 2 - 5;
    case "right":
      return width - 10;
  }
}

function bulletPositionY(height, dir) {
  switch (dir) {
    case "up":
      return 0;
    case "left":
      return height / 2 - 5;
    case "down":
      return height - 10;
    case "right":
      return height / 2 - 5;
  }
}

function spawnEnemy(time) {
  gameData[0].push(
    /*
    new GameObject({
      tag: "enemy",
      position: {
        x: Math.floor(Math.random() * screen.width),
        y: Math.floor(Math.random() * screen.height),
      },
      params: {
        color: "#FF0055",
        width: 64,
        height: 64,
      },
      movement: {
        direction: "none",
        prevDirection: "none",
        speed: 5,
        status: "moving",
        steps: 0,
      },
      view: {
        image: images["enemy_tank"],
        sx: 0,
        sy: 0,
      },
    })
    */
    creator.create(
      {
        tag: "enemy",
        x: Math.floor(Math.random() * screen.width),
        y: Math.floor(Math.random() * screen.height),
        color: "#FF0055",
        width: 64,
        height: 64,
        movement: {
          direction: "none",
          prevDirection: "none",
          speed: 5,
          status: "moving",
          steps: 0,
        },
        isCollidable: true,
      },
      [images["enemy_tank"]],
      0,
      [64, 64],
      1,
      [
        {
          framelist: "",
          frameListHeight: 256,
          frameListWidth: 256,
          frameWidth: 64,
          frameHeight: 64,
          duration: 0,
          frameX: 0,
          frameY: 0,
          startFrame: 0,
          isRotating: false,
          isInfinit: false,
        },
      ]
    )
  );
  prevSetTime = time;
}

function enemyAI(enemies) {
  enemies.forEach((enemy) => {
    if (enemy.movement.steps === 0) {
      enemy.movement.prevDirection = enemy.movement.direction;
      enemy.movement.direction = chooseDirection(enemy.view);
      enemy.movement.steps = chooseStepsAmmount();
    } else enemy.movement.steps--;
    if (
      Math.random() > 0.8 &&
      enemy.movement.steps < Math.floor(Math.random() * 5 + 2)
    )
      shoot(enemy, enemy.movement.direction);
  });
}

// function playerSeen(enemy) {
//   if(
//     player.x + player.width >= enemy.x - enemy.viewRad &&
//     player.x <= enemy.x + enemy.viewRad + enemy.width &&
//     player.y + player.height >= enemy.y - enemy.viewRad &&
//     player.y <= enemy.y + enemy.viewRad + enemy.height
//   ) {
//     if (enemy.movement.direction === 'up' && player.y < enemy.y + 10) return true;
//     if (enemy.movement.direction === 'down' && player.y + player.height > enemy.y + enemy.height - 10) return true;
//     if (enemy.movement.direction === 'left' && player.x < enemy.x + 10) return true;
//     if (enemy.movement.direction === 'right' && player.x + player.width > enemy.x + enemy.width - 10) return true;
//     return false;
//   }
// }

function chooseDirection(v) {
  let x = Math.floor(Math.random() * 5);
  switch (x) {
    case 0:
      // v.sx = 0;
      // v.sy = 0;
      return "up";
    case 1:
      // v.sx = 3;
      // v.sy = 3;
      return "left";
    case 2:
      // v.sx = 2;
      // v.sy = 2;
      return "down";
    case 3:
      // v.sx = 1;
      // v.sy = 1;
      return "right";
    case 4:
      return "none";
  }
}

function chooseStepsAmmount() {
  return Math.floor(Math.random() * 20);
}

function loadImages() {
  let promises = [];
  for (let name in imagesToLoad) {
    promises.push(load(name, imagesToLoad[name]));
  }
  return Promise.all(promises);
}

function load(name, src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    images[name] = img;
    // console.log(window.location.origin + src);
    img.onload = () => resolve(name);
    img.onerror = (error) => reject(error);
    img.src = src;
  });
}

function explode(obj) {
  gameData[2].push(
    /*
    new GameObject({
      tag: "explosion",
      position: {
        x: obj.x,
        y: obj.y,
      },
      params: {
        color: "#000000",
        width: 64,
        height: 64,
      },
      view: {
        image: images["explosion"],
        sx: 0,
        sy: 0,
      },
    })
    */
    creator.create(
      {
        tag: "explosion",
        x: obj.x,
        y: obj.y,
        color: "#000000",
        width: 64,
        height: 64,
        movement: {
          direction: "none",
          prevDirection: "none",
          speed: 5,
          status: "stop",
          steps: 0,
        },
      },
      [images["explosion"]],
      0,
      [64, 64],
      1,
      [
        {
          frameListHeight: 64,
          frameListWidth: 384,
          frameWidth: 64,
          frameHeight: 64,
          duration: 6,
          frameX: 0,
          frameY: 0,
          startFrame: 0,
          isRotating: false,
          isInfinit: false,
        },
      ]
    )
  );
}

function animateExplosion(expl) {
  // console.log(expl);
  if (expl.view.sx <= 5) expl.view.sx++;
  else return false;
  return true;
}

// DEATH!!!

function death() {
  cancelAnimationFrame(id);
  theme.pause();
  theme.currentTime = 0;
  clearScreen();
  controlButtons.classList.add("_hidden");
  starter.classList.remove("_hidden");
  setTimeout(() => {
    starter.classList.remove("_full");
  }, 1200);
  setTimeout(() => {
    starter.classList.remove("_transit");
    start.classList.remove("_hidden");
    title.classList.remove("_transparent");
    gameStarted = false;
  }, 1900);
}

// DEATH!!!

//primitive

class GameObject {
  constructor({
    tag = "object",
    position = {
      x: 100,
      y: 100,
    },
    params = {
      color: "#000000",
      width: 32,
      height: 32,
    },
    movement = {
      direction: "none",
      prevDirection: "none",
      speed: 5,
      status: "stop",
      steps: 0,
    },
    view = {
      image: null,
      sx: 0,
      sy: 0,
    },
    time = 0,
    lifeTime = "infinite",
    viewRad = 40,
    shape = 0,
  }) {
    this.tag = tag;
    this.position = position;
    this.params = params;
    this.movement = movement;
    this.view = view;
    this.time = time;
    this.lifeTime = lifeTime;
    this.viewRad = viewRad;
    this.shape = shape;

    this.collider =
      shape === 0
        ? new CollisionBody({
            type: 0,
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height,
          })
        : new CollisionBody({
            type: 1,
            x: this.x,
            y: this.y,
            r: this.width,
          });
  }
}

//events

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
      player.movement.direction = "up";
      player.movement.status = "moving";
      // player.view.sx = 0;
      player.textures[0].setColumn(1);
      break;
    case "KeyD":
      player.movement.direction = "right";
      player.movement.status = "moving";
      // player.view.sx = 1;
      player.textures[0].setColumn(0);
      break;
    case "KeyS":
      player.movement.direction = "down";
      player.movement.status = "moving";
      // player.view.sx = 2;
      player.textures[0].setColumn(3);
      break;
    case "KeyA":
      player.movement.direction = "left";
      player.movement.status = "moving";
      // player.view.sx = 3;
      player.textures[0].setColumn(2);
      break;
  }
});

document.addEventListener("click", (e) => {
  if (gameStarted) {
    let dir = "";
    if (
      e.clientX > player.x &&
      Math.abs(e.clientY - player.y) < Math.abs(e.clientX - player.x)
    ) {
      // player.view.sy = 1;
      // player.textures[0].setLine(1);
      dir = "right";
    } else if (
      Math.abs(e.clientY - player.y) < Math.abs(e.clientX - player.x)
    ) {
      // player.view.sy = 3;
      // player.textures[0].setLine(3);
      dir = "left";
    } else if (
      e.clientY > player.y &&
      Math.abs(e.clientX - player.x) < Math.abs(e.clientY - player.y)
    ) {
      // player.view.sy = 2;
      // player.textures[0].setLine(2);
      dir = "down";
    } else {
      // player.view.sy = 0;
      // player.textures[0].setLine(0);
      dir = "up";
    }
    shoot(player, dir);
  }
});

controlButtons.childNodes.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    player.movement.direction = btn.id;
    player.movement.status = "moving";
    player.view.sx = 0;
  })
);

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  e.stopPropagation();
  // menu.classList.toggle('_hidden');
  if (paused) {
    menu.classList.add("_close");
    setTimeout(() => {
      menu.classList.add("_hidden");
      menu.classList.remove("_close");
      resume();
    }, 200);
  } else {
    paused = true;
    menu.classList.remove("_hidden");
  }
});
