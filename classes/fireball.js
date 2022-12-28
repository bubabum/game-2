if (this.keyHandler.Space) {
   this.fireball = {
      position: {
         x: this.position.x + 20,
         y: this.position.y + 30,
      },
      width: 30,
      height: 30,
      particals: [],
   }
}
if (this.fireball) {
   this.fireball.position.x += 10;
   ctx.save();
   ctx.beginPath();
   ctx.filter = "blur(32px)";
   ctx.fillStyle = `rgba(255, 255, 0, 0.8)`;
   ctx.arc(this.fireball.position.x, this.fireball.position.y, 20, 0, 2 * Math.PI, false);
   ctx.fill();
   ctx.restore();
   for (let i = 0; i < 30; i++) {
      this.fireball.particals.push({
         x: this.fireball.position.x - Math.random() * 10,
         y: this.fireball.position.y - Math.random() * 10,
         r: Math.random() * 3,
         h: Math.random() * 20 + 40,
      })
   }
   this.fireball.particals.forEach((partical, index) => {
      ctx.save();
      ctx.beginPath();
      //ctx.filter = "blur(1px)";
      ctx.fillStyle = `hsl(${partical.h}, ${Math.random() * 5 + 95}%, ${Math.random() * 20 + 40}%)`;
      ctx.arc(partical.x, partical.y, partical.r, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.restore();
      partical.r -= 0.3;
      partical.h -= 10;
      if (partical.h < 0) partical.h = 0;
      if (partical.r < 0) this.fireball.particals.splice(index, 1)
   })
   if (this.fireball.position.x > 700) {
      this.fireball = null;
   }
}