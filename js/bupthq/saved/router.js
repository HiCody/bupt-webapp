angular.module('app.bupthq.saved')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/saved-list', {
            url: '/bupthq/savedlist',
            templateUrl: 'templates/bupthq/saved/saved-list.html',
            controller: 'SavedListController',
            params: {
                queryPage: false,
                actionList: []
            }
        });

        $stateProvider.state('bupthq/saved-list-query', {
            url: '/bupthq/saved-list-query',
            templateUrl: 'templates/bupthq/saved/saved-list-query.html',
            controller: 'SavedListQueryController'
        });

        $stateProvider.state('bupthq/saved-list-query-type', {
            url: '/bupthq/saved-list-query-type',
            templateUrl: 'templates/bupthq/saved/saved-list-query-type.html',
            controller: 'SavedListQueryTypeController'
        });
    });