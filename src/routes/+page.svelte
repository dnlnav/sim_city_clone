<script lang="ts">
	import { onMount } from 'svelte';
	import { createScene } from './scene';
	import * as THREE from 'three';
	import { createCamera } from './camera';
	import { createCity } from './city';

	let gameWindow: HTMLElement;
	let sceneProps: {
		mesh?: THREE.Mesh;
		scene?: THREE.Scene;

		renderer?: THREE.WebGLRenderer;
	} = {};
	let camera: ReturnType<typeof createCamera>;
	$: ({ scene, renderer } = sceneProps);

	function draw() {
		if (!scene || !camera) return;

		renderer?.render(scene, camera.camera);
	}

	function start() {
		const { renderer } = sceneProps;
		renderer?.setAnimationLoop(draw);
	}

	onMount(() => {
		const newScene = createScene(gameWindow);
		const city = createCity(8);
		if (!newScene) return;

		newScene.initialize(city);
		sceneProps = newScene;
		camera = createCamera(gameWindow);
		start();
	});
</script>

<svelte:document
	on:mousemove={(event) => camera?.onMouseMove(event)}
	on:mouseup={(event) => camera?.onMouseUp()}
	on:mousedown={(event) => camera?.onMouseDown(event)}
/>

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
