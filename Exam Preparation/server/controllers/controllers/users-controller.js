var encryption = require('../../utilities/encryption');
var repository = require("../../repositories/getRepository")("User");
var uploading = require("../../utilities/uploading");

console.log("--> Users Controller Loaded");

var CONTROLLER_NAME = "users";

module.exports = {
    name: CONTROLLER_NAME,
    createItem: function(req, res) {
        var newUserData = req.body;
        newUserData.registerDate = new Date();
        var errors = [];

        // Validation
        if(newUserData.username.length < 6){
            errors.push('Username must be at least 6 symbols!');
        }

        if (newUserData.password.length < 6) {
            errors.push('Password must be at least 6 symbols!');
        }

        if (newUserData.password !== newUserData.confirmPassword) {
            errors.push('Passwords do not match!');
        }

        if(errors.length > 0){
            req.session.error = errors;
            res.redirect('/register');
        } else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);

            uploading.createDir('/', newUserData.username);

            repository.createItem(newUserData, function(err, user){
                if (err) {
                    req.session.error = "Error occurred: " + err;
                    res.redirect('/register');
                }else{
                    res.redirect('/login');
                }
            });
        }
    },
    updateItem: function(req, res) {
        // Checks if the logged in user is the one edited or the user is admin!
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {

            var updatedUserData = req.body;
            var errors = [];

            // If there is a photo with the request save it to the user's folder
            if(req.files.photo !== undefined){
                updatedUserData.photo = req.files.photo.name;
                uploading.moveFile(req.files.photo.path, "/" + updatedUserData.username, req.files.photo.name);
            }

            // If password field is not empty change the password
            if (updatedUserData.password && updatedUserData.password.length > 0) {

                if (updatedUserData.password.length < 6) {
                    errors.push('Password must be at least 6 symbols!');
                }

                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            if(errors.length > 0){
                req.session.error = errors;
                res.redirect('/edit-profile');
            } else {
                repository.updateItem(updatedUserData, function (err) {
                    if (err) {
                        req.session.error = "Error occurred: " + err;
                        res.redirect('/profile');
                    } else {
                        // If the user is admin and not editing his own profile redirect to admin panel
                        if (req.user.roles.indexOf('admin') > -1 && updatedUserData.username !== req.user.username) {
                            res.redirect('/admin-panel');
                        } else {
                            res.redirect('/profile');
                        }
                    }
                });
            }
        }
        else {
            req.session.error = "You don't have permissions";
            res.redirect('/');
        }
    },
    deleteItem: function(req, res) {
        repository.deleteItem(req.params.id, function (err) {
            if (err) {
                req.session.error = "Error occurred: " + err;
                res.redirect('/admin-panel');
            }else{
                res.redirect('/admin-panel');
            }
        });
    },
    pages: {
        register: function(req, res) {
            res.render(CONTROLLER_NAME + '/register')
        },
        login: function(req, res) {
            res.render(CONTROLLER_NAME + '/login')
        },
        profile: function (req, res) {
            res.render(CONTROLLER_NAME + '/profile');
        },
        editProfile: function (req, res) {
            res.render(CONTROLLER_NAME + '/edit-profile');
        },
        adminPanel: function (req, res) {
            repository.findAll(function (err, collection) {
                if(err){
                    req.session.error = "Error occurred: " + err;
                    res.redirect('/');
                }

                res.render(CONTROLLER_NAME + '/admin-panel', {usersData: collection});
            });
        },
        editUser: function (req, res) {
            repository.findById(req.params.id, function (err, result) {
                res.render(CONTROLLER_NAME + '/edit-user', {userToEdit: result});
            });
        }
    }
};