import Square from './Square';
import Rectangle from './Rectangle';
import { isColliding } from './utils';

const WIDTH = 500;
const HEIGHT = 300;

const canvas = document.querySelector('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');
let bird;
let block;
let things;

const init = () => {
    things = [];
    bird = new Square(ctx, 20, WIDTH / 10, HEIGHT / 2);
    bird.addGravity();
    things.push(bird);
    block = new Rectangle(ctx, 20, HEIGHT / 2, WIDTH, HEIGHT / 2);
    things.push(block);
    block.xVel = -2;
}

const draw = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    things.forEach((t) => t.calc());
    if (bird.y + bird.yVel + (bird.height / 2) > HEIGHT) {
        bird.yVel = -bird.yVel;
    }
    if (bird.y < 0) {
        bird.y = 0;
    }
    if (isColliding(bird, block)) {
        init();
    }
    things.forEach((t) => t.draw());
    window.requestAnimationFrame(draw);
}

window.onkeypress = (e) => {
    if (e.keyCode === 32) {
        console.log('space pressed')
        bird.yVel = -5;
    }
}

init();
draw();
