'use strict';

var app = angular

	.module('app', ['ngAnimate', 'ui.bootstrap', 'firebase'])
	.filter('html', ['$sce',
		function ($sce) {
			return function (str) {
			return $sce.trustAsHtml(str);
			}
		}
	])

	.controller('fireCtrl', [ '$scope', '$firebaseObject',
	    function($scope, $firebaseObject) {
	    	var count=0;
	    	$scope.totales=0;
	    	var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/codes/');
	    	itemRef.once('value', function(snapshot) {
	    		// snapshot.forEach(function(data) {
	    		// 	count++;
	    		// });	
	    		$scope.totales = snapshot.numChildren();	
	    		$scope.$apply();
	    		    		
	    	});

	    }

  ]);