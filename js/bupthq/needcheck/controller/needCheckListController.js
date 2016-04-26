angular.module('app.bupthq.needcheck')
    .controller('NeedCheckListController', ['$scope', '$state', 'NeedCheckService', '$stateParams', function ($scope, $state, NeedCheckService, $stateParams) {

        $scope.hasNextPage = true;

        $scope.$on('$ionicView.beforeEnter', function () {
            if ($stateParams.actionList) {
                NeedCheckService.setActionList($stateParams.actionList);
            }
        });

        //分页加载列表数据
        $scope.loadListData = function () {
            NeedCheckService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            NeedCheckService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.showNeedCheckDetail = function (dataId) {
            $state.go('bupthq/contents-detail', {dataId: dataId, needCheck: true, pageUrl: 'bupthq/needcheck-list'});
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            NeedCheckService.resetCondition();
            NeedCheckService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                NeedCheckService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.needCheckListToday = NeedCheckService.getNeedCheckListToday();
            $scope.needCheckListBefore = NeedCheckService.getNeedCheckListBefore();
            $scope.hasNextPage = NeedCheckService.hasNextPage();
        };

    }]);