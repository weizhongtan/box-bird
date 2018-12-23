import Square from './Square';
import Rectangle from './Rectangle';

const WIDTH = 500;
const HEIGHT = 300;

const canvas = document.querySelector('canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d');

const bird = new Square(ctx, 20, WIDTH / 10, HEIGHT / 2);
const block = new Rectangle(ctx, )
bird.addGravity();

const draw = () => {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    bird.calc();
    if (bird.y + bird.yVel + (bird.length / 2) > HEIGHT) {
        bird.yVel = -bird.yVel;
    }
    if (bird.y < 0) {
        bird.y = 0;
    }
    bird.draw();
    window.requestAnimationFrame(draw);
}

window.onkeypress = (e) => {
    if (e.keyCode === 32) {
        console.log('space pressed')
        bird.yVel = -5;
    }
}

draw();
