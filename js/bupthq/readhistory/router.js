angular.module('app.bupthq.readhistory')
    //新申请所有的路由配置��
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/read-history-list', {
            url: '/bupthq/read-history-list',
            templateUrl: 'templates/bupthq/readhistory/read-history-list.html',
            controller: 'ReadHistoryListController',
            params: {
                'queryPage': false
            }
        });

        $stateProvider.state('bupthq/read-history-list-query', {
            url: '/bupthq/read-history-list-query',
            templateUrl: 'templates/bupthq/readhistory/read-history-list-query.html',
            controller: 'ReadHistoryListQueryController'
        });

        $stateProvider.state('bupthq/read-history-list-query-type', {
            url: '/bupthq/read-history-list-query-type',
            templateUrl: 'templates/bupthq/readhistory/read-history-list-query-type.html',
            controller: 'ReadHistoryListQueryTypeController'
        });
    });
