'use strict';

angular.module('seikyo.index')
.controller('UserDisplayCtrl', function ($scope, Modal, $state, $http, API, $mdSidenav, toaster) {

    $scope.navigate = $state.go;

    $scope.$on('$stateChangeSuccess', function (event) {
        $mdSidenav('left').close();
    })
});
