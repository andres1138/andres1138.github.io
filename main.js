TweenMax.fromTo("#wavearm", 1, {
    rotation: 0,
    repeat: -1,
    transformOrigin: "left 50%",
    ease: Linear.easeNone,
    yoyo: true,
    immediateRender: false,
    delay: 2.2
},
    {
        rotation: -14,
        repeat: -1,
        transformOrigin: "left 50%",
        ease: Linear.easeNone,
        yoyo: true,
        immediateRender: false,
        delay: 2.2

    }
);
 