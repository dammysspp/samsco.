/**
 * 3D Hero Particle Mesh (Three.js WebGL Renderer)
 * Generates an interactive, GPU-accelerated rotating particle sphere that responds to cursor coordinates.
 */

(() => {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. Geometry Creation (Particle Sphere)
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const randomDirections = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        // Random point on a sphere surface (radius = 2.2)
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.0 + Math.random() * 0.4; // slight thickness

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        // Random wave/jitter vectors
        randomDirections[i * 3] = Math.random() - 0.5;
        randomDirections[i * 3 + 1] = Math.random() - 0.5;
        randomDirections[i * 3 + 2] = Math.random() - 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // 3. Material Configuration (Dynamic Accent Color sync)
    function getAccentColor() {
        const style = getComputedStyle(document.documentElement);
        const accentHex = style.getPropertyValue("--accent-primary").trim() || "#0071e3";
        return new THREE.Color(accentHex);
    }

    const material = new THREE.PointsMaterial({
        size: 0.035,
        color: getAccentColor(),
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 4. Mouse Move Tracking (Normalized Device Coordinates)
    const mouse = { x: -999, y: -999, targetX: 0, targetY: 0 };
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mousePosition3D = new THREE.Vector3();

    window.addEventListener("mousemove", (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Handle mouse leaving window
    document.addEventListener("mouseleave", () => {
        mouse.targetX = -999;
        mouse.targetY = -999;
    });

    // 5. Animation Loop
    let clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();
        
        // Dynamic Accent Color Check
        material.color.copy(getAccentColor());

        // Slow system rotation
        particleSystem.rotation.y = time * 0.05;
        particleSystem.rotation.x = time * 0.03;

        // Smooth mouse coordinates interpolation
        if (mouse.targetX !== -999) {
            mouse.x += (mouse.targetX - mouse.x) * 0.1;
            mouse.y += (mouse.targetY - mouse.y) * 0.1;

            // Project mouse position to 3D plane
            raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
            raycaster.ray.intersectPlane(plane, mousePosition3D);
        } else {
            mouse.x = -999;
            mouse.y = -999;
        }

        const positionAttribute = geometry.getAttribute("position");
        const currentPositions = positionAttribute.array;

        // Distort particles based on sine wave oscillation and mouse distance
        for (let i = 0; i < particleCount; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // 1. Base sphere position
            let x = originalPositions[ix];
            let y = originalPositions[iy];
            let z = originalPositions[iz];

            // 2. Add organic noise wave distortion
            const wave = Math.sin(time + x * 0.8 + y * 0.5) * 0.12;
            x += randomDirections[ix] * wave;
            y += randomDirections[iy] * wave;
            z += randomDirections[iz] * wave;

            // 3. Mouse repulsion physics
            if (mouse.x !== -999) {
                const pVec = new THREE.Vector3(x, y, z);
                pVec.applyMatrix4(particleSystem.matrixWorld);

                const dist = pVec.distanceTo(mousePosition3D);
                if (dist < 1.6) {
                    const pushDir = new THREE.Vector3().subVectors(pVec, mousePosition3D).normalize();
                    const force = (1.6 - dist) * 0.45;
                    const offset = pushDir.multiplyScalar(force);
                    
                    const invMatrix = new THREE.Matrix4().copy(particleSystem.matrixWorld).invert();
                    offset.applyMatrix4(invMatrix);

                    x += offset.x;
                    y += offset.y;
                    z += offset.z;
                }
            }

            // Interpolate coordinates smoothly
            currentPositions[ix] += (x - currentPositions[ix]) * 0.1;
            currentPositions[iy] += (y - currentPositions[iy]) * 0.1;
            currentPositions[iz] += (z - currentPositions[iz]) * 0.1;
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate();

    // 6. Handle Resizing
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();
