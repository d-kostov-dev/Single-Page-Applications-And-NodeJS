'use strict';

appMain.factory('StatsResource', function ($q, httQ, appSettings) {
    var serviceUrl = appSettings.apiUrl + "/api/stats";

    return {
        getSiteStats: function siteStatsFunc() {
            return httQ.get(serviceUrl);
        }
    };
});