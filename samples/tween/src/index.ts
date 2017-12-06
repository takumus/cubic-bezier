import CubicBezier from 'cubic-bezier';
function init() {
    var tweenList = [
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
    var updates = [];
    tweenList.forEach(function(tween) {
        // create DOMs
        var title = document.createElement("h3");
        var easingName = document.createElement("h4");
        var boxWrapper = document.createElement("div");
        var box = document.createElement("div");
        var face = document.createElement("div");
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
        var boxWidth, faceWidth;
        function updateSize() {
            boxWidth = box.getBoundingClientRect().width;
            faceWidth = face.getBoundingClientRect().width;
        }
        updateSize();
        window.addEventListener("resize", updateSize);
        var easing = CubicBezier(tween.easing[0], tween.easing[1], tween.easing[2], tween.easing[3]);;
        var pf = false;
        function update(t, f) {
            t = easing(t);
            if (pf != f) {
                face.innerHTML = f ? "（˘⊖˘ ）" : "（ ˘⊖˘）";
                pf = f;
            }
            var x = (boxWidth - faceWidth) * (f?1-t:t);
            face.style.transform = "translate3d(" + x + "px, 0px, 0px)";
        }
        updates.push(update);
    });
    var c = 0;
    function loop() {
        c += 0.6;
        var t = (c % 60) / 60;
        var flip = Math.floor(c / 60) % 2 == 1;
        requestAnimationFrame(loop);
        updates.forEach(function(f){
            f(t, flip);
        });
    }
    loop();
}
window.addEventListener('load', init);