import Rectangle from './Rectangle';

class Opening {
  constructor(context, {
    width, height, gapSize, gapHeight, x,
  }) {
    this.c = context;
    this.x = x;

    this.topBlock = new Rectangle(this.c, {
      width,
      height: gapHeight - (gapSize / 2),
      x: this.x,
      y: 0,
    });
    this.topBlock.xVel = -2;
    this.bottomBlock = new Rectangle(this.c, {
      width,
      height,
      x: this.x,
      y: gapHeight + (gapSize / 2),
    });
    this.bottomBlock.xVel = -2;
  }

  calc() {
    this.getTop().calc();
    this.getBottom().calc();
  }

  draw() {
    this.getTop().draw();
    this.getBottom().draw();
  }

  getTop() {
    return this.topBlock;
  }

  getBottom() {
    return this.bottomBlock;
  }
}

export default Opening;
