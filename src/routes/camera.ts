
import * as THREE from 'three';
import { range } from './utils';
import { degToRad } from 'three/src/math/MathUtils.js';

const mouseButtonMapping = [
    "left", "middle", "right"
] as const

const cameraRadiusLimits = { min: 2, max: 10 } as const

const defaultMouseState = {
    left: false,
    middle: false,
    right: false
}

export const createCamera = (gameWindow: HTMLElement) => {
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let isMouseButtonDown = defaultMouseState
    let prevMouse = { x: 0, y: 0 };

    const camera = new THREE.PerspectiveCamera(
        75,
        gameWindow.offsetWidth / gameWindow.offsetHeight,
        0.1,
        1000
    );
    updateCameraPosition();

    function onMouseDown(event: MouseEvent) {
        switch (true) {
            case (event.button === 0 && event.altKey):
                isMouseButtonDown = { ...defaultMouseState, right: true };
                break
            case (event.button === 0 && event.shiftKey):
                isMouseButtonDown = { ...defaultMouseState, middle: true };
                break
            default:
                isMouseButtonDown = { ...defaultMouseState, [mouseButtonMapping[event.button]]: true }
        }
    }
    function onMouseUp(event: MouseEvent) {
        isMouseButtonDown = defaultMouseState
    }
    function onMouseMove(event: MouseEvent) {
        const deltaX = event.clientX - prevMouse.x
        const deltaY = event.clientY - prevMouse.y


        //camera rotation
        if (isMouseButtonDown.left) {
            cameraAzimuth += -deltaX * 0.5;
            cameraElevation = range(cameraElevation + (0.5 * deltaY), 0, 90);
            updateCameraPosition();
        }

        //camera pan
        if (isMouseButtonDown.middle) {
        }

        //camera zoom
        if (isMouseButtonDown.right) {
            cameraRadius = range(cameraRadius + (deltaY * 0.02), cameraRadiusLimits.min, cameraRadiusLimits.max)
            console.log({cameraRadius})
            updateCameraPosition();
        }
        // console.log({ isMouseButtonDown, cameraRadius, cameraAzimuth, cameraElevation, deltaX, deltaY })
        prevMouse = { x: event.clientX, y: event.clientY };
    }

    function updateCameraPosition() {
        if (!camera) return;

        camera.position.setFromSphericalCoords(cameraRadius, degToRad(-cameraElevation), degToRad(cameraAzimuth),);
        camera.lookAt(0, 0, 0);
        camera.updateMatrix();
    }

    return { camera, onMouseDown, onMouseMove, onMouseUp }

}