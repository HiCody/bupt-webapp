angular.module('app.bupthq.passed')
    .controller('PassedListQueryController', ['$scope', "$state", 'PassedService', function ($scope, $state, PassedService) {
        $scope.condition = PassedService.getCondition();

        $scope.queryPassedList = function () {
            $state.go('bupthq/passed-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            PassedService.resetCondition();
        };
    }]);

