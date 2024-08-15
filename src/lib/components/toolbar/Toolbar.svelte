<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { buttons, type createToolbarId } from './toolbarState.svelte';

	import bulldozerImage from '$lib/icons/bulldozer-color.png';
	import houseImage from '$lib/icons/house-color.png';
	import officeImage from '$lib/icons/store-color.png';
	import factoryImage from '$lib/icons/factory-color.png';
	import roadImage from '$lib/icons/road-color.png';

	let { toolId }: { toolId: ReturnType<typeof createToolbarId> } = $props();
	const { activeToolId, setActiveToolId } = $derived(toolId);

	const IconMap = {
		bulldoze: bulldozerImage,
		residential: houseImage,
		commercial: officeImage,
		industrial: factoryImage,
		road: roadImage
	};
</script>

<div class="toolbar">
	{#each buttons as button}
		<Button
			onclick={(e) => {
				e.stopPropagation();
				setActiveToolId(button);
			}}
			active={activeToolId === button}
			><img class="button-icon" src={IconMap[button]} alt="button" /></Button
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
		gap: 36px;
	}

	.button-icon {
		height: 24px;
		width: auto;
	}
</style>
