# Install
`npm install @takumus/cubic-bezier`
# Usage
```js
import CubicBezier from '@takumus/cubic-bezier';

// generate "liner" function
const liner = CubicBezier(0, 0, 1, 1);

// generate "EaseInOutQuad" function
const easeInOutQuad = CubicBezier(0.455, 0.03, 0.515, 0.955);

// use
console.log(liner(0), liner(1));
console.log(easeInOutQuad(0), easeInOutQuad(1));
```
