import Player from './Player';
import Opening from './Opening';
import { isColliding, isRightOf, random } from './utils';

class World {
  constructor(context, width, height) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.currentRequestId = null;
    this.frame = null;
    this.player = null;
    this.openings = null;
    this.justPassedOpening = false;
  }

  start() {
    this.init();
    this.tick();
    window.onkeypress = (e) => {
      if (e.keyCode === 32) {
        this.player.getBody().yVel = -5;
      }
    };
  }

  stop() {
    window.cancelAnimationFrame(this.currentRequestId);
  }

  generateRandomOpening() {
    const opening = new Opening(this.ctx, {
      width: 30,
      height: this.height,
      gapSize: random(125, 150),
      gapHeight: random(this.height / 3, (this.height / 3) * 2),
      x: this.width,
    });
    return opening;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  init() {
    window.cancelAnimationFrame(this.currentRequestId);
    this.frame = 0;
    this.player = new Player(this.ctx, { x: this.width / 10, y: this.height / 2 });
    this.openings = [];
    this.openings.push(this.generateRandomOpening());
    this.score = 0;
  }

  calc() {
    this.player.calc();
    this.openings.forEach(o => o.calc());

    // lower boundary
    if (this.player.getBody().y + this.player.getBody().yVel + this.player.getBody().height > this.height) {
      this.player.getBody().yVel = 0;
      this.player.getBody().y = this.height - this.player.getBody().height;
    }

    // upper boundary
    if (this.player.getBody().y < 0) {
      this.player.getBody().y = 0;
    }

    // generate new openings
    if (this.frame % 100 === 0) {
      console.log('generating new block');
      this.openings.push(this.generateRandomOpening());
    }
  }

  tick() {
    this.frame++;
    this.clear();
    this.calc();

    // increment score if past bird
    const leftMostBlock = this.openings[0].getTop();
    if (isRightOf(this.player.getBody(), leftMostBlock) && !this.justPassedOpening) {
      this.score++;
      this.justPassedOpening = true;
    }

    // remove the opening if it's off screen
    if (isRightOf({ x: 0, width: 0 }, leftMostBlock)) {
      this.justPassedOpening = false;
      this.openings.shift();
    }

    this.ctx.font = '50px sans-serif';
    this.ctx.fillText(this.score, 10, 50);

    this.player.draw();
    this.openings.forEach(o => o.draw());

    // collisions
    const gameOver = this.openings.some((opening) => {
      const topBlock = opening.getTop();
      const bottomBlock = opening.getBottom();
      return isColliding(this.player.getBody(), topBlock) || isColliding(this.player.getBody(), bottomBlock);
    });
    if (gameOver) {
      this.player.kill();
      return;
    }

    this.currentRequestId = window.requestAnimationFrame(this.tick.bind(this));
  }
}

export default World;
