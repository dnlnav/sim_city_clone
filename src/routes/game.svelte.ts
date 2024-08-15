import buildingFactory from './buildings';
import { createCity } from './city.svelte';
import { createScene } from './scene.svelte';
import { createToolbarId } from '$lib/components/toolbar/toolbarState.svelte';

export const createGame = (gameWindow: HTMLElement) => {
	const toolId = createToolbarId();
	const city = createCity(16);
	const scene = createScene(gameWindow, city);
	if (!scene) return;
	scene.initialize((objectSelected) => {
		const { x, y } = objectSelected.userData;
		const tile = city.data[x][y];

		if (toolId.activeToolId === 'bulldoze') {
			scene.updateTile({ x, y }, { building: undefined });
		} else if (!tile.building?.id) {
			scene.updateTile({ x, y }, { building: buildingFactory[toolId.activeToolId]() });
		}
	});
	const { onMouseDown, onMouseMove, onMouseUp } = scene;

	$effect(() => {
		setInterval(() => {
			scene.update();
		}, 1000);
	});

	return {
		toolId,
		onMouseDown,
		onMouseMove,
		onMouseUp
	};
};
