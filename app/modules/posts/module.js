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

    function fileChange() {
      return {
      restrict: 'A',
      require: 'ngModel',
      controller: 'FileChangeController',
      scope: {
        fileChange: '&'
      },
      link: function link(scope, element, attrs, ctrl) {
      	function onChange() {
      		console.log('filechange onchangE'+element[0].name);
          ctrl.$setViewValue(element[0].files[0]);
          scope.fileChange();
        }
          element.on('change', onChange);

          scope.$on('destroy', function () {
            element.off('change', onChange);
          });
        }
      };
    }

	angular.module('posts', ['ngRoute', 'posts.controllers', 'users.controllers'])
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
			.component('extraDataForNewPost', {
			    controller: 'ExtraDataController',
			    controllerAs: 'extradata',
			    templateUrl: 'modules/posts/views/post-create-extra-data.tpl.html'
			  })
			.component('changePreview', {
				controller: 'ChangePreviewPostController',
				controllerAs: 'changepreviewpost',
				templateUrl: 'modules/posts/views/post-image-preview.tpl.html'
			})
			.component('showPreview', {
				bindings: {
    				preview: '<',
  				},
				controller: 'ShowPreviewPostController',
				controllerAs: 'showpreviewpost',
				templateUrl: 'modules/posts/views/post-save-image-preview.tpl.html'
			})
			//In order to update the post image preview I need to make it as a directive,
			//components' bindings don't support updates on inputs of type file :(
			.directive('fileChange', fileChange)
			.config(config);  
})();