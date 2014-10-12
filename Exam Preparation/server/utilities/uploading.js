var fs = require('fs');

var FILES_DIR = __dirname + '../../../public/user-images';

module.exports = {
    createDir: function(path, dirName) {
        dirName = dirName || '';
        fs.mkdirSync(FILES_DIR + path + dirName);
    },
    moveFile: function(oldPath, newPath, filename) {
        if (!fs.existsSync(FILES_DIR + newPath)) {
            this.createDir(newPath);
        }

        var target_path = FILES_DIR + newPath + "/" + filename

        fs.rename(oldPath, target_path, function(err) {
            if (err) throw err;

            fs.unlink(oldPath, function (err) {
            });
        });
    }
};