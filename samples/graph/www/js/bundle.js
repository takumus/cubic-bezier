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
	    var bezierList = [
	        {
	            title: "Linear",
	            points: [0, 0, 1, 1]
	        },
	        {
	            title: "EaseInOutQuad",
	            points: [0.455, 0.03, 0.515, 0.955]
	        },
	        {
	            title: "EaseInOutQuart",
	            points: [0.77, 0, 0.175, 1]
	        },
	        {
	            title: "EaseInOutExpo",
	            points: [1, 0, 0, 1]
	        },
	        {
	            title: "EaseInOutBack",
	            points: [0.68, -0.55, 0.265, 1.55]
	        },
	        {
	            title: "EaseOutQuad",
	            points: [0.25, 0.46, 0.45, 0.94]
	        },
	        {
	            title: "EaseOutQuart",
	            points: [0.165, 0.84, 0.44, 1]
	        },
	        {
	            title: "EaseOutExpo",
	            points: [0.19, 1, 0.22, 1]
	        },
	        {
	            title: "EaseOutBack",
	            points: [0.175, 0.885, 0.32, 1.275]
	        },
	        {
	            title: "EaseInQuad",
	            points: [0.55, 0.085, 0.68, 0.53]
	        },
	        {
	            title: "EaseInQuart",
	            points: [0.895, 0.03, 0.685, 0.22]
	        },
	        {
	            title: "EaseInExpo",
	            points: [0.95, 0.05, 0.795, 0.035]
	        },
	        {
	            title: "EaseInBack",
	            points: [0.6, -0.28, 0.735, 0.045]
	        }
	    ];
	    // Simple SVG Tag Helper
	    function SVG(tag) {
	        var NS = "http://www.w3.org/2000/svg";
	        var _this = this;
	        this.elem = document.createElementNS(NS, tag);
	        this.attr = function (name, value) {
	            _this.elem.setAttributeNS(null, name, value);
	        };
	        this.attrs = function (pairs) {
	            pairs.forEach(function (pair) {
	                _this.attr(pair[0], pair[1]);
	            });
	        };
	        this.add = function (svg) {
	            _this.elem.appendChild(svg.elem);
	        };
	        this.remove = function (svg) {
	            _this.elem.removeChild(svg.elem);
	        };
	    }
	    // define SVG sizes
	    var width = 300;
	    var height = 150;
	    var tbMargin = 20;
	    // create
	    bezierList.forEach(function (bezier) {
	        // create SVGs
	        var canvas = new SVG("svg");
	        var line = new SVG("polyline");
	        var background = new SVG("rect");
	        canvas.attrs([
	            ["width", width],
	            ["height", height + tbMargin * 2]
	        ]);
	        line.attrs([
	            ["stroke", "#999999"],
	            ["fill", "none"],
	            ["stroke-width", 5]
	        ]);
	        background.attrs([
	            ["x", 0],
	            ["y", tbMargin],
	            ["width", width],
	            ["height", height],
	            ["fill", "#fafafa"]
	        ]);
	        canvas.add(background);
	        canvas.add(line);
	        // create bezier function
	        var bezierFunction = cubic_bezier_1.default(bezier.points[0], bezier.points[1], bezier.points[2], bezier.points[3], 50);
	        // create polygon's points from bezier function
	        var polygon = [];
	        var res = 500;
	        for (var i = 0; i <= res; i++) {
	            var x = i / res;
	            var y = 1 - bezierFunction(x);
	            polygon.push(x * width, y * height + tbMargin);
	        }
	        // set points
	        line.attr("points", polygon.join(" "));
	        // create DOMs
	        var title = document.createElement("h3");
	        var bezierName = document.createElement("h4");
	        title.innerHTML = bezier.title;
	        bezierName.innerHTML = "CubicBezier(" + bezier.points.join(", ") + ")";
	        // append to body
	        document.body.appendChild(title);
	        document.body.appendChild(bezierName);
	        document.body.appendChild(canvas.elem);
	    });
	}
	;
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