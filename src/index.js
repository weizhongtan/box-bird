import GameController from './GameController';

const WIDTH = 500;
const HEIGHT = 300;

const canvas = document.querySelector('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

const game = new GameController(ctx, WIDTH, HEIGHT);
game.start();
