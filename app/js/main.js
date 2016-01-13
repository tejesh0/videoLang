// Create your app with 'youtube-embed' dependency
var myApp = angular.module('myApp', ['youtube-embed', 'ngRoute', 'ngAnimate', 'ngMessages']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'TheCtrl'
  })
  .when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignUpController'
  })
  .otherwise('/');
}]).run(function ($rootScope, $window) {
  $rootScope.$on('$routeChangeSuccess', function () {
    $window.scrollTo(0, 0);
  });
});

myApp.controller('TheCtrl', function ($scope) {

});

myApp.controller('SignUpController', function () {

        var ctrl = this,
            newCustomer = { email:'', userName:'', password:'' };

        var signup = function () {
            if( ctrl.signupForm.$valid) {
                ctrl.showSubmittedPrompt = true;
                clearForm();
            }
        };

        var clearForm = function () {
            ctrl.newCustomer = { email:'', userName:'', password:'' }
            ctrl.signupForm.$setUntouched();
            ctrl.signupForm.$setPristine();
        };

        var getPasswordType = function () {
            return ctrl.signupForm.showPassword ? 'text' : 'password';
        };

        var toggleEmailPrompt = function (value) {
            ctrl.showEmailPrompt = value;
        };

        var toggleUsernamePrompt = function (value) {
            ctrl.showUsernamePrompt = value;
        };

        var hasErrorClass = function (field) {
            return ctrl.signupForm[field].$touched && ctrl.signupForm[field].$invalid;
        };

        var showMessages = function (field) {
            return ctrl.signupForm[field].$touched || ctrl.signupForm.$submitted
        };

        ctrl.showEmailPrompt = false;
        ctrl.showUsernamePrompt = false;
        ctrl.showSubmittedPrompt = false;
        ctrl.toggleEmailPrompt = toggleEmailPrompt;
        ctrl.toggleUsernamePrompt = toggleUsernamePrompt;
        ctrl.getPasswordType = getPasswordType;
        ctrl.hasErrorClass = hasErrorClass;
        ctrl.showMessages = showMessages;
        ctrl.newCustomer = newCustomer;
        ctrl.signup = signup;
        ctrl.clearForm = clearForm;
    })
