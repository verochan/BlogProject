(function()
{
	'use strict';

	function config($locationProvider, $routeProvider)
	{
		$locationProvider.html5Mode(true);

		$routeProvider
		 .when('/users', {
			 template: '<my-users></my-users>'
		 })
		 .when('/users/:userId', {
		 	template: '<my-user-detail></my-user-detail>'
		 });
	}

	angular.module('users', ['ngRoute', 'users.controllers'])
		.component('myUsers', {
			controller: 'UsersListController',
			controllerAs: 'userslist',
			templateUrl: 'modules/users/views/users-list.tpl.html'
		})
		.component('myUserDetail', {
			controller: 'UserDetailController',
			controllerAs: 'userdetail',
			templateUrl: 'modules/users/views/user-detail.tpl.html'
		})
		.config(config);
})();