(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CubicBezier = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
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
module.exports = function CubicBezier(p1x, p1y, p2x, p2y, res) {
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
};

},{}]},{},[1])(1)
});