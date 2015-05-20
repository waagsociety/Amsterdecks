if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var clock = new THREE.Clock();
      // Store downloaded JSON in variable
      var json;

      var defaults = {
        url: 'data/water.amsterdam.json'
      };

			uniforms = {
				time: { type: "f", value: 1.0 },
				resolution: { type: "v2", value: new THREE.Vector2() }
			};
			
      var materials = new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader:   document.getElementById( 'vertexshader' ).textContent,
				fragmentShader: document.getElementById( 'fragmentshader').textContent
			});

      if (!Detector.webgl) {
        Detector.addGetWebGLMessage();
      }

      var container;
      var camera, controls, scene, renderer;
      var light, spotLight, ambientLight;
		
      function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
				renderer.setSize(container.clientWidth, container.clientHeight);
				controls.handleResize();
				render();
      }

      function animate() {
        requestAnimationFrame( animate );
				render();
        controls.update();
      }

      function render() {

				var delta = clock.getDelta();
				uniforms.time.value += delta * 5;

				renderer.render( scene, camera );
			}



			
      function init() {
				
        container = document.getElementById('map');

        camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 0.1, 10000);
        camera.position.z = Math.min(container.clientWidth, container.clientHeight);
        controls = new THREE.TrackballControls(camera, container);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.keys = [65, 83, 68];
        controls.addEventListener('change', render);

        // World
        scene = new THREE.Scene();

        // Lights
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);

        spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-1000, -1000, 1000);
        spotLight.castShadow = true;
        scene.add(spotLight);

        ambientLight = new THREE.AmbientLight(0x333333);
        scene.add(ambientLight);
				
				
        // Renderer
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Shadows
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.shadowCameraNear = 1;
        renderer.shadowCameraFar = camera.far;
        renderer.shadowCameraFov = 60;
        renderer.shadowMapBias = 0.0025;
        renderer.shadowMapDarkness = 0.5;
        renderer.shadowMapWidth = 1024;
        renderer.shadowMapHeight = 1024;

        window.addEventListener('resize', onWindowResize, false);
        onWindowResize();
        render();
        update();
      }

      function clearGroups() {
        if (json) {
          if (json.type === 'FeatureCollection') {
            json.features.forEach(function(feature) {
              scene.remove(feature._group);
            });
          } else if (json.type === 'Topology') {
            Object.keys(json.objects).forEach(function(key) {
              json.objects[key].geometries.forEach(function(object) {
                scene.remove(object._group);
              });
            });
          }
        }
        render();
      }

      function update() {
        clearGroups();

        var width = container.clientWidth;
        var height = container.clientHeight;

        // Read url from url textarea
        var url = "data/water.amsterdam.json";

        d3.json(url, function(data) {

          json = data;

          var functions = {};
          

          if (json.type === 'FeatureCollection') {

            var projection = getProjection(json, width, height);

            json.features.forEach(function(feature) {
              var group = addFeature(feature, projection, functions);
              feature._group = group;
            });

          } else if (json.type === 'Topology') {

            var geojson = topojson.merge(json, json.objects[Object.keys(json.objects)[0]].geometries);
            var projection = getProjection(geojson, width, height);

            Object.keys(json.objects).forEach(function(key) {
              json.objects[key].geometries.forEach(function(object) {
                var feature = topojson.feature(json, object);
                var group = addFeature(feature, projection, functions);
                object._group = group;
              });
            });

          } else {
            console.log('This tutorial only renders TopoJSON and GeoJSON FeatureCollections')
          }

          render();
        });
      }

      function addShape(group, shape, extrudeSettings, materials, color, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
				var mesh = new THREE.Mesh(geometry, materials);

        // Add shadows
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);
      }

      function addFeature(feature, projection, functions) {
        var group = new THREE.Group();
        scene.add(group);

        var color;
        var amount;

        var extrudeSettings = {
          amount: 5,
          bevelEnabled: false
        };

        if (feature.geometry.type === 'Polygon') {
          var shape = createPolygonShape(feature.geometry.coordinates, projection);
          addShape(group, shape, extrudeSettings, materials, color, 0, 0, 1, Math.PI, 0, 0, 1);
        } else if (feature.geometry.type === 'MultiPolygon') {
          feature.geometry.coordinates.forEach(function(polygon) {
            var shape = createPolygonShape(polygon, projection);
            addShape(group, shape, extrudeSettings, materials, color, 0, 0, 1, Math.PI, 0, 0, 1);
          });
        } else {
          console.log('This tutorial only renders Polygons and MultiPolygons')
        }
        return group;
      }

      window.onhashchange = function() {
        if (!disableHashChange) {
          parseHash(location.hash.substring(1))
        }
      };

      if (location.hash) {
        parseHash(location.hash.substring(1));
      }
			$('.views .3dmap').click(function(){
					// Initalize WebGL!
					init();
					animate();
				});