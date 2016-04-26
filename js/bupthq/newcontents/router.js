angular.module('app.bupthq.newcontents')
    //新申请所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/new-contents', {
            url: '/bupthq/new-contents',
            templateUrl: 'templates/bupthq/newcontents/new-contents.html',
            controller: 'newContentsController',
            params: {
                pageUrl: '',
                actionList: []
            }
        });

        $stateProvider.state('bupthq/type-list', {
            url: '/bupthq/type-list',
            templateUrl: 'templates/bupthq/newcontents/type-list.html',
            controller: 'typeListController'
        });

        $stateProvider.state('bupthq/checker-list', {
            url: '/bupthq/checker-list',
            templateUrl: 'templates/bupthq/newcontents/checker-list.html',
            controller: 'checkerListController'
        });

        $stateProvider.state('bupthq/checker-recent-list', {
            url: '/bupthq/checker-recent-list',
            templateUrl: 'templates/bupthq/newcontents/checker-recent-list.html',
            controller: 'checkerRecentListController'
        });

        $stateProvider.state('bupthq/reader-list', {
            url: '/bupthq/reader-list',
            templateUrl: 'templates/bupthq/newcontents/reader-list.html',
            controller: 'readerListController'
        });

        $stateProvider.state('bupthq/reader-recent-list', {
            url: '/bupthq/reader-recent-list',
            templateUrl: 'templates/bupthq/newcontents/reader-recent-list.html',
            controller: 'readerRecentListController'
        });

    });
