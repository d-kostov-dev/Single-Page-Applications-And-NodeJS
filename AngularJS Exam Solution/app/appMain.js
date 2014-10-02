'use strict';

var appMain = angular.module('appMain', ['ngRoute', 'LocalStorageModule', 'httpQRequest']);

appMain.constant("appSettings", {
    // Paths
    templatesFolder: "templates",
    apiUrl: "http://spa2014.bgcoder.com/",

    // Configurations

    // License Stuff
    author: "Pesho Dev International",
    authorLink: "http://telerikacademy.com",
    poweredBy: "AngularJs"
});

appMain.config(function ($routeProvider, appSettings) {

    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: appSettings.templatesFolder + "/home.html"
    });

    $routeProvider.when("/login", {
        controller: "LoginController",
        templateUrl: appSettings.templatesFolder + "/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "SignUpController",
        templateUrl: appSettings.templatesFolder + "/signup.html"
    });

    $routeProvider.when("/unauthorized", {
        templateUrl: appSettings.templatesFolder + "/unauthorized.html"
    });

    $routeProvider.when("/drivers", {
        controller: "DriversController",
        templateUrl: appSettings.templatesFolder + "/drivers.html"
    });

    $routeProvider.when("/drivers/:id", {
        controller: "DriversController",
        templateUrl: appSettings.templatesFolder + "/driver-details.html"
    });

    $routeProvider.when("/trips", {
        controller: "TripsController",
        templateUrl: appSettings.templatesFolder + "/trips.html"
    });

    $routeProvider.when("/trips/create", {
        controller: "CreateTripController",
        templateUrl: appSettings.templatesFolder + "/create-trip.html"
    });

    $routeProvider.when("/trips/:id", {
        controller: "TripsController",
        templateUrl: appSettings.templatesFolder + "/trip-details.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });
});

appMain.config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptorService');
});

appMain.run(function (AccountService) {
    AccountService.checkIdentity();
});