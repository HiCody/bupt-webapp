angular.module('app.bupthq.inProcessing')
    .controller('InProcessingListController', ['$scope', "$state", 'InProcessingService', '$stateParams', function ($scope, $state, InProcessingService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            InProcessingService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };


        //下拉刷新加载数据
        $scope.refreshListData = function () {
            InProcessingService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showInProcessingDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, pageUrl: 'bupthq/inProcessing-list'});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            InProcessingService.resetCondition();
            InProcessingService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                InProcessingService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.inProcessingListToday = InProcessingService.getInProcessingListToday();
            $scope.inProcessingListBefore = InProcessingService.getInProcessingListBefore();
            $scope.hasNextPage = InProcessingService.hasNextPage();
        };
    }]);