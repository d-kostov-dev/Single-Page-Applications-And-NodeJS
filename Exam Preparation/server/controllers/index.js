var fs = require("fs");
var controllers = {};

var files = fs.readdirSync(__dirname + "/controllers");

for (var i = 0, len = files.length ; i < len; i++) {
    var currentFile = files[i];
    var currentController = require("./controllers/" + currentFile);
    controllers[currentController.name] = currentController;
}

module.exports = controllers;