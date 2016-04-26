angular.module('app.frame.login')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('frame/login', {
            url: '/frame/login',
            templateUrl: 'templates/frame/login/login.html',
            controller: 'LoginController'
        });
    });