angular.module('app.bupthq.passed')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/passed-list', {
            url: '/bupthq/passed-list',
            templateUrl: 'templates/bupthq/passed/passed-list.html',
            controller: 'PassedListController',
            params: {
                'queryPage': false
            }
        });

        $stateProvider.state('bupthq/passed-list-query', {
            url: '/bupthq/passed-list-query',
            templateUrl: 'templates/bupthq/passed/passed-list-query.html',
            controller: 'PassedListQueryController'
        });

        $stateProvider.state('bupthq/passed-list-query-type', {
            url: '/bupthq/passed-list-query-type',
            templateUrl: 'templates/bupthq/passed/passed-list-query-type.html',
            controller: 'PassedListQueryTypeController'
        });

    });