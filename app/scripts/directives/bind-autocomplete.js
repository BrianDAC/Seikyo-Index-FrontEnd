'use strict';
  
angular.module('seikyo.index')
  .directive("bindExpression", function($parse) {
    var directive = {};
    directive.restrict = 'E';
    directive.require = 'ngModel';
    directive.link = function(scope, element, attrs, ngModel) {
      scope.$watch(attrs.expression, function (newValue) {
        ngModel.$setViewValue(newValue);
      });
      ngModel.$render = function() {
        $parse(attrs.expression).assign(ngModel.viewValue);
      }
    };
    return directive;
  });
