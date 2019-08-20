/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/canvas/noiser.js":
/*!**********************************!*\
  !*** ./src/app/canvas/noiser.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noise/open_simplex */ "./src/app/noise/open_simplex.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var CONFIG = function CONFIG() {
  return {
    nRows: 50,
    scale: 1 / 20,
    noise: function () {
      var oplex = new _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__["default"]();
      oplex.seed();
      return oplex.noise3D.bind(oplex);
    }(),
    zOffset: 0,
    zIncrement: 0.002
  };
};

var Noiser =
/*#__PURE__*/
function () {
  function Noiser(canvas, config) {
    _classCallCheck(this, Noiser);

    Object.assign(this, config || CONFIG());
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.frame = this.frame.bind(this);
    this.frame();
  }

  _createClass(Noiser, [{
    key: "nextFrame",
    value: function nextFrame() {
      requestAnimationFrame(this.frame);
    }
  }, {
    key: "frame",
    value: function frame() {
      this.clearScreen();
      this.drawNoise();
      this.nextFrame();
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    }
  }, {
    key: "drawNoise",
    value: function drawNoise() {
      var ww = Math.floor(this.canvas.height / this.nRows);
      var nCols = Math.floor(this.canvas.width / ww);
      var amt;

      for (var i = 0; i < this.nRows; i++) {
        for (var j = 0; j < nCols + 2; j++) {
          amt = Noiser.map(this.noise(i * this.scale, j * this.scale, this.zOffset), -1, 1, 0, 0.5);
          this.ctx.fillStyle = "rgb(".concat(200 * amt, ", ").concat(255 * amt, ", ").concat(255 * amt, ")");
          this.ctx.fillRect(j * ww, i * ww, ww, ww);
        }
      }

      this.zOffset += this.zIncrement;
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }], [{
    key: "map",
    value: function map(val, oMin, oMax, nMin, nMax) {
      return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin;
    }
  }]);

  return Noiser;
}();

/* harmony default export */ __webpack_exports__["default"] = (Noiser);

/***/ }),

/***/ "./src/app/canvas/plasma.js":
/*!**********************************!*\
  !*** ./src/app/canvas/plasma.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noise/open_simplex */ "./src/app/noise/open_simplex.js");
/* harmony import */ var _noise_cperlin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noise/cperlin */ "./src/app/noise/cperlin.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TWO_PI = Math.PI * 2;

var CONFIG = function CONFIG() {
  return {
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
    c1: {
      xoff: Math.random() * 1000,
      yoff: Math.random() * 1000
    },
    c2: {
      xoff: Math.random() * 1000,
      yoff: Math.random() * 1000
    },
    c3: {
      xoff: Math.random() * 1000,
      yoff: Math.random() * 1000
    },
    noiseMax: 20,
    noise: function () {
      var oplex = new _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__["default"]();
      oplex.seed();
      return oplex.noise3D.bind(oplex);
    }(),
    cper: function () {
      var cper = new _noise_cperlin__WEBPACK_IMPORTED_MODULE_1__["default"]();
      cper.noiseDetail(4, 0.5);
      return cper;
    }()
  };
};

var Plasma =
/*#__PURE__*/
function () {
  function Plasma(canvas, config) {
    _classCallCheck(this, Plasma);

    this.cfg = Object.assign(this, config || CONFIG());
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.noiseLoopX = new Array(Math.floor(TWO_PI / this.deltaAngle));
    this.noiseLoopY = new Array(Math.floor(TWO_PI / this.deltaAngle));
    this.frame = this.frame.bind(this);
    this.frame();
  }

  _createClass(Plasma, [{
    key: "nextFrame",
    value: function nextFrame() {
      requestAnimationFrame(this.frame);
    }
  }, {
    key: "frame",
    value: function frame() {
      this.clearScreen();
      this.getNoiseLoop();
      this.drawNoiseLoop();
      this.drawPlasmoids();
      this.nextFrame();
    }
  }, {
    key: "getNoiseLoop",
    value: function getNoiseLoop() {
      var a, r, xoff, yoff;

      for (var i = 0, k = this.noiseLoopX.length; i < k; i++) {
        a = i * this.deltaAngle;
        xoff = Plasma.map(Math.cos(a + this.phase), -1, 1, 0, this.noiseMax);
        yoff = Plasma.map(Math.sin(a + this.phase), -1, 1, 0, this.noiseMax);
        r = Plasma.map(this.noise(xoff, yoff, this.zOffset), -1, 1, this.defRadius, this.defRadius + this.defROff);
        this.noiseLoopX[i] = r * Math.cos(a);
        this.noiseLoopY[i] = r * Math.sin(a);
      }

      this.zOffset += this.zIncrement;
      this.phase += this.deltaPhase;
    }
  }, {
    key: "drawNoiseLoop",
    value: function drawNoiseLoop() {
      this.ctx.shadowColor = "red";
      this.ctx.strokeStyle = "rgba(114, 43, 161, 1)";
      this.ctx.lineWidth = 2;
      this.ctx.shadowBlur = 50 * this.cper.noise(this.c1.xoff);
      this.ctx.beginPath();

      for (var i = 0, k = this.noiseLoopX.length; i < k; i++) {
        this.ctx.lineTo(this.noiseLoopX[i] + this.canvas.width / 2, this.noiseLoopY[i] + this.canvas.height / 2);
      }

      this.ctx.closePath();
      this.ctx.stroke();
    }
  }, {
    key: "drawPlasmoids",
    value: function drawPlasmoids() {
      var xDiff, yDiff, angle, angIdx;

      for (var _i = 0, _arr = [this.c1, this.c2, this.c3]; _i < _arr.length; _i++) {
        var plasmoid = _arr[_i];
        var x = this.cper.noise(plasmoid.xoff) * this.canvas.width;
        var y = this.cper.noise(plasmoid.yoff) * this.canvas.height;
        plasmoid.xoff += this.xIncrement;
        plasmoid.yoff += this.xIncrement; // get connecting line?

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
          this.drawLightning(this.noiseLoopX[angIdx] + this.canvas.width / 2, this.noiseLoopY[angIdx] + this.canvas.height / 2, x, y, this.displacement);
          this.ctx.closePath();
          this.ctx.stroke();
        }

        var mixS1 = this.cper.noise(plasmoid.xoff + this.canvas.width);
        var mixS2 = this.cper.noise(plasmoid.yoff + this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.shadowColor = "rgb(255, 0, 50)";
        this.ctx.shadowBlur = 20 * mixS1;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2 + 4 * mixS2, 0, TWO_PI);
        this.ctx.closePath();
        this.ctx.fill();
      }
    }
  }, {
    key: "drawLightning",
    value: function drawLightning(x1, y1, x2, y2, displace) {
      if (displace < this.curDetail) {
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
      } else {
        var mid_x = (x2 + x1) / 2;
        var mid_y = (y2 + y1) / 2;
        mid_x += (Math.random() - 0.5) * displace;
        mid_y += (Math.random() - 0.5) * displace;
        this.drawLightning(x1, y1, mid_x, mid_y, displace / 2);
        this.drawLightning(x2, y2, mid_x, mid_y, displace / 2);
      }
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }], [{
    key: "map",
    value: function map(val, oMin, oMax, nMin, nMax) {
      return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin;
    }
  }]);

  return Plasma;
}();

