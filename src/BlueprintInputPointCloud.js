var Firebase = require('firebase');
var _ = require('underscore');


var BlueprintInputPointCloud = function(options) {
    var self = this;
    VIZI.BlueprintInput.call(self, options);
    _.defaults(self.options, {});


    self.triggers = [
        {name : "initialised", arguments: []},
        {name : "cloudReceived", arguments: ["cloud"] }
    ];

    self.actions = [];

}

BlueprintInputPointCloud.prototype = Object.create(VIZI.BlueprintInput.prototype);

// sets up firebase and subscribes to events
BlueprintInputPointCloud.prototype.init = function() {
    var self = this;

    this.clouds = new Firebase('https://splatmap.firebaseio.com/processedClouds');
    this.clouds.on('child_added', function(snapshot) {
        var cloud = snapshot.val();
        if (VIZI.DEBUG) console.log("cloud received", cloud);
        self.emit("cloudReceived", cloud);
    });

    self.emit("initialised");

};

module.exports = BlueprintInputPointCloud;
