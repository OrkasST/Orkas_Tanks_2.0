import { GameObject } from "./GameObject.js";

export class Bullet extends GameObject {
  constructor(data) {
    super(data);
    this.type = data.type;
  }

  move(time) {
    // console.log(this);
    this.x += this.movement.speed * Math.cos(this.rotation); // * time;
    this.y += this.movement.speed * Math.sin(this.rotation); // * time;
  }
}
