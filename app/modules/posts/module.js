(function()
{
	'use strict';

	function config ($locationProvider, $routeProvider) {  
	  $locationProvider.html5Mode(true);
	  $routeProvider
	    .when('/', {
	      template: '<my-posts></my-posts>'
	    })
	    .when('/post/:postId', {
	      template: '<my-post-detail></my-post-detail>'
	    })
	    .when('/new', {
	    	template: '<my-new-post></my-new-post>'
	    });
	}

	angular.module('posts', ['ngRoute', 'posts.controllers'])
			.component('myPosts', {
			    controller: 'PostListController',
			    controllerAs: 'postlist',
			    templateUrl: 'modules/posts/views/post-list.tpl.html'
			  })
			.component('myPostDetail', {
			    controller: 'PostDetailController',
			    controllerAs: 'postdetail',
			    templateUrl: 'modules/posts/views/post-detail.tpl.html'
			  })
			.component('myNewPost', {
			    controller: 'PostCreateController',
			    controllerAs: 'postcreate',
			    templateUrl: 'modules/posts/views/post-create.tpl.html'
			  })
			.config(config);  

})();