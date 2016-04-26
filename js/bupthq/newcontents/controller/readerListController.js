angular.module('app.bupthq.newcontents')
    .controller('readerListController', ['$scope', '$state', 'NewContentsService', 'ReaderListService', function ($scope, $state, NewContentsService, ReaderListService) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.selectedReadersList = ReaderListService.getSelectedReaderList();

            if (!ReaderListService.getLoadSuccess()) {
                ReaderListService.loadReaderList(function () {
                    $scope.readerList = ReaderListService.getReaderList();
                })
            } else {
                $scope.readerList = ReaderListService.getReaderList();
            }
        });

        $scope.selectedReader = function (item) {
            ReaderListService.selectedReader(item);
        };

        $scope.isSelectedReader = function (item) {
            return ReaderListService.isSelectedReader(item);
        };

        $scope.unSelectedReader = function (item) {
            ReaderListService.unSelectedReader(item);
        };

        $scope.confirmSelectedReader = function () {
            //设置对象
            ReaderListService.setSelectedReaderList(ReaderListService.getCurrentSelectedReaderList().clone());
            $state.go('bupthq/new-contents');
        };

    }]);
