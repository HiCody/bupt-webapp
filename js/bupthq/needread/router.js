angular.module('app.bupthq.needread')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/needread-list', {
            url: '/bupthq/needread-list',
            templateUrl: 'templates/bupthq/needread/needread-list.html',
            controller: 'NeedReadListController',
            params: {
                'queryPage': false
            }
        });

        $stateProvider.state('bupthq/needread-list-query', {
            url: '/bupthq/needread-list-query',
            templateUrl: 'templates/bupthq/needread/needread-list-query.html',
            controller: 'NeedReadListQueryController'
        });

        $stateProvider.state('bupthq/needread-list-query-type', {
            url: '/bupthq/needread-list-query-type',
            templateUrl: 'templates/bupthq/needread/needread-list-query-type.html',
            controller: 'NeedReadListQueryTypeController'
        });
    });