/* harmony default export */ __webpack_exports__["default"] = (Plasma);

/***/ }),

/***/ "./src/app/canvas/undulate.js":
/*!************************************!*\
  !*** ./src/app/canvas/undulate.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Undulate; });
/* harmony import */ var _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noise/open_simplex */ "./src/app/noise/open_simplex.js");
/* harmony import */ var _noise_cperlin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noise/cperlin */ "./src/app/noise/cperlin.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var oplex = new _noise_open_simplex__WEBPACK_IMPORTED_MODULE_0__["default"]();
oplex.seed();
var noise = oplex.noise3D.bind(oplex);
var cper = new _noise_cperlin__WEBPACK_IMPORTED_MODULE_1__["default"]();
cper.noiseDetail(4, 0.5);
var TWO_PI = Math.PI * 2;
var da = 0.01;
var noiseMax = 20;
var phase = 0;
var dp = 0.001;
var xoff = 0;
var yoff = 0;
var zoff = 0;
var inc = 0.01;
var xinc = 0.0025;
var zinc = 0.005;
var curDetail = 1;
var displacement = 60;

var Undulate =
/*#__PURE__*/
function () {
  function Undulate(canvas) {
    _classCallCheck(this, Undulate);

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d"); // this.ctx.fillStyle = "white"

    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.frame();
  }

  _createClass(Undulate, [{
    key: "nextFrame",
    value: function nextFrame() {
      requestAnimationFrame(this.frame.bind(this));
    }
  }, {
    key: "frame",
    value: function frame() {
      this.clearScreen();
      this.drawU();
      this.nextFrame();
    }
  }, {
    key: "drawCircle",
    value: function drawCircle(x, y) {
      this.ctx.beginPath(); // this.ctx.strokeStyle = 'black';
      // this.ctx.fillStyle = "black"
      // this.ctx.shadowColor = "rgba(200, 0, 50, 1)"
      // this.ctx.shadowBlur = 10 + 25 * cper.noise(c.xoff);

      this.ctx.lineWidth = 1;
      this.ctx.arc(x, y, 4, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "drawU",
    value: function drawU() {
      var nRows = 50;
      var nCols = Math.floor(this.canvas.width / this.canvas.height) * nRows; // let nCols = 40;

      var w = this.canvas.width / nCols;
      var h = this.canvas.height / nRows; // debugger;

      for (var i = 0; i < nRows; i++) {
        for (var j = 0; j < nCols; j++) {
          // console.log(noise(w * i, j * j, zoff));
          var amt = map(noise(i / 20, j / 20, zoff), -1, 1, 0, 1);
          this.ctx.fillStyle = "rgb(".concat(200 * amt, ", ").concat(255 * amt, ", ").concat(255 * amt, ")"); // this.ctx.fillStyle = "green";
          // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

          this.ctx.fillRect(Math.floor(j * w), Math.floor(i * h), Math.ceil(w), Math.ceil(h));
        }
      } // this.ctx.filter = "blur(4px)"


      zoff += zinc;
    }
  }, {
    key: "clearScreen",
    value: function clearScreen() {// this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.ctx.fillStyle = "rgb(20, 26, 34)"
      // this.ctx.fillStyle = "white"
      // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }]);

  return Undulate;
}();


;

function map(val, oMin, oMax, nMin, nMax) {
  return (val - oMin) * (nMax - nMin) / (oMax - oMin) + nMin;
}

/***/ }),

/***/ "./src/app/noise/cperlin.js":
/*!**********************************!*\
  !*** ./src/app/noise/cperlin.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cPerlin; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cPerlin =
/*#__PURE__*/
function () {
  function cPerlin() {
    _classCallCheck(this, cPerlin);

    this.YWRAPB = 4;
    this.YWRAP = 1 << this.YWRAPB;
    this.ZWRAPB = 8;
    this.ZWRAP = 1 << this.ZWRAPB;
    this.SIZE = 4095;
    this.octaves = 4; // meh

    this.falloff = 0.5; // half

    this.perlin;
  }

  _createClass(cPerlin, [{
    key: "_sclCos",
    value: function _sclCos(i) {
      return 0.5 * (1.0 - Math.cos(i * Math.PI));
    }
  }, {
    key: "noise",
    value: function noise(x, y, z) {
      y = y || 0;
      z = z || 0;

      if (this.perlin == null) {
        this.perlin = new Array(this.SIZE + 1).fill(0);
        this.perlin = this.perlin.map(function (el) {
          return Math.random();
        });
      }

      var _map = [x, y, z].map(function (dim) {
        return dim < 0 ? -dim : dim;
      });

      var _map2 = _slicedToArray(_map, 3);

      x = _map2[0];
      y = _map2[1];
      z = _map2[2];

      var _map3 = [x, y, z].map(function (dim) {
        return Math.floor(dim);
      }),
          _map4 = _slicedToArray(_map3, 3),
          xi = _map4[0],
          yi = _map4[1],
          zi = _map4[2];

      var xf = x - xi,
          yf = y - yi,
          zf = z - zi;
      var rxf, ryf;
      var r = 0;
      var ampl = 0.5;
      var n1, n2, n3;

      for (var oct = 0; oct < this.octaves; oct++) {
        var octF = xi + (yi << this.YWRAPB) + (zi << this.ZWRAPB);
        rxf = this._sclCos(xf);
        ryf = this._sclCos(yf);
        n1 = this.perlin[octF & this.SIZE];
        n1 += rxf * (this.perlin[octF + 1 & this.SIZE] - n1);
        n2 = this.perlin[octF + this.YWRAP & this.SIZE];
        n2 += rxf * (this.perlin[octF + this.YWRAP + 1 & this.SIZE] - n2);
        n1 += ryf * (n2 - n1);
        octF += this.ZWRAP;
        n2 = this.perlin[octF & this.SIZE];
        n2 += rxf * (this.perlin[octF + 1 & this.SIZE] - n2);
        n3 = this.perlin[octF + this.YWRAP & this.SIZE];
        n3 += rxf * (this.perlin[octF + this.YWRAP + 1 & this.SIZE] - n3);
        n2 += ryf * (n3 - n2);
        n1 += this._sclCos(zf) * (n2 - n1);
        r += n1 * ampl;
        ampl *= this.falloff;

        var _map5 = [xi, yi, zi].map(function (dim) {
          return dim <<= 1;
        });

        var _map6 = _slicedToArray(_map5, 3);

        xi = _map6[0];
        yi = _map6[1];
        zi = _map6[2];

        var _map7 = [xf, yf, zf].map(function (dim) {
          return dim *= 2;
        });

        var _map8 = _slicedToArray(_map7, 3);

        xf = _map8[0];
        yf = _map8[1];
        zf = _map8[2];

        if (xf >= 1.0) {
          xi++;
          xf--;
        }

        if (yf >= 1.0) {
          yi++;
          yf--;
        }

        if (zf >= 1.0) {
          zi++;
          zf--;
        }
      }

      return r;
    }
  }, {
    key: "noiseDetail",
    value: function noiseDetail(lod, falloff) {
      if (lod > 0) {
        this.octaves = lod;
      }

      ;

      if (falloff > 0) {
        this.falloff = falloff;
      }

      ;
    }
  }, {
    key: "noiseSeed",
    value: function noiseSeed(seed) {
      var lcg = function () {
        var m = 4294967296;
        var a = 1664525;
        var c = 1013904223;
        var seed, z;
        return {
          setSeed: function setSeed(val) {
            z = seed = (val == null ? Math.random() * m : val) >>> 0;
          },
          getSeed: function getSeed() {
            return seed;
          },
          rand: function rand() {
            z = (a * z + c) % m;
            return z / m;
          }
        };
      }();

      lcg.setSeed(seed);
      this.perlin = new Array(this.SIZE + 1).fill(0);
      this.perlin = this.perlin.map(function (el) {
        return lcg.rand();
      });
    }
  }]);

  return cPerlin;
}();


;

/***/ }),

/***/ "./src/app/noise/open_simplex.js":
/*!***************************************!*\
  !*** ./src/app/noise/open_simplex.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return oSimplex; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var oSimplex =
/*#__PURE__*/
function () {
  function oSimplex() {
    _classCallCheck(this, oSimplex);

    this.perm;
    this.permGradIndex3D;
    this.setup3D();
  } // LCG based gen...


  _createClass(oSimplex, [{
    key: "seed",
    value: function seed(_seed) {
      _seed = _seed || Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

      var lcg = function () {
        var m = 4294967296;
        var a = 1664525;
        var c = 1013904223;
        var seed, z;
        return {
          setSeed: function setSeed(val) {
            z = seed = (val == null ? Math.random() * m : val) >>> 0;
          },
          getSeed: function getSeed() {
            return seed;
          },
          rand: function rand() {
            z = (a * z + c) % m;
            return z / m;
          }
        };
      }();

      lcg.setSeed(_seed);
      this.perm = new Array(256);
      this.permGradIndex3D = new Array(256);
      var source = new Array(256);

      for (var i = 0; i < 256; i++) {
        source[i] = i;
      }

      ;

      for (var _i = 255; _i >= 0; _i--) {
        var r = Math.floor(lcg.rand() * Number.MAX_SAFE_INTEGER) % (_i + 1);

        this.perm[_i] = source[r];
        this.permGradIndex3D[_i] = this.perm[_i] % (this.gradients3D.length / 3) * 3;
        source[r] = source[_i];
      }
    }
  }, {
    key: "setup2D",
    value: function setup2D() {
      this.NORM_2D = 47;
      this.STRETCH_2D = -0.211324865405187; //(1/Math.sqrt(2+1)-1)/2;

      this.SQUISH_2D = 0.366025403784439; //(Math.sqrt(2+1)-1)/2;

      this.gradients2D = [5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5];
    }
  }, {
    key: "setup3D",
    value: function setup3D() {
      this.NORM_3D = 103;
      this.STRETCH_3D = -1.0 / 6; //(1/Math.sqrt(3+1)-1)/3;

      this.SQUISH_3D = 1.0 / 3; //(Math.sqrt(3+1)-1)/3;

      this.gradients3D = [-11, 4, 4, -4, 11, 4, -4, 4, 11, 11, 4, 4, 4, 11, 4, 4, 4, 11, -11, -4, 4, -4, -11, 4, -4, -4, 11, 11, -4, 4, 4, -11, 4, 4, -4, 11, -11, 4, -4, -4, 11, -4, -4, 4, -11, 11, 4, -4, 4, 11, -4, 4, 4, -11, -11, -4, -4, -4, -11, -4, -4, -4, -11, 11, -4, -4, 4, -11, -4, 4, -4, -11];
    } // For the lazy coder...

  }, {
    key: "noise",
    value: function noise() {
      if (this.perm === undefined) {
        this.seed();
      }

      ;

      if (arguments.length === 2) {
        if (this.NORM_2D === undefined) {
          this.setup2D();
        }

        ;
        return this.noise2D.apply(this, arguments);
      }

      if (arguments.length === 3) {
        if (this.NORM_3D === undefined) {
          this.setup3D();
        }

        ;
        return this.noise3D.apply(this, arguments);
      }
    }
  }, {
    key: "_extrapolate2D",
    value: function _extrapolate2D(xsb, ysb, dx, dy) {
      var index = this.perm[this.perm[xsb & 0xFF] + ysb & 0xFF] & 0x0E;
      return this.gradients2D[index] * dx + this.gradients2D[index + 1] * dy;
    }
  }, {
    key: "_extrapolate3D",
    value: function _extrapolate3D(xsb, ysb, zsb, dx, dy, dz) {
      var index = this.permGradIndex3D[this.perm[this.perm[xsb & 0xFF] + ysb & 0xFF] + zsb & 0xFF];
      return this.gradients3D[index] * dx + this.gradients3D[index + 1] * dy + this.gradients3D[index + 2] * dz;
    }
  }, {
    key: "noise2D",
    value: function noise2D(x, y) {
      //Place input coordinates onto grid.
      var stretchOffset = (x + y) * this.STRETCH_2D;
      var xs = x + stretchOffset;
      var ys = y + stretchOffset; //Place input coordinates onto grid.

      var xsb = Math.floor(xs);
      var ysb = Math.floor(ys); //Skew out to get actual coordinates of rhombus origin. We'll need these later.

      var squishOffset = (xsb + ysb) * this.SQUISH_2D;
      var xb = xsb + squishOffset;
      var yb = ysb + squishOffset; //Compute grid coordinates relative to rhombus origin.

      var xins = xs - xsb;
      var yins = ys - ysb; //Sum those together to get a value that determines which region we're in.

      var inSum = xins + yins; //Position relative to origin point.

      var dx0 = x - xb;
      var dy0 = y - yb; //We'll be defining these inside the next block and using them afterwards.

      var dx_ext, dy_ext, xsv_ext, ysv_ext;
      var value = 0; //Contribution (1,0)

      var dx1 = dx0 - 1 - this.SQUISH_2D;
      var dy1 = dy0 - this.SQUISH_2D;
      var attn1 = 2 - Math.pow(dx1, 2) - Math.pow(dy1, 2);

      if (attn1 > 0) {
        value += Math.pow(attn1, 4) * this._extrapolate2D(xsb + 1, ysb, dx1, dy1);
      } //Contribution (0,1)


      var dx2 = dx0 - this.SQUISH_2D;
      var dy2 = dy0 - 1 - this.SQUISH_2D;
      var attn2 = 2 - Math.pow(dx2, 2) - Math.pow(dy2, 2);

      if (attn2 > 0) {
        value += Math.pow(attn2, 4) * this._extrapolate2D(xsb, ysb + 1, dx2, dy2);
      }

      if (inSum <= 1) {
        //We're inside the triangle (2-Simplex) at (0,0)
        var zins = 1 - inSum;

        if (zins > xins || zins > yins) {
          //(0,0) is one of the closest two triangular vertices
          if (xins > yins) {
            xsv_ext = xsb + 1;
            ysv_ext = ysb - 1;
            dx_ext = dx0 - 1;
            dy_ext = dy0 + 1;
          } else {
            xsv_ext = xsb - 1;
            ysv_ext = ysb + 1;
            dx_ext = dx0 + 1;
            dy_ext = dy0 - 1;
          }
        } else {
          //(1,0) and (0,1) are the closest two vertices.
          xsv_ext = xsb + 1;
          ysv_ext = ysb + 1;
          dx_ext = dx0 - 1 - 2 * this.SQUISH_2D;
          dy_ext = dy0 - 1 - 2 * this.SQUISH_2D;
        }
      } else {
        //We're inside the triangle (2-Simplex) at (1,1)
        var _zins = 2 - inSum;

        if (_zins < xins || _zins < yins) {
          //(0,0) is one of the closest two triangular vertices
          if (xins > yins) {
            xsv_ext = xsb + 2;
            ysv_ext = ysb;
            dx_ext = dx0 - 2 - 2 * this.SQUISH_2D;
            dy_ext = dy0 - 2 * this.SQUISH_2D;
          } else {
            xsv_ext = xsb;
            ysv_ext = ysb + 2;
            dx_ext = dx0 - 2 * this.SQUISH_2D;
            dy_ext = dy0 - 2 - 2 * this.SQUISH_2D;
          }
        } else {
          //(1,0) and (0,1) are the closest two vertices.
          dx_ext = dx0;
          dy_ext = dy0;
          xsv_ext = xsb;
          ysv_ext = ysb;
        }

        xsb += 1;
        ysb += 1;
        dx0 = dx0 - 1 - 2 * this.SQUISH_2D;
        dy0 = dy0 - 1 - 2 * this.SQUISH_2D;
      } //Contribution (0,0) or (1,1)


      var attn0 = 2 - Math.pow(dx0, 2) - Math.pow(dy0, 2);

      if (attn0 > 0) {
        value += Math.pow(attn0, 4) * this._extrapolate2D(xsb, ysb, dx0, dy0);
      } //Extra Vertex


      var attn_ext = 2 - Math.pow(dx_ext, 2) - Math.pow(dy_ext, 2);

      if (attn_ext > 0) {
        value += Math.pow(attn_ext, 4) * this._extrapolate2D(xsv_ext, ysv_ext, dx_ext, dy_ext);
      }

      return value / this.NORM_2D;
    } //3D OpenSimplex Noise.

  }, {
    key: "noise3D",
    value: function noise3D(x, y, z) {
      //Place input coordinates on simplectic honeycomb.
      var stretchOffset = (x + y + z) * this.STRETCH_3D;
      var xs = x + stretchOffset;
      var ys = y + stretchOffset;
      var zs = z + stretchOffset; //Floor to get simplectic honeycomb coordinates of rhombohedron (stretched cube) super-cell origin.

      var xsb = Math.floor(xs);
      var ysb = Math.floor(ys);
      var zsb = Math.floor(zs); //Skew out to get actual coordinates of rhombohedron origin. We'll need these later.

      var squishOffset = (xsb + ysb + zsb) * this.SQUISH_3D;
      var xb = xsb + squishOffset;
      var yb = ysb + squishOffset;
      var zb = zsb + squishOffset; //Compute simplectic honeycomb coordinates relative to rhombohedral origin.

      var xins = xs - xsb;
      var yins = ys - ysb;
      var zins = zs - zsb; //Sum those together to get a value that determines which region we're in.

      var inSum = xins + yins + zins; //Positions relative to origin point.

      var dx0 = x - xb;
      var dy0 = y - yb;
      var dz0 = z - zb; //We'll be defining these inside the next block and using them afterwards.

      var dx_ext0, dy_ext0, dz_ext0;
      var dx_ext1, dy_ext1, dz_ext1;
      var xsv_ext0, ysv_ext0, zsv_ext0;
      var xsv_ext1, ysv_ext1, zsv_ext1;
      var value = 0;

      if (inSum <= 1) {
        //We're inside the tetrahedron (3-Simplex) at (0,0,0)
        //Determine which two of (0,0,1), (0,1,0), (1,0,0) are closest.
        var aPoint = 0x01;
        var aScore = xins;
        var bPoint = 0x02;
        var bScore = yins;

        if (aScore >= bScore && zins > bScore) {
          bScore = zins;
          bPoint = 0x04;
        } else if (aScore < bScore && zins > aScore) {
          aScore = zins;
          aPoint = 0x04;
        } //Now we determine the two lattice points not part of the tetrahedron that may contribute.
        //This depends on the closest two tetrahedral vertices, including (0,0,0)


        var wins = 1 - inSum;

        if (wins > aScore || wins > bScore) {
          //(0,0,0) is one of the closest two tetrahedral vertices.
          var c = bScore > aScore ? bPoint : aPoint; //Our other closest vertex is the closest out of a and b.

          if ((c & 0x01) === 0) {
            xsv_ext0 = xsb - 1;
            xsv_ext1 = xsb;
            dx_ext0 = dx0 + 1;
            dx_ext1 = dx0;
          } else {
            xsv_ext0 = xsv_ext1 = xsb + 1;
            dx_ext0 = dx_ext1 = dx0 - 1;
          }

          if ((c & 0x02) === 0) {
            ysv_ext0 = ysv_ext1 = ysb;
            dy_ext0 = dy_ext1 = dy0;

            if ((c & 0x01) === 0) {
              ysv_ext1 -= 1;
              dy_ext1 += 1;
            } else {
              ysv_ext0 -= 1;
              dy_ext0 += 1;
            }
          } else {
            ysv_ext0 = ysv_ext1 = ysb + 1;
            dy_ext0 = dy_ext1 = dy0 - 1;
          }

          if ((c & 0x04) === 0) {
            zsv_ext0 = zsb;
            zsv_ext1 = zsb - 1;
            dz_ext0 = dz0;
            dz_ext1 = dz0 + 1;
          } else {
            zsv_ext0 = zsv_ext1 = zsb + 1;
            dz_ext0 = dz_ext1 = dz0 - 1;
          }
        } else {
          //(0,0,0) is not one of the closest two tetrahedral vertices.
          var _c = aPoint | bPoint; //Our two extra vertices are determined by the closest two.


          if ((_c & 0x01) === 0) {
            xsv_ext0 = xsb;
            xsv_ext1 = xsb - 1;
            dx_ext0 = dx0 - 2 * this.SQUISH_3D;
            dx_ext1 = dx0 + 1 - this.SQUISH_3D;
          } else {
            xsv_ext0 = xsv_ext1 = xsb + 1;
            dx_ext0 = dx0 - 1 - 2 * this.SQUISH_3D;
            dx_ext1 = dx0 - 1 - this.SQUISH_3D;
          }

          if ((_c & 0x02) === 0) {
            ysv_ext0 = ysb;
            ysv_ext1 = ysb - 1;
            dy_ext0 = dy0 - 2 * this.SQUISH_3D;
            dy_ext1 = dy0 + 1 - this.SQUISH_3D;
          } else {
            ysv_ext0 = ysv_ext1 = ysb + 1;
            dy_ext0 = dy0 - 1 - 2 * this.SQUISH_3D;
            dy_ext1 = dy0 - 1 - this.SQUISH_3D;
          }

          if ((_c & 0x04) === 0) {
            zsv_ext0 = zsb;
            zsv_ext1 = zsb - 1;
            dz_ext0 = dz0 - 2 * this.SQUISH_3D;
            dz_ext1 = dz0 + 1 - this.SQUISH_3D;
          } else {
            zsv_ext0 = zsv_ext1 = zsb + 1;
            dz_ext0 = dz0 - 1 - 2 * this.SQUISH_3D;
            dz_ext1 = dz0 - 1 - this.SQUISH_3D;
          }
        } //Contribution (0,0,0)


        var attn0 = 2 - Math.pow(dx0, 2) - Math.pow(dy0, 2) - Math.pow(dz0, 2);

        if (attn0 > 0) {
          attn0 *= attn0;
          value += attn0 * attn0 * this._extrapolate3D(xsb, ysb, zsb, dx0, dy0, dz0);
        } //Contribution (1,0,0)


        var dx1 = dx0 - 1 - this.SQUISH_3D;
        var dy1 = dy0 - 0 - this.SQUISH_3D;
        var dz1 = dz0 - 0 - this.SQUISH_3D;
        var attn1 = 2 - Math.pow(dx1, 2) - Math.pow(dy1, 2) - Math.pow(dz1, 2);

        if (attn1 > 0) {
          attn1 *= attn1;
          value += attn1 * attn1 * this._extrapolate3D(xsb + 1, ysb, zsb, dx1, dy1, dz1);
        } //Contribution (0,1,0)


        var dx2 = dx0 - 0 - this.SQUISH_3D;
        var dy2 = dy0 - 1 - this.SQUISH_3D;
        var dz2 = dz1;
        var attn2 = 2 - Math.pow(dx2, 2) - Math.pow(dy2, 2) - Math.pow(dz2, 2);

        if (attn2 > 0) {
          attn2 *= attn2;
          value += attn2 * attn2 * this._extrapolate3D(xsb, ysb + 1, zsb, dx2, dy2, dz2);
        } //Contribution (0,0,1)


        var dx3 = dx2;
        var dy3 = dy1;
        var dz3 = dz0 - 1 - this.SQUISH_3D;
        var attn3 = 2 - Math.pow(dx3, 2) - Math.pow(dy3, 2) - Math.pow(dz3, 2);

        if (attn3 > 0) {
          attn3 *= attn3;
          value += attn3 * attn3 * this._extrapolate3D(xsb, ysb, zsb + 1, dx3, dy3, dz3);
        }
      } else if (inSum >= 2) {
        //We're inside the tetrahedron (3-Simplex) at (1,1,1)
        //Determine which two tetrahedral vertices are the closest, out of (1,1,0), (1,0,1), (0,1,1) but not (1,1,1).
        var _aPoint = 0x06;
        var _aScore = xins;
        var _bPoint = 0x05;
        var _bScore = yins;

        if (_aScore <= _bScore && zins < _bScore) {
          _bScore = zins;
          _bPoint = 0x03;
        } else if (_aScore > _bScore && zins < _aScore) {
          _aScore = zins;
          _aPoint = 0x03;
        } //Now we determine the two lattice points not part of the tetrahedron that may contribute.
        //This depends on the closest two tetrahedral vertices, including (1,1,1)


        var _wins = 3 - inSum;

        if (_wins < _aScore || _wins < _bScore) {
          //(1,1,1) is one of the closest two tetrahedral vertices.
          var _c2 = _bScore < _aScore ? _bPoint : _aPoint; //Our other closest vertex is the closest out of a and b.


          if ((_c2 & 0x01) !== 0) {
            xsv_ext0 = xsb + 2;
            xsv_ext1 = xsb + 1;
            dx_ext0 = dx0 - 2 - 3 * this.SQUISH_3D;
            dx_ext1 = dx0 - 1 - 3 * this.SQUISH_3D;
          } else {
            xsv_ext0 = xsv_ext1 = xsb;
            dx_ext0 = dx_ext1 = dx0 - 3 * this.SQUISH_3D;
          }

          if ((_c2 & 0x02) !== 0) {
            ysv_ext0 = ysv_ext1 = ysb + 1;
            dy_ext0 = dy_ext1 = dy0 - 1 - 3 * this.SQUISH_3D;

            if ((_c2 & 0x01) !== 0) {
              ysv_ext1 += 1;
              dy_ext1 -= 1;
            } else {
              ysv_ext0 += 1;
              dy_ext0 -= 1;
            }
          } else {
            ysv_ext0 = ysv_ext1 = ysb;
            dy_ext0 = dy_ext1 = dy0 - 3 * this.SQUISH_3D;
          }

          if ((_c2 & 0x04) !== 0) {
            zsv_ext0 = zsb + 1;
            zsv_ext1 = zsb + 2;
            dz_ext0 = dz0 - 1 - 3 * this.SQUISH_3D;
            dz_ext1 = dz0 - 2 - 3 * this.SQUISH_3D;
          } else {
            zsv_ext0 = zsv_ext1 = zsb;
            dz_ext0 = dz_ext1 = dz0 - 3 * this.SQUISH_3D;
          }
        } else {
          //(1,1,1) is not one of the closest two tetrahedral vertices.
          var _c3 = _aPoint & _bPoint; //Our two extra vertices are determined by the closest two.


          if ((_c3 & 0x01) !== 0) {
            xsv_ext0 = xsb + 1;
            xsv_ext1 = xsb + 2;
            dx_ext0 = dx0 - 1 - this.SQUISH_3D;
            dx_ext1 = dx0 - 2 - 2 * this.SQUISH_3D;
          } else {
            xsv_ext0 = xsv_ext1 = xsb;
            dx_ext0 = dx0 - this.SQUISH_3D;
            dx_ext1 = dx0 - 2 * this.SQUISH_3D;
          }

          if ((_c3 & 0x02) !== 0) {
            ysv_ext0 = ysb + 1;
            ysv_ext1 = ysb + 2;
            dy_ext0 = dy0 - 1 - this.SQUISH_3D;
            dy_ext1 = dy0 - 2 - 2 * this.SQUISH_3D;
          } else {
            ysv_ext0 = ysv_ext1 = ysb;
            dy_ext0 = dy0 - this.SQUISH_3D;
            dy_ext1 = dy0 - 2 * this.SQUISH_3D;
          }

          if ((_c3 & 0x04) !== 0) {
            zsv_ext0 = zsb + 1;
            zsv_ext1 = zsb + 2;
            dz_ext0 = dz0 - 1 - this.SQUISH_3D;
            dz_ext1 = dz0 - 2 - 2 * this.SQUISH_3D;
          } else {
            zsv_ext0 = zsv_ext1 = zsb;
            dz_ext0 = dz0 - this.SQUISH_3D;
            dz_ext1 = dz0 - 2 * this.SQUISH_3D;
          }
        } //Contribution (1,1,0)


        var _dx = dx0 - 1 - 2 * this.SQUISH_3D;

        var _dy = dy0 - 1 - 2 * this.SQUISH_3D;

        var _dz = dz0 - 0 - 2 * this.SQUISH_3D;

        var _attn = 2 - Math.pow(_dx, 2) - Math.pow(_dy, 2) - Math.pow(_dz, 2);

        if (_attn > 0) {
          _attn *= _attn;
          value += _attn * _attn * this._extrapolate3D(xsb + 1, ysb + 1, zsb, _dx, _dy, _dz);
        } //Contribution (1,0,1)


        var _dx2 = _dx;

        var _dy2 = dy0 - 0 - 2 * this.SQUISH_3D;

        var _dz2 = dz0 - 1 - 2 * this.SQUISH_3D;

        var _attn2 = 2 - Math.pow(_dx2, 2) - Math.pow(_dy2, 2) - Math.pow(_dz2, 2);

        if (_attn2 > 0) {
          _attn2 *= _attn2;
          value += _attn2 * _attn2 * this._extrapolate3D(xsb + 1, ysb, zsb + 1, _dx2, _dy2, _dz2);
        } //Contribution (0,1,1)


        var _dx3 = dx0 - 0 - 2 * this.SQUISH_3D;

        var _dy3 = _dy;
        var _dz3 = _dz2;

        var _attn3 = 2 - Math.pow(_dx3, 2) - Math.pow(_dy3, 2) - Math.pow(_dz3, 2);

        if (_attn3 > 0) {
          _attn3 *= _attn3;
          value += _attn3 * _attn3 * this._extrapolate3D(xsb, ysb + 1, zsb + 1, _dx3, _dy3, _dz3);
        } //Contribution (1,1,1)


        dx0 = dx0 - 1 - 3 * this.SQUISH_3D;
        dy0 = dy0 - 1 - 3 * this.SQUISH_3D;
        dz0 = dz0 - 1 - 3 * this.SQUISH_3D;

        var _attn4 = 2 - Math.pow(dx0, 2) - Math.pow(dy0, 2) - Math.pow(dz0, 2);

        if (_attn4 > 0) {
          _attn4 *= _attn4;
          value += _attn4 * _attn4 * this._extrapolate3D(xsb + 1, ysb + 1, zsb + 1, dx0, dy0, dz0);
        }
      } else {
        //We're inside the octahedron (Rectified 3-Simplex) in between.
        var _aScore2;

        var _aPoint2;

        var aIsFurtherSide;

        var _bScore2;

        var _bPoint2;

        var bIsFurtherSide; //Decide between point (0,0,1) and (1,1,0) as closest

        var p1 = xins + yins;

        if (p1 > 1) {
          _aScore2 = p1 - 1;
          _aPoint2 = 0x03;
          aIsFurtherSide = true;
        } else {
          _aScore2 = 1 - p1;
          _aPoint2 = 0x04;
          aIsFurtherSide = false;
        } //Decide between point (0,1,0) and (1,0,1) as closest


        var p2 = xins + zins;

        if (p2 > 1) {
          _bScore2 = p2 - 1;
          _bPoint2 = 0x05;
          bIsFurtherSide = true;
        } else {
          _bScore2 = 1 - p2;
          _bPoint2 = 0x02;
          bIsFurtherSide = false;
        } //The closest out of the two (1,0,0) and (0,1,1) will replace the furthest out of the two decided above, if closer.


        var p3 = yins + zins;

        if (p3 > 1) {
          var score = p3 - 1;

          if (_aScore2 <= _bScore2 && _aScore2 < score) {
            _aScore2 = score;
            _aPoint2 = 0x06;
            aIsFurtherSide = true;
          } else if (_aScore2 > _bScore2 && _bScore2 < score) {
            _bScore2 = score;
            _bPoint2 = 0x06;
            bIsFurtherSide = true;
          }
        } else {
          var _score = 1 - p3;

          if (_aScore2 <= _bScore2 && _aScore2 < _score) {
            _aScore2 = _score;
            _aPoint2 = 0x01;
            aIsFurtherSide = false;
          } else if (_aScore2 > _bScore2 && _bScore2 < _score) {
            _bScore2 = _score;
            _bPoint2 = 0x01;
            bIsFurtherSide = false;
          }
        } //Where each of the two closest points are determines how the extra two vertices are calculated.


        if (aIsFurtherSide === bIsFurtherSide) {
          if (aIsFurtherSide) {
            //Both closest points on (1,1,1) side
            //One of the two extra points is (1,1,1)
            dx_ext0 = dx0 - 1 - 3 * this.SQUISH_3D;
            dy_ext0 = dy0 - 1 - 3 * this.SQUISH_3D;
            dz_ext0 = dz0 - 1 - 3 * this.SQUISH_3D;
            xsv_ext0 = xsb + 1;
            ysv_ext0 = ysb + 1;
            zsv_ext0 = zsb + 1; //Other extra point is based on the shared axis.

            var _c4 = _aPoint2 & _bPoint2;

            if ((_c4 & 0x01) !== 0) {
              dx_ext1 = dx0 - 2 - 2 * this.SQUISH_3D;
              dy_ext1 = dy0 - 2 * this.SQUISH_3D;
              dz_ext1 = dz0 - 2 * this.SQUISH_3D;
              xsv_ext1 = xsb + 2;
              ysv_ext1 = ysb;
              zsv_ext1 = zsb;
            } else if ((_c4 & 0x02) !== 0) {
              dx_ext1 = dx0 - 2 * this.SQUISH_3D;
              dy_ext1 = dy0 - 2 - 2 * this.SQUISH_3D;
              dz_ext1 = dz0 - 2 * this.SQUISH_3D;
              xsv_ext1 = xsb;
              ysv_ext1 = ysb + 2;
              zsv_ext1 = zsb;
            } else {
              dx_ext1 = dx0 - 2 * this.SQUISH_3D;
              dy_ext1 = dy0 - 2 * this.SQUISH_3D;
              dz_ext1 = dz0 - 2 - 2 * this.SQUISH_3D;
              xsv_ext1 = xsb;
              ysv_ext1 = ysb;
              zsv_ext1 = zsb + 2;
            }
          } else {
            //Both closest points on (0,0,0) side
            //One of the two extra points is (0,0,0)
            dx_ext0 = dx0;
            dy_ext0 = dy0;
            dz_ext0 = dz0;
            xsv_ext0 = xsb;
            ysv_ext0 = ysb;
            zsv_ext0 = zsb; //Other extra point is based on the omitted axis.

            var _c5 = _aPoint2 | _bPoint2;

            if ((_c5 & 0x01) == 0) {
              dx_ext1 = dx0 + 1 - this.SQUISH_3D;
              dy_ext1 = dy0 - 1 - this.SQUISH_3D;
              dz_ext1 = dz0 - 1 - this.SQUISH_3D;
              xsv_ext1 = xsb - 1;
              ysv_ext1 = ysb + 1;
              zsv_ext1 = zsb + 1;
            } else if ((_c5 & 0x02) == 0) {
              dx_ext1 = dx0 - 1 - this.SQUISH_3D;
              dy_ext1 = dy0 + 1 - this.SQUISH_3D;
              dz_ext1 = dz0 - 1 - this.SQUISH_3D;
              xsv_ext1 = xsb + 1;
              ysv_ext1 = ysb - 1;
              zsv_ext1 = zsb + 1;
            } else {
              dx_ext1 = dx0 - 1 - this.SQUISH_3D;
              dy_ext1 = dy0 - 1 - this.SQUISH_3D;
              dz_ext1 = dz0 + 1 - this.SQUISH_3D;
              xsv_ext1 = xsb + 1;
              ysv_ext1 = ysb + 1;
              zsv_ext1 = zsb - 1;
            }
          }
        } else {
          //One point on (0,0,0) side, one point on (1,1,1) side
          var c1, c2;

          if (aIsFurtherSide) {
            c1 = _aPoint2;
            c2 = _bPoint2;
          } else {
            c1 = _bPoint2;
            c2 = _aPoint2;
          } //One contribution is a permutation of (1,1,-1)


          if ((c1 & 0x01) == 0) {
            dx_ext0 = dx0 + 1 - this.SQUISH_3D;
            dy_ext0 = dy0 - 1 - this.SQUISH_3D;
            dz_ext0 = dz0 - 1 - this.SQUISH_3D;
            xsv_ext0 = xsb - 1;
            ysv_ext0 = ysb + 1;
            zsv_ext0 = zsb + 1;
          } else if ((c1 & 0x02) == 0) {
            dx_ext0 = dx0 - 1 - this.SQUISH_3D;
            dy_ext0 = dy0 + 1 - this.SQUISH_3D;
            dz_ext0 = dz0 - 1 - this.SQUISH_3D;
            xsv_ext0 = xsb + 1;
            ysv_ext0 = ysb - 1;
            zsv_ext0 = zsb + 1;
          } else {
            dx_ext0 = dx0 - 1 - this.SQUISH_3D;
            dy_ext0 = dy0 - 1 - this.SQUISH_3D;
            dz_ext0 = dz0 + 1 - this.SQUISH_3D;
            xsv_ext0 = xsb + 1;
            ysv_ext0 = ysb + 1;
            zsv_ext0 = zsb - 1;
          } //One contribution is a permutation of (0,0,2)


          dx_ext1 = dx0 - 2 * this.SQUISH_3D;
          dy_ext1 = dy0 - 2 * this.SQUISH_3D;
          dz_ext1 = dz0 - 2 * this.SQUISH_3D;
          xsv_ext1 = xsb;
          ysv_ext1 = ysb;
          zsv_ext1 = zsb;

          if ((c2 & 0x01) !== 0) {
            dx_ext1 -= 2;
            xsv_ext1 += 2;
          } else if ((c2 & 0x02) !== 0) {
            dy_ext1 -= 2;
            ysv_ext1 += 2;
          } else {
            dz_ext1 -= 2;
            zsv_ext1 += 2;
          }
        } //Contribution (1,0,0)


        var _dx4 = dx0 - 1 - this.SQUISH_3D;

        var _dy4 = dy0 - 0 - this.SQUISH_3D;

        var _dz4 = dz0 - 0 - this.SQUISH_3D;

        var _attn5 = 2 - _dx4 * _dx4 - _dy4 * _dy4 - _dz4 * _dz4;

        if (_attn5 > 0) {
          _attn5 *= _attn5;
          value += _attn5 * _attn5 * this._extrapolate3D(xsb + 1, ysb, zsb, _dx4, _dy4, _dz4);
        } //Contribution (0,1,0)


        var _dx5 = dx0 - 0 - this.SQUISH_3D;

        var _dy5 = dy0 - 1 - this.SQUISH_3D;

        var _dz5 = _dz4;

        var _attn6 = 2 - _dx5 * _dx5 - _dy5 * _dy5 - _dz5 * _dz5;

        if (_attn6 > 0) {
          _attn6 *= _attn6;
          value += _attn6 * _attn6 * this._extrapolate3D(xsb, ysb + 1, zsb, _dx5, _dy5, _dz5);
        } //Contribution (0,0,1)


        var _dx6 = _dx5;
        var _dy6 = _dy4;

        var _dz6 = dz0 - 1 - this.SQUISH_3D;

        var _attn7 = 2 - _dx6 * _dx6 - _dy6 * _dy6 - _dz6 * _dz6;

        if (_attn7 > 0) {
          _attn7 *= _attn7;
          value += _attn7 * _attn7 * this._extrapolate3D(xsb, ysb, zsb + 1, _dx6, _dy6, _dz6);
        } //Contribution (1,1,0)


        var dx4 = dx0 - 1 - 2 * this.SQUISH_3D;
        var dy4 = dy0 - 1 - 2 * this.SQUISH_3D;
        var dz4 = dz0 - 0 - 2 * this.SQUISH_3D;
        var attn4 = 2 - dx4 * dx4 - dy4 * dy4 - dz4 * dz4;

        if (attn4 > 0) {
          attn4 *= attn4;
          value += attn4 * attn4 * this._extrapolate3D(xsb + 1, ysb + 1, zsb, dx4, dy4, dz4);
        } //Contribution (1,0,1)


        var dx5 = dx4;
        var dy5 = dy0 - 0 - 2 * this.SQUISH_3D;
        var dz5 = dz0 - 1 - 2 * this.SQUISH_3D;
        var attn5 = 2 - dx5 * dx5 - dy5 * dy5 - dz5 * dz5;

        if (attn5 > 0) {
          attn5 *= attn5;
          value += attn5 * attn5 * this._extrapolate3D(xsb + 1, ysb, zsb + 1, dx5, dy5, dz5);
        } //Contribution (0,1,1)


        var dx6 = dx0 - 0 - 2 * this.SQUISH_3D;
        var dy6 = dy4;
        var dz6 = dz5;
        var attn6 = 2 - dx6 * dx6 - dy6 * dy6 - dz6 * dz6;

        if (attn6 > 0) {
          attn6 *= attn6;
          value += attn6 * attn6 * this._extrapolate3D(xsb, ysb + 1, zsb + 1, dx6, dy6, dz6);
        }
      } //First extra vertex


      var attn_ext0 = 2 - dx_ext0 * dx_ext0 - dy_ext0 * dy_ext0 - dz_ext0 * dz_ext0;

      if (attn_ext0 > 0) {
        attn_ext0 *= attn_ext0;
        value += attn_ext0 * attn_ext0 * this._extrapolate3D(xsv_ext0, ysv_ext0, zsv_ext0, dx_ext0, dy_ext0, dz_ext0);
      } //Second extra vertex


      var attn_ext1 = 2 - dx_ext1 * dx_ext1 - dy_ext1 * dy_ext1 - dz_ext1 * dz_ext1;

      if (attn_ext1 > 0) {
        attn_ext1 *= attn_ext1;
        value += attn_ext1 * attn_ext1 * this._extrapolate3D(xsv_ext1, ysv_ext1, zsv_ext1, dx_ext1, dy_ext1, dz_ext1);
      }

      return value / this.NORM_3D;
    }
  }]);

  return oSimplex;
}();



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_canvas_undulate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/canvas/undulate.js */ "./src/app/canvas/undulate.js");
/* harmony import */ var _app_canvas_noiser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/canvas/noiser */ "./src/app/canvas/noiser.js");
/* harmony import */ var _app_canvas_plasma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/canvas/plasma */ "./src/app/canvas/plasma.js");




function resizeCanvas(header, canvas) {
  canvas.width = header.clientWidth;
  canvas.height = header.clientHeight;
}

window.addEventListener('DOMContentLoaded', function (event) {
  var header = document.getElementById("header");
  var two = document.getElementById("two");
  var canvas = document.getElementById("header-canvas");
  resizeCanvas(header, canvas);
  window.addEventListener('resize', function () {
    return resizeCanvas(header, canvas);
  }); // new Looper(canvas);

  new _app_canvas_plasma__WEBPACK_IMPORTED_MODULE_2__["default"](canvas);
  var footer = document.getElementById("footer");
  var canvasFooter = document.getElementById("header-canvas-foot");
  resizeCanvas(footer, canvasFooter);
  window.addEventListener('resize', function () {
    return resizeCanvas(footer, canvasFooter);
  });
  new _app_canvas_plasma__WEBPACK_IMPORTED_MODULE_2__["default"](canvasFooter);
  var noiser = document.getElementById("noiser");
  resizeCanvas(header, noiser);
  window.addEventListener('resize', function () {
    return resizeCanvas(two, noiser);
  });
  new _app_canvas_noiser__WEBPACK_IMPORTED_MODULE_1__["default"](noiser);
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map