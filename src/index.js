import Looper from "./app/canvas/looper.js";
import Undulate from "./app/canvas/undulate.js";

function resizeCanvas(header, canvas) {
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
}

window.addEventListener('DOMContentLoaded', event => {
  const header = document.getElementById("header");
  const canvas = document.getElementById("header-canvas");
  resizeCanvas(header, canvas);
  window.addEventListener('resize', () => resizeCanvas(header, canvas));
  new Looper(canvas);

  const footer = document.getElementById("footer");
  const canvasFooter = document.getElementById("header-canvas-foot");
  resizeCanvas(footer, canvasFooter);
  window.addEventListener('resize', () => resizeCanvas(footer, canvasFooter));
  new Looper(canvasFooter);

  const noiser = document.getElementById("noiser");
  resizeCanvas(header, noiser);
  window.addEventListener('resize', () => resizeCanvas(header, noiser));
  new Undulate(noiser);
});


