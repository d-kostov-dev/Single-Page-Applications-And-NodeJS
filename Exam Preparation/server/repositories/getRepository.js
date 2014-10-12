module.exports = function(type) {
    var Model = require('mongoose').model(type);

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
        },
        getAllWithPaging: function (page, callback, orderBy, orderType, whereObj, pageSize) {

            pageSize = pageSize || 10
            page = page || 1;
            orderType = orderType === 'desc' ? '-' : '';
            orderBy = orderBy || '_id';

            var query = Model.find()
                .where(whereObj)
                .sort(orderType + orderBy)
                .skip(pageSize * (page - 1))
                .limit(pageSize);

            query.exec(callback);
        }
    }
};