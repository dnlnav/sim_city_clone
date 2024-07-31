<script lang="ts">
	import { onMount } from 'svelte';
	import { createGame } from './game.svelte';
	import Toolbar from './toolbar/Toolbar.svelte';

	let gameWindow: HTMLElement | undefined = $state();
	let game: ReturnType<typeof createGame> = $state();

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
	{#if game?.toolId}<Toolbar toolId={game.toolId} />{/if}
</div>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}
	#root-window {
		height: 100%;
		position: relative;
	}
	#render-target {
		height: 100%;
	}
</style>
