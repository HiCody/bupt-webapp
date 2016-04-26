var app = angular.module('app', ['ionic', 'app.frame', 'app.bupthq']);

app.run(function ($http, $httpParamSerializerJQLike) {
    $http.defaults.transformRequest.unshift($httpParamSerializerJQLike);
});

app.directive('hideTabs', function ($rootScope) {
    return {
        restrict: 'AE',
        link: function ($scope) {
            $rootScope.hideTabs = 'hide';
            $scope.$on('$ionicView.beforeLeave', function () {
                $rootScope.hideTabs = ' ';
            })
        }
    }
});

//所有的request请求带上token
app.factory('requestInjector', ['$rootScope', 'AppService', function ($rootScope, AppService) {
    var sessionInjector = {
        request: function (config) {
            if (config.url.indexOf("?") == -1) {
                config.url += "?";
            } else {
                config.url += "&";
            }
            config.url += "userId=" + AppService.getUserId() + "&orgId=" + AppService.getOrgId();
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            return config;
        }
    };
    return sessionInjector;
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('requestInjector');
}]);