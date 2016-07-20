(function()
{
	'use strict';

	angular.module('users.controllers', ['users.services']);

	function UsersListController(User)
	{
		this.users={};
		var self=this;

		User.query()
			.$promise.then(
				function(data)
				{
					self.users=data;
				},
				function(error)
				{
					console.log(error);
				}
			);
	}

	function UserDetailController($routeParams, User)
	{
		this.user={};
		var self=this;

		User.query({ id: $routeParams.userId})
		.$promise.then(
				function(data)
				{
					self.user=data[0];
				},
				function(error)
				{
					console.log(error);
				}
			);
	}

	angular
		.module('users.controllers')
		.controller('UsersListController', UsersListController)
		.controller('UserDetailController', UserDetailController);
})();