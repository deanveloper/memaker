<script>
import LayerWindow from "./LayerWindow.svelte";
	let selected = undefined;
	let editCurrentLayer = false;
	let layers = [
		{ type: "image", value: "https://i.imgur.com/9iwuJCU.jpeg", loaded: false },
		{ type: "text", value: "some sample text" }
	];

	function onLayerClick(i) {
		if (i != selected) {
			editCurrentLayer = false;
			selected = i;
		}
	}
	function onLayerDblClick() {
		editCurrentLayer = true;
	}

	$: if (editCurrentLayer && selected === undefined) {
		editCurrentLayer = false;
	}
</script>

<div class="maker" on:click={() => selected = undefined}>
	{#each layers as layer, i}
		{#if layer.type === 'image'}
			<LayerWindow loaded={layer.loaded === true} selected={selected === i} on:click={() => onLayerClick(i)} on:dblclick={onLayerDblClick}>
				<img class='layer' alt="" src={layer.value} on:load={() => layer.loaded = true} />
			</LayerWindow>
		{:else if layer.type === 'text'}
			<LayerWindow loaded={true} selected={selected === i} editing={selected === i && editCurrentLayer} on:click={() => onLayerClick(i)} on:dblclick={onLayerDblClick}>
				<span class='layer' contenteditable={selected === i && editCurrentLayer}>{layer.value}</span>
			</LayerWindow>
		{/if}
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
.layer {
	margin: 0;
	padding: 0;
}
</style>