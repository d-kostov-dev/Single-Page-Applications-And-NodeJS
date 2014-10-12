var userRepository = require("../../repositories/getRepository")("User");
var pageRepository = require("../../repositories/getRepository")("Page");

console.log("--> Admin Panel Controller Loaded");

var CONTROLLER_NAME = "adminPanel";

module.exports = {
    name: CONTROLLER_NAME,
    pages: {
        adminPanel: function (req, res) {
            userRepository.findAll(function (err, usersCollection) {
                if(err){
                    req.session.error = "Error occurred: " + err;
                    res.redirect('/');
                }

                pageRepository.findAll(function (err, pagesCollection) {
                    if(err){
                        req.session.error = "Error occurred: " + err;
                        res.redirect('/');
                    }

                    res.render(CONTROLLER_NAME + '/admin-panel', {usersData: usersCollection, pagesData: pagesCollection});
                });
            });
        }
    }
};