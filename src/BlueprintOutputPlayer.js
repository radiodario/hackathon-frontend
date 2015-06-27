var _ = require('underscore');
require('./PLYLoader');

var BlueprintOutputPlayer = function(options) {
    var self = this;
    VIZI.BlueprintOutput.call(self, options);

    _.defaults(self.options, {
        name: "Player"
    });

    self.triggers = [
        {name: "initialised", arguments: []}
    ];

    self.actions = [
        {name: "updatePlayer", arguments: ["player"]}
    ];

    self.name = self.options.name;

    self.world;

    self.players = {};
};

BlueprintOutputPlayer.prototype = Object.create(VIZI.BlueprintOutput.prototype);

BlueprintOutputPlayer.prototype.init = function() {
    var self = this;

    self.playerMaterial = new THREE.MeshBasicMaterial({
        color: 0x2218ff
    });

}

function toRad(d) {
    return d* Math.PI / 180;
}

BlueprintOutputPlayer.prototype.spawnPlayer = function(player) {
    var self = this;

    var pt = new VIZI.LatLon(player.coordinates[0],player.coordinates[1]);
    var geoCoord = self.world.project(pt);

    var geom = new THREE.BoxGeometry(2, 2, 10);
    var mesh = new THREE.Mesh(geom, self.playerMaterial);

    mesh.position.y = 10;
    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;

    mesh.rotation.x = toRad(player.orientation[1]);
    mesh.rotation.y = toRad(player.orientation[2]);
    mesh.rotation.z = toRad(player.orientation[0]);

    mesh.matrixAutoUpdate && mesh.updateMatrix();

    self.add(mesh);

    self.players[player.id] = mesh;

}


BlueprintOutputPlayer.prototype.updatePlayer = function(player) {
    var self = this;
    
    if (!self.players[player.id]) {
        return self.spawnPlayer(player);
    }

    var pt = new VIZI.LatLon(player.coordinates[0],player.coordinates[1]);
    var geoCoord = self.world.project(pt);

    var mesh = self.players[player.id];

    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;


    mesh.rotation.x = toRad(player.orientation[1]);
    mesh.rotation.y = toRad(player.orientation[2]);
    mesh.rotation.z = toRad(player.orientation[0]);


}


BlueprintOutputPlayer.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPlayer;
