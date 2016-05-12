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

  .controller('fireCtrl', [ '$scope', '$http',
      function($scope, $http) {
        
        $http.get('https://mrbigxmen.firebaseio.com/codes/.json?orderBy="u"&startAt=1&print=pretty')
        .then(function(response) {
            $scope.orderByField = 'nombre';
            $scope.reverseSort = false;
            $scope.json = response.data;
        });

      }

  ]);