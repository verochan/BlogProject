(function()
{
	'use strict';

	angular.module('users.controllers', ['users.services']);

	function UsersListController(User)
	{

		this.users=User.query();
	}

	function UserDetailController($routeParams, User)
	{
		console.log('userID: '+$routeParams.userId);
		var self=this;
		this.user= User.query({ id: $routeParams.userId})
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