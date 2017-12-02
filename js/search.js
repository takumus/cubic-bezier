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
