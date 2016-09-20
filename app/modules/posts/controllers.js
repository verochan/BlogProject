(function ()
{
  'use strict';

  angular
    .module('posts.controllers', ['posts.services', 'users.services', 'comments.services', 'angularSimplePagination']);

  function PostListController(Post) {
    this.posts = {};
    this.length = 0;
    // PAGINATOR
    this.settings = {
      currentPage: 0,
      offset: 0,
      pageLimit: 5,
      pageLimits: ['10', '50', '100'],
    };
    const self = this;

    Post.query()
      .$promise.then(
        function (data) {
          self.posts = data;
          self.length = self.posts.length;
        },
        function (error) {
          console.log(error);
        }
      );
  }

  function PostDetailController($routeParams, Post, User, Comment) {
    this.post = {};
    this.comments = {};
    this.userpost = {};
    this.titlepost = '';
    this.bodypost = '';

    const self = this;

    Post.query({ id: $routeParams.postId })
      .$promise.then(
        function (data) {
          self.post = data[0];
          self.titlepost = self.post.title;
          self.bodypost = self.post.body;
          self.userpost = User.query({ id: self.post.userId });
        },
        function (error) {
          console.log(error);
        }
      );

    Comment.query({ postId: $routeParams.postId })
      .$promise.then(
        function (data) {
          self.comments = data;
        },
        function (error) {
          console.log(error);
        }
      );
  }

  function PostCreateController(Post) {
    const self = this;

    this.$onInit = function () {
      this.parenttitle = 'Preview of the purrrfect title';
      this.parentbody = 'Preview of the furrry body...';
      this.parentuserpost = '';
    };

    this.changePreview = function (element, elementName) {
        // console.log('changePreviewWhole'+element+' '+elementName);
      switch (elementName) {
        case 'title':
          this.parenttitle = element;
          break;
        case 'body':
          this.parentbody = element;
          break;
        case 'userpost':
          this.parentuserpost = element;
          break;
        default:
          console.log('default case switch');
      }
    };

    this.create = function () {
      this.post = {
        title: '',
        body: '',
      };
        // console.log(this.userpost);
      this.post.title = this.title;
      this.post.body = this.body;
      Post.save(self.post);
    };
  }

  function ExtraDataController(User) {
    this.infocreatepost = {

      usersPost: {},
    };

    const self = this;

    User.query()
      .$promise.then(
        function (data) {
          self.infocreatepost.usersPost = data;
        },
        function (error) {
          console.log(error);
        }
      );
  }

  function FileChangeController($scope, PreviewFileService) {
    $scope.upload = function () {
          // console.log('thefile:'+$scope.file);
      PreviewFileService.SaveFile($scope.file);
          // If I want to automatically show the preview without clicking buttons,
          // I would add UpdatePreview here and ChangePreviewPostController & ShowPreviewPostController
          // wouldn't be necessary
          // UpdatePreviewService.UpdatePreview(PreviewFileService.ReturnFile(), '#imgpreview');
    };
  }

  function ChangePreviewFileController(PreviewFileService) {
    this.$onInit = function () {
      this.file = '';
    };
    this.changePreview = function () {
      this.filename = PreviewFileService.ReturnFile().name;
    };
  }

  function ShowPreviewFileController(PreviewFileService, UpdatePreviewService) {
    this.$onChanges = function () {
      UpdatePreviewService.UpdatePreview(PreviewFileService.ReturnFile(), '#imgpreview');
    };
  }

  function ShowMainPreviewPostController(User) {
    this.$onChanges = function (changes) {
      if (changes.titlepost) {
          // console.log('showmainpreview b: '+changes.titlepost.currentValue);
        this.titlepost = changes.titlepost.currentValue;
      }
      if (changes.bodypost) {
          // console.log('showmainpreview c: '+changes.bodypost.currentValue);
        this.bodypost = changes.bodypost.currentValue;
      }
      if (changes.userpost) {
          // console.log('showmainpreview c: '+changes.userpost.currentValue);
        this.userpost = {};
        this.userpost = User.query({ id: changes.userpost.currentValue });
      }
    };
  }

  angular
      .module('posts.controllers')
      .controller('PostListController', PostListController)
      .controller('PostDetailController', PostDetailController)
      .controller('PostCreateController', PostCreateController)
      .controller('ExtraDataController', ExtraDataController)
      .controller('ChangePreviewFileController', ChangePreviewFileController)
      .controller('ShowPreviewFileController', ShowPreviewFileController)
      .controller('ShowMainPreviewPostController', ShowMainPreviewPostController)
      .controller('FileChangeController', FileChangeController);
})();
