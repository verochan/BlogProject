(function()
{
	'use strict';

	angular
		.module('posts.controllers', ['posts.services', 'users.services', 'comments.services']);

	function PostListController(Post)
	{
		this.posts= Post.query();
	}

	function PostDetailController($routeParams, Post, User, Comment)
	{
		this.post={};
		this.comment={};
		this.user={};

		var self=this;

		Post.query({ id: $routeParams.postId})
			.$promise.then(
				function(data)
				{
					self.post=data[0];
					self.user=User.query({ id: self.post.userId});
				},
				function(error)
				{
					console.log(error);
				}
			);

		this.comments=Comment.query({ postId: $routeParams.postId });	
	}

	  angular
		  .module('posts.controllers')
		  .controller('PostListController', PostListController)
		  .controller('PostDetailController', PostDetailController);
})();