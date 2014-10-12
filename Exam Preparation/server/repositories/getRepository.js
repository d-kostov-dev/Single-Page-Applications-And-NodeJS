module.exports = function(type) {
    var Model = require('mongoose').model(type);

    console.log("--> " + type +" Repository Loaded");

    return {
        name: type,
        createItem: function(entity, callback) {
            Model.create(entity, callback);
        },
        updateItem: function (entity, callback) {
            Model.update({_id: entity._id}, entity, callback);
        },
        deleteItem: function (id, callback) {
            Model.remove({_id: id }, callback);
        },
        findAll: function (callback) {
            Model.find({}).exec(callback);
        },
        findById: function (id, callback) {
            Model.findOne({_id: id}).exec(callback);
        },
        countAll: function (callback) {
            Model.find().count(callback);
        }
    }
};