import { CollisionBody } from "./scripts/physics/CollisionBody.js";
import { Animation } from "./scripts/utilities/Animation.js";

console.group("TESTS");

console.group("\tCollisions");

console.group("\t\tRects");

let body_1 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 10,
  y1: 10, //-- first point coordinates
  x2: 20,
  y2: 20, //-- second (diagonal) point coordinates
});

let body_2 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 0,
  y1: 0, //-- first point coordinates
  x2: 5,
  y2: 5, //-- second (diagonal) point coordinates
});

let body_3 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 5,
  y1: 5, //-- first point coordinates
  x2: 11,
  y2: 11, //-- second (diagonal) point coordinates
});
//body_2.checkCollision(body_1)
console.log(
  "body_1.checkCollision(body_2): ",
  body_1.checkCollision(body_2.bodies)
);
console.log(
  "body_2.checkCollision(body_1): ",
  body_2.checkCollision(body_1.bodies)
);
console.log(
  "body_1.checkCollision(body_3): ",
  body_1.checkCollision(body_3.bodies)
);
console.log(
  "body_2.checkCollision(body_3): ",
  body_2.checkCollision(body_3.bodies)
);
console.groupEnd();

console.group("\t\tCircles");

let body_4 = new CollisionBody({
  type: 1, //-- circle body
  x: 30,
  y: 30, //-- first point coordinates
  r: 5,
});

let body_5 = new CollisionBody({
  type: 1, //-- circle body
  x: 20,
  y: 20, //-- first point coordinates
  r: 10,
});

let body_6 = new CollisionBody({
  type: 1, //-- circle body
  x: 5,
  y: 5, //-- first point coordinates
  r: 10,
});

//body_5.checkCollision(body_6.bodies)
console.log(
  "body_5.checkCollision(body_4.bodies): ",
  body_5.checkCollision(body_4.bodies)
);
console.log(
  "body_4.checkCollision(body_6.bodies): ",
  body_4.checkCollision(body_6.bodies)
);

console.groupEnd();

console.group("\t\tCombined");

console.log(
  "body_1.checkCollision(body_6.bodies): ",
  body_1.checkCollision(body_6.bodies)
);
console.log(
  "body_6.checkCollision(body_1.bodies): ",
  body_6.checkCollision(body_1.bodies)
);

console.groupEnd();

console.group("\t\tExtended");

let body_7 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 100,
  y1: 100, //-- first point coordinates
  x2: 120,
  y2: 120, //-- second (diagonal) point coordinates
});
let body_8 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 120,
  y1: 115, //-- first point coordinates
  x2: 140,
  y2: 140, //-- second (diagonal) point coordinates
});
let body_9 = new CollisionBody({
  type: 0, //-- rectangular body
  x1: 115,
  y1: 140, //-- first point coordinates
  x2: 160,
  y2: 150, //-- second (diagonal) point coordinates
});
let body_10 = new CollisionBody({
  type: 1, //-- rectangular body
  x: 90,
  y: 110, //-- first point coordinates
  r: 11,
});

//body_7.extendedCollisionCheck(body_8.bodies)
console.log(
  "body_7.extendedCollisionCheck(body_8.bodies): ",
  body_7.extendedCollisionCheck(body_8.bodies)
);
console.log(
  "body_8.extendedCollisionCheck(body_7.bodies): ",
  body_8.extendedCollisionCheck(body_7.bodies)
);
console.log(
  "body_8.extendedCollisionCheck(body_9.bodies): ",
  body_8.extendedCollisionCheck(body_9.bodies)
);
console.log(
  "body_7.extendedCollisionCheck(body_10.bodies): ",
  body_7.extendedCollisionCheck(body_10.bodies)
);

console.groupEnd();

//end of Collider Tests
console.groupEnd();

console.group("\tAnimation");

let animation_1 = new Animation(
  null,
  1000,
  500,
  50,
  50,
  25,
  0,
  0,
  0,
  false,
  false
);
for (let i = 0; i < 30; i++) animation_1.frame(null, null, 0);

animation_1.frame(null, null, 0);

//end of Animation Tests
console.groupEnd();

//end of all tests
console.groupEnd();
