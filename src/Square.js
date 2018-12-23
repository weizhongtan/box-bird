import Shape from './Shape';

class Square extends Shape {
    constructor(ctx, length, x, y) {
        super(ctx, x, y);
        this.length = length;
    }
    draw = () => {
        this.c.fillRect(this.x, this.y, this.length, this.length);
    };
}

export default Square;
