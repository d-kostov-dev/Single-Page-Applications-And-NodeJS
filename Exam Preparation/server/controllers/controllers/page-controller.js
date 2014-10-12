var repository = require("../../repositories/getRepository")("Page");

console.log("--> Pages Controller Loaded");

var CONTROLLER_NAME = "pages";

module.exports = {
    name: CONTROLLER_NAME,
    createItem: function(req, res) {
        var newItemData = req.body;
        newItemData.dateCreated = new Date();
        var errors = [];

        // Validation
        if(newItemData.title.length < 6){
            errors.push('Title must be at least 6 symbols!');
        }

        if (newItemData.content.length < 6) {
            errors.push('Content must be at least 6 symbols!');
        }

        if(errors.length > 0){
            req.session.error = errors;
            res.redirect("/" + CONTROLLER_NAME + '/create');
        } else {
            repository.createItem(newItemData, function(err, result){
                if (err) {
                    req.session.error = "Error occurred: " + err;
                }

                res.redirect('/admin-panel');
            });
        }
    },
    updateItem: function(req, res) {
            var newItemData = req.body;
            var errors = [];

            // Validation

            if(errors.length > 0){
                req.session.error = errors;
                res.redirect("/" + CONTROLLER_NAME + '/edit');
            } else {
                repository.updateItem(newItemData, function (err) {
                    if (err) {
                        req.session.error = "Error occurred: " + err;
                        res.redirect('/admin-panel');
                    } else {
                        res.redirect('/admin-panel');
                    }
                });
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
        edit: function(req, res) {
            repository.findById(req.params.id, function (err, result) {
                if (err) {
                    req.session.error = "Error occurred: " + err;
                    res.redirect('/admin-panel');
                }else{
                    res.render(CONTROLLER_NAME + '/edit', {pageData: result});
                }
            });
        },
        create: function(req, res) {
            res.render(CONTROLLER_NAME + '/create')
        },
        viewPage: function(req, res) {
            repository.findById(req.params.id, function (err, result) {
                if (err) {
                    req.session.error = "Error occurred: " + err;
                    res.redirect('/');
                }else{
                    res.render(CONTROLLER_NAME + '/view-page', {pageData: result});
                }
            });
        }
    }
};