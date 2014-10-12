var Model = require('mongoose').model('User');

console.log("--> User Repository Loaded");

module.exports = {
    name: "user",
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
};