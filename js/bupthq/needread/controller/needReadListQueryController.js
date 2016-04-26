angular.module('app.bupthq.needread')
    .controller('NeedReadListQueryController', ['$scope', "$state", 'NeedReadService', function ($scope, $state, NeedReadService) {
        $scope.condition = NeedReadService.getCondition();

        $scope.queryNeedReadList = function () {
            $state.go('bupthq/needread-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            NeedReadService.resetCondition();
        };
    }]);

