class Player extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop })
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.5;
		this.keyHandler = new KeyHandler();
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
	update(ctx, level) {
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
		if (level.collisionsMap) this.checkHorizontalCollisions(level.collisionsMap);
		this.uplyGravity();
		this.updateHitbox();
		if (level.collisionsMap) this.checkVerticalCollisions(level.collisionsMap);
		this.updateHitbox();
		this.updateCamerabox();
	}
	uplyGravity() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.y < 0) {
			this.position.y = 0;
			this.velocity.y = 0;
		}
		if (this.position.x < 0) {
			this.position.x = 0;
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
	checkHorizontalCollisions(collisionsMap) {
		for (let i = 0; i < collisionsMap.length; i++) {
			if (this.checkCollisions(collisionsMap[i])) {
				if (this.velocity.x > 0) {
					this.position.x = collisionsMap[i].position.x - this.hitbox.offset.x - this.hitbox.width - 0.01;
					break
				}
				if (this.velocity.x < 0) {
					this.position.x = collisionsMap[i].position.x + collisionsMap[i].width - this.hitbox.offset.x + 0.01;
					break
				}
			}
		}
	}
	checkVerticalCollisions(collisionsMap) {
		for (let i = 0; i < collisionsMap.length; i++) {
			if (this.checkCollisions(collisionsMap[i])) {
				if (this.velocity.y > 0) {
					this.position.y = collisionsMap[i].position.y - this.hitbox.height - this.hitbox.offset.y - 0.01;
					this.velocity.y = 0;
					break
				}
				if (this.velocity.y < 0) {
					this.position.y = collisionsMap[i].position.y + collisionsMap[i].height - this.hitbox.offset.y - 0.01;
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