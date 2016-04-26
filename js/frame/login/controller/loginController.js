angular.module('app.frame.login')
    .controller('LoginController', ['$rootScope', '$scope', '$state', 'LoginService', 'AppService', '$ionicPopup','$window',
        function ($rootScope, $scope, $state, loginService, AppService, $ionicPopup,$window) {

            $scope.loginInfo = {
                username: '',
                password: '',
                rememberPassword: false,
                autoLogin: false
            };

            var localStorageService = Tools.getStorageService($window);

            $scope.login = function () {

                loginService.loginCheck($scope.loginInfo.username, $scope.loginInfo.password).success(function (data) {

                    if (200 == data.status) {
                        //本地存储登录信息
                        localStorageService.setObject("loginInfo", $scope.loginInfo);

                        AppService.setUserId(data.object);
                        $state.go('tabs.home');
                    } else {
                        $ionicPopup.alert({title: '提示', template: '用户名或密码错误!'});
                    }
                }).error(function () {
                    $ionicPopup.alert({title: '提示', template: '服务器异常,请稍后重试!'});
                });
            };

            $scope.$on('$ionicView.beforeEnter', function () {
                $scope.hideTabs = 'hide';
                var loginInfoTemp = localStorageService.getObject("loginInfo");

                if (loginInfoTemp.autoLogin) {
                    //自动登录
                    $scope.loginInfo = loginInfoTemp;
                    $scope.login();

                } else if (loginInfoTemp.rememberPassword) {
                    //restore填写的loginInfo
                    $scope.loginInfo = loginInfoTemp;

                }
            });

            $scope.$on('$ionicView.afterLeave', function () {
                $scope.hideTabs = '';
            });


        }]);