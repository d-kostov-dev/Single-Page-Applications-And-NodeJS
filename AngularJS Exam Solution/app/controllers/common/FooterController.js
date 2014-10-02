'use strict';

appMain.controller('FooterController', function ($scope, appSettings) {
    $scope.author = appSettings.author;
    $scope.authorLink = appSettings.authorLink;
    $scope.poweredBy = appSettings.poweredBy;
});