import * as THREE from 'three';
import { type cityType } from './city.svelte';

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
				const geometry = new THREE.BoxGeometry(1, 1, 1);
				const material = new THREE.MeshLambertMaterial({ color: 0x009900 });
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, -0.5, y);
				scene.add(mesh);
				return mesh;
			})
		);
		setupLights();
	};

	const update = ({ data }: { data: cityType }) => {
		try {
			buildings = data.map((dataRow) =>
				dataRow.map(({ x, y, building: height }) => {
					if (height < 1) return;
					if (buildings[x][y]) scene.remove(buildings[x][y]);

					const geometry = new THREE.BoxGeometry(1, height, 1);
					const material = new THREE.MeshLambertMaterial({ color: 0x777777 });
					const mesh = new THREE.Mesh(geometry, material);
					mesh.position.set(x, height / 2, y);
					scene.add(mesh);
					return mesh;
				})
			);
		} catch {
			debugger;
		}
	};

	return { terrain, buildings, scene, renderer, initialize, update };
}
