import Square from './Square';

class Player {
  constructor(context, { x, y }) {
    this._body = new Square(context, {
      length: 20, x, y,
    });
    this._body.addGravity();
  }

  getBody() {
    return this._body;
  }

  calc() {
    this._body.calc();
  }

  draw() {
    this._body.draw();
  }
}

export default Player;
