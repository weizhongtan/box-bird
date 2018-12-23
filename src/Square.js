function Square(ctx, length, x, y) {
    this.c = ctx;
    this.length = length;
    this.x = x;
    this.y = y;
    this.xVel = 0;
    this.yVel = 0;
    this._hasGravity = false;
    this.calc = () => {
        if (this._hasGravity) {
            this.yVel += 0.25;
            this.y += this.yVel;
        }
    };
    this.draw = () => {
        this.c.fillRect(this.x, this.y, this.length, this.length);
    };
    this.addGravity = () => {
        this._hasGravity = true;
    };
}

export default Square;
