var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/register', controllers.users.pages.register);
    app.post('/register', controllers.users.createItem);

    app.get('/login', controllers.users.pages.login);
    app.post('/login', auth.login);

    app.get('/logout', auth.logout);

    app.get('/profile',auth.isAuthenticated, controllers.users.pages.profile);
    app.get('/edit-profile',auth.isAuthenticated, controllers.users.pages.editProfile);
    app.post('/edit-profile',auth.isAuthenticated, controllers.users.updateItem);

    app.get('/admin-panel', auth.isInRole('admin'), controllers.users.pages.adminPanel);

    app.get('/users/delete/:id', auth.isInRole('admin'), controllers.users.deleteItem);
    app.get('/users/edit/:id', auth.isInRole('admin'), controllers.users.pages.editUser);
    app.post('/users/edit/:id', auth.isInRole('admin'), controllers.users.updateItem);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
};