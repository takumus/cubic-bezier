/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var cubic_bezier_1 = __webpack_require__(1);
	function init() {
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
	        var boxWidth, faceWidth;
	        function updateSize() {
	            boxWidth = box.getBoundingClientRect().width;
	            faceWidth = face.getBoundingClientRect().width;
	        }
	        updateSize();
	        window.addEventListener("resize", updateSize);
	        var easing = cubic_bezier_1.default(tween.easing[0], tween.easing[1], tween.easing[2], tween.easing[3]);
	        ;
	        var pf = false;
	        function update(t, f) {
	            t = easing(t);
	            if (pf != f) {
	                face.innerHTML = f ? "（˘⊖˘ ）" : "（ ˘⊖˘）";
	                pf = f;
	            }
	            var x = (boxWidth - faceWidth) * (f ? 1 - t : t);
	            face.style.transform = "translate3d(" + x + "px, 0px, 0px)";
	        }
	        updates.push(update);
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
	}
	window.addEventListener('load', init);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var search_1 = __webpack_require__(2);
	function CubicBezier(p1x, p1y, p2x, p2y, res) {
	    if (res === void 0) { res = 50; }
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
	        var i = search_1.default(xList, res, x);
	        var ax = xList[i];
	        var bx = xList[i + 1];
	        var at = tList[i];
	        var bt = tList[i + 1];
	        return 1 - bezier(
	        //tを計算
	        (x - ax) / (bx - ax) * (bt - at) + at, 
	        //yを求める
	        1, p1y, p2y, 0);
	    };
	}
	module.exports = CubicBezier; module.exports.default = CubicBezier; exports.default = CubicBezier;
	// maximaで求めたらこうなったベジェ関数。
	function bezier(t, p0, p1, p2, p3) {
	    var mt = 1 - t;
	    return p3 * t * t * t + 3 * mt * p2 * t * t + 3 * mt * mt * p1 * t + mt * mt * mt * p0;
	}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	//2分探索もどきで探索
	function search(arr, len, n) {
	    if (n == 0)
	        return 0;
	    var l = 0;
	    var r = len - 1;
	    while (l <= r) {
	        var m = ~~((l + r) * 0.5);
	        if (arr[m] < n) {
	            l = m + 1;
	        }
	        else {
	            r = m - 1;
	        }
	    }
	    return r;
	}
	module.exports = search; module.exports.default = search; exports.default = search;


/***/ })
/******/ ]);