VIZI.BlueprintInputPointCloud = require('./BlueprintInputPointCloud');
VIZI.BlueprintOutputPointCloud = require('./BlueprintOutputPointCloud');

var CENTER = [51.5219363, -0.0846016];

var worldOptions = {
    viewport: document.querySelector("#map-viewport"),
    center: new VIZI.LatLon(CENTER[0], CENTER[1]),
    zoom: 19,
    antialias: false
};

var world = new VIZI.World(worldOptions);

var controls = new VIZI.ControlsMap(world.camera, {
    viewport: world.options.viewport
});

var mapConfig = require('./mapConfig');
var switchboardMap = new VIZI.BlueprintSwitchboard(mapConfig);
switchboardMap.addToWorld(world);

var buildingConfig = require('./buildingsConfig');
var switchboardBuildings = new VIZI.BlueprintSwitchboard(buildingConfig);
switchboardBuildings.addToWorld(world);



var clock = new VIZI.Clock();

var update = function() {
  var delta = clock.getDelta();

  world.onTick(delta);
  world.render();



  window.requestAnimationFrame(update);
};

update();
