<!-- Based on https://codepen.io/nathanlong/pen/DmVPzE -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		onclick,
		active,
		children
	}: { onclick: (e: MouseEvent) => void; active: boolean; children: Snippet } = $props();

	const buttonsTypeList = [];
</script>

<div class="container">
	<!-- requires the ontouchstart="" to re-enable the :active pseudo class for mobile safari -->
	<button class="button" class:active {onclick}><span>{@render children()}</span></button>
</div>

<style>
	@import url(https://fonts.googleapis.com/css?family=Changa+One);
	:root {
		--button: #008752;
		--button-dark: #007849;
		--button-shadow: #004d2f;
		--font: 'Changa One', arial, serif;
	}

	/* Button Styles */
	.button span {
		display: inline-block;
		font-size: 2em;
		font-family: var(--font);
		padding: 0.625em 1em;
		background: var(--button);
		background-image: linear-gradient(var(--button), var(--button-dark));
		border-top: 1px solid rgba(255, 255, 255, 0.2);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		text-shadow: 0 -1px 1px rgba(7, 51, 34, 0.8);
		border-radius: 8px;
		transition: transform 0.05s ease-in-out;
	}

	.button {
		border: 0;
		padding: 0;
		background: transparent;
		display: inline-block;
		color: #eff6ec;
		text-decoration: none;
		cursor: pointer;
		border-radius: 8px;
		box-shadow:
			0 8px 0 var(--button-shadow),
			0 10px 15px rgba(0, 0, 0, 0.35);
		transition: box-shadow 0.2s ease-in-out;
	}

	.button:active {
		box-shadow:
			0 8px 0 var(--button-shadow),
			0 7px 10px rgba(0, 0, 0, 0.25);
	}

	.button:active span {
		transform: translate(0, 4px);
	}

	.container {
		max-width: 60em;
		margin: 2em auto;
		text-align: center;
	}
</style>
