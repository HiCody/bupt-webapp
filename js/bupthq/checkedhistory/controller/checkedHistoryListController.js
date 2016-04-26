angular.module('app.bupthq.checkedhistory')
    .controller('CheckedHistoryListController', ['$scope', "$state", 'CheckedHistoryService', '$stateParams', function ($scope, $state, CheckedHistoryService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            CheckedHistoryService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            CheckedHistoryService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showCheckedHistoryDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, pageUrl: 'bupthq/checked-history-list'});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            CheckedHistoryService.resetCondition();
            CheckedHistoryService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                CheckedHistoryService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.checkedHistoryListToday = CheckedHistoryService.getCheckedHistoryListToday();
            $scope.checkedHistoryListBefore = CheckedHistoryService.getCheckedHistoryListBefore();
            $scope.hasNextPage = CheckedHistoryService.hasNextPage();
        };
    }]);