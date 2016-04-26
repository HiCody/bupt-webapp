angular.module('app.bupthq.unpassed')
    .controller('UnPassedListQueryController', ['$scope', "$state", 'UnPassedService', function ($scope, $state, UnPassedService) {
        $scope.condition = UnPassedService.getCondition();

        $scope.queryUnPassedList = function () {
            $state.go('bupthq/unpassed-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            UnPassedService.resetCondition();
        };
    }]);

