angular.module('app.frame.news')
    .config(function ($stateProvider, $urlRouterProvider) {
        //设置框架的路由
        $stateProvider.state('tabs.news', {
            url: '/news',
            views: {
                'news': {
                    templateUrl: 'templates/frame/news/news.html'
                }
            }
        })
    });