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
tailArmAnimation();


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




function tailArmAnimation() {

    gsap.fromTo(".tail", {
        rotation: 0,
        duration: 0.5,
        delay: Math.random() + 0.3,
    
        transformOrigin: "bottom  50%",
        ease:  "power2.easeIn",
        yoyo: true,
        //immediateRender: false,
        
        },
        {
            rotation:  getRandomInt(-15),
            duration: 0.5,
            repeat: -1,
            repeatDelay: Math.random() + 0.6,
           // transformOrigin: "bottom left 50%",
            ease:  "power2.easeIn",
            yoyo: true,
         //   immediateRender: false,
            //delay: 2.2
        
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }