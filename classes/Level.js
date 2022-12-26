class Level extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true, collisionsMap, tile }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop });
		this.img.onload = () => {
			this.width = (this.img.width / this.frameRate) * this.scale;
			this.height = this.img.height * this.scale;
			this.loaded = true;
			this.collisionsMap = this.parseCollisionsMap(collisionsMap);
		}
		this.tile = tile;
	}
	parseCollisionsMap(collisionsMap) {
		const step = this.img.width / this.tile;
		let collisionsMap2D = []
		for (let i = 0; i < collisionsMap.length; i += step) {
			collisionsMap2D.push(collisionsLevel1.slice(i, i + step));
		}
		let collisionObjects = []
		collisionsMap2D.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					collisionObjects.push({
						position: {
							x: x * this.tile,
							y: y * this.tile,
						},
						width: this.tile,
						height: this.tile,
					})
				}
			})
		})
		return collisionObjects
	}
	debug({ ctx }) {
		if (this.collisionsMap) {
			this.collisionsMap.forEach((collisionBlock) => {
				ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
				ctx.fillRect(collisionBlock.position.x, collisionBlock.position.y, collisionBlock.width, collisionBlock.height);
			})
		}
	}
}