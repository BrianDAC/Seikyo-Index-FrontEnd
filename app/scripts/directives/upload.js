'use strict';

/**
 * @ngdoc directive
 * @name taimaAdminApp.directive:upload
 * @description
 * # upload
 */
angular.module('seikyo.index')

.directive('upload', function () {
    return {
        templateUrl: 'views/directives/upload.html',
        restrict: 'E',
        scope: {
            name: '=',
            upload: '&callback',
            disabled: '=',
            types: '='
        },
        transclude: true,
        controller: function($scope, $timeout, Modal){
            this.validateFile = function(file){
                return $scope.types?($scope.types[file.type] === true) : true;
            };

            this.uploadFile = function(file, type, name){
                Modal('cropImage').pop($scope);
            };

            var handleFileSelect = function (event) {
                var file = event.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (event) {
                    $scope.$apply(function() {
                        $scope.uncroppedImage = event.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };

            angular.element(document).on('change', '#fileInput', function (event) {
                handleFileSelect(event);
            });
            var _this = this;

        },
        link: function (scope, element, attrs, controller) {

            var $file = element.find('input[type="file"]');

            scope.handleClick = setTimeout.bind(this, function () {
                $file.click();
            })

            $file.on('change', function(event) {
                var reader = new FileReader();
                reader.onload = function (eventReader) {
                    controller.uploadFile(eventReader.target.result, event.target.files[0].type, event.target.files[0].name);
                    $file.wrap('<form>').closest('form').get(0).reset();
                    $file.unwrap();
                };
                if(controller.validateFile(event.target.files[0])) {
                    reader.readAsDataURL(event.target.files[0]);
                }
            });
        }
    };
});
