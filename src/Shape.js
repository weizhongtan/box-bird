class Shape {
  constructor(ctx, { x = 0, y = 0 }) {
    this.c = ctx;
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this.yAcc = 0.25;
    this._hasGravity = false;
  }

  calc() {
    if (this._hasGravity) {
      this.yVel += this.yAcc;
    }
    this.y += this.yVel;
    this.x += this.xVel;
  }

  draw() {
    this.c.fillRect(this.x, this.y, this.width, this.height);
  }

  addGravity() {
    this._hasGravity = true;
  }
}

export default Shape;
