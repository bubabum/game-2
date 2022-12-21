const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let keyHandler = new KeyHandler();
let options = { frameWidth: 64, frameHeight: 64, frameMap: {}, imgSource: './img/knight.png', static: false }
let knight = new Sprite({ frameWidth: 144, frameHeight: 64, frameMap: {}, imgSource: './img/knight2.png', static: false });
console.log(knight);

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	knight.draw();
	requestAnimationFrame(animation);
}

animation();