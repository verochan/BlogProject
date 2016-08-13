(function()
{
	'use strict';

	angular
		.module('posts.controllers', ['posts.services', 'users.services', 'comments.services', 'angularSimplePagination']);

	function PostListController(Post)
	{
		this.posts={};
		this.length=0;
		//PAGINATOR
		this.settings = {
				currentPage: 0,
				offset: 0,
				pageLimit: 5,
				pageLimits: ['10', '50', '100']
				};
		var self=this;

		Post.query()
			.$promise.then(
				function(data)
				{
					self.posts=data;
					self.length=self.posts.length;
				},
				function(error)
				{
					console.log(error);
				}
			);
		
	}

	function PostDetailController($routeParams, Post, User, Comment)
	{
		this.post={};
		this.comments={};
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

		Comment.query({ postId: $routeParams.postId })
			.$promise.then(
				function(data)
				{
					self.comments=data;
				},
				function(error)
				{
					console.log(error);
				}
			);
	}

	function PostCreateController (Post) 
	{
    	var self = this;

    	this.create = function() 
    	{
      		Post.save(self.post);
    	};
  }

	  angular
		  .module('posts.controllers')
		  .controller('PostListController', PostListController)
		  .controller('PostDetailController', PostDetailController)
		  .controller('PostCreateController', PostCreateController);
})();