var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    favicon = require('serve-favicon'),
    methodOverride = require('method-override'),
    multer = require('multer'),
    passport = require('passport');

module.exports = function(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    app.use(favicon(config.rootPath + '/public/img/favicon.png'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(methodOverride('X-HTTP-Method-Override'));

    app.use(cookieParser('hashTagPesho'));
    app.use(session({
        secret: 'hashTagPesho',
        saveUninitialized: true,
        resave: true
    }));

    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: function(str, path) {
                return stylus(str).set('filename', path);
            }
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(multer({dest: __dirname + '../../../public/user-images'}));

    app.use(express.static(config.rootPath + '/public'));

    app.use(function(req, res, next) {
        if (req.session.error) {
            var msg = req.session.error;
            req.session.error = undefined;
            app.locals.errorMessage = msg;
        }
        else {
            app.locals.errorMessage = undefined;
        }

        next();
    });

    app.use(function (req, res, next) {
        if(req.user){
            app.locals.currentUser = req.user;
        } else {
            app.locals.currentUser = undefined;
        }

        next();
    });
};