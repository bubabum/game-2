class Player extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop })
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.3;
		this.keyHandler = new KeyHandler();
		this.hitbox = {
			width: 20 * this.scale,
			height: 50 * this.scale,
			offset: {
				x: 22 * this.scale,
				y: 14 * this.scale,
			},
			position: {
				x: this.position.x,
				y: this.position.y,
			},
		}
		this.camerabox = {
			width: 800,
			height: 400,
			position: {
				x: this.position.x,
				y: this.position.y,
			},
		}
		this.initKeys();
	}
	initKeys() {
		window.addEventListener('keydown', (event) => {
			if (event.code === 'ArrowUp' && this.velocity.y <= 0) {
				this.velocity.y = -7;
				this.switchAnimation('jump');
			}
			if (event.code === 'ArrowRight') {
				this.velocity.x = 2;
				this.switchAnimation('run');
			}
			if (event.code === 'ArrowLeft') {
				this.velocity.x = -2;
				this.switchAnimation('runLeft');
			}
		})
		window.addEventListener('keyup', (event) => {
			if (event.code === 'ArrowRight') {
				this.velocity.x = 0;
				this.switchAnimation('idle');
			}
			if (event.code === 'ArrowLeft') {
				this.velocity.x = 0;
				this.switchAnimation('idle');
			}
		})
	}
	update(ctx, level) {
		//if (this.keyHandler.ArrowUp && this.velocity.y === 0) {
		// this.velocity.y = -10;
		// console.log('test')
		//
		//}
		// if (this.keyHandler.ArrowLeft) {
		// 	this.velocity.x = -2;
		// 	this.switchAnimation('runLeft');
		// }
		// if (this.keyHandler.ArrowRight) {
		// 	this.velocity.x = 2;
		// 	this.switchAnimation('run');
		// }
		// if (!this.keyHandler.ArrowLeft && !this.keyHandler.ArrowRight) {
		// 	this.velocity.x = 0;
		// 	this.switchAnimation('idle');
		// }
		this.updateHitbox();
		this.updateCamerabox();
		this.draw(ctx);
		this.position.x += this.velocity.x;
		this.updateHitbox();
		if (level.collisionsMap) this.checkHorizontalCollisions(level.collisionsMap);
		this.uplyGravity(level);
		this.updateHitbox();
		if (level.collisionsMap) this.checkVerticalCollisions(level.collisionsMap);
	}
	uplyGravity(level) {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.x + this.hitbox.offset.x < 0) {
			this.position.x = -this.hitbox.offset.x + 0.01;
		}
		if (this.hitbox.position.x + this.hitbox.width > level.width) {
			this.position.x = level.width - this.hitbox.offset.x - this.hitbox.width - 0.01;
		}
		if (this.position.y + this.hitbox.offset.y < 0) {
			this.position.y = -this.hitbox.offset.y + 0.01;
		}
		if (this.hitbox.position.y + this.hitbox.height > level.height) {
			this.position.y = level.height - this.hitbox.offset.y - this.hitbox.height - 0.01;
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