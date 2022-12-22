const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//let keyHandler = new KeyHandler();
let background = new Sprite({ position: { x: 0, y: 0 }, imgSource: './img/background.png' });
let gameObject = new GameObject({
	position: {
		x: 50,
		y: 50,
	},
	imgSource: './img/knight.png',
	animated: true,
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
		}
	}
});
console.log(gameObject);

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	background.draw();
	gameObject.update();
	gameObject.debug();
	requestAnimationFrame(animation);
}

animation();