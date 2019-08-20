import oSimplex from "../noise/open_simplex";

const CONFIG = () => ({
  nRows: 50,
  scale: 1 / 20,
  
  noise: (() => {
    const oplex = new oSimplex();
    oplex.seed();
    return oplex.noise3D.bind(oplex);
  })(),

  zOffset: 0,
  zIncrement: 0.002


})

class Noiser {
  constructor(canvas, config) {
    Object.assign(this, config || CONFIG())
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.frame = this.frame.bind(this);
    this.frame();
  }

  nextFrame() {
    requestAnimationFrame(this.frame);
  }

  frame() {
    this.clearScreen();
    this.drawNoise();
    this.nextFrame();
  }

  drawCircle(x, y) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawNoise() {
    let ww = Math.floor(this.canvas.height / this.nRows);
    let nCols = Math.floor(this.canvas.width / ww);
    let amt;
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < nCols+2; j++) {
        amt = Noiser.map(
          this.noise(i * this.scale, j * this.scale, this.zOffset),
          -1, 1, 0, 0.5
        )
        this.ctx.fillStyle = `rgb(${200 * amt}, ${255 * amt}, ${255 * amt})`;
        this.ctx.fillRect(j * ww, i * ww, ww, ww);
      }
    }
    this.zOffset += this.zIncrement;
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static map(val, oMin, oMax, nMin, nMax) {
    return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin
  }
}

export default Noiser;