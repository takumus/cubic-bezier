import search from './search';
export default function CubicBezier(
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    res: number = 50
){
    const xList: number[] = [];
    const tList: number[] = [];
    p1y = 1 - p1y;
    p2y = 1 - p2y;
    for (let i = 0; i <= res; i ++) {
        const t = i / res;
        xList.push(bezier(t, 0, p1x, p2x, 1));
        tList.push(t);
    }
    return function (x: number): number {
        x = x < 0 ? 0 : x > 1 ? 1 : x;
        const i = search(xList, res, x);
        const ax = xList[i];
        const bx = xList[i + 1];
        const at = tList[i];
        const bt = tList[i + 1];
        return 1 - bezier(
            //tを計算
            (x - ax) / (bx - ax) * (bt - at) + at,
            //yを求める
            1, p1y, p2y, 0
        );
    }
}
// maximaで求めたらこうなったベジェ関数。
function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;
    return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
}