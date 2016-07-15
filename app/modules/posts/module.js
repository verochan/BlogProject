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
			.config(config);  

})();