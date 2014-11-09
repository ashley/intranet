'use strict';

angular.module('app', [
  'ngRoute',
  'ui.bootstrap',
  'multi-select',
  'app.controllers',
  'app.filters',
  'app.services',
  'app.directives',
]).config(function (datepickerConfig) {
      datepickerConfig.showWeeks = false;
}).config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
});
