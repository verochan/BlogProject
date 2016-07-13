(function()
{
	'use strict';

	angular.module('posts.services',['ngResource']);

	function Post($resource, BaseUrl)
	{
		return $resource(BaseUrl + '/posts/:postId', { postId: '@_id'});
	}

	angular
		.module('posts.services')
		.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
		.factory('Post', Post);
})();