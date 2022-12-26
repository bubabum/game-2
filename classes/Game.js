class Game {
   constructor({ player, level, canvas }) {
      this.player = player;
      this.level = level;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
   }
   update() {
      this.player.update();
   }
   animation() {
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.ctx.save();
      //this.ctx.scale(2, 2);
      //this.ctx.translate(camera.position.x, camera.position.y);
      //this.level.draw();
      this.player.update(this.ctx);
      // player.collisions.forEach((block) => {
      // 	ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      // 	ctx.fillRect(block.position.x, block.position.y, block.width, block.height)
      // })
      //this.player.debug();
      // this.ctx.restore();
      requestAnimationFrame(() => this.animation());
   }
}