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

    self.redCloudMaterial = new THREE.PointCloudMaterial({
        color: 0xe61885,
        size: 2.0
    });

    self.blueCloudMaterial = new THREE.PointCloudMaterial({
        color: 0x8518e6,
        size: 2.0
    });



    self.redMaterial = new THREE.MeshBasicMaterial({
        color: 0xe61885
    });

    self.blueMaterial = new THREE.MeshBasicMaterial({
        color: 0x8518e6
    });

    self.failMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true
        })

}

BlueprintOutputPointCloud.prototype.loadPointCloud = function(cloud) {
    var self = this;
    var loader = new THREE.PLYLoader();
    var mat = (cloud.playerTeam === 'Blue') ? self.blueCloudMaterial : self.redCloudMaterial;

    loader.addEventListener( 'load', function ( event ) {
        var pointCloudGeometry = event.content;
        var mesh = new THREE.PointCloud(pointCloudGeometry, mat);
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

    var mat = (cloud.team === 'Blue') ? self.blueMaterial : self.redMaterial;

    if (cloud.plys) {
        self.loadPointCloud(cloud);
        mat = self.failMaterial;
    }


    var mesh = new THREE.Mesh(geom, mat);

    mesh.position.y = height/2;
    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;
    if (cloud.orientation) {
        mesh.rotation.x = cloud.orientation[1];
        mesh.rotation.y = cloud.orientation[2];
        mesh.rotation.z = cloud.orientation[0];

    }

    mesh.matrixAutoUpdate && mesh.updateMatrix();

    self.add(mesh);



}


BlueprintOutputPointCloud.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPointCloud;
