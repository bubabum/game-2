class Player extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop })
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.5;
		this.keyHandler = new KeyHandler();
	}
	update() {
		if (this.keyHandler.ArrowUp && this.velocity.y === 0) {
			this.velocity.y = -10;
		}
		if (this.keyHandler.ArrowLeft) {
			this.velocity.x = -3;
		}
		if (this.keyHandler.ArrowRight) {
			this.velocity.x = 3;
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
	uplyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.y + this.height > canvas.height) {
			this.position.y = canvas.height - this.height;
			this.velocity.y = 0;
		}
	}
}