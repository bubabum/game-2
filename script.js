const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const TILE = 16;

canvas.width = 1024;
canvas.height = 576;

let level = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/map.png',
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
	collisions: {},
});

let game = new Game({ player, level, canvas })

// const camera = {
// 	position: {
// 		x: 0,
// 		y: 0,
// 	},
// }

console.log(game);

game.animation();