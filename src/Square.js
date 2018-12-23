import Shape from './Shape';

class Square extends Shape {
  constructor(ctx, length, x, y) {
    super(ctx, x, y);
    this.width = length;
    this.height = length;
  }
}

export default Square;
