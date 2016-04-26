angular.module('app.bupthq.needcheck')
    .controller('NeedCheckListQueryController', ['$scope', "$state", 'NeedCheckService', function ($scope, $state, NeedCheckService) {
        $scope.condition = NeedCheckService.getCondition();

        $scope.queryNeedCheckList = function () {
            $state.go('bupthq/needcheck-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            NeedCheckService.resetCondition();
        };
    }]);
