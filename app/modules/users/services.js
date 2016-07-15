(function()
{
	'use strict';
	
	angular.module('users.services', ['ngResource']);

	function User($resource, BaseUrl)
	{
		return $resource(BaseUrl+'/users/:userId', {userId: '@_id'});
	}

	angular.module('users.services')
			.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
			.factory('User', User);
})();