# CubicBezier
## github
<https://github.com/takumus/CubicBezier>
## これは何
３次ベジェを作れるモジュールです。  
## インストール
`npm install cubic-bezier --registory http://npm.takumus.com`
## 使い方
    const CubicBezier = require("cubic-bezier");
    const easeInOutQuad = CubicBezier(0.455, 0.03, 0.515, 0.955);
    for (let i = 0; i <= 100; i ++) {
        console.log(easeInOutQuad(i / 100));
    }