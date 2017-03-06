/* exported createCanvas */

function createCanvas(width, height) {
  // Create the canvas
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  document.body.getElementsByClassName("canvasContainer")[0].appendChild(canvas);

  return canvas;
}
