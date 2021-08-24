import search from './search';
export default function CubicBezier(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    p1y: number = 0,
    p2y: number = 1,
    res: number = 50
){
    const xList: number[] = [];
    const tList: number[] = [];
    cp1y = cp1y;
    cp2y = cp2y;
    for (let i = 0; i <= res; i ++) {
        const t = i / res;
        xList.push(bezier(t, 0, cp1x, cp2x, 1));
        tList.push(t);
    }
    return function (x: number): number {
        x = x < 0 ? 0 : x > 1 ? 1 : x;
        const i = search(xList, res, x);
        const ax = xList[i];
        const bx = xList[i + 1];
        const at = tList[i];
        const bt = tList[i + 1];
        return bezier(
            //tを計算
            (x - ax) / (bx - ax) * (bt - at) + at,
            //yを求める
            p1y, cp1y, cp2y, p2y
        );
    }
}
// maximaで求めたらこうなったベジェ関数。
function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;
    return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
}