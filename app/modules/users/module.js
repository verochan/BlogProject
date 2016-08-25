(function()
{
	'use strict';

	function config($locationProvider, $routeProvider, uiGmapGoogleMapApiProvider)
	{
		$locationProvider.html5Mode(true);

		$routeProvider
		 .when('/users', {
			 template: '<my-users></my-users>'
		 })
		 .when('/users/:userId', {
		 	template: '<my-user-detail></my-user-detail>'
		 });

		uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBp6go3s6TUC8CHNEX5l_ksB24thzlNzt4',
        libraries: 'weather,geometry,visualization'
    });

	}

	angular.module('users', ['ngRoute', 'users.controllers', 'uiGmapgoogle-maps'])
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