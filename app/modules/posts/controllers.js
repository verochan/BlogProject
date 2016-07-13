(function()
{
	'use strict';

	angular
		.module('posts.controllers', ['posts.services']);

	function PostListController(Post)
	{
		this.posts= Post.query();
	}

	  angular
		  .module('posts.controllers')
		  .controller('PostListController', PostListController);
})();