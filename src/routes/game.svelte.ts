import { createCity } from './city.svelte';
import { createScene } from './scene.svelte';
import { createToolbarId } from './toolbar/toolbarState.svelte';

export const createGame = (gameWindow: HTMLElement) => {
	const toolId = createToolbarId();

	const newScene = createScene(gameWindow);
	const city = createCity(8);
	if (!newScene) return;
	newScene.initialize(city, (objectSelected) => {
		const { x, y } = objectSelected.userData;
		const tile = city.data[x][y];
		console.log($state.snapshot(tile));

		if (toolId.activeToolId === 'bulldoze') {
			city.updateTile(x, y, { buildingId: null });
			newScene.update(city);
		} else if (!tile.buildingId) {
			city.updateTile(x, y, { buildingId: toolId.activeToolId });
			newScene.update(city);
		}
	});
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
		toolId,
		onMouseDown,
		onMouseMove,
		onMouseUp
	};
};
