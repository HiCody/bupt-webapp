angular.module('app.bupthq.readhistory')
    .controller('ReadHistoryListQueryController', ['$scope', "$state", 'ReadHistoryService', function ($scope, $state, ReadHistoryService) {
        $scope.condition = ReadHistoryService.getCondition();

        $scope.queryReadHistoryList = function () {
            $state.go('bupthq/read-history-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            ReadHistoryService.resetCondition();
        };
    }]);

