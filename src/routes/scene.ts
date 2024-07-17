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

	const initialize = (city: cityType) => {
		scene.clear();
		meshes = city.data.map((dataRow) =>
			dataRow.map(({ x, y }) => {
				const geometry = new THREE.BoxGeometry(1, 1, 1);
				const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
				const mesh = new THREE.Mesh(geometry, material);
				mesh.position.set(x, 0, y);
				scene.add(mesh);
				return mesh;
			})
		);
	};

	return { meshes, scene, renderer, initialize };
}
