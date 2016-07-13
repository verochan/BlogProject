(function()
{
	'use strict';

	function config ($routeProvider) {  
	  $routeProvider
	    .when('/', {
	      template: '<my-posts></my-posts>'
	    });
	}

	angular.module('posts', ['ngRoute', 'posts.controllers'])
			.component('myPosts', {
			    controller: 'PostListController',
			    controllerAs: 'postlist',
			    templateUrl: 'modules/posts/views/post-list.tpl.html'
			  })
			.config(config);  

})();