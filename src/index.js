import Noiser from "./app/canvas/noiser";
import Plasma from "./app/canvas/plasma";

function resizeCanvas(header, canvas) {
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
}

window.addEventListener('DOMContentLoaded', event => {
  const header = document.getElementById("header");
  const two = document.getElementById("two");
  const canvas = document.getElementById("header-canvas");
  resizeCanvas(header, canvas);
  window.addEventListener('resize', () => resizeCanvas(header, canvas));
  new Plasma(canvas);

  const footer = document.getElementById("footer");
  const canvasFooter = document.getElementById("header-canvas-foot");
  resizeCanvas(footer, canvasFooter);
  window.addEventListener('resize', () => resizeCanvas(footer, canvasFooter));
  new Plasma(canvasFooter);


  const noiser = document.getElementById("noiser");
  resizeCanvas(header, noiser);
  window.addEventListener('resize', () => resizeCanvas(two, noiser));
  new Noiser(noiser);
});


