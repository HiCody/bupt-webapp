angular.module('app.bupthq.saved')
    .controller('SavedListQueryController', ['$scope', "$state", 'SavedService', function ($scope, $state, SavedService) {
        $scope.condition = SavedService.getCondition();

        $scope.querySavedList = function () {
            $state.go('bupthq/saved-list', {queryPage: true});
        };

        $scope.clearCondition = function () {
            SavedService.resetCondition();
        };
    }]);

