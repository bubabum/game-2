class Level extends Sprite {
	constructor({ position, imgSource, scale = 1, frameRate = 1, frameBuffer = 3, animations, loop = true, collisionsMap, platformsMap, tile }) {
		super({ position, imgSource, scale, frameRate, frameBuffer, animations, loop });
		this.img.onload = () => {
			this.width = (this.img.width / this.frameRate) * this.scale;
			this.height = this.img.height * this.scale;
			this.collisionsMap = this.parseCollisionsMap({ map: collisionsMap });
			this.platformsMap = this.parseCollisionsMap({ map: platformsMap, height: 10 });
			this.loaded = true;
		}
		this.collisionsMap = [];
		this.platformsMap = [];
		this.tile = tile;
	}
	parseCollisionsMap({ map, tile = this.tile, height = this.tile }) {
		const step = this.img.width / this.tile;
		let map2D = []
		for (let i = 0; i < map.length; i += step) {
			map2D.push(map.slice(i, i + step));
		}
		let collisionObjects = []
		map2D.forEach((row, y) => {
			row.forEach((block, x) => {
				if (block > 0) {
					collisionObjects.push({
						position: {
							x: x * tile,
							y: y * tile,
						},
						width: tile,
						height: height,
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
		if (this.platformsMap) {
			this.platformsMap.forEach((collisionPlatform) => {
				ctx.fillStyle = 'rgba(255, 100, 0, 0.5)';
				ctx.fillRect(collisionPlatform.position.x, collisionPlatform.position.y, collisionPlatform.width, collisionPlatform.height);
			})
		}
	}
}