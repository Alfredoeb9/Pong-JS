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

  get left() {
    return this.pos.x - this.size.x / 2;
  }

  get right() {
    return this.pos.x + this.size.x / 2;
  }

  get top() {
    return this.pos.y - this.size.y / 2;
  }

  get bottom() {
    return this.pos.y + this.size.y / 2;
  }
}

// inherit the properties form Rectangle
class Ball extends Rectangle {
  constructor() {
    super(10, 10);
    this.vel = new Vec();
  }
}

class Pong {
  constructor(canvas) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");

    this.ball = new Ball();
    this.ball.pos.x = 100;
    this.ball.pos.y = 50;

    this.ball.vel.x = 100;
    this.ball.vel.y = 100;

    let lastTime;

    const callback = (milliseconds) => {
      if (lastTime) {
        this.update((milliseconds - lastTime) / 1000);
      }

      lastTime = milliseconds;

      requestAnimationFrame(callback);
    };

    callback();
  }

  update(deltaTime) {
    this.ball.pos.x += this.ball.vel.x * deltaTime;
    this.ball.pos.y += this.ball.vel.y * deltaTime;

    // detect if ball touches any corners of screen
    if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
      // make the ball go the opposite way
      this.ball.vel.x = -this.ball.vel.x;
    }

    if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
      this.ball.vel.y = -this.ball.vel.y;
    }

    this._context.fillStyle = "#000";
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

    this._context.fillStyle = "#fff";
    this._context.fillRect(
      this.ball.pos.x,
      this.ball.pos.y,
      this.ball.size.x,
      this.ball.size.y
    );
  }
}

const canvas = document.getElementById("pong");
const pong = new Pong(canvas);
// requestAnimationFrame is a function that takes a callback and calls the callback for the next time
// the browser is ready to draw, we'll get a elapsed time since the page was loaded so we'll have to
// calculate how much time has elapsed since last requestAnimationFrame
