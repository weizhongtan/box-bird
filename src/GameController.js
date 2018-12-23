import World from './World';

class GameController {
  constructor(context, width, height) {
    this.score = null;
    this.world = new World(context, width, height);
  }

  start() {
    this.score = 0;
    this.world.start();
  }
}

export default GameController;
