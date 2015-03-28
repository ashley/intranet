'use strict';

angular.module('app.controllers', []);

angular.module('app', [
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'multi-select',
  'restangular',
  'app.controllers',
  'app.filters',
  'app.services',
  'app.directives',
]).config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('https://api.tnyu.org/v1.0');

	// Configuring Restangular to work with JSONAPI spec
	RestangularProvider.setDefaultHeaders({
		'Content-Type': 'application/vnd.api+json; charset=utf-8'
	});

	RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
		return data[Object.keys(data)[0]]; // Return the first child of the returned data
	});
}).config(function (datepickerConfig) {
  datepickerConfig.showWeeks = false;
}).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  // TODO: Enable this when server is properly configured
  // $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'partials/index/index.html',
      controller: 'MainCtrl'
    })
    .state('list', {
      url: 'r/:resourceName/list/:selectionMode',
      templateUrl: 'partials/actions/list.html',
      controller: 'ListCtrl',
      resolve: {
        apiDescription: function($http) {
          return $http.get('/data/resource-description.json');
        }
      }
    })
    .state('add', {
      url: 'r/:resourceName/add',
      templateUrl: 'partials/actions/add.html',
      controller: 'AddCtrl',
      resolve: {
        apiDescription: function($http) {
          return $http.get('/data/resource-description.json');
        }
      }
    })
    .state('edit', {
      url: 'r/:resourceName/edit/:id',
      templateUrl: 'partials/actions/edit.html',
      controller: 'EditCtrl',
      controllerAs: 'ctrl',
      resolve: {
        apiDescription: function($http) {
          return $http.get('/data/resource-description.json')
          .then(function(data) {
            data = {
              data: data.data.data,
              resource: function(name) {
                return _.find(data.data, function(r) {
                  return r.id === name;
                });
              }
            };
            return data;
          });
        }
      }
    });
});