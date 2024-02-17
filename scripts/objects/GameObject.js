import { CollisionBody } from "../physics/CollisionBody.js";

export class GameObject {
  constructor({
    type = "block", //"entity" | "projectile"

    x = 0,
    y = 0,
    width = 0,
    height = 0,
    rotation = 0,
    isSpheric = false,
    radius = 0,

    isStatic = true,
    isCollidable = true,
    isPlayer = false,
    isDestructive = false,

    shape = "rectangle", // "circle" , {type:0/1, x...}
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.radius = radius;
    this.type = type;
    this.shape = shape;

    this.isSpheric = isSpheric;
    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
    this.isDestructive = isDestructive;
    this.isPlayer = isPlayer;
  }

  setImage(image, context, textures) {
    this.image = image;
    this.context = context;
    this.textures = textures;
  }

  setAnimation(animations) {
    this.animations = animations;
  }
}
