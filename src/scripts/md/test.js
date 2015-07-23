function testGridInterpolation(){
	var grid = new Grid({
			width: 2,
			height: 2,
			field: [
				10,10,
				20,20,
				20,20,
				30,30
			]
		});

	var points = [
		{ x: 0, y: 0 },
		{ x: 0, y: 0.25 },
		{ x: 0, y: 0.5 },
		{ x: 0, y: 0.75 },
		{ x: 0, y: 1 },
		{ x: 0.25, y: 0 },
		{ x: 0.25, y: 0.25 },
		{ x: 0.25, y: 0.5 },
		{ x: 0.25, y: 0.75 },
		{ x: 0.25, y: 1 },
		{ x: 0.5, y: 0 },
		{ x: 0.5, y: 0.25 },
		{ x: 0.5, y: 0.5 },
		{ x: 0.5, y: 0.75 },
		{ x: 0.5, y: 1 },
		{ x: 0.75, y: 0 },
		{ x: 0.75, y: 0.25 },
		{ x: 0.75, y: 0.5 },
		{ x: 0.75, y: 0.75 },
		{ x: 0.75, y: 1 },
		{ x: 1, y: 0 },
		{ x: 1, y: 0.25 },
		{ x: 1, y: 0.5 },
		{ x: 1, y: 0.75 },
		{ x: 1, y: 1 }
	];

	points.forEach(function(p){
		console.log(p, grid.getLocalV(p));
	});
}


