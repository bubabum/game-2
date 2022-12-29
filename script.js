let level = new Level({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/map.png',
	collisionsMap: collisionsLevel1,
	tile: 32,
});
let player = new Player({
	position: {
		x: 20,
		y: 10,
	},
	imgSource: './img/char.png',
	isAnimated: true,
	frameRate: 8,
	scale: 1,
	animations: {
		idle: {
			imgSource: './img/char.png',
			frameRate: 8,
			loop: true,
		},
		run: {
			imgSource: './img/player_run.png',
			frameRate: 8,
			loop: true,
		},
		runLeft: {
			imgSource: './img/player_run_left.png',
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