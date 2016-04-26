angular.module('app.bupthq.readhistory')
    .controller('ReadHistoryListController', ['$scope', "$state", 'ReadHistoryService', '$stateParams', function ($scope, $state, ReadHistoryService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            ReadHistoryService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            ReadHistoryService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showReadDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, pageUrl: 'bupthq/read-history-list'});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            ReadHistoryService.resetCondition();
            ReadHistoryService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                ReadHistoryService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.readHistoryListToday = ReadHistoryService.getReadListToday();
            $scope.readHistoryListBefore = ReadHistoryService.getReadListBefore();
            $scope.hasNextPage = ReadHistoryService.hasNextPage();
        };

    }]);