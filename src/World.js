import Square from './Square';
import Rectangle from './Rectangle';
import { isColliding, isRightOf, random } from './utils';

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

  start() {
    this.init();
    this.draw();
    window.onkeypress = (e) => {
      if (e.keyCode === 32) {
        this.bird.yVel = -5;
      }
    };
  }

  generateRandomOpening() {
    const height = random(this.height / 3, (this.height / 3) * 2);
    const width = 30;
    const gap = random(125, 150);

    const topBlock = new Rectangle(this.ctx, {
      width,
      height: height - (gap / 2),
      x: this.width,
    });
    topBlock.xVel = -2;
    const bottomBlock = new Rectangle(this.ctx, {
      width,
      height: this.height,
      x: this.width,
      y: height + (gap / 2),
    });
    bottomBlock.xVel = -2;
    return [topBlock, bottomBlock];
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  init() {
    window.cancelAnimationFrame(this.currentRequestId);
    this.frame = 0;
    this.bird = new Square(this.ctx, { length: 20, x: this.width / 10, y: this.height / 2 });
    this.bird.addGravity();
    this.blocks = [];
    this.blocks.push(...this.generateRandomOpening());
    this.score = 0;
  }

  calc() {
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

    // generate new openings
    if (this.frame % 100 === 0) {
      console.log('generating new block');
      this.blocks.push(...this.generateRandomOpening());
    }
  }

  draw() {
    this.frame++;
    this.clear();
    this.calc();

    // collisions
    const gameOver = this.blocks.some(block => isColliding(this.bird, block));
    if (gameOver) {
      this.init();
      this.draw();
      return;
    }

    // increment score
    const numLeft = this.blocks.reduce((sum, block) => {
      if (isRightOf(this.bird, block)) {
        return sum + 1;
      }
      return sum;
    }, 0);

    // half because 2 blocks per opening
    this.score = numLeft / 2;
    this.ctx.font = '50px sans-serif';
    this.ctx.fillText(this.score, 10, 50);

    this.bird.draw();
    this.blocks.forEach(t => t.draw());
    this.currentRequestId = window.requestAnimationFrame(this.draw.bind(this));
  }
}

export default World;
