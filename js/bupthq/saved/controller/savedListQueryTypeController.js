angular.module('app.bupthq.saved')
    .controller('SavedListQueryTypeController', ['$scope', "$state", 'SavedService', 'HqTypeService', function ($scope, $state, SavedService, HqTypeService) {
        $scope.condition = SavedService.getCondition();
        $scope.hqTypeDataList = HqTypeService.getHqTypeQueryListData();

        $scope.selectHqType = function (item) {
            $scope.condition.type = item.id;
            $scope.condition.typeName = item.name;
            $state.go('bupthq/saved-list-query');
        }
    }]);