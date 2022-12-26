class CollisionBlock {
	constructor({ position, width, height }) {
		this.position = position;
		this.width = width;
		this.height = height;
	}
	debug() {
		ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}