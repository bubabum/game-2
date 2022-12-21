class Sprite {
   constructor(frameWidth, frameHeight, frameMap, imgSource, static) {
      this.frameWidth = frameWidth;
      this.frameHeight = frameHeight;
      this.img = new Image();
      this.img.src = imgSource;
      this.frameMap = frameMap;
      this.currentFrame = 0;
      this.maxFrames = 15;
      this.static = static;
      this.frameElapsed = 0;
      this.frameElapsedBuffer = 5;
   }
   draw() {
      ctx.strokeRect(50, 50, this.frameWidth, this.frameHeight);
      ctx.drawImage(this.img, Math.floor(this.currentFrame) * this.frameWidth, 0, this.frameWidth, this.frameHeight, 50, 50, this.frameWidth, this.frameHeight);
      this.frameElapsed++
      if (this.frameElapsed === this.frameElapsedBuffer) {
         this.frameElapsed = 0;
         this.currentFrame++
      }
      if (this.currentFrame > this.maxFrames - 1) this.currentFrame = 0;

   }
}