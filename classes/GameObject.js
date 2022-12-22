class GameObject extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animated = false, animations }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animated })
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.5;
		this.animations = animations;
		this.keyHandler = new KeyHandler();
		if (this.animations) {
			for (let key in this.animations) {
				const img = new Image()
				img.src = this.animations[key].imgSource;
				this.animations[key].img = img;
			}
		}
	}
	update() {
		if (this.keyHandler.ArrowUp && this.velocity.y >= 0) {
			this.velocity.y = -15;
		}
		if (this.keyHandler.ArrowLeft) {
			this.velocity.x = -2;
		}
		if (this.keyHandler.ArrowRight) {
			this.velocity.x = 2;
			this.switchAnimation('run');
		}
		if (!this.keyHandler.ArrowLeft && !this.keyHandler.ArrowRight) {
			this.velocity.x = 0;
			this.switchAnimation('idle');
		}
		this.position.x += this.velocity.x;
		this.draw();
		this.uplyGravity();
	}
	// switchAnimation(key) {
	// 	if (this.img === this.animations[key].img) return
	// 	this.img = this.animations[key].img;
	// 	this.frameRate = this.animations[key].frameRate;
	// 	this.currentFrame = 0;
	// }
	uplyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.y + this.height > canvas.height) {
			this.position.y = canvas.height - this.height;
			this.velocity.y = 0;
		}
	}
}