angular.module('app.bupthq.needcheck')
    .controller('NeedCheckListQueryTypeController', ['$scope', "$state", 'NeedCheckService', 'HqTypeService', function ($scope, $state, NeedCheckService, HqTypeService) {
        $scope.condition = NeedCheckService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/needcheck-list-query');
        }
    }]);
