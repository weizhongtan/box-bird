import Square from './Square';
import Rectangle from './Rectangle';
import { isColliding, random } from './utils';

class World {
  constructor(context, width, height) {
    this.ctx = context;
    this.width = width;
    this.height = height;
    this.currentRequestId = null;
    this.frame = null;
    this.bird = null;
    this.blocks = null;
  }

  generateRandomOpening() {
    const height = random(this.height / 3, (this.height / 3) * 2);
    const width = 30;
    const gap = random(100, 150);

    const topBlock = new Rectangle(this.ctx, width, height - (gap / 2), this.width);
    topBlock.xVel = -2;
    const bottomBlock = new Rectangle(this.ctx, width, this.height, this.width, height + (gap / 2));
    bottomBlock.xVel = -2;
    return [topBlock, bottomBlock];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  init() {
    window.cancelAnimationFrame(this.currentRequestId);
    this.frame = 0;
    this.bird = new Square(this.ctx, 20, this.width / 10, this.height / 2);
    this.bird.addGravity();
    this.blocks = [];
    this.blocks.push(...this.generateRandomOpening());

    window.onkeypress = (e) => {
      if (e.keyCode === 32) {
        this.bird.yVel = -5;
      }
    };
  }

  draw() {
    this.frame++;
    this.clear();
    this.bird.calc();
    this.blocks.forEach(block => block.calc());

    // lower boundary
    if (this.bird.y + this.bird.yVel + this.bird.height > this.height) {
      this.bird.yVel = 0;
      this.bird.y = this.height - this.bird.height;
    }

    // upper boundary
    if (this.bird.y < 0) {
      this.bird.y = 0;
    }

    // collisions
    const gameOver = this.blocks.some(block => isColliding(this.bird, block));
    if (gameOver) {
      this.init();
      this.draw();
      return;
    }

    // generate new openings
    if (this.frame % 100 === 0) {
      console.log('generating new block');
      this.blocks.push(...this.generateRandomOpening());
    }

    this.bird.draw();
    this.blocks.forEach(t => t.draw());
    this.currentRequestId = window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default World;
