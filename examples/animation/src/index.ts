import CubicBezier from '../../../';
const tweenList = [
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
const updates: ((t: number, f: boolean) => void)[] = [];
tweenList.forEach(function (tween) {
  // create DOMs
  const title = document.createElement("h3");
  const easingName = document.createElement("h4");
  const boxWrapper = document.createElement("div");
  const box = document.createElement("div");
  const face = document.createElement("div");
  box.className = "box";
  face.className = "face";
  boxWrapper.className = "box-wrapper"
  title.innerHTML = tween.title;
  easingName.innerHTML = "var easing = CubicBezier(" + tween.easing.join(", ") + ");"
  face.innerHTML = "（ ˘⊖˘）";
  boxWrapper.appendChild(box);
  box.appendChild(face);
  document.body.appendChild(title);
  document.body.appendChild(easingName);
  document.body.appendChild(boxWrapper);

  // move DOMs
  let boxWidth = 0;
  let faceWidth = 0;
  function updateSize() {
    boxWidth = box.getBoundingClientRect().width;
    faceWidth = face.getBoundingClientRect().width;
  }
  updateSize();
  window.addEventListener("resize", updateSize);
  const easing = CubicBezier(tween.easing[0], tween.easing[1], tween.easing[2], tween.easing[3]);;
  let pf = false;
  updates.push((t: number, f: boolean) => {
    t = easing(t);
    if (pf != f) {
      face.innerHTML = f ? "（˘⊖˘ ）" : "（ ˘⊖˘）";
      pf = f;
    }
    const x = (boxWidth - faceWidth) * (f ? 1 - t : t);
    face.style.transform = "translate3d(" + x + "px, 0px, 0px)";
  });
});
let c = 0;
function loop() {
  c += 0.6;
  const t = (c % 60) / 60;
  const flip = Math.floor(c / 60) % 2 == 1;
  requestAnimationFrame(loop);
  updates.forEach((f) => {
    f(t, flip);
  });
}
loop();