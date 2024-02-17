export class Animation {
  constructor(
    framelist,
    frameListHeight,
    frameListWidth,
    frameWidth,
    frameHeight,
    duration,
    frameX,
    frameY,
    startFrame = 0,
    isRotating = false,
    isInfinit = true
  ) {
    this.framelist = framelist;
    this.frameListHeight = frameListHeight;
    this.frameListWidth = frameListWidth;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.duration = duration;
    this.startFrame = startFrame;
    this.frameX = frameX;
    this.frameY = frameY;
    this.isInfinit = isInfinit;
    this.isRotating = isRotating;
    this.currentFrame = 0 + startFrame;
  }

  frame(image, context, rotation, number) {
    // if (this.duration < this.currentFrame) return;
    let sx = (number || this.currentFrame) * this.frameWidth;
    let line = Math.floor(
      ((number || this.currentFrame) * this.frameWidth) / this.frameListWidth
    );
    if (sx >= this.frameListWidth) sx -= this.frameListWidth * line;
    let sy = line * this.frameHeight;
    console.log("~~~~~~~~~~~~~");
    console.log("sx: ", sx);
    console.log("sy: ", sy);
    // debugger;
    // context.clearRect(
    //   -image.width,
    //   -image.height,
    //   image.width * 2,
    //   image.height * 2
    // );
    // if (this.isRotating) {
    //   context.save();
    //   context.translate(image.width / 2, image.height / 2);
    //   context.rotate(rotation);
    // }
    // context.drawImage(
    //   this.framelist,
    //   sx,
    //   sy,
    //   this.frameWidth,
    //   this.frameHeight,
    //   this.frameX,
    //   this.frameY,
    //   this.frameWidth,
    //   this.frameHeight
    // );
    // if (this.isRotating) context.restore();
    if (!number && this.duration > this.currentFrame) this.currentFrame++;
    if (this.duration <= this.currentFrame && this.isInfinit)
      this.currentFrame = 0;
  }
  // update(image, context, rotation) {
  //   // let texture = this.textures[0];
  //   // if (rotation < -1.2 || rotation > 4.4) return;
  //   // if (rotation >= 1.6 && rotation <= 4.4) texture = this.textures[1];
  //   // if (rotation <= 1.6 && rotation >= -1) texture = this.textures[0];
  //   let sx = this.currentFrame * this.frameWidth;
  //   if (sx >= this.frameListWidth) sx = 0;
  //   let sy =
  //     Math.floor((this.currentFrame * this.frameWidth) / this.frameListWidth) *
  //     this.frameHeight;
  //   this.ctx.clearRect(
  //     -image.width,
  //     -image.height,
  //     image.width * 2,
  //     image.height * 2
  //   );
  //   if (this.isRotating) {
  //     context.save();
  //     context.translate(image.width / 2, image.height / 2);
  //     context.rotate(rotation);
  //   }
  //   context.drawImage(
  //     this.framelist,
  //     sx,
  //     sy,
  //     this.frameWidth,
  //     this.frameHeight,
  //     this.frameX,
  //     this.frameY,
  //     this.frameWidth,
  //     this.frameHeight
  //   );
  //   if (this.isRotating) context.restore();
  // }
}
