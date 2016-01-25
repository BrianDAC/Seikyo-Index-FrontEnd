'use strict';

/**
 * @ngdoc directive
 * @name taimaAdminApp.directive:filePicker
 * @description
 * # filePicker
 */
angular.module('seikyo.index')
.directive('filePicker', function () {
    return {
        restrict: 'A',
        scope: {
            callback: '&filePicker'
        },
        link: function postLink(scope, element, attrs) {
            element.on('change', function (e) {
                var file = element[0].files[0];
                scope.$apply(function () {
                    scope.callback({ file: file });
                });
            });
        }
    };
});
