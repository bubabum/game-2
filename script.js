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
	imgSource: './img/player_idle.png',
	isAnimated: true,
	frameRate: 4,
	frameBuffer: 7,
	scale: 1,
	animations: {
		idle: {
			imgSource: './img/player_idle.png',
			frameRate: 4,
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
		jump: {
			imgSource: './img/player_jump.png',
			frameRate: 4,
			loop: false,
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