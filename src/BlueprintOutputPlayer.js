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

    self.materials = {
        "Blue Team" : new THREE.MeshLambertMaterial({
            color: 0x8500e6
        }),
        "Red Team" : new THREE.MeshLambertMaterial({
            color: 0xe60085
        })
    };

    self.whateverMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true
    });
}

function toRad(d) {
    return d* Math.PI / 180;
}

BlueprintOutputPlayer.prototype.spawnPlayer = function(player) {
    var self = this;

    var pt = new VIZI.LatLon(player.coordinates[0],player.coordinates[1]);
    var geoCoord = self.world.project(pt);

    var mat = self.materials[player.team] || self.whateverMaterial;

    var geom = new THREE.BoxGeometry(2, 2, 10);
    var mesh = new THREE.Mesh(geom, mat);

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

BlueprintOutputPlayer.prototype.killPlayer = function(player) {
    var self = this;
    var mesh = self.players[player.id];
    self.remove(mesh);
    delete self.players[player.id];
}


BlueprintOutputPlayer.prototype.updatePlayer = function(player) {
    var self = this;

    if (!player.coordinates) {
        return;
    }

    if (!self.players[player.id]) {
        return self.spawnPlayer(player);
    }

    if (player.state !== "in game") {
        return self.killPlayer(player);
    }

    var pt = new VIZI.LatLon(player.coordinates[0],player.coordinates[1]);
    var geoCoord = self.world.project(pt);

    var mesh = self.players[player.id];

    mesh.position.x = geoCoord.x;
    mesh.position.z = geoCoord.y;

    if (player.orientation) {
        mesh.rotation.x = toRad(player.orientation[1]);
        mesh.rotation.y = toRad(player.orientation[2]);
        mesh.rotation.z = toRad(player.orientation[0]);
    }


}


BlueprintOutputPlayer.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPlayer;
