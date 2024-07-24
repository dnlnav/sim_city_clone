<script lang="ts">
	import { onMount } from 'svelte';
	import { createGame } from './game.svelte';

	let gameWindow: HTMLElement | undefined = $state();
	let game: ReturnType<typeof createGame>;

	onMount(() => {
		if (!gameWindow) return;
		game = createGame(gameWindow);
	});
</script>

<svelte:document
	on:mousemove={(event) => game?.onMouseMove(event)}
	on:mouseup={() => game?.onMouseUp()}
	on:mousedown={(event) => game?.onMouseDown(event)}
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
