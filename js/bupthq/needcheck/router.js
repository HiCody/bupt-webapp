angular.module('app.bupthq.needcheck')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/needcheck-list', {
            url: 'bupthq/needcheck-list',
            templateUrl: 'templates/bupthq/needcheck/needcheck-list.html',
            controller: 'NeedCheckListController',
            params: {
                queryPage: false,
                actionList: []
            }
        });

        $stateProvider.state('bupthq/needcheck-list-query', {
            url: 'bupthq/needcheck-list-query',
            templateUrl: 'templates/bupthq/needcheck/needcheck-list-query.html',
            controller: 'NeedCheckListQueryController'
        });

        $stateProvider.state('bupthq/needcheck-list-query-type', {
            url: 'bupthq/needcheck-list-query-type',
            templateUrl: 'templates/bupthq/needcheck/needcheck-list-query-type.html',
            controller: 'NeedCheckListQueryTypeController'
        });
    });