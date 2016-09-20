(function ()
{
  'use strict';

  function config($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
          template: ['<posts-list></posts-list'],
        })
        .when('/post/:postId', {
          template: '<post-detail></post-detail>',
        })
        .when('/new', {
          template: '<new-post></new-post>',
        });
  }

  function fileChange() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        fileChange: '&',
        // SUMMARY
        // when the element changes, onChange is called,
        // when onChange finishes its business,
        // the function assigned to fileChange DOM variable (file-change) gets called (upload())
      },
      link: function link(scope, element, attrs, ctrl) {
        function onChange() {
          // console.log('filechange onchangE'+element[0].name);
          ctrl.$setViewValue(element[0].files[0]);
          scope.fileChange();
        }
        // on the change event (jQuery) of the element, onChange is called (event handler onChange is attached using .on)
        element.on('change', onChange);
      },
    };
  }

  angular.module('posts', ['blog.templates', 'ngRoute', 'posts.controllers', 'users.controllers'])
            .component('postsList', {
              controller: 'PostListController',
              controllerAs: 'postlist',
              templateUrl: 'modules/posts/views/post-list.tpl.html',
            })
            .component('postDetail', {
              controller: 'PostDetailController',
              controllerAs: 'postdetail',
              templateUrl: 'modules/posts/views/post-detail.tpl.html',
            })
            .component('postDetailComments', {
              bindings: {
                data: '<',
              },
              controllerAs: 'postcomments', // I could erase controllerAs, and simply use $ctrl, but I prefer this
              templateUrl: 'modules/posts/views/post-detail-comments.tpl.html',
            })
            .component('postDetailUser', {
              bindings: {
                data: '<',
              },
              controllerAs: 'postuser', // I could erase controllerAs, and simply use $ctrl, but I prefer this
              templateUrl: 'modules/posts/views/post-detail-user.tpl.html',
            })
            .component('newPost', {
              controller: 'PostCreateController',
              controllerAs: 'postcreate',
              templateUrl: 'modules/posts/views/post-create.tpl.html',
              transclude: true,
            })
            .component('extraDataForNewPost', {
              controller: 'ExtraDataController',
              controllerAs: 'extradata',
              templateUrl: 'modules/posts/views/post-create-extra-data.tpl.html',
              require: {
                parent: '^newPost',
              },
            })
            .component('changePreview', {
              controller: 'ChangePreviewFileController',
              controllerAs: 'changepreviewfile',
              templateUrl: 'modules/posts/views/post-image-preview.tpl.html',
            })
            .component('showPreview', {
              bindings: {
                preview: '<',
              },
              controller: 'ShowPreviewFileController',
              controllerAs: 'showpreviewfile',
              templateUrl: 'modules/posts/views/post-save-image-preview.tpl.html',
            })
            .component('showMainPostPreview', {
              bindings: {
                titlepost: '<',
                bodypost: '<',
                userpost: '<',
              },
              controller: 'ShowMainPreviewPostController',
              controllerAs: 'postdetail',
              templateUrl: 'modules/posts/views/post-detail.tpl.html',
            })
            // In order to update the post image preview I need to make it as a directive,
            // components' bindings don't support updates on inputs of type file :(
            .directive('fileChange', fileChange)
            .config(config);
})();
