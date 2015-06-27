var _ = require('underscore');
require('./PLYLoader');

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
        {name: "outputCloud", arguments: ["player"]}
    ];

    self.name = self.options.name;

    self.world;

    self.clouds = [];
};

BlueprintOutputPointCloud.prototype = Object.create(VIZI.BlueprintOutput.prototype);

BlueprintOutputPointCloud.prototype.init = function() {
    var self = this;

    self.cloudMaterial = new THREE.PointCloudMaterial({
        color: 0xe61885,
        size: 1.0
    });


    self.boxMaterial = new THREE.MeshBasicMaterial({
        color: 0xe61885
    });

}

BlueprintOutputPointCloud.prototype.loadPointCloud = function(cloud) {
    var self = this;
    var loader = new THREE.PLYLoader();
    loader.addEventListener( 'load', function ( event ) {
        var pointCloudGeometry = event.content;
        var mesh = new THREE.PointCloud(pointCloudGeometry, self.cloudMaterial);
        mesh.position.x = cloud.geoCoord.x;
        mesh.position.z = cloud.geoCoord.y;
        mesh.position.y = 0;
        mesh.rotation.x = Math.PI;
        mesh.rotation.y = -Math.PI/2;
        mesh.scale.set(10, 10, 10);
        self.add(mesh);
    });
    loader.load( cloud.plys[0] );
}



BlueprintOutputPointCloud.prototype.outputCloud = function(cloud) {
    var self = this;

    var coords = cloud.coordinates;

    var points = cloud.points;

    var offset = new VIZI.Point();

    var geoCoord = self.world.project(new VIZI.LatLon(coords[0],coords[1]));
    cloud.geoCoord = geoCoord;
    var height = 100;
    var geom = new THREE.BoxGeometry(2, height, 2);

    var mesh = new THREE.Mesh(geom, self.boxMaterial);

    mesh.position.y = height/2;
    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;

    mesh.matrixAutoUpdate && mesh.updateMatrix();

    self.add(mesh);

    if (cloud.processed) {
        self.loadPointCloud(cloud);
    }

}


BlueprintOutputPointCloud.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPointCloud;
