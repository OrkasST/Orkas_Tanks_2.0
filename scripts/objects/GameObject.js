export class GameObject {
  constructor({
    type = "block", //"entity" | "projectile"

    x = 0,
    y = 0,
    width = 0,
    height = 0,
    isSpheric = false,
    radius = 0,
    isStatic = true,
    isCollidable = true,
    isPlayer = false,
    isDestructive = false,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.type = type;

    this.isSpheric = isSpheric;
    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
    this.isDestructive = isDestructive;
    this.isPlayer = isPlayer;
  }
}
