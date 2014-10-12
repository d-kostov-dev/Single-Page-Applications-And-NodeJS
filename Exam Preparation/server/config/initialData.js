var pagesRepository = require("../repositories/getRepository")("Page");

module.exports = function(app) {
    // Loads the pages to be shown in the footer
    pagesRepository.findAll(function (err, collection) {
        app.locals.footerPages = collection;
    });
};