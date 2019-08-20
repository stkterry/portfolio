require("./app/js/main");

import Looper from "./app/canvas/looper.js";

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
});


