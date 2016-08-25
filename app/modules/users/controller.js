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
		this.userMap={
			pos:
			{
				latitude:0,
				longitude:0
			},
			options:
			{
				title:'',
				label:''
			},
			id:0
		};
		var self=this;

		User.query({ id: $routeParams.userId})
		.$promise.then(
				function(data)
				{
					self.user=data[0];
					self.userMap.pos.latitude=parseInt(self.user.address.geo.lat);
					self.userMap.pos.longitude=parseInt(self.user.address.geo.lng);
					self.userMap.id=parseInt(self.user.id);
					self.userMap.options.title=self.user.address.city;
					self.userMap.options.label=self.userMap.options.title;
					
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