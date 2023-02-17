const states = {
	IDLE: 0,
	IDLE_LEFT: 1,
	RUNNING: 2,
	RUNNING_LEFT: 3,
	JUMPING: 4,
	JUMPING_LEFT: 5,
	FALLING: 6,
	FALLING_LEFT: 7,
	LANDING: 8,
	LANDING_LEFT: 9,
}
const VELOCITY_Y = -10;

class State {
	constructor(state, player) {
		this.state = state;
		this.player = player;
	}
}

class Idle extends State {
	constructor(player) {
		super('IDLE', player);
	}
	enter() {
		this.player.switchAnimation('idle');
		this.player.velocity.x = 0;
		this.player.hitbox.offset.x = 15;
	}
	handleInput(input) {
		if (input.ArrowRight) this.player.setState(states.RUNNING);
		if (input.ArrowLeft) this.player.setState(states.RUNNING_LEFT);
		if (input.ArrowUp) {
			this.player.velocity.y = VELOCITY_Y;
			this.player.setState(states.JUMPING)
		};
	}
}

class IdleLeft extends State {
	constructor(player) {
		super('IDLE_LEFT', player);
	}
	enter() {
		this.player.switchAnimation('idleLeft');
		this.player.velocity.x = 0;
		this.player.hitbox.offset.x = 7;
	}
	handleInput(input) {
		if (input.ArrowRight) this.player.setState(states.RUNNING);
		if (input.ArrowLeft) this.player.setState(states.RUNNING_LEFT);
		if (input.ArrowUp) {
			this.player.velocity.y = VELOCITY_Y;
			this.player.setState(states.JUMPING_LEFT)
		};
	}
}

class Running extends State {
	constructor(player) {
		super('RUNNING', player);
	}
	enter() {
		this.player.switchAnimation('run');
		this.player.velocity.x = 2;
		this.player.hitbox.offset.x = 15;
	}
	handleInput(input) {
		if (!input.ArrowRight) {
			this.player.setState(states.IDLE);
		}
		if (input.ArrowUp) {
			this.player.velocity.y = VELOCITY_Y;
			this.player.setState(states.JUMPING)
		};
	}
}

class RunningLeft extends State {
	constructor(player) {
		super('RUNNING_LEFT', player);
	}
	enter() {
		this.player.switchAnimation('runLeft');
		this.player.velocity.x = -2;
		this.player.hitbox.offset.x = 7;
	}
	handleInput(input) {
		if (!input.ArrowLeft) {
			this.player.setState(states.IDLE_LEFT);
		}
		if (input.ArrowUp) {
			this.player.velocity.y = VELOCITY_Y;
			this.player.setState(states.JUMPING_LEFT)
		};
	}
}

class Jumping extends State {
	constructor(player) {
		super('JUMPING', player);
	}
	enter() {
		this.player.switchAnimation('jump');
		this.player.hitbox.offset.x = 15;
	}
	handleInput(input) {
		if (this.player.velocity.y >= 0) this.player.setState(states.FALLING);
		if (input.ArrowRight) this.player.velocity.x = 2;
		if (input.ArrowLeft) this.player.setState(states.JUMPING_LEFT);
	}
}

class JumpingLeft extends State {
	constructor(player) {
		super('JUMPING_LEFT', player);
	}
	enter() {
		this.player.switchAnimation('jumpLeft');
		this.player.hitbox.offset.x = 7;
	}
	handleInput(input) {
		if (this.player.velocity.y >= 0) this.player.setState(states.FALLING_LEFT);
		if (input.ArrowRight) this.player.setState(states.JUMPING);
		if (input.ArrowLeft) this.player.velocity.x = -2;
	}
}

class Falling extends State {
	constructor(player) {
		super('FALLING', player);
	}
	enter() {
		this.player.switchAnimation('falling');
		this.player.hitbox.offset.x = 15;
	}
	handleInput(input) {
		if (this.player.velocity.y === 0) this.player.setState(states.LANDING);
		if (input.ArrowRight) this.player.velocity.x = 2;
		if (input.ArrowLeft) this.player.setState(states.FALLING_LEFT);
	}
}

class FallingLeft extends State {
	constructor(player) {
		super('FALLING_LEFT', player);
	}
	enter() {
		this.player.switchAnimation('fallingLeft');
		this.player.hitbox.offset.x = 7;
	}
	handleInput(input) {
		if (this.player.velocity.y === 0) this.player.setState(states.LANDING_LEFT);
		if (input.ArrowRight) this.player.setState(states.FALLING);
		if (input.ArrowLeft) this.player.velocity.x = -2;
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

class LandingLeft extends State {
	constructor(player) {
		super('LANDING_LEFT', player);
	}
	enter() {
		this.player.switchAnimation('landingLeft');
		setTimeout(() => this.player.setState(states.IDLE_LEFT), 50);
	}
	handleInput(input) {
	}
}