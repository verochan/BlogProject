(function()
{
	'use strict';

	function config ($locationProvider, $routeProvider) {  
	  $locationProvider.html5Mode(true);
	  $routeProvider
	    .when('/', {
	      template: ['<posts-list></posts-list']
	    })
	    .when('/post/:postId', {
	      template: '<post-detail></post-detail>'
	    })
	    .when('/new', {
	    	template: '<new-post></new-post>'
	    });
	}

	angular.module('posts', ['ngRoute', 'posts.controllers'])
			.component('postsList', {
			    controller: 'PostListController',
			    controllerAs: 'postlist',
			    templateUrl: 'modules/posts/views/post-list.tpl.html'
			  })
			.component('postDetail', {
			    controller: 'PostDetailController',
			    controllerAs: 'postdetail',
			    templateUrl: 'modules/posts/views/post-detail.tpl.html'
			  })
			.component('postDetailComments', {
        		bindings: {
    				data: '<',
  				},
  				controllerAs: 'postcomments', //I could erase controllerAs, and simply use $ctrl, but I prefer this
			    templateUrl: 'modules/posts/views/post-detail-comments.tpl.html'
			  })
			.component('postDetailUser', {
        		bindings: {
    				data: '<',
  				},
  				controllerAs: 'postuser', //I could erase controllerAs, and simply use $ctrl, but I prefer this
			    templateUrl: 'modules/posts/views/post-detail-user.tpl.html'
			  })
			.component('newPost', {
			    controller: 'PostCreateController',
			    controllerAs: 'postcreate',
			    templateUrl: 'modules/posts/views/post-create.tpl.html'
			  })
			.config(config);  

})();