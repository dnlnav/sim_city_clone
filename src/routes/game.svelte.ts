import * as THREE from 'three';
import { createCamera } from './camera.svelte';
import { createCity } from './city.svelte';
import { createScene } from './scene.svelte';

type renderParamsType = {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: ReturnType<typeof createCamera>;
};

const start = (renderParams: renderParamsType) => {
	renderParams.renderer?.setAnimationLoop(() => draw(renderParams));
};

const draw = ({ renderer, scene, camera }: renderParamsType) => {
	if (!scene || !camera) return;

	renderer?.render(scene, camera.camera);
};

export const createGame = (gameWindow: HTMLElement) => {
	const newScene = createScene(gameWindow);
	const city = createCity(8);
	if (!newScene) return;
	newScene.initialize(city);
	const scene: THREE.Scene = $state(newScene.scene);
	const renderer: THREE.WebGLRenderer = $state(newScene.renderer);
	const camera: ReturnType<typeof createCamera> = createCamera(gameWindow);
	const { onMouseDown, onMouseMove, onMouseUp } = camera;
	start({ scene, renderer, camera });

	const update = () => {
		city.update();
		newScene.update(city);
	};

	$effect(() => {
		setInterval(update, 1000);
	});

	return {
		update,
		onMouseDown,
		onMouseMove,
		onMouseUp
	};
};
