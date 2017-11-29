//2分探索もどきで探索
export default function search(arr: number[], len: number, n: number) {
    if (n == 0) return 0;
    let l = 0;
    let r = len - 1;
    while(l <= r) {
        const m = ~~((l + r) * 0.5);
        if (arr[m] < n) {
            l = m + 1;
        }else {
            r = m - 1;
        }
    }
    return r;
}