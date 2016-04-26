angular.module('app.bupthq.readhistory')
    .controller('ReadHistoryListQueryTypeController', ['$scope', "$state", 'ReadHistoryService', 'HqTypeService', function ($scope, $state, ReadHistoryService, HqTypeService) {
        $scope.condition = ReadHistoryService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/read-history-list-query');
        }
    }]);
