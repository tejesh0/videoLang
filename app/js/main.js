var myApp = angular.module('myApp', ['ui.router', 'youtube-embed', 'ngAnimate', 'ngMessages', 'ngCookies', 'ngSanitize', 'ngResource', 'ngFileUpload']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
  
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: function($scope, $http, $state){

                $scope.signuppage = function(){
                    $state.go('signup');
                }



            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'partials/signup.html',
            controller: function($scope, $http, $window){
                $scope.signup = function() {
                    //debugger;
                    $http({
                        method: 'POST',
                        url: 'http://127.0.0.1:8000/signup',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        data: $scope.signup,
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        }   
                    }).success(
                        function(response) {
                            console.log("success", response);
                            var token = response.data.token;
                            var username = response.data.username;

                            if (token && username) {
                              $window.localStorage.token = token;
                              $window.localStorage.username = username;
                              deferred.resolve(true);
                            } else {
                              console.log('Invalid data received from server');
                            }
      
                        }
                    ).error(
                    function(data) {
                      alert('LoginController submit error');
                      $scope.errorMsg = data.reason;
                      //debugger;
                    }
                    );
                    };


                    $scope.logout = function() {
                    $http.post('http://localhost:8000/auth/logout/').success(function() {
                        $scope.restrictedContent = [];
                        $.cookie('key', null);
                        $http.defaults.headers.common['Authorization'] = null;
                        }).error(function() {
                        // This should happen after the .post call either way.
                        $.cookie('key', null);
                        $http.defaults.headers.common['Authorization'] = null;
                        });
                    };

            }
        })

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // $locationProvider.html5Mode(true);
}])

myApp.controller('HomeCtrl', ['$scope', '$http', 'Upload', function($scope, $http, Upload){
                    // upload later on form submit or something similar
                $scope.submit = function() {
                  if ($scope.file) {
                    $scope.upload($scope.file);
                  }
                };

              
                // upload on file select or drop
                $scope.upload = function (file) {
                    // Upload.upload({
                    //     url: 'http://127.0.0.1:8000/upload-video',
                    //     method: 'POST',
                    //     data: file

                    // })

                    Upload.http({
                          url: 'http://127.0.0.1:8000/upload-video',
                          headers : {
                            'Content-Type': file.type
                          },
                          data: file
                        })

                    .then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    });
                };
}])

myApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});

myApp.constant('API_SERVER', 'http://127.0.0.1:8000/');
