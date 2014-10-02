'use strict';

appMain.factory('CitiesResource', function ($q, httQ, appSettings) {
    var serviceUrl = appSettings.apiUrl + "/api/cities";

    return {
        getAll: function siteStatsFunc() {
            return httQ.get(serviceUrl);
        }
    };
});