'use strict';

var app = angular

	.module('app', ['ngAnimate', 'ngMap', 'ui.bootstrap', 'firebase', 'angulartics', 'angulartics.google.analytics'])

	.filter('html', ['$sce',
	    function ($sce) {
			return function (str) {
			return $sce.trustAsHtml(str);
			}
		}
	])

	.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance',

		function ($scope, $uibModalInstance) {

			$scope.closeModal = function () {
				$uibModalInstance.dismiss('cancel');
			};
		}

	])

	.controller('fireCtrl', [ '$scope', '$firebaseObject', '$uibModal',
	    function($scope, $firebaseObject, $uibModal) {
	    	

	    	$scope.openModal = function () {
	    		$scope.loading=true;
				var modalInstance = $uibModal.open({
					templateUrl: 'modalTemplate',
					size: 'md',
					controller: 'ModalInstanceCtrl',
					scope: $scope
				});

			}

			$scope.openMap = function () {
	    		$scope.loading=true;
				var modalInstance = $uibModal.open({
					templateUrl: 'modalMapTemplate',
					size: 'lg',
					controller: 'ModalInstanceCtrl',
					scope: $scope
				});

			}

			$scope.submitForm = function() {
				$scope.code= $scope.code.toUpperCase();
				if ($scope.userForm.$valid) {
					$scope.openModal();
					$scope.checkExist();
				}

			};

			$scope.saveUser = function() {
				var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/').child($scope.code);
				$scope.node = $firebaseObject(itemRef);
				
				$scope.node.nombre = $scope.name;
				$scope.node.email = $scope.email;
				$scope.node.prefijo = $scope.prefijo;
				$scope.node.movil = $scope.movil;
				$scope.node.u = 1;

				$scope.node.$save().then(function() {
					$scope.messageTitle = 'FELICITACIONES';
					$scope.message = 'Tu código es válido. ¡Ya estás participando en MUTANT ENERGY! <strong>No olvides conservar tu tapa</strong>';
					$scope.code = '';
					$scope.loading=false;
				}).catch(function(error){
					$scope.messageTitle = 'Error: '+error;
					$scope.message = 'Ha ocurrido un error, por favor trata nuevamente.';
					$scope.code = '';
					$scope.loading=false;
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
	    					$scope.messageTitle = 'Error de código';
	    					$scope.message = 'Este código ya fue ingresado.';
	    					$scope.code = '';
	    					$scope.loading=false;
	    				}

	    			}else{
	    				$scope.messageTitle = 'Código no válido';
	    				$scope.message = 'Asegúrate que los caracteres ingresados coincidan con el código impreso bajo la tapa.';
	    				$scope.code = '';
	    				$scope.loading=false;
	    			}
					
				});

	    	}

	    }

  ]);