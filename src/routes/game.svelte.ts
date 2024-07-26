import { createCity } from './city.svelte';
import { createScene } from './scene.svelte';

export const createGame = (gameWindow: HTMLElement) => {
	const newScene = createScene(gameWindow);
	const city = createCity(8);
	if (!newScene) return;
	newScene.initialize(city);
	const { onMouseDown, onMouseMove, onMouseUp } = newScene;

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
