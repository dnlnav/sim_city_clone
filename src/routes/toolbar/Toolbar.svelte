<script lang="ts">
	import { buttons, type createToolbarId } from './toolbarState.svelte';

	let { toolId }: { toolId: ReturnType<typeof createToolbarId> } = $props();
	const { activeToolId, setActiveToolId } = $derived(toolId);
</script>

<div class="toolbar">
	{#each buttons as button}
		<button
			class="ui-button"
			class:selected={button === activeToolId}
			onclick={() => setActiveToolId(button)}>{button}</button
		>
	{/each}
</div>

<style>
	.toolbar {
		background-color: #00000048;
		padding: 12px;
		position: absolute;
		top: 0;
		bottom: 0px;

		box-shadow: 0px 0px 1px black;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.ui-button {
		height: 48px;
		width: auto;
		margin: 4px 0;

		transition: background-color 0.1s ease-in-out;

		background-color: #1e2331cd;
		border: none;
		border-radius: 8px;

		color: lightgray;

		display: flex;
		justify-content: center;
		align-items: center;

		&.selected {
			background-color: #3a3f50d3;
			outline: 2px solid rgb(101, 101, 135);
		}

		&:not(.selected):hover {
			background-color: #121622d3;
		}
	}
</style>
