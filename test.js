import { CollisionBody } from "./scripts/physics/CollisionBody.js";

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

console.groupEnd();

console.groupEnd();
