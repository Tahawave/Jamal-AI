let scene, camera, renderer;
let robot;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add light to the scene
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    scene.add(light);

    // Add camera controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // Create a basic humanoid robot model
    const geometry = new THREE.BoxGeometry(1, 2, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0x2194ce });
    robot = new THREE.Mesh(geometry, material);
    scene.add(robot);

    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Example: Rotate the robot
    if (robot) {
        robot.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

init();


