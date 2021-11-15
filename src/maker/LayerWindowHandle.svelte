<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let mouse = false;

	function onMouseDown(ev) {
		if (ev.button === 0) {
			mouse = true;
		}
	}
	function onMouseUp(ev) {
		if (ev.button === 0) {
			mouse = false;
		}
	}
	function onMouseMove(ev) {
		if (mouse) {
			dispatch('move', {
				x: ev.movementX,
				y: ev.movementY
			})
		}
	}
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div
	on:mousedown|stopPropagation={onMouseDown}
></div>

<style>
	div {
		border: 1px solid black;
		background: white;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
</style>