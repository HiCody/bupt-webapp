angular.module('app.bupthq.newcontents')
    .controller('checkerListController', ['$scope', '$state', 'NewContentsService', 'CheckerListService', function ($scope, $state, NewContentsService, CheckerListService) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.selectedCheckersList = CheckerListService.getSelectedCheckerList();

            if (!CheckerListService.getLoadSuccess()) {
                CheckerListService.loadCheckerList(function () {
                    $scope.checkerList = CheckerListService.getCheckerList();
                })
            } else {
                $scope.checkerList = CheckerListService.getCheckerList();
            }
        });

        $scope.selectedChecker = function (item) {
            CheckerListService.selectedChecker(item);
        };

        $scope.isSelectedChecker = function (item) {
            return CheckerListService.isSelectedChecker(item);
        };

        $scope.unSelectedChecker = function (item) {
            CheckerListService.unSelectedChecker(item);
        };

        $scope.confirmSelectedChecker = function () {
            //设置对象
            CheckerListService.setSelectedCheckerList(CheckerListService.getCurrentSelectedCheckerList().clone());
            $state.go('bupthq/new-contents');
        };
    }]);
