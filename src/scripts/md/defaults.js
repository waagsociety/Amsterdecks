var defaults = {
		motionDisplay: {
      // Set the amount of particles per pixel
			particleRatio: 0.01,
      // Set the max age of the particles in simulation steps
			particleMaxAge: 100,
      // Only used for creating testing fields
			particleMaxSpeed: 100,
      // The speed of the particle flow
			particleSpdFactor: 0.1,
		},
		grid: {
			width: 1000,
			height: 600,
			circleDeviation: 1/4,//1/32,
			circleRevolutions: 1,
			distanceExponent: 1/100000,
			sineXTile: 3,
			sineYTile: 3,
			createField: function(width, height, callback){
				var field = [],
					cX = 0, cY = 0,
					p;

				while(cY < height){
					field.push.apply(field, callback ? callback(cX, cY, width, height) : [0,0]);

					cX++;
					
					if(cX === width){
						cX = 0;
						cY++;
					}
				}

				return field;				
			},
			//defaultFieldGenerator: 'circularFieldTuple',
			//defaultFieldGenerator: 'identityTuple',
			//defaultFieldGenerator: 'randomTuple',
			defaultFieldGenerator: 'sineTuple',
			identityTuple: function(x,y, width, height){
				var maxSpd = defaults.motionDisplay.particleMaxSpeed;

				return [x / width * maxSpd, y / width * maxSpd];
			},
			randomTuple: function(x, y, width, height){	
				var maxSpd = defaults.motionDisplay.particleMaxSpeed;
					
				return [
					Math.random() * maxSpd * (Math.random() > 0.5 ? 1 : -1),
					Math.random() * maxSpd * (Math.random() > 0.5 ? 1 : -1)
				];
			},
			circularFieldTuple: function(x, y, width, height){
				var maxSpd = defaults.motionDisplay.particleMaxSpeed,
					centerX = width / 2,
					centerY = height / 2,
					deviation = defaults.grid.circleDeviation * τ,
					revolutions = defaults.grid.circleRevolutions,
					distanceExponent = defaults.grid.distanceExponent,
					dX = centerX - x,// - x,
					dY = centerY - y,// - y,
					dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2)),
					maxDist = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)),
					angle = (Math.atan2(dY, dX) + Math.PI / 2 + deviation ) * revolutions;

				if(angle < 0) angle += τ;
				if(angle > τ) angle -= τ;

				return [
					fit(Math.cos(angle) * Math.pow(dist, distanceExponent), -Math.pow(maxDist, distanceExponent), Math.pow(maxDist, distanceExponent), -maxSpd, maxSpd),
					fit(Math.sin(angle) * Math.pow(dist, distanceExponent), -Math.pow(maxDist, distanceExponent), Math.pow(maxDist, distanceExponent), -maxSpd, maxSpd)
				];
			},
			sineTuple: function(x, y, width, height){
				var sineXTile = defaults.grid.sineXTile,
					sineYTile = defaults.grid.sineYTile,
					maxSpd = defaults.motionDisplay.particleMaxSpeed,
					t = fit(x, 0, width, 0, τ * sineXTile),
					r = fit(y, 0, height, 0, τ * sineYTile);
				return [-Math.sin(t) * maxSpd, -Math.sin(r) * maxSpd];
			}
		}
	};