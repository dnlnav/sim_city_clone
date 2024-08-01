import * as THREE from 'three';
import { type createCity, mapTiles, type TileType } from './city.svelte';
import { createAssetInstance, type MeshType } from './assets';
import { createCamera } from './camera.svelte';
import { assoc } from 'ramda';

type renderParamsType = {
	scene: THREE.Scene;
	renderer: THREE.WebGLRenderer;
	camera: ReturnType<typeof createCamera>;
};

type onObjectSelectedType = (objectSelected: MeshType) => void;

const setupLights = (scene: THREE.Scene) => {
	const lights = [
		new THREE.AmbientLight(0xffffff, 0.5),
		new THREE.DirectionalLight(0xffffff, 0.7),
		new THREE.DirectionalLight(0xffffff, 0.7),
		new THREE.DirectionalLight(0xffffff, 0.7)
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

const updateMesh = (
	scene: THREE.Scene,
	{ x, y, building, buildingMesh: existingBuildingMesh }: TileType
) => {
	if (existingBuildingMesh) scene.remove(existingBuildingMesh);

	if (!building) return;

	const mesh = createAssetInstance(building.id, x, y, building);
	scene.add(mesh);
	return mesh;
};

export function createScene(gameWindow: HTMLElement, city: ReturnType<typeof createCity>) {
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
	let onObjectSelected: onObjectSelectedType | null = $state(null);

	const initialize = (_onObjectSelected: onObjectSelectedType) => {
		scene.clear();
		terrain = mapTiles(city.data, ({ x, y, terrainId }: TileType) => {
			if (!terrainId) return;
			const mesh = createAssetInstance(terrainId, x, y);
			scene.add(mesh);
			return mesh;
		});
		setupLights(scene);
		start({ scene, renderer, camera });
		onObjectSelected = _onObjectSelected;
	};

	const getUpdateTile = (tile: TileType) => assoc('buildingMesh', updateMesh(scene, tile), tile);

	const update = () => {
		city.update(getUpdateTile);
	};

	const updateTile = (pos: { x: number; y: number }, newObject: Partial<TileType>) => {
		city.updateTile(pos, newObject, getUpdateTile);
	};

	const onMouseDown = (event: MouseEvent) => {
		camera.onMouseDown(event);
		mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera.camera);
		const intersections = raycaster.intersectObjects(scene.children, false);

		if (!(intersections?.[0]?.object instanceof THREE.Mesh)) return;

		if (selectedObject) selectedObject.material.emissive.setHex(0);
		selectedObject = intersections[0].object as MeshType;
		if (!selectedObject) return;
		selectedObject.material.emissive.setHex(0x555555);

		onObjectSelected?.(selectedObject);
	};

	const onMouseUp = () => {
		camera.onMouseUp();
	};

	const onMouseMove = (event: MouseEvent) => {
		camera.onMouseMove(event);
	};

	return {
		scene,
		renderer,
		terrain,
		initialize,
		update,
		updateTile,
		onMouseDown,
		onMouseUp,
		onMouseMove
	};
}
