var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/Zagotovka',
        port: process.env.PORT || 1234
    },
    production: {
        rootPath: rootPath,
        db: 'no-online-database-yet',
        port: process.env.PORT || 1234
    }
};