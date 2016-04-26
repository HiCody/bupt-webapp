angular.module('app.bupthq.passed')
    .controller('PassedListQueryTypeController', ['$scope', "$state", 'PassedService', 'HqTypeService', function ($scope, $state, PassedService, HqTypeService) {
        $scope.condition = PassedService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/passed-list-query');
        };
    }]);