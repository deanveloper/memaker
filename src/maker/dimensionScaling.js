
// scales the given dimensions.
//
// handle is a cardinal direction representing which handle is being moved.
// diff is the amount that this handle is being moved to. The anchor point
// of the scaling is the opposite of the handle.
//
// returns a diff for `position` and `dimensions`, these diffs can be added to
// whatever is being scaled in order to scale it properly.
export function scale(handle, diff) {
	const positionDiff = {
		top: 0,
		left: 0,
	};
	const dimensionsDiff = {
		width: 0,
		height: 0,
	};
	if (handle.includes('north')) {
		dimensionsDiff.height -= diff.y;
		positionDiff.top += diff.y;
	}
	if (handle.includes('south')) {
		dimensionsDiff.height += diff.y;
	}
	if (handle.includes('west')) {
		dimensionsDiff.width -= diff.x;
		positionDiff.left += diff.x;
	}
	if (handle.includes('east')) {
		dimensionsDiff.width += diff.x;
	}

	return {
		position: positionDiff,
		dimensions: dimensionsDiff,
	};
}

// scales the given dimensions, while keeping the aspect ratio the same.
//
// handle is a cardinal direction representing which handle is being moved.
// diff is the amount that this handle is being moved to.
// ratio is the aspect ratio (width / height).
//
// returns a diff for `position` and `dimensions`, these diffs can be added to
// whatever is being scaled in order to scale it properly.
export function scaleKeepRatio(handle, diff, ratio) {
	if (handle.includes("-")) {
		return scaleKeepRatioCorner(handle, diff, ratio);
	} else {
		return scaleKeepRatioSide(handle, diff, ratio);
	}
}


function scaleKeepRatioCorner(handle, diff, ratio) {
	const toCenterVector = {
		x: handle.includes('west') ? 1 : -1,
		y: handle.includes('south') ? -ratio : ratio,
	};
	const toCenterVectorLength = Math.sqrt(1 + ratio*ratio);
	const toCenterVectorNormalized = {
		x: toCenterVector.x / toCenterVectorLength,
		y: toCenterVector.y / toCenterVectorLength,
	};

	// dot(diff, ratio) / norm(ratio)
	const ratioLineComponentLength = ((diff.x * toCenterVector.x) + (diff.y * toCenterVector.y)) / toCenterVectorLength;

	const scalingVector = {
		x: toCenterVectorNormalized.x * ratioLineComponentLength,
		y: toCenterVectorNormalized.y * ratioLineComponentLength,
	}
	console.log(scalingVector);

	return scale(handle, scalingVector);
}

function scaleKeepRatioSide(handle, diff, ratio) {
	const positionDiff = {
		top: 0,
		left: 0,
	};
	const dimensionsDiff = {
		width: 0,
		height: 0,
	};

}