class Particle {

  constructor() {
    this.location = createVector(random(cameraDisplayWidth), random(cameraDisplayHeight));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.radius = random(12);
  }

  update() {
    this.bounce();
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.location.add(this.velocity);
  }

  show() {
    noStroke();
    var pixelX = floor(this.location.x / vScale);
    var pixelY = floor(this.location.y / vScale);
    var videoColor = video.get(pixelX, pixelY);

    fill(videoColor[0], videoColor[1], videoColor[2], 100);
    ellipse(this.location.x, this.location.y, this.radius*2, this.radius*2);
  }

  bounce() {
   if (this.location.x + this.radius > cameraDisplayWidth) {
     this.location.x = cameraDisplayWidth - this.radius;
     this.velocity.x *= -1;
   }

   if (this.location.x - this.radius < 0) {
     this.location.x = this.radius;
     this.velocity.x *= -1;
   }

   if (this.location.y + this.radius > cameraDisplayHeight) {
     this.location.y = cameraDisplayHeight - this.radius;
     this.velocity.y *= -1;
   }

   if (this.location.y - this.radius < 0) {
     this.location.y = this.radius;
     this.velocity.y *= -1;
   }
 }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }
}
