'use strict';

angular
.module('app.controllers')
.controller('EditCtrl', function($scope, $rootScope, $stateParams, $sce, $interval, Restangular, apiDescription, formElementProvider) {
  var resourceName = $stateParams.resourceName,
      resourceId = //$stateParams.id; 
      '53f54dd98d1e62ff12539dbb'; // test id 
  $scope.rdesc = apiDescription.resource(resourceName);
  $scope.fep = formElementProvider;
  $scope.model = Restangular.one(resourceName, resourceId).get().$object;
  $interval(function() { console.log($scope.model); }, 500);

  // var resource = Restangular.one(resourceName, resourceId);

  // resource.get()
  //   .then(function(live) {
  //     // // transform schools to String 
  //     // presenter.schools = presenter.schools.join(',');

  //     // // format date for input[type=date]
  //     // if (presenter.graduationDate) {
  //     //   presenter.graduationDate = presenter.graduationDate.formatForInputTypeDate(); // see js/lib/extentions.js  
  //     // }
    
  //     // $scope.presenter = Restangular.stripRestangular(presenter);

  //     $scope.model = 
  //   });

  // FAKE, but more or less like this...  
  // $scope.updateResource = function() {
  //   console.log($scope.presenter);
  //   // resource.put($scope.presenter); ClayReedA gets 403 Forbidden 
  // };
});