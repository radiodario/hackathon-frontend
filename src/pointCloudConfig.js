module.exports = {
input: {
  type: "BlueprintInputPointCloud",
  options: {
  }
},
output: {
  type: "BlueprintOutputPointCloud",
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
    triggerName: "cloudReceived",
    triggerArguments: ['cloud'],
    actionObject: "output",
    actionName: "outputCloud",
    actionArguments: ['cloud'],
    actionOutput: {
      cloud: "cloud"
    }
  }
]
}
