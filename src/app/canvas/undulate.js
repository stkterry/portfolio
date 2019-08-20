import oSimplex from "../noise/open_simplex";
import cPerlin from "../noise/cperlin";

let oplex = new oSimplex();
oplex.seed();
const noise = oplex.noise3D.bind(oplex);


let cper = new cPerlin();

cper.noiseDetail(4, 0.5);

const TWO_PI = Math.PI * 2;
const da = 0.01;
let noiseMax = 20;
let phase = 0;
let dp = 0.001;

let xoff = 0;
let yoff = 0;
let zoff = 0;
let inc = 0.01;
let xinc = 0.0025;
let zinc = 0.005;

const curDetail = 1;
const displacement = 60;

export default class Undulate {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.frame();
  }

  nextFrame() {
    requestAnimationFrame(this.frame.bind(this));
  }

  frame() {
    this.clearScreen();
    this.drawU();
    this.nextFrame();
  }

  drawCircle(x, y) {
    this.ctx.beginPath()
    // this.ctx.strokeStyle = 'black';
    // this.ctx.fillStyle = "black"
    // this.ctx.shadowColor = "rgba(200, 0, 50, 1)"
    // this.ctx.shadowBlur = 10 + 25 * cper.noise(c.xoff);
    this.ctx.lineWidth = 1;
    this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawU() {
    let nRows = 50;
    let nCols = Math.floor(this.canvas.width/this.canvas.height) * nRows;
    // let nCols = 40;
    
    let w = this.canvas.width / nCols;
    let h = this.canvas.height / nRows;
    // debugger;
    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols; j++) {
        // console.log(noise(w * i, j * j, zoff));
        let amt = map(noise(i/20, j/20, zoff), -1, 1, 0, 1)
        this.ctx.fillStyle = `rgb(${200 * amt}, ${255 * amt}, ${255 * amt})`
        // this.ctx.fillStyle = "green";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillRect(Math.floor(j * w), Math.floor(i * h), Math.ceil(w), Math.ceil(h));
      }
    }
    // this.ctx.filter = "blur(4px)"
    zoff += zinc;
  }




  clearScreen() {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillStyle = "rgb(20, 26, 34)"
    // this.ctx.fillStyle = "white"
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

};

function map(val, oMin, oMax, nMin, nMax) {
  return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin
}