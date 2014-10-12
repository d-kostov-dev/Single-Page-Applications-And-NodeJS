var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var itemSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    firstName: String,
    lastName: String,
    birthDate: Date,
    sex: String,
    photo: String,
    registerDate: String,
    salt: String,
    hashPass: String,
    roles: [String]
});

// I am validating only username. The other fields are not required when the user is created.
itemSchema.path('username').validate(function (value) {
    return value.length > 5;
}, 'Invalid Username');

itemSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;
        }
    }
});

var User = mongoose.model('User', itemSchema);

function seed() {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

//        User.remove({}, function(err) {
//            console.log('collection removed')
//        });

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456');

            User.create({
                username: 'pesho1',
                salt: salt,
                hashPass: hashedPwd,
                roles: ['admin']
            });

            console.log('--> Users added to database...');
        }
    });
}

console.log("--> User Model Loaded");

module.exports = {
    seed: seed
};
