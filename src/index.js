import World from './World';

const WIDTH = 500;
const HEIGHT = 300;

const canvas = document.querySelector('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

const world = new World(ctx, WIDTH, HEIGHT);
world.init();
world.draw();
