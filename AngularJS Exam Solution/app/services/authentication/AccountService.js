'use strict';

appMain.factory('AccountService', function ($q, httQ, localStorageService, appSettings) {
    var serviceBase = appSettings.apiUrl;

    var authenticationData = {
        isAuth: false,
        userName: "",
        isDriver: "",
        car: ""
    };

    function registerUser(registration) {
        var data =
            "Email=" + registration.email +
            "&Password=" + registration.password +
            "&ConfirmPassword=" + registration.password;

        if(registration.isDriver === 'true'){
            data += "&isDriver=" + registration.isDriver +
                    "&car=" + registration.car;
        }


        return httQ.post(serviceBase + '/api/users/register', data);
    }

    function loginUser(loginData) {
        var deferred = $q.defer();

        var data =
            "grant_type=password" +
            "&UserName=" + loginData.userName +
            "&Password=" + loginData.password;

        httQ.post(serviceBase + '/api/users/login', data)
            .then(function (response) {
                localStorageService.set('authorizationData', {
                    token: response.access_token,
                    userName: response.userName
                });

                authenticationData.isAuth = true;
                authenticationData.userName = response.userName;

                deferred.resolve(response);
            }, function (err) {
                //logOutUser();
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function getUserInfo() {
        return httQ.get(serviceBase + '/api/users/userInfo')
            .then(function (response) {
                authenticationData.isDriver = response.isDriver;
                authenticationData.car = response.car;
            });
    }

    function logOutUser() {
        httQ.post(serviceBase + '/api/users/logout', "")
            .then(function (response) {
                clearLoginData();
            }, function (error) {
                clearLoginData();
            });
    }

    function checkIdentity() {
        var identityData = localStorageService.get('authorizationData');

        if (identityData) {
            authenticationData.isAuth = true;
            authenticationData.userName = identityData.userName;
            getUserInfo();
        }
    }

    function clearLoginData() {
        localStorageService.remove('authorizationData');

        authenticationData.isAuth = false;
        authenticationData.userName = "";
        authenticationData.isDriver = "";
        authenticationData.car = "";
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        logOutUser: logOutUser,
        checkIdentity: checkIdentity,
        userData: authenticationData
    };
});