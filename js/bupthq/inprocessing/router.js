angular.module('app.bupthq.inProcessing')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/inProcessing-list', {
            url: '/bupthq/inProcessing-list',
            templateUrl: 'templates/bupthq/inprocessing/in-Processing-list.html',
            controller: 'InProcessingListController',
            params: {
                'queryPage': false
            }
        });

        $stateProvider.state('bupthq/inProcessing-list-query', {
            url: '/bupthq/inProcessing-list-query',
            templateUrl: 'templates/bupthq/inprocessing/in-Processing-list-query.html',
            controller: 'InProcessingListQueryController'
        });

        $stateProvider.state('bupthq/inProcessing-list-query-type', {
            url: '/bupthq/inProcessing-list-query-type',
            templateUrl: 'templates/bupthq/inprocessing/in-Processing-list-query-type.html',
            controller: 'InProcessingListQueryTypeController'
        });

    });