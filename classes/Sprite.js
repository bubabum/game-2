class Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true }) {
		this.position = position;
		this.scale = scale;
		this.animations = animations;
		this.loaded = false;
		this.img = new Image();
		this.img.onload = () => {
			this.width = (this.img.width / this.frameRate) * this.scale;
			this.height = this.img.height * this.scale;
			this.loaded = true
		}
		this.img.src = imgSource;
		this.loop = loop;
		this.frameRate = frameRate;
		this.frameBuffer = frameBuffer;
		this.currentFrame = 0;
		this.skippedFrames = 0;
		if (this.animations) {
			for (let key in this.animations) {
				const img = new Image()
				img.src = this.animations[key].imgSource;
				this.animations[key].img = img;
			}
		}
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
		this.updateFrames();
	}
	updateFrames() {
		this.skippedFrames++;
		if (this.skippedFrames === this.frameBuffer) {
			this.skippedFrames = 0;
			this.currentFrame++;
			if (this.currentFrame === this.frameRate) {
				if (this.loop) {
					this.currentFrame = 0;
				} else {
					this.currentFrame = this.frameRate - 1;
				}
			}
		}
	}
	switchAnimation(name) {
		if (this.img === this.animations[name].img) return
		this.img = this.animations[name].img;
		this.frameRate = this.animations[name].frameRate;
		this.loop = this.animations[name].loop;
		this.currentFrame = 0;
	}
	debug(red = 0, green = 255, blue = 0, opacity = 0.2) {
		ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}