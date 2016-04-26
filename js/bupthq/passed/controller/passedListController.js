angular.module('app.bupthq.passed')
    .controller('PassedListController', ['$scope', "$state", 'PassedService', '$stateParams', function ($scope, $state, PassedService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            PassedService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            PassedService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showPassedDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, pageUrl: 'bupthq/passed-list', state: 1});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            PassedService.resetCondition();
            PassedService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                PassedService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.passedListToday = PassedService.getPassedListToday();
            $scope.passedListBefore = PassedService.getPassedListBefore();
            $scope.hasNextPage = PassedService.hasNextPage();
        };
    }]);