// Setup Three.js scene here
let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Example: Add a cube to represent Optimus Prime
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Example: Add animation logic (rotate cube)
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.rotation.x += 0.01;
            child.rotation.y += 0.01;
        }
    });

    renderer.render(scene, camera);
}

init();

