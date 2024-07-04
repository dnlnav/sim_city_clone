import * as THREE from 'three';

export function createScene(gameWindow: HTMLElement) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    if (!gameWindow?.offsetWidth || !gameWindow?.offsetHeight) return;

    const camera = new THREE.PerspectiveCamera(
        75,
        gameWindow.offsetWidth / gameWindow.offsetHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return { mesh, scene, camera, renderer }
}