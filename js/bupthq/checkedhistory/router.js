angular.module('app.bupthq.checkedhistory')
//已通过所有的路由配置
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('bupthq/checked-history-list', {
        url: 'bupthq/checked-history-list',
        templateUrl: 'templates/bupthq/checkedhistory/checked-history-list.html',
        controller: 'CheckedHistoryListController',
        params: {
            'queryPage': false
        }
    });

    $stateProvider.state('bupthq/checked-history-list-query', {
        url: 'bupthq/checked-history-list-query',
        templateUrl: 'templates/bupthq/checkedhistory/checked-history-list-query.html',
        controller: 'CheckedHistoryListQueryController'
    });

    $stateProvider.state('bupthq/checked-history-list-query-type', {
        url: 'bupthq/checked-history-list-query-type',
        templateUrl: 'templates/bupthq/checkedhistory/checked-history-list-query-type.html',
        controller: 'CheckedHistoryListQueryTypeController'
    });

});
