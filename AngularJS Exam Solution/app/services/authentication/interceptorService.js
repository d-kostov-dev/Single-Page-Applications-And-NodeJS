'use strict';

appMain.factory('interceptorService', function ($q, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    function request(config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');

        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    function responseError(rejection) {
        if (rejection.status === 401) {
            $location.path('/unauthorized');
        }

        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = request;
    authInterceptorServiceFactory.responseError = responseError;

    return authInterceptorServiceFactory;
});