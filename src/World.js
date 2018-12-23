import Square from './Square';
import Rectangle from './Rectangle';
import { isColliding } from './utils';

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

  getNewBlock() {
    const block = new Rectangle(this.ctx, 20, this.height / 2, this.width, this.height / 2);
    block.xVel = -2;
    return block;
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
    this.blocks.push(this.getNewBlock());

    window.onkeypress = (e) => {
      if (e.keyCode === 32) {
        console.log('space pressed');
        this.bird.yVel = -5;
      }
    };
  }

  draw() {
    this.frame++;
    this.clear();
    this.bird.calc();
    this.blocks.forEach(block => block.calc());
    if (this.bird.y + this.bird.yVel + (this.bird.height / 2) > this.height) {
      this.bird.yVel = -this.bird.yVel;
    }
    if (this.bird.y < 0) {
      this.bird.y = 0;
    }
    const gameOver = this.blocks.some(block => isColliding(this.bird, block));
    if (gameOver) {
      this.init();
      this.draw();
      return;
    }
    if (this.frame % 100 === 0) {
      console.log('generating new block');
      const block = this.getNewBlock();
      this.blocks.push(block);
    }
    this.bird.draw();
    this.blocks.forEach(t => t.draw());
    this.currentRequestId = window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default World;
