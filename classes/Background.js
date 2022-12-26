class Background extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true, collisionsMap, tile }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop });
		this.img.onload = () => {
			this.collisionsMap = this.parseCollisionsMap(collisionsMap);
		}
		this.tile = tile;
	}
	parseCollisionsMap(collisionsMap) {
		const step = this.img.width / this.tile;
		let collisionsMap2D = []
		for (let i = 0; i < collisionsMap.length; i += 150) {
			collisionsMap2D.push(collisionsLevel1.slice(i, i + 150));
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
}