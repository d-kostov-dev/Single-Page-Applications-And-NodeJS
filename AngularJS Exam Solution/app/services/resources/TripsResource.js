'use strict';

appMain.factory('TripsResource', function ($q, httQ, appSettings) {
    var serviceUrl = appSettings.apiUrl + "/api/trips";

    return {
        getLatestTrips: function latestTripsFunc() {
            return httQ.get(serviceUrl);
        },
        getById: function getTripByIdFunc(id) {
            return httQ.get(serviceUrl + "/" + id);
        },
        joinTrip: function joinTripServiceFunc(id) {
            return httQ.put(serviceUrl + "/" + id, "");
        },
        createTrip: function createTripServiceFunc(tripData) {
            return httQ.post(serviceUrl, tripData, {'Content-Type': 'application/json'});
        },
        filterTrips: function filterTripsServiceFunc(data) {
            var requestUrl = serviceUrl +
                "?page=" + data.page +
                "&from=" + data.from +
                "&to=" + data.to +
                "&orderBy=" + data.orderBy +
                "&orderType=" + data.orderType +
                "&finished=" + data.finished +
                "&onlyMine=" + data.onlyMine;

            return httQ.get(requestUrl);
        }
    };
});