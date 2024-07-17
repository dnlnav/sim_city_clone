import * as THREE from 'three';
import type { cityType } from './city';

export function createScene(gameWindow: HTMLElement) {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0x777777);

	if (!gameWindow?.offsetWidth || !gameWindow?.offsetHeight) return;

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
	gameWindow.appendChild(renderer.domElement);

	let meshes: THREE.Mesh[][] = [];

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

	const initialize = (city: cityType) => {
		scene.clear();
		meshes = city.data.map((dataRow) =>
			dataRow.map(({ x, y }) => {
				const geometry = new THREE.BoxGeometry(1, 1, 1);
				const material = new THREE.MeshLambertMaterial({ color: 0x009900 });
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, 0, y);
				scene.add(mesh);
				return mesh;
			})
		);
		setupLights();
	};

	return { meshes, scene, renderer, initialize };
}
