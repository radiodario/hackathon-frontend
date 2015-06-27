var Firebase = require('firebase');
var _ = require('underscore');


var BlueprintInputPlayer = function(options) {
    var self = this;
    VIZI.BlueprintInput.call(self, options);
    _.defaults(self.options, {});


    self.triggers = [
        {name : "initialised", arguments: []},
        {name : "playerUpdated", arguments: ["player"] }
    ];

    self.actions = [];

}

BlueprintInputPlayer.prototype = Object.create(VIZI.BlueprintInput.prototype);

// sets up firebase and subscribes to events
BlueprintInputPlayer.prototype.init = function() {
    var self = this;

    this.player = new Firebase('https://splatmap.firebaseio.com/player');
    this.player.on('value', function(snapshot) {
        var player = snapshot.val();
        if (VIZI.DEBUG) console.log("player received", player);
        self.emit("playerUpdated", player);
    });

    self.emit("initialised");

};

module.exports = BlueprintInputPlayer;
