angular.module('app.bupthq.inProcessing')
    .controller('InProcessingListQueryController', ['$scope', "$state", 'InProcessingService', function ($scope, $state, InProcessingService) {
        $scope.condition = InProcessingService.getCondition();

        $scope.queryInProcessingList = function () {
            $state.go('bupthq/inProcessing-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            InProcessingService.resetCondition();
        };
    }]);

