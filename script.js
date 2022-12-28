let level = new Level({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/map3.png',
	collisionsMap: collisionsLevel1,
	tile: 16,
});
let player = new Player({
	position: {
		x: 20,
		y: 10,
	},
	imgSource: './img/knight.png',
	isAnimated: true,
	frameRate: 15,
	scale: 0.5,
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
});

let game = new Game({
	player,
	level,
	width: 1024,
	height: 576,
	debug: false,
});

// const camera = {
// 	position: {
// 		x: 0,
// 		y: 0,
// 	},
// }

game.start();