angular.module('app.bupthq.inProcessing')
    .controller('InProcessingListQueryTypeController', ['$scope', "$state", 'InProcessingService', 'HqTypeService', function ($scope, $state, InProcessingService, HqTypeService) {
        $scope.condition = InProcessingService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/inProcessing-list-query');
        };
    }]);