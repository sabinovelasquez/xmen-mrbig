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
	    	var used=0;
	    	$scope.usados=0;
	    	$scope.totales=0;
	    	var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/codes/');
	    	itemRef.once('value', function(snapshot) {
	    		
	    		$scope.totales = snapshot.numChildren();	
	    		$scope.$apply();

	    		snapshot.forEach(function(data) {
	    			var exist = data.val().u;
		    		if(exist!=0){
		    			used++;
		    			$scope.usados=used;
	    				$scope.$apply();
		    		}
	    		});

	    	});

	    }

  ]);