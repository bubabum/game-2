class Sprite {
	constructor({ position, frameWidth, frameHeight, imgSource, animation = null }) {
		this.position = position;
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.img = new Image();
		this.img.src = imgSource;
		this.currentFrame = 0;
		this.maxFrames = 22;
		this.animation = animation;
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
	update() {
		this.draw();
	}
}