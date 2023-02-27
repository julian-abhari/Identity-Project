var video;
var vScale = 16;
var particles = [];
var cameraDisplayWidth;
var cameraDisplayHeight;
var mouseForce;

function setup() {
  pixelDensity(displayDensity());
  createCanvas(1280, 450);
  background(255);
  cameraDisplayWidth = 640;
  cameraDisplayHeight = 450;
  video = createCapture(VIDEO);
  video.size(cameraDisplayWidth / vScale, cameraDisplayHeight / vScale);
  noStroke();
  fill(127);
  rect(0, 0, cameraDisplayWidth, cameraDisplayHeight);
  for (var i = 0; i < 50; i += 1) {
    particles[i] = new Particle();
  }
}

function draw() {
  video.loadPixels();
  for (var i = 0; i < particles.length; i += 1) {
    particles[i].show();
    particles[i].update();
  }

  fill(255);
  rect(cameraDisplayWidth, 0, cameraDisplayWidth, cameraDisplayHeight);
  // Getting force from mouse
  translate(cameraDisplayWidth + cameraDisplayWidth / 2, cameraDisplayHeight / 2);
  var mouseLocation = createVector(mouseX, mouseY);
  var centerLocation = createVector(cameraDisplayWidth + cameraDisplayWidth / 2, cameraDisplayHeight / 2);
  mouseForce = mouseLocation.sub(centerLocation);
  mouseForce.x = constrain(mouseForce.x, - cameraDisplayWidth / 2, cameraDisplayWidth / 2);
  mouseForce.y = constrain(mouseForce.y, - cameraDisplayHeight / 2, cameraDisplayHeight / 2);
  // Displaying mouse force
  fill(0);
  stroke(10);
  line(0, 0, mouseForce.x, mouseForce.y);
  ellipse(0, 0, 4, 4);
}

function mousePressed() {
  for (var i = 0; i < particles.length; i += 1) {
    mouseForce.limit(5);
    console.log(mouseForce);
    particles[i].applyForce(mouseForce);
  }
}
