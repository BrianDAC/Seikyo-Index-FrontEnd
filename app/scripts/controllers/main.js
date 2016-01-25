'use strict';

angular.module('seikyo.index')
.controller('MainCtrl', function ($scope, Modal, API, $rootScope, $animate, $mdSidenav, $state, SeikyoResource) {

    $scope.toUrl = API.toUrl
    SeikyoResource.getDivision(function (divisions) {
    	$scope.divisions = divisions 
    })
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
	$scope.getSeikyos = function (year) {
		SeikyoResource.getYear({year: year}, function (seikyos) {
			for (var i = 0; i < seikyos.length; i++) {
				var d = new Date(seikyos[i].date);
				seikyos[i].date = monthNames[d.getMonth()]
			};
			$scope.seikyos = seikyos
		})
	};

	$scope.showSeikyo = function (index) {
		SeikyoResource.seikyo({seikyo: $scope.seikyos[index]._id}, function (seikyo) {
			for (var i = 0; i < $scope.divisions.length; i++) {
				for (var j = 0; j < seikyo.experience.length; j++) {
					if (seikyo.experience[j].division == $scope.divisions[i]._id) {
						seikyo.experience[j].division = $scope.divisions[i]
					};
				};
			};
			seikyo.date = $scope.seikyos[index].date
			$scope.seikyo = seikyo;

		})
	}

	$scope.cancel = function () {
		delete $scope.seikyo
	}


	var currentYear = new Date().getFullYear(),
		years = [],
		startYear = 1980;

	while ( startYear <= currentYear ) {
        years.push(startYear++);
	} 
	years.reverse()
	$scope.years = years;
	
	$scope.seikyos = []
	
	$scope.$on('$stateChangeSuccess', function (event) {
	    $mdSidenav('left').close();
	})
    $scope.navigate = $state.go
});
