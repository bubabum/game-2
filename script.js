const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const TILE = 16;

canvas.width = 1024;
canvas.height = 576;

let background = new Background({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/map.png',
	collisionsMap: collisionsLevel1,
	tile: TILE,
});
let player = new Player({
	position: {
		x: 0,
		y: 0,
	},
	imgSource: './img/knight.png',
	isAnimated: true,
	frameRate: 15,
	scale: 1,
	animations: {
		idle: {
			imgSource: './img/knight.png',
			frameRate: 15,
			loop: true,
		},
		run: {
			imgSource: './img/knight3.png',
			frameRate: 8,
			loop: true,
		},
	},
	collisions: background.collisionsMap,
});
console.log(background.collisionsMap);

// const camera = {
// 	position: {
// 		x: 0,
// 		y: 0,
// 	},
// }

function animation() {
	ctx.imageSmoothingEnabled = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	//ctx.scale(2, 2);
	//ctx.translate(camera.position.x, camera.position.y);
	background.draw();
	player.update();
	// player.collisions.forEach((block) => {
	// 	ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
	// 	ctx.fillRect(block.position.x, block.position.y, block.width, block.height)
	// })
	player.debug();
	ctx.restore();
	requestAnimationFrame(animation);
}

animation();