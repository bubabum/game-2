class Game {
	constructor({ player, level, width, height, debug = false }) {
		this.player = player;
		this.level = level;
		this.width = width;
		this.height = height;
		this.debug = debug;
	}
	update() {
		this.player.update();
	}
	debugGame() {
		this.player.debug({ ctx: this.ctx });
		this.level.debug({ ctx: this.ctx });
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
		//this.ctx.translate(camera.position.x, camera.position.y);
		this.level.draw(this.ctx);
		this.player.update(this.ctx, this.level);
		if (this.debug) this.debugGame();
		// this.ctx.restore();
		requestAnimationFrame(() => this.animation());
	}
}