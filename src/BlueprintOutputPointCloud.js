var _ = require('underscore');

var BlueprintOutputPointCloud = function(options) {
    var self = this;
    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
        name: "Point Clouds"
    });

    self.triggers = [
        {name: "initialised", arguments: []}
    ];

    self.actions = [
        {name: "outputCloud", arguments: ["tweet"]}
    ];

    self.name = self.options.name;

    self.world;

    self.clouds = [];
};

BlueprintOutputPointCloud.prototype = Object.create(VIZI.BlueprintOutput.prototype);

BlueprintOutputPointCloud.prototype.init = function() {
    var self = this;

    self.material = new THREE.PointCloudMaterial({
        color: 0xe61885,
        size: 2.0
    });


    self.boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xe61885
    });



}

BlueprintOutputPointCloud.prototype.outputCloud = function(cloud) {
    var self = this;

    var coords = cloud.coordinates;

    var points = cloud.points;

    var offset = new VIZI.Point();

    var geoCoord = self.world.project(new VIZI.LatLon(coords[0],coords[1]));

    var height = 100;
    var geom = new THREE.BoxGeometry(2, height, 2);

    var mesh = new THREE.Mesh(geom, self.material);

    mesh.position.y = height/2;
    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;

    mesh.matrixAutoUpdate && mesh.updateMatrix();

    self.add(mesh);

    debugger;

}


BlueprintOutputPointCloud.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPointCloud;
