(function()
{
  describe('Users service', function()
  {
    var User, $http, $httpBackend;
    var API = 'http://jsonplaceholder.typicode.com/users?';
    var search = 'id=1'; 
    var RESPONSE_SUCCESS= {
      'id': 1,
      'name': 'Leanne Graham',
      'email': 'Sincere@april.biz',
      'username': 'Bret'
    };

    //Before each test I load the module to test
    beforeEach(angular.mock.module('users.services'));

    beforeEach(inject(function(_User_, _$http_, _$httpBackend_) {
      User=_User_;
      $http=_$http_;
      $httpBackend=_$httpBackend_;
    }));

    //TEST 1: User service should exist
    it('should exist', function()
    {
      expect(User).toBeDefined();
    });

    describe('User.query(idSelected)', function()
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

      //TEST 2: User.query should exist
      it('should exist', function()
      {
        expect(User.query).toBeDefined();
      });

      //Verifying there is nothing pending at the end of tests
      afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      //TEST 3: api call is correct and should return the desired data
      it('should return and user when called with a valid id', function()
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
    })
  });



  describe('Users controller', function()
  {
    var UserMock, deferred, $q;

    var RESPONSE_SUCCESS= {
      'id': 1,
      'name': 'Leanne Graham',
      'email': 'Sincere@april.biz',
      'username': 'Bret'
    };

    //Before each test I load the module to test
    beforeEach(angular.mock.module('users.controllers'));
    beforeEach(angular.mock.module('users.services'));

    // Initialize the local variables before each test and creating a User mock
    beforeEach(inject(function(_$q_)
    {
      $q=_$q_;

      UserMock = {
        query: function() 
        {
          console.log('QUERYYYY')
          deferred = $q.defer();
          return {$promise: deferred.promise};
        }
      }
      spyOn(UserMock, 'query').and.callThrough();
    }));

    var UsersListController;
    var UserDetailController;

    beforeEach(inject(function($controller)
    {
      UsersListController= $controller('UsersListController', 
      {
        'User': UserMock
      });

      UserDetailController= $controller('UserDetailController', 
      {
        'User': UserMock,
        '$routeParams': { id: 1}
      });
    }));

    describe('Calls to services', function() {

      //Resolves the promise with the mock data
      beforeEach(function() 
      {
        deferred.resolve(RESPONSE_SUCCESS);
      });

      //TEST 1: User.query should be called
      it('should call User.query()', function() {
        expect(UserMock.query).toHaveBeenCalled();
      });
    });

    describe('Access from the view', function() {
      //Properties should be defined for the view to read them
      it('should have this.users defined to the view', function() {
        expect(UsersListController.users).toBeDefined();
      });

      it('should have this.user and this.userMap defined to the view', function() {
        expect(UserDetailController.user).toBeDefined();
        expect(UserDetailController.userMap).toBeDefined();
      });
    });
  })
})();