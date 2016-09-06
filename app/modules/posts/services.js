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

	function UpdatePreviewService()
	{
		var UpdatePreview=function(selectedFile, element){
			if(selectedFile)
  			{
      			var reader= new FileReader();

      			reader.onload=function(e)
      			{
      				//As FileReader is from javascript API and not angular, 
      				//I need to assign the image like this...
      				var lapreview = angular.element(document.querySelector(element));
      				lapreview.attr('src', e.target.result);
      				//and not the Angular way which would be like this
      				//this.mypreview=e.target.result;
      			};
      			reader.readAsDataURL(selectedFile);
      		}
      	};

      	return {
      		UpdatePreview: UpdatePreview
      	};
	}

	angular
		.module('posts.services')
		.constant('BaseUrl', 'http://jsonplaceholder.typicode.com')
		.factory('Post', Post)
		.factory('PreviewFileService', PreviewFileService)
		.factory('UpdatePreviewService', UpdatePreviewService);
})();