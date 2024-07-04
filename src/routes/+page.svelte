<script lang="ts">
	import { onMount } from 'svelte';
	import { createScene } from './scene';
	import * as THREE from 'three';

	let gameWindow: HTMLElement;
	let sceneProps: {
		mesh?: THREE.Mesh;
		scene?: THREE.Scene;
		camera?: THREE.PerspectiveCamera;
		renderer?: THREE.WebGLRenderer;
	} = {};
	$: ({ mesh, scene, camera, renderer } = sceneProps);

	let cameraRadius = 3;
	let cameraAzimuth = 0;
	let cameraElevation = 0;
	let mouseDown = false;
	let prevMouse = { x: 0, y: 0 };

	function draw() {
		if (!scene || !camera) return;

		// mesh?.rotateX(0.01);
		// mesh?.rotateY(0.01);
		renderer?.render(scene, camera);
	}

	function start() {
		const { renderer } = sceneProps;
		renderer?.setAnimationLoop(draw);
	}

	function stop() {
		renderer?.setAnimationLoop(null);
	}

	function onMouseDown() {
		mouseDown = true;
	}
	function onMouseUp() {
		mouseDown = false;
	}
	function onMouseMove(event: MouseEvent) {
		if (!mouseDown) return;

		cameraAzimuth += 0.5 * (prevMouse.x - event.clientX);
		cameraElevation = Math.min(
			90,
			Math.max(0, cameraElevation + 0.5 * (event.clientY - prevMouse.y))
		);
		updateCameraPosition();
		prevMouse = { x: event.clientX, y: event.clientY };
	}

	function updateCameraPosition() {
		if (!camera) return;

		camera.position.set(
			cameraRadius *
				Math.sin((cameraAzimuth * Math.PI) / 180) *
				Math.cos((cameraElevation * Math.PI) / 180),
			cameraRadius * Math.sin((cameraElevation * Math.PI) / 180),
			cameraRadius *
				Math.cos((cameraAzimuth * Math.PI) / 180) *
				Math.sin((cameraElevation * Math.PI) / 180)
		);
		camera.lookAt(0, 0, 0);
		camera.updateMatrix();
	}

	onMount(() => {
		const newScene = createScene(gameWindow);
		if (!newScene) return;
		sceneProps = newScene;
		updateCameraPosition();
		start();
	});
</script>

<svelte:document on:mousemove={onMouseMove} on:mouseup={onMouseUp} on:mousedown={onMouseDown} />

<div id="root-window">
	<div id="render-target" bind:this={gameWindow}></div>
</div>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}
	#root-window {
		height: 100%;
	}
	#render-target {
		height: 100%;
	}
</style>
