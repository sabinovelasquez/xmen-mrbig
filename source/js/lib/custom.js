'use strict';

var app = angular

	.module('app', ['ngAnimate','ui.bootstrap', 'firebase', 'angulartics', 'angulartics.google.analytics'])

	.controller('fireCtrl', [ '$scope', '$firebaseObject',
	    function($scope, $firebaseObject) {

			$scope.saveUser = function() {
				var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/').child($scope.code);
				$scope.node = $firebaseObject(itemRef);
				
				$scope.node.nombre = $scope.nombre;
				$scope.node.email = $scope.email;
				$scope.node.prefijo = $scope.prefijo;
				$scope.node.movil = $scope.movil;
				$scope.node.u = 1;

				$scope.node.$save().then(function() {
					$scope.message = 'Hemos registrado tu código.';
				}).catch(function(error){
					$scope.message = 'Ha ocurrido un error, por favor trata nuevamente.'
				});

			};

	    	$scope.checkExist = function (){

	    		var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/').child($scope.code);
	    		$scope.item = $firebaseObject(itemRef);

	    		$scope.item.$loaded().then(function () {
	    			var data = $scope.item.u;

	    			if(data!=undefined){

	    				if( data === 0 ){
	    					$scope.saveUser();
	    				}else{
	    					$scope.message = 'Este código ya fue ingresado.';
	    				}

	    			}else{
	    				$scope.message = 'Código inválido';
	    			}
					
				});

	    	}

	    }

  ]);