import * as THREE from 'three';
import { rangeLimit } from './utils';
import { degToRad } from 'three/src/math/MathUtils.js';
import { mean } from 'ramda';

const mouseButtonMapping = ['left', 'middle', 'right'] as const;

const Y_AXIS = new THREE.Vector3(0, 1, 0);
const CAMERA_RADIUS_LIMITS = { min: 10, max: 20 } as const;
const CAMERA_ELEVATION_LIMITS = { min: 30, max: 90 } as const;

const ROTATION_SENSITIVITY = 0.5;
const ZOOM_SENSITIVITY = 0.02;
const PAN_SENSITIVITY = -0.01;

const defaultMouseState = {
	left: false,
	middle: false,
	right: false
};

export const createCamera = (gameWindow: HTMLElement) => {
	const cameraOrigin = new THREE.Vector3();
	let cameraRadius = mean(Object.values(CAMERA_RADIUS_LIMITS));
	let cameraAzimuth = 135;
	let cameraElevation = 45;
	let isMouseButtonDown = defaultMouseState;
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
			case event.button === 0 && event.altKey:
				isMouseButtonDown = { ...defaultMouseState, right: true };
				break;
			case event.button === 0 && event.shiftKey:
				isMouseButtonDown = { ...defaultMouseState, middle: true };
				break;
			default:
				isMouseButtonDown = { ...defaultMouseState, [mouseButtonMapping[event.button]]: true };
		}
	}
	function onMouseUp() {
		isMouseButtonDown = defaultMouseState;
	}
	function onMouseMove(event: MouseEvent) {
		const deltaX = event.clientX - prevMouse.x;
		const deltaY = event.clientY - prevMouse.y;

		//camera rotation
		if (isMouseButtonDown.left) {
			cameraAzimuth += -deltaX * ROTATION_SENSITIVITY;
			cameraElevation = rangeLimit(
				cameraElevation + ROTATION_SENSITIVITY * deltaY,
				CAMERA_ELEVATION_LIMITS.min,
				CAMERA_ELEVATION_LIMITS.max
			);
			updateCameraPosition();
		}

		//camera pan
		if (isMouseButtonDown.middle) {
			const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, degToRad(cameraAzimuth));
			const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, degToRad(cameraAzimuth));
			cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
			cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
			updateCameraPosition();
		}

		//camera zoom
		if (isMouseButtonDown.right) {
			cameraRadius = rangeLimit(
				cameraRadius + deltaY * ZOOM_SENSITIVITY,
				CAMERA_RADIUS_LIMITS.min,
				CAMERA_RADIUS_LIMITS.max
			);
			updateCameraPosition();
		}
		// console.log({ isMouseButtonDown, cameraRadius, cameraAzimuth, cameraElevation, deltaX, deltaY })
		prevMouse = { x: event.clientX, y: event.clientY };
	}

	function updateCameraPosition() {
		if (!camera) return;

		camera.position.setFromSphericalCoords(
			cameraRadius,
			degToRad(-cameraElevation),
			degToRad(cameraAzimuth)
		);
		camera.position.add(cameraOrigin);
		camera.lookAt(cameraOrigin);
		camera.updateMatrix();
	}

	return { camera, onMouseDown, onMouseMove, onMouseUp };
};
