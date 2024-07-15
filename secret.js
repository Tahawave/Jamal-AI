import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

        import { OrbitControls } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/controls/OrbitControls.js';
        import { GLTFLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/jsm/loaders/GLTFLoader.js';

        let scene, camera, renderer, controls;
        let table, ball, player1, player2;
        let ballBody, player1Body, player2Body, world;

        function init() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 5, 10);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(0, 10, 10).normalize();
            scene.add(directionalLight);

            const tableGeometry = new THREE.BoxGeometry(10, 0.2, 5);
            const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            table = new THREE.Mesh(tableGeometry, tableMaterial);
            scene.add(table);

            const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
            const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            ball = new THREE.Mesh(ballGeometry, ballMaterial);
            scene.add(ball);

            const loader = new GLTFLoader();
            loader.load('path/to/player_model.glb', function (gltf) {
                player1 = gltf.scene;
                player1.scale.set(0.5, 0.5, 0.5);
                scene.add(player1);

                player2 = gltf.scene.clone();
                player2.scale.set(0.5, 0.5, 0.5);
                scene.add(player2);

                animate();
            });

            world = new CANNON.World();
            world.gravity.set(0, -9.82, 0);

            const tableShape = new CANNON.Box(new CANNON.Vec3(5, 0.1, 2.5));
            const tableBody = new CANNON.Body({ mass: 0 });
            tableBody.addShape(tableShape);
            world.addBody(tableBody);

            const ballShape = new CANNON.Sphere(0.2);
            ballBody = new CANNON.Body({ mass: 1 });
            ballBody.addShape(ballShape);
            world.addBody(ballBody);

            const playerShape = new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5));
            player1Body = new CANNON.Body({ mass: 0 });
            player1Body.addShape(playerShape);
            world.addBody(player1Body);

            player2Body = new CANNON.Body({ mass: 0 });
            player2Body.addShape(playerShape);
            world.addBody(player2Body);

            ballBody.position.set(0, 0.5, 0);
            player1Body.position.set(-4.5, 1, 0);
            player2Body.position.set(4.5, 1, 0);

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);
            world.step(1 / 60);

            ball.position.copy(ballBody.position);
            player1.position.copy(player1Body.position);
            player2.position.copy(player2Body.position);

            moveAI(player1Body, ballBody);
            moveAI(player2Body, ballBody);

            controls.update();
            renderer.render(scene, camera);
        }

        function moveAI(playerBody, ballBody) {
            const mistakeProbability = 0.1;

            if (Math.random() > mistakeProbability) {
                if (playerBody.position.z < ballBody.position.z) {
                    playerBody.position.z += 0.05;
                } else if (playerBody.position.z > ballBody.position.z) {
                    playerBody.position.z -= 0.05;
                }
            }
        }

        init();
    </script>
</body>
</html>

