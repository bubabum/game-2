const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

keyHandler = new KeyHandler();

function animation() {
	requestAnimationFrame(animation);
}

//animation();