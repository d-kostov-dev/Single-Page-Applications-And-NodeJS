var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    title: String,
    content: String,
    dateCreated:Date
});

itemSchema.path('title').validate(function (value) {
    return value.length > 5;
}, 'Invalid Title');

itemSchema.path('content').validate(function (value) {
    return value.length > 5;
}, 'Invalid Content');

var Page = mongoose.model('Page', itemSchema);

function seed() {
    Page.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find pages: ' + err);
            return;
        }

//        Page.remove({}, function(err) {
//            console.log('collection removed')
//        });

        if (collection.length === 0) {
            Page.create({
                title: "About Us",
                content: "About Us Page Content",
                dateCreated: new Date()
            });

            Page.create({
                title: "FAQ Page",
                content: "FAQ Page Content",
                dateCreated: new Date()
            });

            Page.create({
                title: "Contact Us",
                content: "Contact Us Page Content",
                dateCreated: new Date()
            });

            console.log('--> Pages added to database...');
        }
    });
}

console.log("--> Page Model Loaded");

module.exports = {
    seed: seed
};
