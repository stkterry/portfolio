import oSimplex from "../noise/open_simplex";
import cPerlin from "../noise/cperlin";

const TWO_PI = Math.PI * 2;

const CONFIG = () => ({
  defRadius: 100,
  defROff: 50,
  deltaAngle: 0.01,
  phase: 0,
  deltaPhase: 0.001,

  zOffset: Math.random() * 1000,
  xIncrement: 0.0025,
  zIncrement: 0.005,

  curDetail: 1,
  displacement: 60,

  c1: { xoff: Math.random() * 1000, yoff: Math.random() * 1000 },
  c2: { xoff: Math.random() * 1000, yoff: Math.random() * 1000 },
  c3: { xoff: Math.random() * 1000, yoff: Math.random() * 1000 },

  noiseMax: 20,
  noise: (() => {
    let oplex = new oSimplex();
    oplex.seed();
    return oplex.noise3D.bind(oplex);
  })(),

  cper: (() => {
    let cper = new cPerlin();
    cper.noiseDetail(4, 0.5);
    return cper;
  })()
});

class Plasma {
  constructor(canvas, config) {
    this.cfg = Object.assign(this, config || CONFIG());
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.noiseLoopX = new Array(Math.floor(TWO_PI / this.deltaAngle));
    this.noiseLoopY = new Array(Math.floor(TWO_PI / this.deltaAngle));
    
    this.frame = this.frame.bind(this);
    this.frame();
  }

  nextFrame() {
    requestAnimationFrame(this.frame);
  }

  frame() {
    this.clearScreen();
    this.getNoiseLoop();
    this.drawNoiseLoop();
    this.drawPlasmoids();
    this.nextFrame();
  }

  getNoiseLoop() {
    let a, r, xoff, yoff;
    for (let i = 0, k = this.noiseLoopX.length; i < k; i++) {
      a = i * this.deltaAngle;
      xoff = Plasma.map(Math.cos(a + this.phase), -1, 1, 0, this.noiseMax);
      yoff = Plasma.map(Math.sin(a + this.phase), -1, 1, 0, this.noiseMax);
      r = Plasma.map(
        this.noise(xoff, yoff, this.zOffset), 
        -1, 1, 
        this.defRadius, this.defRadius + this.defROff
      )
      this.noiseLoopX[i] = r * Math.cos(a);
      this.noiseLoopY[i] = r * Math.sin(a);
    }
    this.zOffset += this.zIncrement;
    this.phase += this.deltaPhase;
  }
  drawNoiseLoop() {
    this.ctx.shadowColor = "red"
    this.ctx.strokeStyle = "rgba(114, 43, 161, 1)"
    this.ctx.lineWidth = 2;
    this.ctx.shadowBlur = 50 * this.cper.noise(this.c1.xoff);
    this.ctx.beginPath();
    for (let i = 0, k = this.noiseLoopX.length; i < k; i++) {
      this.ctx.lineTo(
        this.noiseLoopX[i] + this.canvas.width / 2, 
        this.noiseLoopY[i] + this.canvas.height / 2
      );
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }
  
  drawPlasmoids() {
    let xDiff, yDiff, angle, angIdx
    for (let plasmoid of [this.c1, this.c2, this.c3]) {


      let x = this.cper.noise(plasmoid.xoff) * this.canvas.width;
      let y = this.cper.noise(plasmoid.yoff) * this.canvas.height;
      plasmoid.xoff += this.xIncrement;
      plasmoid.yoff += this.xIncrement;


      // get connecting line?
      xDiff = x - this.canvas.width / 2;
      yDiff = y - this.canvas.height / 2;
      angle = Math.atan2(-yDiff, -xDiff) + Math.PI;
      angIdx = Math.floor(angle / this.deltaAngle);

      if (Math.random() > 0.95) {
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "white";
        this.ctx.shadowColor = "white";
        this.ctx.shadowBlur = 5;
        this.ctx.beginPath();
        this.drawLightning(
          this.noiseLoopX[angIdx] + this.canvas.width / 2, 
          this.noiseLoopY[angIdx] + this.canvas.height / 2, 
          x, y, this.displacement
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }

      let mixS1 = this.cper.noise(plasmoid.xoff + this.canvas.width);
      let mixS2 = this.cper.noise(plasmoid.yoff + this.canvas.height);
      this.ctx.fillStyle = "black"
      this.ctx.shadowColor = "rgb(255, 0, 50)"
      this.ctx.shadowBlur = 20 * mixS1;

      this.ctx.lineWidth = 1;
      this.ctx.beginPath()
      this.ctx.arc(x, y, 2 + 4 * mixS2, 0, TWO_PI);
      this.ctx.closePath();
      this.ctx.fill();
      
    }
  }

  drawLightning(x1, y1, x2, y2, displace) {
    if (displace < this.curDetail) {
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
    this.ctx.fillStyle = "black"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  static map(val, oMin, oMax, nMin, nMax) {
    return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin
  }
}

export default Plasma;