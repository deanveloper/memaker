<script>
	import LayerWindowHandle from "./LayerWindowHandle.svelte";
	import { onMount } from 'svelte';
	import { scale, scaleKeepRatio } from './dimensionScaling.js';
	
	export let selected = false;
	export let padding = 0;

	let layerElem = undefined;
	let dimensions = {
		initialized: false,
		initial: {
			width: 0,
			height: 0,
		},
		current: {
			width: 0,
			height: 0,
		}
	}
	let position = {
		top: 0,
		left: 0,
	};

	$: scaleDimensions = {
		x: dimensions.current.width / dimensions.initial.width,
		y: dimensions.current.height / dimensions.initial.height,
	};
	$: scaleCss = `transform: scale(${scaleDimensions.x}, ${scaleDimensions.y}); transform-origin: top left;`;
	$: positionCss = `top: ${position.top}px; left: ${position.left}px;`;
	$: paddingCss = `padding: ${padding}px;`;
	$: dimensionsCss = dimensions.initialized ? `width: ${dimensions.current.width}px; height: ${dimensions.current.height}px;` : '';

	onMount(() => {
		dimensions.initial = {
			width: layerElem.offsetWidth,
			height: layerElem.offsetHeight,
		};
		dimensions.current = {
			width: layerElem.offsetWidth,
			height: layerElem.offsetHeight,
		};
		dimensions.initialized = true;
	});

	let holdingShift = false;
	let mouseIsDown = false;

	function handleKeyDown(ev) {
		if (ev.key === 'Shift') {
			holdingShift = true;
		}
	}
	function handleKeyUp(ev) {
		if (ev.key === 'Shift') {
			holdingShift = false;
		}
	}
	function onMouseDown(ev) {
		if (selected && ev.button === 0) {
			mouseIsDown = true;
		}
	}
	function onMouseUp(ev) {
		if (selected && ev.button === 0) {
			mouseIsDown = false;
		}
	}
	function onMouseMove(ev) {
		if (selected && mouseIsDown) {
			position.top += ev.movementY;
			position.left += ev.movementX;
		}
	}

	// function for move events fired from the handles
	function handleMove(which, movement) {
		const diffs = holdingShift ?
			scaleKeepRatio(which, movement, dimensions.current.height / dimensions.current.width) :
			scale(which, movement);
		position.top += diffs.position.top;
		position.left += diffs.position.left;
		dimensions.current.width = Math.max(1, dimensions.current.width + diffs.dimensions.width);
		dimensions.current.height = Math.max(1, dimensions.current.height + diffs.dimensions.height);
	}
</script>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<div class="layer"
	class:selected
	class:holdingShift
	style={positionCss + paddingCss + dimensionsCss}
	on:click
	on:mousedown|self={onMouseDown}
	bind:this={layerElem}
>
	<div class="handle northy westy north-west">
		<LayerWindowHandle on:move={mv => handleMove("north-west", mv.detail)} />
	</div>
	<div class="handle northy north">
		<LayerWindowHandle on:move={mv => handleMove("north", mv.detail)} />
	</div>
	<div class="handle northy easty north-east">
		<LayerWindowHandle on:move={mv => handleMove("north-east", mv.detail)} />
	</div>
	<div class="handle westy west">
		<LayerWindowHandle on:move={mv => handleMove("west", mv.detail)} />
	</div>
	<div class="handle easty east">
		<LayerWindowHandle on:move={mv => handleMove("east", mv.detail)} />
	</div>
	<div class="handle southy westy south-west">
		<LayerWindowHandle on:move={mv => handleMove("south-west", mv.detail)} />
	</div>
	<div class="handle southy south">
		<LayerWindowHandle on:move={mv => handleMove("south", mv.detail)} />
	</div>
	<div class="handle southy easty south-east">
		<LayerWindowHandle on:move={mv => handleMove("south-east", mv.detail)} />
	</div>

	<div class="container" style={scaleCss + positionCss}>
		<slot></slot>
	</div>
</div>

<style>
.layer {
	position: absolute;

	cursor: move;
	top: 0;
	left: 0;
}
.layer.selected {
	border: 1px dashed black;
}
.layer:not(.selected) .handle {
	display: none;
}

.handle {
	position: absolute;
	width: 10px;
	height: 10px;
}

.container {
	pointer-events: none;
	user-select: none;
}

.northy {
	bottom: 100%;
}
.southy {
	top: 100%;
}
.easty {
	left: 100%;
}
.westy {
	right: 100%;
}

.north-west, .south-east {
	cursor: nwse-resize;
}
.north-east, .south-west {
	cursor: nesw-resize;
}
.east, .west {
	cursor: ew-resize;
	top: calc(50% - 5px);
}
.north, .south {
	cursor: ns-resize;
	left: calc(50% - 5px);
}
</style>