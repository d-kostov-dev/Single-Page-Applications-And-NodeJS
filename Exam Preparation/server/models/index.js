var fs = require("fs");
var models = {};

var files = fs.readdirSync(__dirname + "/models");

for (var i = 0, len = files.length ; i < len; i++) {
    var currentFile = files[i];
    var currentModel = require("./models/" + currentFile);
    currentModel.seed();
}