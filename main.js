var tail = document.querySelector(".tail");

var points = [];
var count = 0;
var startX = 172;
var startY = 110;
var numPoints = 14;
var tailLength = 80;
var segmentSize = tailLength / numPoints;

// Animate these values
var wave = {
    speed: 0.08,
    xOffset: 1,
    yOffset: 3,
    xPhase: 0.3,
    yPhase: 0.5,
};


blinkingAnimation();
waveArmAnimation();


function blinkingAnimation() {

    var tl = gsap.timeline();
    var open = gsap.to(".open_eyes", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.easeIn"
    });
    var closed = gsap.to(".open_eyes", {
        opacity: 100,
        duration: 0.2,
        ease: "power2.easeIn"
    });


    var timeline = gsap.timeline({
        paused: true,
        repeat: 1,
        repeatDelay: 3,
    yoyo: true,
        onCompleteParams: ['{self}'],
        onComplete: () => {
        gsap.delayedCall((7 * Math.random() + 0.6), timeline.restart, [], timeline);
        }
    });



    timeline.add([open,closed]);
    timeline.progress(0);
    timeline.play();


}


function waveArmAnimation() {

    gsap.fromTo(".wave_arm", {
        rotation: 0,
        repeat: -1,
    
        transformOrigin: "bottom left 50%",
        ease: Linear.easeNone,
        yoyo: true,
        //immediateRender: false,
        delay: 1
        },
        {
            rotation: -10,
            duration: 1,
            repeat: -1,
           // transformOrigin: "bottom left 50%",
            ease: Linear.easeNone,
            yoyo: true,
         //   immediateRender: false,
            //delay: 2.2
        
        });
}


for (var i = 0; i < numPoints; i++) {

    // var ratio = i / (numPoints - 1);
    var ratio = Power1.easeInOut.getRatio(i / (numPoints - 1));

    points.push({
        x: 0,
        y: 0,
        ratio: ratio,
        startX: startX + i * segmentSize,
        startY: startY
    });
}

var tl =  gsap.timeline({
    onUpdate: update,
    repeat: -1,
    yoyo: true,
})
gsap.to(wave, 3, {
        speed: 0.2,
        xOffset: 3,
        yOffset: 10,
        ease: "Sine.easeInOut"
    }, 2)
    .set({}, {}, "+=2");

function update() {

    count -= wave.speed;

    for (var i = 0; i < numPoints; i++) {

        var p = points[i];

        p.x = p.startX + Math.cos((i * wave.xPhase) + count) * wave.xOffset * p.ratio;
        p.y = p.startY + Math.sin((i * wave.yPhase) + count) * wave.yOffset * p.ratio;
    }

    tail.setAttribute("d", cardinalSpline(points));
}

function cardinalSpline(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    var size = data.length - (closed ? 0 : 1);
    var path = "M" + data[0].x + " " + data[0].y + " C";

    for (var i = 0; i < size; i++) {

        var p0, p1, p2, p3;

        if (closed) {
            p0 = data[(i - 1 + size) % size];
            p1 = data[i];
            p2 = data[(i + 1) % size];
            p3 = data[(i + 2) % size];

        } else {
            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i == size - 1 ? p2 : data[i + 2];
        }

        var x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        var y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        var x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        var y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}

