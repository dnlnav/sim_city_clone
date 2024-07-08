
import * as THREE from 'three';

export const createCamera = (gameWindow: HTMLElement) => {
    let cameraRadius = 3;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let mouseDown = false;
    let prevMouse = { x: 0, y: 0 };
    
    const camera = new THREE.PerspectiveCamera(
        75,
        gameWindow.offsetWidth / gameWindow.offsetHeight,
        0.1,
        1000
    );
    updateCameraPosition();

    function onMouseDown() {
        mouseDown = true;
    }
    function onMouseUp() {
        mouseDown = false;
    }
    function onMouseMove(event: MouseEvent) {
        if (!mouseDown) return;

        cameraAzimuth += 0.5 * (prevMouse.x - event.clientX);
        cameraElevation = Math.min(
            90,
            Math.max(0, cameraElevation + 0.5 * (event.clientY - prevMouse.y))
        );
        updateCameraPosition();
        prevMouse = { x: event.clientX, y: event.clientY };
    }

    function updateCameraPosition() {
        if (!camera) return;

        camera.position.set(
            cameraRadius *
            Math.sin((cameraAzimuth * Math.PI) / 180) *
            Math.cos((cameraElevation * Math.PI) / 180),
            cameraRadius * Math.sin((cameraElevation * Math.PI) / 180),
            cameraRadius *
            Math.cos((cameraAzimuth * Math.PI) / 180) *
            Math.sin((cameraElevation * Math.PI) / 180)
        );
        camera.lookAt(0, 0, 0);
        camera.updateMatrix();
    }

    return { camera, onMouseDown, onMouseMove, onMouseUp }

}