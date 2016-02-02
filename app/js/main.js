var myApp = angular.module('myApp', ['ui.router', 'youtube-embed', 'ngAnimate', 'ngMessages', 'ngCookies', 'ngSanitize', 'ngResource', 'ngMaterial', 'ngFileUpload', "com.2fdevs.videogular", "com.2fdevs.videogular.plugins.controls", "com.2fdevs.videogular.plugins.overlayplay", "com.2fdevs.videogular.plugins.buffering", "com.2fdevs.videogular.plugins.poster"]);

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
            templateUrl: 'partials/signup.html'

        })

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    // $locationProvider.html5Mode(true);
}])

myApp.controller('HomeCtrl', ['$scope', '$http', 'Upload', '$window', '$mdSidenav', '$sce', function($scope, $http, Upload, $window, $mdSidenav, $sce){

    $scope.config_list = [];

    $http.get('http://127.0.0.1:8000/api/get-videos')
        .success(function(data){
            
            // data['results'].forEach(function(value, i){
            //     console.log(value.video_file);
            //     $scope.config.sources.push({src: $sce.trustAsResourceUrl(value.video_file), type: "video/mp4"});
            //     })
            for(i=0;i<data.results.length;i++){
                config = {};
                config['sources'] = {src: $sce.trustAsResourceUrl(data.results[i].video_file), type: "video/mp4"};
                config['tracks'] = [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ];
                config['theme'] = "bower_components/videogular-themes-default/videogular.css";
                config['plugins'] = {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                };
                console.log(config);    
                $scope.config_list.push(config);
            }
                console.log($scope.config_list);
            })

    


    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.photo = {};
    $scope.photo.path = "http://www.videogular.com/assets/images/videogular.png"

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
                token_res = $http.post('http://127.0.0.1:8000/api-token-auth/', {'username':'rajesh', 'password':'tejeshtj'})
            console.log(token_res);
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


    $scope.submit = function(file) {
        console.log('inside submit', file)
      if (file) {
        $scope.upload(file);
      }
    };

  
    // upload on file select or drop
    $scope.upload = function (file) {
        console.log('upload is called ', file);
        Upload.upload({
            url: 'http://127.0.0.1:8000/upload-video',
            method: 'POST',
            data: {'tim':'tom', 'docfile':file},

        })

        // Upload.http({
        //       url: 'http://127.0.0.1:8000/upload-video',
        //       headers : {
        //         'Content-Type': file.type
        //       },
        //       data: file
        //     })

        .then(function (resp) {
            console.log('Success ', resp);

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


myApp.config(function($mdThemingProvider) {
  var customBlueMap =       $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
});

myApp.constant('API_SERVER', 'http://127.0.0.1:8000/');
