var myApp = angular.module('myApp', ['ui.router', 'youtube-embed', 'ngAnimate', 'ngMessages', 'ngCookies', 'ngSanitize', 'ngResource']);

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
            controller: function($scope, $http){
                $scope.signup = function() {

                    //debugger;
                    $http.post(
                    API_SERVER+'signup',
                    JSON.stringify({ username: $scope.username, email: $scope.email, password: $scope.password })
                    ).success(
                        function(data) {
                          alert('LoginController submit success');
                          //debugger;
                          $.cookie('username', data.username, { expires: 7 });
                          $.cookie('key', data.key, { expires: 7 });
                          $http.defaults.headers.common['Authorization'] = 'ApiKey ' +
                            data.username + ':' + data.key;
                          authService.loginConfirmed();
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

    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // $locationProvider.html5Mode(true);
}]);

myApp.run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function() {
       document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});

myApp.constant('API_SERVER', 'http://127.0.0.1:8000/');
