const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

let keyHandler = new KeyHandler();
let cube = new GameObject({ x: 200, y: 200 });

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	cube.draw();
	requestAnimationFrame(animation);
}

animation();