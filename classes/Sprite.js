class Sprite {
   constructor(options) {
      this.frameWidth = options.frameWidth;
      this.frameHeight = options.frameHeight;
      this.img = new Image();
      this.img.src = options.imgSource;
      this.frameMap = options.frameMap;
      this.currentFrame = 0;
      this.maxFrames = 22;
      this.static = options.static;
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