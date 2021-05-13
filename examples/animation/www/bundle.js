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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../dist/index.esm.js":
/*!**********************************************************************!*\
  !*** C:/Users/Takumu Hayashi/MyWorks/cubic-bezier/dist/index.esm.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//2分探索もどきで探索
function search(arr, len, n) {
  if (n == 0) return 0;
  var l = 0;
  var r = len - 1;

  while (l <= r) {
    var m = ~~((l + r) * 0.5);

    if (arr[m] < n) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }

  return r;
}

function CubicBezier(p1x, p1y, p2x, p2y) {
  var res = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
  var xList = [];
  var tList = [];
  p1y = 1 - p1y;
  p2y = 1 - p2y;

  for (var i = 0; i <= res; i++) {
    var t = i / res;
    xList.push(bezier(t, 0, p1x, p2x, 1));
    tList.push(t);
  }

  return function (x) {
    x = x < 0 ? 0 : x > 1 ? 1 : x;
    var i = search(xList, res, x);
    var ax = xList[i];
    var bx = xList[i + 1];
    var at = tList[i];
    var bt = tList[i + 1];
    return 1 - bezier( //tを計算
    (x - ax) / (bx - ax) * (bt - at) + at, //yを求める
    1, p1y, p2y, 0);
  };
} // maximaで求めたらこうなったベジェ関数。

function bezier(t, p0, p1, p2, p3) {
  var mt = 1 - t;
  return p3 * t * t * t + 3 * mt * p2 * t * t + 3 * mt * mt * p1 * t + mt * mt * mt * p0;
}

/* harmony default export */ __webpack_exports__["default"] = (CubicBezier);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(__webpack_require__(/*! ../../../ */ "../../dist/index.esm.js"));
var tweenList = [
    {
        title: "Linear",
        easing: [0, 0, 1, 1]
    },
    {
        title: "EaseInOutQuad",
        easing: [0.455, 0.03, 0.515, 0.955]
    },
    {
        title: "EaseInOutQuart",
        easing: [0.77, 0, 0.175, 1]
    },
    {
        title: "EaseInOutExpo",
        easing: [1, 0, 0, 1]
    },
    {
        title: "EaseInOutBack",
        easing: [0.68, -0.55, 0.265, 1.55]
    },
    {
        title: "EaseOutQuad",
        easing: [0.25, 0.46, 0.45, 0.94]
    },
    {
        title: "EaseOutQuart",
        easing: [0.165, 0.84, 0.44, 1]
    },
    {
        title: "EaseOutExpo",
        easing: [0.19, 1, 0.22, 1]
    },
    {
        title: "EaseOutBack",
        easing: [0.175, 0.885, 0.32, 1.275]
    },
    {
        title: "EaseInQuad",
        easing: [0.55, 0.085, 0.68, 0.53]
    },
    {
        title: "EaseInQuart",
        easing: [0.895, 0.03, 0.685, 0.22]
    },
    {
        title: "EaseInExpo",
        easing: [0.95, 0.05, 0.795, 0.035]
    },
    {
        title: "EaseInBack",
        easing: [0.6, -0.28, 0.735, 0.045]
    }
];
var updates = [];
tweenList.forEach(function (tween) {
    // create DOMs
    var title = document.createElement("h3");
    var easingName = document.createElement("h4");
    var boxWrapper = document.createElement("div");
    var box = document.createElement("div");
    var face = document.createElement("div");
    box.className = "box";
    face.className = "face";
    boxWrapper.className = "box-wrapper";
    title.innerHTML = tween.title;
    easingName.innerHTML = "var easing = CubicBezier(" + tween.easing.join(", ") + ");";
    face.innerHTML = "（ ˘⊖˘）";
    boxWrapper.appendChild(box);
    box.appendChild(face);
    document.body.appendChild(title);
    document.body.appendChild(easingName);
    document.body.appendChild(boxWrapper);
    // move DOMs
    var boxWidth = 0;
    var faceWidth = 0;
    function updateSize() {
        boxWidth = box.getBoundingClientRect().width;
        faceWidth = face.getBoundingClientRect().width;
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    var easing = __1.default(tween.easing[0], tween.easing[1], tween.easing[2], tween.easing[3]);
    ;
    var pf = false;
    updates.push(function (t, f) {
        t = easing(t);
        if (pf != f) {
            face.innerHTML = f ? "（˘⊖˘ ）" : "（ ˘⊖˘）";
            pf = f;
        }
        var x = (boxWidth - faceWidth) * (f ? 1 - t : t);
        face.style.transform = "translate3d(" + x + "px, 0px, 0px)";
    });
});
var c = 0;
function loop() {
    c += 0.6;
    var t = (c % 60) / 60;
    var flip = Math.floor(c / 60) % 2 == 1;
    requestAnimationFrame(loop);
    updates.forEach(function (f) {
        f(t, flip);
    });
}
loop();


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.ts */"./src/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map