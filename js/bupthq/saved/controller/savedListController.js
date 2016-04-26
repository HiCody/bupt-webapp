angular.module('app.bupthq.saved')
    .controller('SavedListController', ['$scope', "$state", 'SavedService', 'NewContentsService', '$stateParams', function ($scope, $state, SavedService, NewContentsService, $stateParams) {

        $scope.hasNextPage = true;

        //分页加载列表数据
        $scope.loadListData = function () {
            SavedService.loadListData(function () {
                $scope.fillData();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        //下拉刷新加载数据
        $scope.refreshListData = function () {
            SavedService.refreshListData(function () {
                $scope.fillData();
                $scope.$broadcast("scroll.refreshComplete");
            });
        };

        //详细页面跳转
        $scope.reEditContents = function (dataId) {
            NewContentsService.reEditHqContents(dataId, function () {
                $state.go('bupthq/new-contents', {pageUrl: 'bupthq/saved-list', actionList: $stateParams.actionList});
            });
        };

        //返回时,清除搜索条件
        $scope.goBack = function () {
            SavedService.resetCondition();
            SavedService.resetCachedData();
            $state.go('tabs.home');
        };

        //搜索返回页面时,清空原有的数据
        $scope.$on('$ionicView.beforeEnter', function (event, data) {
            if ($stateParams.queryPage) {
                SavedService.resetCachedData();
            }
            if (data.fromCache && !$stateParams.queryPage) {
                $scope.fillData();
                $scope.loadListData();
            } else {
                $scope.fillData();
            }
        });

        $scope.fillData = function () {
            $scope.savedList = SavedService.getSavedList();
            $scope.hasNextPage = SavedService.hasNextPage();
        };
    }]);

