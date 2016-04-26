angular.module('app.bupthq.unpassed')
    .controller('UnPassedListQueryTypeController', ['$scope', "$state", 'UnPassedService', 'HqTypeService', function ($scope, $state, UnPassedService, HqTypeService) {
        $scope.condition = UnPassedService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/unpassed-list-query');
        };

    }]);