class GameObject {
	constructor(position) {
		this.position = position;
		this.w = 50;
		this.h = 50;
		this.velocity = {
			x: 0,
			y: 0,
		}
		this.gravity = 0.5;
	}
	update() {
		this.velocity.y += this.gravity;
		this.position.y += this.velocity.y;
		if (this.position.y + this.h > canvas.height) this.position.y = canvas.height - this.h;
	}
	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.position.x, this.position.y, this.w, this.h);
		this.update();
	}
}