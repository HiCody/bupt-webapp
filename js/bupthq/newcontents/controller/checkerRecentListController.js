angular.module('app.bupthq.newcontents')
    .controller('checkerRecentListController', ['$scope', '$state', 'NewContentsService', '$interval', 'CheckerListService', function ($scope, $state, NewContentsService, $interval, CheckerListService) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if (!CheckerListService.getLoadSuccess()) {
                $scope.interval = $interval(function () {
                    $scope.recentCheckerList = CheckerListService.getRecentCheckerList();
                    $interval.cancel($scope.interval);
                }, 100);
            } else {
                $scope.recentCheckerList = CheckerListService.getRecentCheckerList();
            }
        });

        $scope.selectRecentChecker = function (item) {
            var ids = item.checkers.split(';'),
                names = item.checkerNames.split(';');

            var selectedCheckers = [];
            for (var i = 0; i < ids.length; i++) {
                selectedCheckers.push({id: parseInt(ids[i]), name: names[i]});
                CheckerListService.setSelectedCheckerList(selectedCheckers);
            }
            $state.go('bupthq/new-contents');
        };
    }]);
