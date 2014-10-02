'use strict';

appMain.controller('HomeController', function ($scope, $location, AccountService, StatsResource) {
    StatsResource.getSiteStats()
        .then(function (response) {
            $scope.siteStats = response;
        });
});