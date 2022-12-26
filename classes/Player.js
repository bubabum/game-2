class Player extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true, collisions }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop })
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.5;
		this.keyHandler = new KeyHandler();
		this.collisions = collisions;
		this.hitbox = {
			width: 18,
			height: 30,
			offset: {
				x: 25,
				y: 14,
			},
			position: {
				x: this.position.x,
				y: this.position.y,
			},
		}
		this.camerabox = {
			width: 400,
			height: 200,
			position: {
				x: this.position.x,
				y: this.position.y,
			},
		}
	}
	update(ctx) {
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
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.updateHitbox();
		this.checkHorizontalCollisions();
		this.uplyGravity();
		this.updateHitbox();
		this.checkVerticalCollisions();
		this.updateHitbox();
		this.updateCamerabox();
	}
	uplyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.y + this.height > canvas.height) {
			this.position.y = canvas.height - this.height;
			this.velocity.y = 0;
		}
		if (this.position.y < 0) {
			this.position.y = 0;
			this.velocity.y = 0;
		}
		if (this.position.x < 0) {
			this.position.x = 0;
		}
		if (this.position.x + this.width > canvas.width) {
			this.position.x = canvas.width - this.width;
		}
	}
	checkCollisions(collisionObject) {
		return (
			this.hitbox.position.x <= collisionObject.position.x + collisionObject.width &&
			this.hitbox.position.x + this.hitbox.width >= collisionObject.position.x &&
			this.hitbox.position.y + this.hitbox.height >= collisionObject.position.y &&
			this.hitbox.position.y <= collisionObject.position.y + collisionObject.height
		)
	}
	checkHorizontalCollisions() {
		for (let i = 0; i < this.collisions.length; i++) {
			if (this.checkCollisions(this.collisions[i])) {
				if (this.velocity.x > 0) {
					this.position.x = this.collisions[i].position.x - this.hitbox.offset.x - this.hitbox.width - 0.01;
					break
				}
				if (this.velocity.x < 0) {
					this.position.x = this.collisions[i].position.x + this.collisions[i].width - this.hitbox.offset.x + 0.01;
					break
				}
			}
		}
	}
	checkVerticalCollisions() {
		for (let i = 0; i < this.collisions.length; i++) {
			if (this.checkCollisions(this.collisions[i])) {
				if (this.velocity.y > 0) {
					this.position.y = this.collisions[i].position.y - this.hitbox.height - this.hitbox.offset.y - 0.01;
					this.velocity.y = 0;
					break
				}
				if (this.velocity.y < 0) {
					this.position.y = this.collisions[i].position.y + this.collisions[i].height - this.hitbox.offset.y - 0.01;
					this.velocity.y = 0;
					break
				}
			}
		}
	}
	updateCamerabox() {
		this.camerabox.position.x = this.position.x - this.camerabox.width / 2 + this.width / 2;
		this.camerabox.position.y = this.position.y - this.camerabox.height / 2 + this.height / 2;
	}
}