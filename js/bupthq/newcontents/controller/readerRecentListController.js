angular.module('app.bupthq.newcontents')
    .controller('readerRecentListController', ['$scope', '$state', 'NewContentsService', 'ReaderListService', '$interval', function ($scope, $state, NewContentsService, ReaderListService, $interval) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if (!ReaderListService.getLoadSuccess()) {
                $scope.interval = $interval(function () {
                    $scope.recentReaderList = ReaderListService.getRecentReaderList();
                    $interval.cancel($scope.interval);
                }, 100);
            } else {
                $scope.recentReaderList = ReaderListService.getRecentReaderList();
            }
        });

        $scope.selectRecentReader = function (item) {
            var ids = item.readers.split(';'),
                names = item.readerNames.split(';');

            var selectedReaders = [];
            for (var i = 0; i < ids.length; i++) {
                selectedReaders.push({id: parseInt(ids[i]), name: names[i]});
                ReaderListService.setSelectedReaderList(selectedReaders);
            }
            $state.go('bupthq/new-contents');
        };
    }]);
