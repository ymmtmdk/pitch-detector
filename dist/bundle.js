(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bundle", [], factory);
	else if(typeof exports === 'object')
		exports["bundle"] = factory();
	else
		root["bundle"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Complex {
    constructor(r, i) {
        this.real = r;
        this.imag = i;
    }
    multi_f(f) {
        return new Complex(this.real * f, this.imag * f);
    }
    multi_f_bang(f) {
        this.real *= f;
        this.imag *= f;
        return this;
    }
    multi(c) {
        return new Complex(this.real * c.real - this.imag * c.imag, this.real * c.imag + this.imag * c.real);
    }
    multi_bang(c) {
        this.real = this.real * c.real - this.imag * c.imag;
        this.imag = this.real * c.imag + this.imag * c.real;
        return this;
    }
    minus(c) {
        return new Complex(this.real - c.real, this.imag - c.imag);
    }
    minus_bang(c) {
        this.real -= c.real;
        this.imag -= c.imag;
        return this;
    }
    plus(c) {
        return new Complex(this.real + c.real, this.imag + c.imag);
    }
    plus_bang(c) {
        this.real += c.real;
        this.imag += c.imag;
        return this;
    }
    exp() {
        var expreal = Math.exp(this.real);
        return new Complex(expreal * Math.cos(this.imag), expreal * Math.sin(this.imag));
    }
    exp_bang() {
        var expreal = Math.exp(this.real);
        this.real = expreal * Math.cos(this.imag);
        this.imag = expreal * Math.sin(this.imag);
        return this;
    }
    abs2() {
        return new Complex(this.real * this.real + this.imag * this.imag, 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Complex;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complex__ = __webpack_require__(0);

class FFT {
    static fft_inner(n, stride, copy_flag, x, y) {
        if (n <= 1) {
            for (let q = 0; copy_flag && q < stride; q++) {
                y[q] = x[q];
            }
            return;
        }
        const m = Math.floor(n / 2);
        const theta = 2.0 * Math.PI / n;
        for (let p = 0; p < m; p++) {
            const wp = new __WEBPACK_IMPORTED_MODULE_0__complex__["a" /* Complex */](Math.cos(p * theta), -Math.sin(p * theta));
            for (let q = 0; q < stride; q++) {
                const a = x[q + stride * p];
                const b = x[q + stride * (p + m)];
                y[q + stride * (2 * p + 0)] = a.plus(b);
                y[q + stride * (2 * p + 1)] = a.minus_bang(b).multi(wp);
            }
        }
        FFT.fft_inner(m, 2 * stride, !copy_flag, y, x);
    }
    static fft(x, n) {
        FFT.fft_inner(n, 1, false, x, new Array());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FFT;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complex__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fft__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pitcher__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__note__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Complex", function() { return __WEBPACK_IMPORTED_MODULE_0__complex__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FFT", function() { return __WEBPACK_IMPORTED_MODULE_1__fft__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Pitcher", function() { return __WEBPACK_IMPORTED_MODULE_2__pitcher__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Note", function() { return __WEBPACK_IMPORTED_MODULE_3__note__["a"]; });







/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__complex__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fft__ = __webpack_require__(1);


class Pitcher {
    static parabola(nsdf, i) {
        const a = nsdf[i - 1];
        const b = nsdf[i];
        const c = nsdf[i + 1];
        const bottom = a + c - 2.0 * b;
        let x, y;
        if (bottom === 0.0) {
            x = i;
            y = b;
        }
        else {
            const delta = a - c;
            x = i + delta / (2.0 * bottom);
            y = b - delta * delta / (8.0 * bottom);
        }
        return { x: x, y: y };
    }
    static acf(x) {
        const n = x.length;
        const tmp = new Array();
        for (let i = 0; i < n; i++) {
            tmp[i] = x[i];
        }
        for (let i = n; i < (n * 2); i++) {
            tmp[i] = new __WEBPACK_IMPORTED_MODULE_0__complex__["a" /* Complex */](0, 0);
        }
        __WEBPACK_IMPORTED_MODULE_1__fft__["a" /* FFT */].fft(tmp, n * 2);
        for (let i = 0; i < (n * 2); i++) {
            tmp[i] = tmp[i].abs2();
        }
        __WEBPACK_IMPORTED_MODULE_1__fft__["a" /* FFT */].fft(tmp, n * 2);
        const out = new Array();
        for (let i = 0; i < n; i++) {
            out[i] = tmp[i].real / n / 2;
        }
        return out;
    }
    static nsdf(x) {
        const n = x.length;
        const out = this.acf(x);
        let tsq = out[0] * 2.0;
        for (let i = 0; i < n; i++) {
            out[i] = tsq > 0.0 ? out[i] / tsq : 0.0;
            tsq -= Math.pow(x[n - 1 - i].real, 2) + Math.pow(x[i].real, 2);
        }
        return out;
    }
    static peakPicking(nsdf) {
        let head = 0;
        const peakIndexes = new Array();
        const n = nsdf.length - 1;
        let i = 0;
        for (; i < n && nsdf[i] > 0; i++) {
            // nop
        }
        for (; i < n; i++) {
            const pi = peakIndexes[head];
            if (nsdf[i] > 0) {
                if (pi === undefined || nsdf[i] > nsdf[pi]) {
                    peakIndexes[head] = i;
                }
            }
            else if (pi !== undefined) {
                head += 1;
            }
        }
        return peakIndexes;
    }
    static pitch(ary, sampleRate) {
        const DEFAULT_CUTOFF = 0.95;
        const x = new Array();
        for (let i = 0; i < ary.length; i++)
            x[i] = new __WEBPACK_IMPORTED_MODULE_0__complex__["a" /* Complex */](ary[i], 0);
        const nsdf = this.nsdf(x);
        const peakIndexes = this.peakPicking(nsdf);
        if (peakIndexes.length === 0)
            return -1.0;
        const periods = new Array();
        const amps = new Array();
        let maxAmp = 0;
        for (let i = 0; i < peakIndexes.length; i++) {
            const h = this.parabola(nsdf, peakIndexes[i]);
            maxAmp = Math.max(maxAmp, h.y);
            amps.push(h.y);
            periods.push(h.x);
        }
        if (maxAmp < 0.35)
            return -1.0;
        let idx = amps.findIndex(e => e > DEFAULT_CUTOFF * maxAmp);
        if (idx === -1)
            return -1.0;
        return sampleRate / periods[idx];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pitcher;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Note {
    constructor(hz) {
        this.hz = hz;
        this.base = 55;
        this.note = Math.log(this.hz / this.base) / Math.log(2) * 12;
    }
    name() {
        const names = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
        const note12 = (this.note >= 0) ? this.note % 12 : this.note % 12 + 12;
        var i = Math.floor((note12 + 0.5) % 12);
        return names[i];
    }
    diff() {
        return (this.note + 0.5) % 1 - 0.5;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Note;



/***/ })
/******/ ]);
});
//# sourceMappingURL=bundle.js.map