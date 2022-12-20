class KeyHandler {
	constructor() {
		this.init();
	}
	init() {
		window.addEventListener('keydown', (event) => {
			if (this[event.code]) return
			this[event.code] = true;
			this.debug();
		})
		window.addEventListener('keyup', (event) => {
			delete this[event.code]
			this.debug();
		})
	}
	debug() {
		console.log(this);
	}
}