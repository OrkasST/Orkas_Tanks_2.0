import { CollisionBody } from "../physics/CollisionBody.js";

export class GameObject {
  constructor({
    tag = "block", //"entity" | "projectile"

    x = 0,
    y = 0,
    width = 0,
    height = 0,
    rotation = 0,
    isSpheric = false,
    radius = 0,

    isStatic = true,
    isCollidable = false,
    isPlayer = false,
    isDestructive = false,

    shape = "rectangle", // "circle" , {type:0/1, x...}

    //temporary
    movement = {
      direction: "none",
      prevDirection: "none",
      speed: 5,
      status: "stop",
      steps: 0,
    },
    time = 0,
    lifeTime = "infinite",
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.radius = radius;
    this.tag = tag;
    this.shape = shape;

    this.isSpheric = isSpheric;
    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
    this.isDestructive = isDestructive;
    this.isPlayer = isPlayer;

    //temp
    this.movement = movement;
    this.time = time;
    this.lifeTime = lifeTime;
  }

  setImage(images, textures) {
    this.images = images;
    this.textures = textures;
  }

  setAnimation(animations) {
    this.animations = animations;
  }
}
