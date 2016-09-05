(function()
{
	'use strict';

	angular.module('posts.services',['ngResource']);

	function Post($resource, BaseUrl)
	{
		return $resource(BaseUrl + '/posts/:postId', { postId: '@_id'});
	}

	function PreviewFileService()
	{
		var theFile='';

		var SaveFile= function(selectedFile) {
			theFile=selectedFile;
			console.log('service: '+theFile);
		};

		var ReturnFile= function(){
			console.log('service out'+theFile);
			return theFile;
		};

		return{
			SaveFile: SaveFile,
			ReturnFile: ReturnFile
		};
	}

	angular
		.module('posts.services')
		.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
		.factory('Post', Post)
		.factory('PreviewFileService', PreviewFileService);
})();