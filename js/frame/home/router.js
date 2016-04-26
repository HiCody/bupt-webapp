angular.module('app.frame.home')
    .config(function ($stateProvider, $urlRouterProvider) {
        //设置框架的路由
        $stateProvider.state('tabs.home', {
            url: '/home',
            views: {
                'home': {
                    templateUrl: 'templates/frame/home/home.html',
                    controller:'HomeController'
                }
            }
        })
    });



