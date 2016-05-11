'use strict';

var app = angular

	.module('app', ['ngAnimate', 'ngMap', 'ui.bootstrap', 'firebase', 'angulartics', 'angulartics.google.analytics'])
	.run(['$rootScope',
			function($rootScope) {
			$rootScope.$on('mapInitialized', function(evt,map) {
				google.maps.event.trigger(map, "resize");
			});
		}
	])
	.filter('html', ['$sce',
	    function ($sce) {
			return function (str) {
			return $sce.trustAsHtml(str);
			}
		}
	])

	.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', '$rootScope', 'NgMap',
		function ($scope, $uibModalInstance, $rootScope, NgMap) {
			var vm = this;
			NgMap.getMap().then(function(map) {
				console.log('map', map);
				vm.map = map;
			});

			vm.clicked = function() {
				alert('Clicked a link inside infoWindow');
			};

			vm.marks = [
				{id:'aus', name:'Costa de Oro',
		    body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/costadeoro-c4322326.jpg"> </div> <div class="col-sm-6"> <h3> Costa de Oro </h3> <p> Vive una aventura extrema volando y controlando el Apocalipsis con elementos especiales de aventura acuática y aéreos en las mejores playas de Australia. </p> </div> </div> </div>',
		  	position:[-27.986048,153.0428299]},
		    {id:'ber', name:'Berlín',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/berlin-59279292.jpg"> </div> <div class="col-sm-6"> <h3> Berlín </h3> <p> Conoce como se grabaron las escenas épicas de X-Men Apocalipsis en una ciudad donde además podrás absorver los conocimientos de pelea con profesores especialistas y exclusivos de X-Men. </p> </div> </div> </div>',
		  	position:[52.5317511,12.7298293]},
		    {id:'cai', name:'El Cairo',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/cairo-0e8cf132.jpg"> </div> <div class="col-sm-6"> <h3> El Cairo </h3> <p> Vive como un egipcio, explora por el desierto al estilo de X-Men y vive un magnifico show de luces y sonido junto a las pirámides. </p> </div> </div> </div>',
		  	position:[29.4981818,31.4138131]},
		    {id:'can', name:'Can-Cun',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/cancun-a315592d.jpg"> </div> <div class="col-sm-6"> <h3> Can-Cun </h3> <p> Explora las pirámides de Chichen Itza, experimenta el control de los elementos acuáticos y de vuelo para vivir una experiencia X-treme. </p> </div> </div> </div>',
		  	position:[20.7622998,-87.3538734]},
		    {id:'lon', name:'Londres',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/londres-19555c68.jpg"> </div> <div class="col-sm-6"> <h3> Londres </h3> <p> Aprende extraordinaria habilidades en el campo de entrenamiento X-Men. Conoce la las locaciones de X-Mansions y vive una aventura mutante en un paraíso soñado. </p> </div> </div> </div>',
		  	position:[51.5287714,-0.2420246]},
		    {id:'mon', name:'Montreal',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/montreal-ee894e5e.jpg"> </div> <div class="col-sm-6"> <h3> Montreal </h3> <p> Absorbe las extraordinarias habilidades de los mutantes en un exclusiva Masterclass con especialistas X-Men y conoce las locaciones de la película en visitas guiadas por toda una ciudad llena de aventuras. </p> </div> </div> </div>',
		  	position:[45.5225697,-73.9183845]},
		    {id:'new', name:'Nueva York',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/newyork-8e4b5660.jpg"> </div> <div class="col-sm-6"> <h3> Nueva York </h3> <p> Conoce al equipo de efectos especiales de X-Men, quienes además te enseñaran sus técnicas en una exclusiva Masterclass donde podrás capturar las increíbles transformaciones de los mutantes de la película. </p> </div> </div> </div>',
		  	position:[41.2659795,-77.2436489]},
		    {id:'veg', name:'Las Vegas',
		  	body:'<div class="infowin"ng-non-bindable"> <div class="bodyContent"> <div class="col-sm-6"> <img class="img-responsive" src="img/locations/vegas-f498d1c5.jpg"> </div> <div class="col-sm-6"> <h3> Las Vegas </h3> <p> Explora los sitios de la destrucción del Apocalipsis en una aventura épica en caballo por el desierto y en helicoptero por la ciudad. Disfruta de un lujoso alojamiento con cabaña privada, piscina noches inolvidables. </p> </div> </div> </div>',
		  	position:[35.307579,-118.0860867]}
			];
			vm.mark = vm.marks[0];
			
			vm.showDetail = function(e, mark) {
				vm.mark = mark;
				vm.map.showInfoWindow('foo-iw', mark.id);
			};

			vm.hideDetail = function() {
				vm.map.hideInfoWindow('foo-iw');
			};
			$scope.closeModal = function () {
				$uibModalInstance.dismiss('cancel');
			};
			
			$uibModalInstance.rendered.then(function() {
				$scope.renderMap=$rootScope.renderMap;
			});

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

				$uibModal.open({
					templateUrl: 'modalMapTemplate',
					size: 'lg',
					controller: 'ModalInstanceCtrl',
					controllerAs:'vm',
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
				var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/codes/').child($scope.code);
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

	    		var itemRef = new Firebase('https://mrbigxmen.firebaseio.com/codes/').child($scope.code);
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