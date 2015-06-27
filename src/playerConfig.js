module.exports = {
input: {
  type: "BlueprintInputPlayer",
  options: {
  }
},
output: {
  type: "BlueprintOutputPlayer",
  options: {
    infoUI: true,
  }
},
triggers: [
  {
    triggerObject: "output",
    triggerName: "initialised",
    triggerArguments: [],
    actionObject: "input",
    actionName: "",
    actionArguments: [],
    actionOutput: {}
  },
  {
    triggerObject: "input",
    triggerName: "playerUpdated",
    triggerArguments: ['player'],
    actionObject: "output",
    actionName: "updatePlayer",
    actionArguments: ['player'],
    actionOutput: {
      player: "player"
    }
  }
]
}
