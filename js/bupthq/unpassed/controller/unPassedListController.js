angular.module('app.bupthq.unpassed')
    .controller('UnPassedListController', ['$scope', "$state", 'UnPassedService', '$stateParams', function ($scope, $state, UnPassedService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            UnPassedService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            UnPassedService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showUnPassedDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, pageUrl: 'bupthq/unpassed-list', state: 1});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            UnPassedService.resetCondition();
            UnPassedService.resetCachedData();
            $scope.fillData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                UnPassedService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.unPassedListToday = UnPassedService.getUnPassedListToday();
            $scope.unPassedListBefore = UnPassedService.getUnPassedListBefore();
            $scope.hasNextPage = UnPassedService.hasNextPage();
        };
    }]);