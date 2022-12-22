class Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, isAnimated = false, animations }) {
		this.position = position;
		this.scale = scale;
		this.isAnimated = isAnimated;
		this.animations = animations;
		this.loaded = false;
		this.img = new Image();
		this.img.onload = () => {
			this.width = (this.img.width / this.frameRate) * this.scale;
			this.height = this.img.height * this.scale;
			this.loaded = true
		}
		this.img.src = imgSource;
		this.frameRate = frameRate;
		this.frameBuffer = frameBuffer;
		this.currentFrame = 0;
		this.skippedFrames = 0;

	}
	draw() {
		if (!this.loaded) return
		const cropbox = {
			position: {
				x: this.currentFrame * (this.img.width / this.frameRate),
				y: 0,
			},
			width: this.img.width / this.frameRate,
			height: this.img.height,
		}
		ctx.drawImage(this.img, cropbox.position.x, cropbox.position.y, cropbox.width, cropbox.height, this.position.x, this.position.y, this.width, this.height);
		if (this.animated) this.updateFrames();
	}
	updateFrames() {
		this.skippedFrames++;
		if (this.skippedFrames === this.frameBuffer) {
			this.skippedFrames = 0;
			this.currentFrame++;
			if (this.currentFrame === this.frameRate) {
				this.currentFrame = 0;
			}
		}
	}
	switchAnimation(key) {
		if (this.img === this.animations[key].img) return
		this.img = this.animations[key].img;
		this.frameRate = this.animations[key].frameRate;
		this.currentFrame = 0;
	}
	debug(red = 255, green = 0, blue = 0, opacity = 0.2) {
		ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}