'use strict';

angular.module('seikyo.index', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'toaster',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'ngMessages',
    'checklist-model',
    'fg.modal',
    'combo-date',
    'angularUtils.directives.dirPagination',
    'LocalStorageModule',
    'ngImgCrop'
])

.config(function ($urlRouterProvider, $httpProvider, localStorageServiceProvider, $compileProvider, ComboDateProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|coui):|data:image\//);

    $httpProvider.defaults.useXDomain = true;

    ComboDateProvider.templateUrl = 'views/directives/combo-date.html';

    $httpProvider.interceptors.push(function ($q, $window, localStorageService, $rootScope) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                var token = localStorageService.get('token');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },

            response: function (response) {
                return response || $q.when(response);
            },

            responseError: function (response) {
                switch (response.status) {
                    case 401:
                        $rootScope.$broadcast('ResponseUnauthorized')
                        break;
                    case -1:
                    case 500:
                        $rootScope.$broadcast('ResponseError');
                        break;
                }
                return $q.reject(response);
            }
        };
    });

    $urlRouterProvider.otherwise('/');

})