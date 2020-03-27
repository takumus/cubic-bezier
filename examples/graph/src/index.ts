import CubicBezier from '../../../';
function init() {
    const bezierList = [
        {
            title: "Linear",
            points: [0, 0, 1, 1]
        },
        {
            title: "EaseInOutQuad",
            points: [0.455, 0.03, 0.515, 0.955]
        },
        {
            title: "EaseInOutQuart",
            points: [0.77, 0, 0.175, 1]
        },
        {
            title: "EaseInOutExpo",
            points: [1, 0, 0, 1]
        },
        {
            title: "EaseInOutBack",
            points: [0.68, -0.55, 0.265, 1.55]
        },
        {
            title: "EaseOutQuad",
            points: [0.25, 0.46, 0.45, 0.94]
        },
        {
            title: "EaseOutQuart",
            points: [0.165, 0.84, 0.44, 1]
        },
        {
            title: "EaseOutExpo",
            points: [0.19, 1, 0.22, 1]
        },
        {
            title: "EaseOutBack",
            points: [0.175, 0.885, 0.32, 1.275]
        },
        {
            title: "EaseInQuad",
            points: [0.55, 0.085, 0.68, 0.53]
        },
        {
            title: "EaseInQuart",
            points: [0.895, 0.03, 0.685, 0.22]
        },
        {
            title: "EaseInExpo",
            points: [0.95, 0.05, 0.795, 0.035]
        },
        {
            title: "EaseInBack",
            points: [0.6, -0.28, 0.735, 0.045]
        }
    ];
    // Simple SVG Tag Helper
    class SVG {
        public elem: Element;
        constructor(tag: string) {
            this.elem = document.createElementNS("http://www.w3.org/2000/svg", tag);
        }
        public attr(name: string, value: string) {
            this.elem.setAttributeNS(null, name, value);
        }
        public attrs(pairs: any[][]) {
            pairs.forEach((pair) => {
                this.attr(pair[0], pair[1]);
            });
        }
        public add(svg: SVG) {
            this.elem.appendChild(svg.elem);
        }
        public remove(svg: SVG) {
            this.elem.removeChild(svg.elem);
        }
    }
    // define SVG sizes
    const width = 300;
    const height = 150;
    const tbMargin = 20;
    // create
    bezierList.forEach(function (bezier) {
        // create SVGs
        const canvas = new SVG("svg");
        const line = new SVG("polyline");
        const background = new SVG("rect");
        canvas.attrs([
            ["width", width],
            ["height", height + tbMargin * 2]
        ]);
        line.attrs([
            ["stroke", "#999999"],
            ["fill", "none"],
            ["stroke-width", 5]
        ]);
        background.attrs([
            ["x", 0],
            ["y", tbMargin],
            ["width", width],
            ["height", height],
            ["fill", "#fafafa"]
        ]);
        canvas.add(background);
        canvas.add(line);
        // create bezier function
        const bezierFunction = CubicBezier(
            bezier.points[0],
            bezier.points[1],
            bezier.points[2],
            bezier.points[3],
            50
        );
        // create polygon's points from bezier function
        const polygon = [];
        const res = 500;
        for (let i = 0; i <= res; i ++) {
            const x = i / res;
            const y = 1 - bezierFunction(x);
            polygon.push(
                x * width,
                y * height + tbMargin
            );
        }
        // set points
        line.attr("points", polygon.join(" "));
        // create DOMs
        const title = document.createElement("h3");
        const bezierName = document.createElement("h4");
        title.innerHTML = bezier.title;
        bezierName.innerHTML = "CubicBezier(" + bezier.points.join(", ") + ")";
        // append to body
        document.body.appendChild(title);
        document.body.appendChild(bezierName);
        document.body.appendChild(canvas.elem);
    });
};
window.addEventListener('load', init);
