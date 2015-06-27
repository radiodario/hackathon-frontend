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



}

BlueprintOutputPointCloud.prototype.outputCloud = function(cloud) {
    var self = this;

    var coords = cloud.coordinates;


}


BlueprintOutputPointCloud.prototype.onAdd = function(world) {
  var self = this;
  self.world = world;
  self.init();
};

module.exports = BlueprintOutputPointCloud;
