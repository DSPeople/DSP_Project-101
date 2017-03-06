/* exported ctx, canvas, initCanvas */
var ctx, canvas;

function initCanvas(resolution) {
  // Create the canvas
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = resolution.width;
  canvas.height = resolution.height;
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
}
