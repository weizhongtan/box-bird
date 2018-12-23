import Shape from './Shape';

class Rectangle extends Shape {
  constructor(ctx, width, height, initialX, initialY) {
    super(ctx, initialX, initialY);
    this.width = width;
    this.height = height;
  }
}

export default Rectangle;
