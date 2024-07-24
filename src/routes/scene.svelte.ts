import * as THREE from 'three';
import { type cityType } from './city.svelte';
import { createAssetInstance } from './assets';

export function createScene(gameWindow: HTMLElement) {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x777777);

	if (!gameWindow?.offsetWidth || !gameWindow?.offsetHeight) return;

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
	gameWindow.appendChild(renderer.domElement);

	let terrain: THREE.Mesh[][] = [];
	let buildings: (THREE.Mesh | undefined)[][] = $state([]);

	const setupLights = () => {
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

	const initialize = ({ data }: { data: cityType }) => {
		scene.clear();
		terrain = data.map((dataRow) =>
			dataRow.map(({ x, y }) => {
				const mesh = createAssetInstance('grass', x, y);
				if (mesh) scene.add(mesh);
				return mesh as THREE.Mesh;
			})
		);
		setupLights();
	};

	const update = ({ data }: { data: cityType }) => {
		buildings = data.map((dataRow) =>
			dataRow.map(({ x, y, building }) => {
				if (!building) return;
				if (buildings[x][y]) scene.remove(buildings[x][y]);
				const mesh = createAssetInstance(building, x, y);
				if (mesh) scene.add(mesh);
				return mesh as THREE.Mesh;
			})
		);
	};

	return { terrain, buildings, scene, renderer, initialize, update };
}
