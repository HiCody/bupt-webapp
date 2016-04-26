angular.module('app.bupthq.checkedhistory')
    .controller('CheckedHistoryListQueryController', ['$scope', "$state", 'CheckedHistoryService', function ($scope, $state, CheckedHistoryService) {
        $scope.condition = CheckedHistoryService.getCondition();

        $scope.queryCheckHistoryList = function () {
            $state.go('bupthq/checked-history-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            CheckedHistoryService.resetCondition();
        };
    }]);

