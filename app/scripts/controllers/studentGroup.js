'use strict';

angular.module('seikyo.index')
.controller('StudentGroupCtrl', function ($scope, Modal, API, $rootScope, $animate, $mdSidenav, $state, SeikyoResource, studentGroups) {
	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	for (var i = 0; i < studentGroups.length; i++) {
		var d = new Date(studentGroups[i].seikyo.date);
		studentGroups[i].seikyo.date = monthNames[d.getMonth()]
	};
	$scope.studentGroups = studentGroups

    $scope.toUrl = API.toUrl
    SeikyoResource.getDivision(function (divisions) {
    	$scope.divisions = divisions 
    })


	$scope.getSeikyos = function (year) {
		SeikyoResource.getYear({year: year}, function (seikyos) {
			for (var i = 0; i < seikyos.length; i++) {
				var d = new Date(seikyos[i].date);
				seikyos[i].date = monthNames[d.getMonth()]
			};
			$scope.seikyos = seikyos
		})
	};

	$scope.sort = function(keyname){
      	$scope.sortKey = keyname;   //set the sortKey to the param passed
      	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
	}

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
	 
    $scope.navigate = $state.go
});
