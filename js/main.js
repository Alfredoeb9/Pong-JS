class Vec {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(w, h) {
    this.pos = new Vec();
    this.size = new Vec(w, h);
  }
}

// inherit the properties form Rectangle
class Ball extends Rectangle {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const ball = new Ball();
ball.pos.x = 100;
ball.pos.y = 50;

ball.vel.x = 100;
ball.vel.y = 100;

// requestAnimationFrame is a function that takes a callback and calls the callback for the next time
// the browser is ready to draw, we'll get a elapsed time since the page was loaded so we'll have to
// calculate how much time has elapsed since last requestAnimationFrame

let lastTime;

function callback(milliseconds) {
  if (lastTime) {
    update((milliseconds - lastTime) / 1000);
  }

  lastTime = milliseconds;

  requestAnimationFrame(callback);
}

function update(deltaTime) {
  ball.pos.x += ball.vel.x * deltaTime;
  ball.pos.y += ball.vel.y * deltaTime;

  // detect if ball touches any corners of screen
  if (ball.pos.x < 0 || ball.pos.x > canvas.width) {
    ball.vel.x = -ball.vel.x;
  }

  if (ball.pos.y < 0 || ball.pos.y > canvas.height) {
    ball.vel.y = -ball.vel.y;
  }

  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#fff";
  context.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
}

callback();
