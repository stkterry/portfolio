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


let c1 = { xoff: Math.random() * 1000, yoff: Math.random() * 1000 };
let c2 = { xoff: Math.random() * 1000, yoff: Math.random() * 1000 };
let c3 = { xoff: Math.random() * 1000, yoff: Math.random() * 1000 };

let zoff = 0;
let inc = 0.01;
let zinc = 0.01;

const curDetail = 1;
const displacement = 60;

export default class Looper {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // this.ctx.fillStyle = "black"
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.noiseLoopX = new Array(Math.floor(TWO_PI / da));
    this.noiseLoopY = new Array(Math.floor(TWO_PI / da));
    this.frame();
  }

  nextFrame() {
    requestAnimationFrame(this.frame.bind(this));
  }

  frame() {
    this.clearScreen();
    this.getNoiseLoop(noise, 100);
    this.drawNoiseLoop2(this.canvas.width / 2, this.canvas.height / 2)
    this.drawCircle(c1);
    this.drawCircle(c2);
    this.drawCircle(c3);
    this.nextFrame();
  }

  drawNoiseLoop(noise, cx, cy, radius) {
    let r, x, y, xoff, yoff;
    this.ctx.beginPath();

    for (let a = 0; a < TWO_PI; a += da) {
      xoff = map(Math.cos(a + phase), -1, 1, 0, noiseMax);
      yoff = map(Math.sin(a + phase), -1, 1, 0, noiseMax);
      r = map(noise(xoff, yoff, zoff), -1, 1, radius, radius + 50)
      x = r * Math.cos(a);
      y = r * Math.sin(a);
      this.ctx.lineTo(x + cx, y + cy);
    }
    this.ctx.closePath();
    this.ctx.strokeStyle = "rgba(114, 43, 161, 1)"
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    zoff += zinc;
    phase += dp;
  }

  getNoiseLoop(noise, radius) {
    let a, x, y, r, xoff, yoff;

    for (let i = 0, k = this.noiseLoopX.length; i < k; i++) {
      a = i * da;
      xoff = map(Math.cos(a + phase), -1, 1, 0, noiseMax);
      yoff = map(Math.sin(a + phase), -1, 1, 0, noiseMax);
      r = map(noise(xoff, yoff, zoff), -1, 1, radius, radius + 50);
      x = r * Math.cos(a);
      y = r * Math.sin(a);
      this.noiseLoopX[i] = x;
      this.noiseLoopY[i] = y;
    }
    zoff += zinc;
    phase += dp;    
  }
  drawNoiseLoop2(cx, cy) {
    let x, y;
    this.ctx.shadowColor="red"
    this.ctx.strokeStyle = "rgba(114, 43, 161, 1)"
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 50 * cper.noise(c1.xoff);
    this.ctx.beginPath();
    for (let i = 0, k = this.noiseLoopX.length; i < k; i++) {
      this.ctx.lineTo(this.noiseLoopX[i] + cx, this.noiseLoopY[i] + cy);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

  drawCircle(c) {
    this.ctx.beginPath()
    let x = cper.noise(c.xoff) * this.canvas.width;
    let y = cper.noise(c.yoff) * this.canvas.height;
    c.xoff += 0.005;
    c.yoff += 0.005;

    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = "black"
    this.ctx.shadowColor = "rgba(200, 0, 50, 1)"
    this.ctx.shadowBlur = 10 + 25 * cper.noise(c.xoff);
    this.ctx.lineWidth = 1;
    this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();

    // get connecting line?
    let xDiff = x - this.canvas.width / 2;
    let yDiff = y - this.canvas.height / 2;
    let m = yDiff/xDiff;
    let angle = Math.atan2(-yDiff, -xDiff) + Math.PI;
    let angIdx = Math.floor(angle / da);
    
    if (Math.random() > 0.9) {
      this.ctx.strokeStyle = "rgba(255, 255, 255, .7)";
      this.ctx.shadowColor = "white";
      this.ctx.beginPath();
      this.drawLightning(this.noiseLoopX[angIdx] + this.canvas.width / 2, this.noiseLoopY[angIdx] + this.canvas.height / 2, x, y, displacement)
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }


  drawLightning(x1, y1, x2, y2, displace) {
    if (displace < curDetail) {
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
    } else {
      let mid_x = (x2 + x1) / 2;
      let mid_y = (y2 + y1) / 2;
      mid_x += (Math.random() - 0.5) * displace;
      mid_y += (Math.random() - 0.5) * displace;
      this.drawLightning(x1, y1, mid_x, mid_y, displace / 2);
      this.drawLightning(x2, y2, mid_x, mid_y, displace / 2);
    }
  }


  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillStyle = "rgb(20, 26, 34)"
    // this.ctx.fillStyle = "black"
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

};

function oneMap(val, nMin, nMax) {
  return (nMax - nMin) * val + nMin;
}

function map(val, oMin, oMax, nMin, nMax) {
  return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin
}

