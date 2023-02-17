let level = new Level({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/map.png',
	collisionsMap: collisionsLevel1,
	platformsMap: platformsLevel1,
	tile: 64,
});
let player = new Player({
	position: {
		x: 150,
		y: 0,
	},
	imgSource: './img/player_idle.png',
	isAnimated: true,
	frameRate: 26,
	frameBuffer: 4,
	scale: 1,
	animations: {
		idle: {
			imgSource: './img/player_idle.png',
			frameRate: 26,
			frameBuffer: 4,
			loop: true,
		},
		idleLeft: {
			imgSource: './img/player_idle_left.png',
			frameRate: 26,
			frameBuffer: 4,
			loop: true,
		},
		run: {
			imgSource: './img/player_run.png',
			frameRate: 14,
			frameBuffer: 3,
			loop: true,
		},
		runLeft: {
			imgSource: './img/player_run_left.png',
			frameRate: 14,
			frameBuffer: 4,
			loop: true,
		},
		jump: {
			imgSource: './img/player_jump.png',
			frameRate: 4,
			frameBuffer: 7,
			loop: false,
		},
		jumpLeft: {
			imgSource: './img/player_jump_left.png',
			frameRate: 4,
			frameBuffer: 7,
			loop: false,
		},
		falling: {
			imgSource: './img/player_falling.png',
			frameRate: 2,
			frameBuffer: 7,
			loop: false,
		},
		fallingLeft: {
			imgSource: './img/player_falling_left.png',
			frameRate: 2,
			frameBuffer: 7,
			loop: false,
		},
		landing: {
			imgSource: './img/player_landing.png',
			frameRate: 3,
			frameBuffer: 1,
			loop: false,
		},
		landingLeft: {
			imgSource: './img/player_landing_left.png',
			frameRate: 3,
			frameBuffer: 1,
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