angular.module('app.bupthq.needread')
    .controller('NeedReadListController', ['$scope', "$state", 'NeedReadService', '$stateParams', function ($scope, $state, NeedReadService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            NeedReadService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            NeedReadService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showNeedReadDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, state: 0, pageUrl: 'bupthq/needread-list'});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            NeedReadService.resetCondition();
            NeedReadService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                NeedReadService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.needReadListToday = NeedReadService.getNeedReadListToday();
            $scope.needReadListBefore = NeedReadService.getNeedReadListBefore();
            $scope.hasNextPage = NeedReadService.hasNextPage();
        };

    }]);