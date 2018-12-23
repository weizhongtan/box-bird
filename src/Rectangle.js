import Shape from './Shape';

class Rectangle extends Shape {
    constructor(ctx, width, height, x, y) {
        super(ctx, x, y);
        this.width = width;
        this.height = height;
    }
    draw = () => {
        this.c.fillRect(this.x, this.y, this.width, this.height);
    };
}

export default Rectangle;
