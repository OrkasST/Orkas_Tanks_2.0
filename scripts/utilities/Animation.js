export class Animation {
  constructor({
    framelist,
    frameListHeight,
    frameListWidth,
    frameWidth,
    frameHeight,
    duration,
    frameX = 0,
    frameY = 0,
    offsetX = 0,
    offsetY = 0,
    imageX = 0,
    imageY = 0,
    startFrame = 0,
    isRotating = false,
    isInfinit = true,
    log = false,
  }) {
    this.framelist = framelist;
    this.frameListHeight = frameListHeight;
    this.frameListWidth = frameListWidth;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.duration = duration;
    this.startFrame = startFrame;
    this.frameX = frameX;
    this.frameY = frameY;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.imageX = imageX;
    this.imageY = imageY;
    this.isInfinit = isInfinit;
    this.isRotating = isRotating;
    this.currentFrame = 0 + startFrame;
    this.line = -1;
    this.column = -1;
    this.log = log;
  }

  frame(image, context, rotation, number) {
    // if (this.duration < this.currentFrame) return;
    let sx =
      (this.column >= 0
        ? this.column
        : number >= 0
        ? number
        : this.currentFrame) * this.frameWidth;
    let line =
      this.line >= 0
        ? this.line
        : Math.floor(
            ((number || this.currentFrame) * this.frameWidth) /
              this.frameListWidth
          );
    if (sx >= this.frameListWidth) sx -= this.frameListWidth * line;
    sx += this.offsetX;
    let sy = line * this.frameHeight + this.offsetY;
    context.clearRect(
      -image.width,
      -image.height,
      image.width * 2,
      image.height * 2
    );
    if (this.isRotating) {
      context.save();
      context.translate(image.width / 2, image.height / 2);
      context.rotate(rotation);
    }
    context.drawImage(
      this.framelist,
      sx,
      sy,
      this.imageX || this.frameWidth,
      this.imageY || this.frameHeight,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight
    );
    if (this.isRotating) context.restore();
    if (!number && this.duration > this.currentFrame) this.currentFrame++;
    if (this.duration <= this.currentFrame && this.isInfinit)
      this.currentFrame = 0;
  }

  setLine(line) {
    this.line = line;
  }
  setColumn(column) {
    this.column = column;
  }
}
