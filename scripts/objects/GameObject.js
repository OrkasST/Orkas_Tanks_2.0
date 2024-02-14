export class GameObject {
  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    isSpheric = false,
    radius = 0,
    isStatic = true,
    isCollidable = true,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.isStatic = isStatic;
    this.isCollidable = isCollidable;
  }
}
