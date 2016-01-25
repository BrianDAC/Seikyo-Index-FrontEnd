'use strict';

angular.module('seikyo.index')

.config(function ($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('light-blue');

    $mdIconProvider
        .defaultFontSet('material-icons')
});
