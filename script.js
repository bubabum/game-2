const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024; // 16*64
canvas.height = 576; // 9*64

const collisionsLevel1 = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292,
	292, 292, 292, 0, 0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 292,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0, 0, 292, 292, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 292, 0, 0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292,
	292, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]

let colisionMap = [];
for (let i = 0; i < collisionsLevel1.length; i += 16) {
	colisionMap.push(collisionsLevel1.slice(i, i + 16));
}

console.log(colisionMap)
let background = new Sprite({
	position: {
		x: 0,
		y: 0,
	},
	scale: 1,
	imgSource: './img/background.png',
});
let player = new Player({
	position: {
		x: 200,
		y: 200,
	},
	imgSource: './img/knight.png',
	isAnimated: true,
	frameRate: 15,
	scale: 2,
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
	}
});

function animation() {
	ctx.imageSmoothingEnabled = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	background.draw();
	player.update();
	//player.debug();
	colisionMap.forEach((row, y) => {
		row.forEach((block, x) => {
			if (block > 0) {
				ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
				ctx.fillRect(x * 64, y * 64, 64, 64);
			}
		})
	})
	requestAnimationFrame(animation);
}

animation();