angular.module('app.frame.self')
    .config(function ($stateProvider, $urlRouterProvider) {
        //设置框架的路由
        $stateProvider.state('tabs.self', {
            url: '/self',
            views: {
                'self': {
                    templateUrl: 'templates/frame/self/self.html'
                }
            }
        });
    });