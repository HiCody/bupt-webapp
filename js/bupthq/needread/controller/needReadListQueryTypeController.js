angular.module('app.bupthq.needread')
    .controller('NeedReadListQueryTypeController', ['$scope', "$state", 'NeedReadService', 'HqTypeService', function ($scope, $state, NeedReadService, HqTypeService) {
        $scope.condition = NeedReadService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/needread-list-query');
        }
    }]);