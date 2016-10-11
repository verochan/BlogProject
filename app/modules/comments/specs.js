(function()
{
  describe('Comments service', function() 
  {
    var Comment, $q, $httpBackend;

    var API = 'http://jsonplaceholder.typicode.com/comments?';
    var search = 'postId=1';

    var RESPONSE_SUCCESS= {
      'postId': 1,
      'id': 1,
      'name': 'id labore ex et quam laborum',
      'email': 'Eliseo@gardner.biz',
      'body': 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
    };

    // Before each test I load the service module to test with
    beforeEach(angular.mock.module('comments.services'));

    // Before each test I inject what I am going to use locally in the tests
    beforeEach(inject(function(_Comment_, _$httpBackend_, _$http_) {
      Comment = _Comment_;
      $httpBackend=_$httpBackend_;
      $http=_$http_;
    }));

    //TEST 1: Does Comment factory exist?
    it('should exist', function() {
      expect(Comment).toBeDefined();
    });

    describe('Comment.query(postIdSelected)', function() {
      var result;
      var errorStatus;
      var handler;

      beforeEach(function() {
        // Initialize the local variables before each test
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
        // Spy the service call and allow it to continue to its implementation
        spyOn(handler, 'success').and.callThrough();
        spyOn(handler, 'error').and.callThrough();
      });

      //TEST 2: Does Comment.query exist?
      it('should exist', function() {
        expect(Comment.query).toBeDefined();
      });

      //TEST 3: API call is correct and should return the desired data
      it('should return a comment or comments when called with a valid postId', function() {
        
        $httpBackend.whenGET(API+search).respond(200, RESPONSE_SUCCESS);
        $http.get(API+search).then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.success).toHaveBeenCalled();
        expect(result.data.id).toEqual(RESPONSE_SUCCESS.id);
        expect(handler.error).not.toHaveBeenCalled();
        expect(errorStatus).toEqual('');
      });

      //TEST 4: API call is wrong and should return an error
      it('should return the status on error', function() {

        $httpBackend.whenGET(API+search).respond(404, {status: 404});
        $http.get(API+search).then(handler.success, handler.error);
        $httpBackend.flush();

        expect(handler.error).toHaveBeenCalled();
        expect(errorStatus).toEqual(404);
        expect(handler.success).not.toHaveBeenCalled();
        expect(result).toEqual({});
      });
    })
  });
})();