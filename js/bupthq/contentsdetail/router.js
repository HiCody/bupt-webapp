angular.module('app.bupthq.contentsdetail')
    //已通过所有的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('bupthq/contents-detail', {
            url: '/bupthq/contents-detail',
            templateUrl: 'templates/bupthq/contentsdetail/contents-detail.html',
            controller: 'ContentsDetailController',
            params: {
                dataId: '',
                pageUrl: '',
                needCheck: false,
                state: -1
            }
        });
    });
