import * as THREE from 'three';
import { updateTiles, type buildingValue, type cityType, type tileType } from './city.svelte';
import { ASSETS_IDS, createAssetInstance, type AssetType, type MeshType } from './assets';
import { createCamera } from './camera.svelte';

type renderParamsType = {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: ReturnType<typeof createCamera>;
};

const setupLights = (scene: THREE.Scene) => {
	const lights = [
		new THREE.AmbientLight(0xffffff, 0.2),
		new THREE.DirectionalLight(0xffffff, 0.3),
		new THREE.DirectionalLight(0xffffff, 0.3),
		new THREE.DirectionalLight(0xffffff, 0.3)
	];

	lights[1].position.set(0, 1, 0);
	lights[2].position.set(1, 1, 0);
	lights[3].position.set(0, 1, 1);
	scene.add(...lights);
};

const start = (renderParams: renderParamsType) => {
	renderParams.renderer?.setAnimationLoop(() => draw(renderParams));
};

const draw = ({ renderer, scene, camera }: renderParamsType) => {
	if (!scene || !camera) return;

	renderer?.render(scene, camera.camera);
};

const isBuilding = (asset: AssetType | null): asset is buildingValue =>
	!!asset && asset !== ASSETS_IDS.grass;

export function createScene(gameWindow: HTMLElement) {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x777777);

	const camera = createCamera(gameWindow);
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
	gameWindow.appendChild(renderer.domElement);

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	let selectedObject: MeshType | undefined = undefined;
	let terrain: (MeshType | undefined)[][] = $state([]);
	let buildings: (MeshType | undefined)[][] = $state([]);

	const initialize = ({ data }: { data: cityType }) => {
		scene.clear();
		terrain = updateTiles(data, ({ x, y }: tileType) => {
			const terrainId = data[x][y].terrainId;
			if (!terrainId) return;
			const mesh = createAssetInstance(terrainId, x, y);
			scene.add(mesh);
			return mesh;
		});
		setupLights(scene);
		start({ scene, renderer, camera });
	};

	const update = ({ data }: { data: cityType }) => {
		buildings = updateTiles(data, ({ x, y, buildingId }) => {
			if (!isBuilding(buildingId)) return;
			const currentBuilding = buildings?.[x]?.[y];

			const currentBuildingId = currentBuilding?.userData.id;
			const newBuildingId = buildingId;

			// If a player removes a building, remove it from the scene
			if (currentBuildingId && !newBuildingId) {
				if (currentBuilding) scene.remove(currentBuilding);
				return;
			}

			// If the data model has changed, update the mesh
			if (currentBuildingId !== newBuildingId) {
				if (currentBuilding) scene.remove(currentBuilding);
				const mesh = createAssetInstance(buildingId, x, y);
				scene.add(mesh);
				return mesh;
			}
		});
	};

	const onMouseDown = (event: MouseEvent) => {
		camera.onMouseDown(event);
		mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera.camera);
		const intersections = raycaster.intersectObjects(scene.children, false);

		if (!(intersections?.[0]?.object instanceof THREE.Mesh)) return;

		debugger;
		if (selectedObject) selectedObject.material.emissive.setHex(0);
		selectedObject = intersections[0].object;
		selectedObject.material.emissive.setHex(0x555555);
	};

	const onMouseUp = (event: MouseEvent) => {
		camera.onMouseUp();
	};

	const onMouseMove = (event: MouseEvent) => {
		camera.onMouseMove(event);
	};

	return {
		terrain,
		buildings,
		scene,
		renderer,
		initialize,
		update,
		onMouseDown,
		onMouseUp,
		onMouseMove
	};
}
