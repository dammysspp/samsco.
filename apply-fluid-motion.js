const fs = require('fs');

// 1. Update cursor duration in script.js
let scriptUrl = 'script.js';
let scriptContent = fs.readFileSync(scriptUrl, 'utf8');

// The line is: gsap.to(cursor, { x: o, y: n, duration: .05, ease: "sine.out", overwrite: "auto" })
let targetStr = 'gsap.to(cursor, { x: o, y: n, duration: .05, ease: "sine.out", overwrite: "auto" })';
let replaceStr = 'gsap.to(cursor, { x: o, y: n, duration: .18, ease: "power3.out", overwrite: "auto" })';

if (scriptContent.includes(targetStr)) {
    scriptContent = scriptContent.replace(targetStr, replaceStr);
    console.log("Updated cursor easing in script.js!");
} else {
    console.log("Could not find exact cursor string to replace.");
}
fs.writeFileSync(scriptUrl, scriptContent, 'utf8');

// 2. Add Lenis to index.html
let htmlUrl = 'index.html';
let htmlContent = fs.readFileSync(htmlUrl, 'utf8');

// Insert Lenis before script.js
let gsapStr = '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>';
let lenisStr = `
    <!-- Lenis Smooth Scrolling -->
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
    <script>
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            direction: 'vertical', 
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        
        // Connect Lenis to GSAP ScrollTrigger
        if (typeof ScrollTrigger !== "undefined") {
            lenis.on('scroll', ScrollTrigger.update)
            gsap.ticker.add((time)=>{
              lenis.raf(time * 1000)
            })
            gsap.ticker.lagSmoothing(0)
        }
    </script>
`;

if (htmlContent.includes(gsapStr)) {
    if (!htmlContent.includes('lenis')) {
        htmlContent = htmlContent.replace(gsapStr, gsapStr + lenisStr);
        console.log("Added Lenis to index.html!");
    } else {
        console.log("Lenis already present in index.html");
    }
} else {
    console.log("Could not find GSAP in index.html");
}

fs.writeFileSync(htmlUrl, htmlContent, 'utf8');
