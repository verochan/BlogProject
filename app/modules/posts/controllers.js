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

  	function ExtraDataController (User)
  	{
		this.infocreatepost={

  			usersPost: {}
  		};

  		var self=this;

  		User.query()
			.$promise.then(
				function(data)
				{
					self.infocreatepost.usersPost=data;
				},
				function(error)
				{
					console.log(error);
				}
			);
  	}

  	function ChangePreviewPostController(PreviewFileService)
  	{
  		this.$onInit = function () {
    		this.file='';
    	};
    	this.changePreview=function(){
  			console.log('changePreview'+PreviewFileService.ReturnFile());
  			this.file=PreviewFileService.ReturnFile();
  		};
  	}

  	function ShowPreviewPostController(PreviewFileService)
  	{
  		this.$onChanges= function(){
  			//console.log('showpreview: '+changes.file);
  			if(PreviewFileService.ReturnFile())
  			{
      			var reader= new FileReader();

      			reader.onload=function(e)
      			{
      				//As FileReader is from javascript API and not angular, 
      				//I need to assign the image like this...
      				var lapreview = angular.element(document.querySelector('#imgpreview'));
      				lapreview.attr('src', e.target.result);
      				//and not the Angular way which would be like this
      				//this.mypreview=e.target.result;
      			};
      			reader.readAsDataURL(PreviewFileService.ReturnFile());
      		}
  		};
  	}

  	function FileChangeController($scope, PreviewFileService) {
    	$scope.upload = function () {
      		console.log('thefile:'+$scope.file);
      		PreviewFileService.SaveFile($scope.file);
    	};
    }

	  angular
		  .module('posts.controllers')
		  .controller('PostListController', PostListController)
		  .controller('PostDetailController', PostDetailController)
		  .controller('PostCreateController', PostCreateController)
		  .controller('ExtraDataController', ExtraDataController)
		  .controller('ChangePreviewPostController', ChangePreviewPostController)
		  .controller('ShowPreviewPostController', ShowPreviewPostController)
		  .controller('FileChangeController', FileChangeController);
})();