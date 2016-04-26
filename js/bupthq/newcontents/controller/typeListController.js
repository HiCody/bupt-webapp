angular.module('app.bupthq.newcontents')
    .controller('typeListController', ['$scope', "$state", 'HqTypeService', 'NewContentsService', function ($scope, $state, HqTypeService, NewContentsService) {
        $scope.hqTypeDataList = HqTypeService.getHqTypeListData();
        $scope.hqContents = NewContentsService.getHqContent();

        $scope.selectHqType = function (item) {
            $scope.hqContents.hq_contents.typeName = item.name;
            $state.go('bupthq/new-contents');
        }
    }]);