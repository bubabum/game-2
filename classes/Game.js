class Game {
	constructor({ player, level, width, height, debug = false }) {
		this.player = player;
		this.level = level;
		this.width = width;
		this.height = height;
		this.debug = debug;
		this.camera = {
			position: {
				x: 0,
				y: 0,
			}
		}
	}
	debugGame() {
		this.player.debug({ ctx: this.ctx });
		this.level.debug({ ctx: this.ctx });
	}
	update() {
		this.moveCameraRight(this.player.camerabox);
		this.moveCameraLeft(this.player.camerabox);
		this.moveCameraDown(this.player.camerabox);
		this.moveCameraUp(this.player.camerabox);
	}
	moveCameraRight(camerabox) {
		if (camerabox.position.x + camerabox.width > this.level.width) return
		if (camerabox.position.x + camerabox.width > this.canvas.width + Math.abs(this.camera.position.x) && this.player.velocity.x > 0) {
			this.camera.position.x -= this.player.velocity.x;
		}
	}
	moveCameraLeft(camerabox) {
		if (camerabox.position.x < 0) return
		if (camerabox.position.x < Math.abs(this.camera.position.x) && this.player.velocity.x < 0) {
			this.camera.position.x -= this.player.velocity.x;
		}
	}
	moveCameraDown(camerabox) {
		if (camerabox.position.y + camerabox.height > this.level.height) return
		if (camerabox.position.y + camerabox.height > this.canvas.height + Math.abs(this.camera.position.y) && this.player.velocity.y > 0) {
			this.camera.position.y -= this.player.velocity.y;
		}
	}
	moveCameraUp(camerabox) {
		if (camerabox.position.y < 0) return
		if (camerabox.position.y < Math.abs(this.camera.position.y) && this.player.velocity.y < 0) {
			this.camera.position.y -= this.player.velocity.y;
		}
	}
	start() {
		const canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		document.body.appendChild(canvas);
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.animation();
	}
	animation() {
		this.ctx.imageSmoothingEnabled = false;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.save();
		//this.ctx.scale(2, 2);
		this.ctx.translate(this.camera.position.x, this.camera.position.y);
		this.level.draw(this.ctx);
		this.player.update(this.ctx, this.level);
		this.update();
		if (this.debug) this.debugGame();
		this.ctx.restore();
		requestAnimationFrame(() => this.animation());
	}
}