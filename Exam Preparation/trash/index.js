var fs = require("fs");
var repositories = {};

var files = fs.readdirSync(__dirname + "/repositories");

for (var i = 0, len = files.length ; i < len; i++) {
    var currentFile = files[i];
    var currentRepository = require("./repositories/" + currentFile);
    repositories[currentRepository.name] = currentRepository;
}

module.exports = repositories;