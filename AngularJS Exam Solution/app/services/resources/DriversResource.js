'use strict';

appMain.factory('DriversResource', function ($q, httQ, appSettings) {
    var serviceUrl = appSettings.apiUrl + "/api/drivers";

    return {
        getTopDrivers: function latestTripsFunc() {
            return httQ.get(serviceUrl);
        },
        getById: function getDriverByIdFunc(id) {
            return httQ.get(serviceUrl + "/" + id);
        },
        filterDrivers: function filterByUsernameServiceFunc(data) {
            var requestUrl = serviceUrl + "?page=" + data.page;

            if (data.userName !== ""){
                requestUrl += "&username=" + data.userName;
            }

            return httQ.get(requestUrl);
        }
    };
});