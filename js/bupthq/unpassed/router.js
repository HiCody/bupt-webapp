angular.module('app.bupthq.unpassed')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/unpassed-list', {
            url: '/bupthq/unpassed-list',
            templateUrl: 'templates/bupthq/unpassed/unpassed-list.html',
            controller: 'UnPassedListController',
            params: {
                'queryPage': false
            }
        });

        $stateProvider.state('bupthq/unpassed-list-query', {
            url: '/bupthq/unpassed-list-query',
            templateUrl: 'templates/bupthq/unpassed/unpassed-list-query.html',
            controller: 'UnPassedListQueryController'
        });

        $stateProvider.state('bupthq/unpassed-list-query-type', {
            url: '/bupthq/unpassed-list-query-type',
            templateUrl: 'templates/bupthq/unpassed/unpassed-list-query-type.html',
            controller: 'UnPassedListQueryTypeController'
        });

    });