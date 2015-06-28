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

    this.players = new Firebase('https://splatmap.firebaseio.com/players');
    this.players.on('value', function(snapshot) {
        var players = snapshot.val();
        Object.keys(players).map(function(k) {
            self.emit("playerUpdated", players[k]);
        });
        if (VIZI.DEBUG) console.log("player received", player);
    });


    self.emit("initialised");

};

module.exports = BlueprintInputPlayer;
