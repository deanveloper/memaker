<script>
import LayerWindow from "./LayerWindow.svelte";

	let layers = [
		{ type: "img", src: "https://i.imgur.com/9iwuJCU.jpeg" }
	];
</script>

<div class="maker">
	{#each layers as layer}
		<LayerWindow selected={layer.selected} on:click={ev => layer.selected = true}>
		{#if layer.type === 'img'}
			<img alt="" src={layer.src} />
		{/if}
		</LayerWindow>
	{/each}
</div>

<style>
.maker {
	position: absolute;
	width: 500px;
	height: 500px;

	border: 1px solid red;
	overflow: hidden;
}
</style>