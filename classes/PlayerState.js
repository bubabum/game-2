const states = {
	IDLE: 0,
	RUNNING: 1,
	JUMPING: 2,
	FALLING: 3,
	LANDING: 4,
}
const JUMPING_VELOCITY = -6.3;
const X_VELOCITY = 2.5;

class State {
	constructor(state, player) {
		this.state = state;
		this.player = player;
	}
	setOrientation(input) {
		if (input.ArrowRight && !input.ArrowLeft) this.player.isLeftOriented = false;
		if (!input.ArrowRight && input.ArrowLeft) this.player.isLeftOriented = true;
	}
}

class Idle extends State {
	constructor(player) {
		super('IDLE', player);
	}
	enter() {
		this.player.switchAnimation('idle');
		this.player.velocity.x = 0;
	}
	handleInput(input) {
		if (input.ArrowRight || input.ArrowLeft) this.player.setState(states.RUNNING);
		if (input.ArrowUp) {
			this.player.velocity.y = JUMPING_VELOCITY;
			this.player.setState(states.JUMPING)
		};
		if (this.player.velocity.y > 0) this.player.setState(states.FALLING);
	}
}

class Running extends State {
	constructor(player) {
		super('RUNNING', player);
	}
	enter() {
		this.player.switchAnimation('run');
	}
	handleInput(input) {
		if (!input.ArrowRight && !input.ArrowLeft) this.player.setState(states.IDLE);
		if (input.ArrowRight || input.ArrowLeft) this.player.velocity.x = (this.player.isLeftOriented ? -1 : 1) * X_VELOCITY;
		if (input.ArrowUp) {
			this.player.velocity.y = JUMPING_VELOCITY;
			this.player.setState(states.JUMPING)
		};
		if (this.player.velocity.y > 0) this.player.setState(states.FALLING);
	}
}

class Jumping extends State {
	constructor(player) {
		super('JUMPING', player);
	}
	enter() {
		this.player.switchAnimation('jump');
	}
	handleInput(input) {
		this.player.velocity.x = 0;
		if (input.ArrowRight || input.ArrowLeft) this.player.velocity.x = (this.player.isLeftOriented ? -1 : 1) * X_VELOCITY;
		if (this.player.velocity.y >= 0) this.player.setState(states.FALLING);
	}
}

class Falling extends State {
	constructor(player) {
		super('FALLING', player);
	}
	enter() {
		this.player.switchAnimation('falling');
	}
	handleInput(input) {
		if (this.player.velocity.y === 0) this.player.setState(states.LANDING);
		this.player.velocity.x = 0;
		if (input.ArrowRight || input.ArrowLeft) this.player.velocity.x = (this.player.isLeftOriented ? -1 : 1) * X_VELOCITY;
	}
}

class Landing extends State {
	constructor(player) {
		super('LANDING', player);
	}
	enter() {
		this.player.switchAnimation('landing');
		setTimeout(() => this.player.setState(states.IDLE), 50);
	}
	handleInput(input) {
	}
}