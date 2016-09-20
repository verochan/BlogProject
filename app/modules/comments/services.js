(function ()
{
  'use strict';

  angular.module('comments.services', ['ngResource']);

  function Comment($resource, BaseUrl) {
    return $resource(BaseUrl + '/comments/:commentId', { commentId: '@_id' });
  }

  angular
      .module('comments.services')
      .constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
      .factory('Comment', Comment);
})();
