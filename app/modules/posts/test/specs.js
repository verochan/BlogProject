(function()
{
  describe('Posts service', function()
  {
    var Post, $http, $httpBackend, PreviewFileService;
    var API = 'http://jsonplaceholder.typicode.com/posts?';
    var search = 'id=1'; 
    var RESPONSE_SUCCESS= {
      'id': 1,
      'title': 'the title',
      'body': 'the post body'
    };

    //Before each test I load the module to test
    beforeEach(angular.mock.module('posts.services'));

    beforeEach(inject(function(_Post_, _$http_, _$httpBackend_, _PreviewFileService_) {
      Post=_Post_;
      $http=_$http_;
      $httpBackend=_$httpBackend_;
      PreviewFileService=_PreviewFileService_;
    }));

    //TEST 1: Post service should exist
    it('should exist', function()
    {
      expect(Post).toBeDefined();
    });

    describe('Post.query(idSelected)', function()
    {
      var result, errorStatus, handler;

      beforeEach(function()
      {
        // Initialize the local variables before each test and creating mock handler
        result = {};
        errorStatus='';
        handler = {
          success: function(data) {
            result = data;
            console.log('RESULT: '+JSON.stringify(data,null,3));
          },
          error: function(data) {
            errorStatus = data.status;
            console.log('ERROR: '+JSON.stringify(data,null,3));
          }
        };
        //Spy the service call and allow it to continue with its implementation
        spyOn(handler, 'success').and.callThrough();
        spyOn(handler, 'error').and.callThrough();
      });

      //TEST 2: Post.query should exist
      it('should exist', function()
      {
        expect(Post.query).toBeDefined();
      });

      //Verifying there is nothing pending at the end of tests
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      //TEST 3: api call is correct and should return the desired data
      it('should return a post when called with a valid id', function()
      {
        $httpBackend.whenGET(API+search).respond(200, RESPONSE_SUCCESS);
        $http.get(API+search).then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(result.data.id).toEqual(RESPONSE_SUCCESS.id);
        expect(handler.error).not.toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      //TEST 4: api call is wrong and should return 404 error
      it('should return the status 404 on error', function() {

        $httpBackend.whenGET(API+search).respond(404, {status: 404});
        $http.get(API+search).then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus).toEqual(404);
        expect(handler.success).not.toHaveBeenCalled();
        expect(result).toEqual({});
      });
    });

    describe('PreviewFileService', function()
    {
        //TEST 1: PreviewFileservice should exist
        it('should exist', function()
        {
          expect(PreviewFileService).toBeDefined();
        });

        //TEST 2: PreviewFileService.SaveFile should exist
        it('should exist SaveFile method', function()
        {
          expect(PreviewFileService.SaveFile).toBeDefined();
        });

        //TEST 3: PreviewFileService.ReturnFile should exist
        it('should exist ReturnFile method', function()
        {
          expect(PreviewFileService.ReturnFile).toBeDefined();
        });

        //TEST4: theFile should be correctly saved
        it('should save theFile content correctly', function()
        {
          expect(PreviewFileService.theFile).toBe();
          PreviewFileService.SaveFile("an image");
          expect(PreviewFileService.ReturnFile()).toBe("an image");
        });
    })
});

  describe('Posts controller', function()
  {
    var PostMock, deferred, $q;

    var RESPONSE_SUCCESS= {
      'id': 1,
      'title': 'the title',
      'body': 'the post body'
    };

    //Before each test I load the module to test
    beforeEach(angular.mock.module('posts.controllers'));
    beforeEach(angular.mock.module('posts.services'));

    // Initialize the local variables before each test and creating a Post mock
    beforeEach(inject(function(_$q_)
    {
      $q=_$q_;

      PostMock = {
        query: function() 
        {
          console.log('QUERYYYY')
          deferred = $q.defer();
          return {$promise: deferred.promise};
        }
      }
      spyOn(PostMock, 'query').and.callThrough();
    }));

    var PostListController;
    var PostDetailController;

    beforeEach(inject(function($controller)
    {
      PostListController= $controller('PostListController', 
      {
        'Post': PostMock
      });

      PostDetailController= $controller('PostDetailController', 
      {
        'Post': PostMock,
        '$routeParams': { id: 1}
      });
    }));

    describe('Calls to services', function() {

      //Resolves the promise with the mock data
      beforeEach(function() 
      {
        deferred.resolve(RESPONSE_SUCCESS);
      });

      //TEST 1: Post.query should be called
      it('should call Post.query()', function() {
        expect(PostMock.query).toHaveBeenCalled();
        expect(deferred.promise.$$state.value).toBe(RESPONSE_SUCCESS);
      });
    });

    describe('Access from the view', function() {
      //Properties should be defined for the view to read them
      it('should have this.posts defined to the view', function() {
        expect(PostListController.posts).toBeDefined();
      });

      it('should have this.post and related defined to the view', function() {
        expect(PostDetailController.post).toBeDefined();
        expect(PostDetailController.comments).toBeDefined();
        expect(PostDetailController.userpost).toBeDefined();
        expect(PostDetailController.titlepost).toBeDefined();
        expect(PostDetailController.bodypost).toBeDefined();
      });
    });
  })
})();