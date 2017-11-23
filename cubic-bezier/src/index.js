(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CubicBezier"] = factory();
	else
		root["CubicBezier"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
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
	        var i = search(xList, res, x);
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
	module.exports = exports.default = CubicBezier;
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
	// maximaで求めたらこうなったベジェ関数。
	function bezier(t, p0, p1, p2, p3) {
	    var mt = 1 - t;
	    return p3 * t * t * t + 3 * mt * p2 * t * t + 3 * mt * mt * p1 * t + mt * mt * mt * p0;
	}


/***/ })
/******/ ])
});
;