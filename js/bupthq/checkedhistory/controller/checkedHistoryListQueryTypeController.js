angular.module('app.bupthq.checkedhistory')
    .controller('CheckedHistoryListQueryTypeController', ['$scope', "$state", 'CheckedHistoryService', 'HqTypeService', function ($scope, $state, CheckedHistoryService, HqTypeService) {
        $scope.condition = CheckedHistoryService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/checked-history-list-query');
        }
    }]);
