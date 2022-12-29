const states = {
	IDLE: 0,
	IDLE_LEFT: 1,
	RUNNING: 2,
	RUNNING_LEFT: 3,
	JUMPING: 4,
	JUMPING_LEFT: 5,
	FALLING: 6,
	FALLING_LEFT: 7,
}

class State {
	constructor(state) {
		this.state = state;
	}
}

class Idle extends State {
	constructor(player) {
		super('IDLE');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('idle');
		this.player.velocity.x = 0;
	}
	handleInput(input) {
		if (input.ArrowRight) this.player.setState(states.RUNNING);
		if (input.ArrowLeft) this.player.setState(states.RUNNING_LEFT);
		if (input.ArrowUp) this.player.setState(states.JUMPING);
	}
}

class IdleLeft extends State {
	constructor(player) {
		super('IDLE_LEFT');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('idleLeft');
		this.player.velocity.x = 0;
	}
	handleInput(input) {
		if (input.ArrowRight) this.player.setState(states.RUNNING);
		if (input.ArrowLeft) this.player.setState(states.RUNNING_LEFT);
		if (input.ArrowUp) this.player.setState(states.JUMPING_LEFT);
	}
}

class Running extends State {
	constructor(player) {
		super('RUNNING');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('run');
		this.player.velocity.x = 2;
	}
	handleInput(input) {
		if (!input.ArrowRight) {
			this.player.setState(states.IDLE);
		}
	}
}

class RunningLeft extends State {
	constructor(player) {
		super('RUNNING_LEFT');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('runLeft');
		this.player.velocity.x = -2;
	}
	handleInput(input) {
		if (!input.ArrowLeft) {
			this.player.setState(states.IDLE_LEFT);
		}
	}
}

class Jumping extends State {
	constructor(player) {
		super('JUMPING');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('jump');
		this.player.velocity.y = -7;
	}
	handleInput(input) {
		if (this.player.velocity.y >= 0) this.player.setState(states.FALLING);
	}
}

class JumpingLeft extends State {
	constructor(player) {
		super('JUMPING_LEFT');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('jumpLeft');
		this.player.velocity.y = -7;
	}
	handleInput(input) {
		if (this.player.velocity.y >= 0) this.player.setState(states.FALLING_LEFT);
	}
}

class Falling extends State {
	constructor(player) {
		super('FALLING');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('falling');
	}
	handleInput(input) {
		if (this.player.velocity.y === 0) this.player.setState(states.IDLE);
	}
}

class FallingLeft extends State {
	constructor(player) {
		super('FALLING_LEFT');
		this.player = player;
	}
	enter() {
		this.player.switchAnimation('fallingLeft');
	}
	handleInput(input) {

	}
}