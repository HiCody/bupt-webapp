angular.module('app.frame.home')
    .controller('HomeController', ['$scope', 'HomeService', '$state', 'AppService', '$ionicPopup','$ionicPopover',function ($scope, HomeService, $state, AppService, $ionicPopup,$ionicPopover) {

        $scope.$on('$ionicView.beforeEnter', function () {
            HomeService.getOrgList().success(function (data) {
                if (data.object.length > 0) {
                    $scope.orgList = data.object;
                    AppService.setOrgId(data.object[0].id);
                    $scope.getMenuList();
                } else {
                    var alertPopup = $ionicPopup.alert({title: '提示', template: '未经授权的账户,请联系管理员!'});
                    alertPopup.then(function () {
                        $state.go('frame/login');
                    });
                }
            });
        });

        $scope.changeOrg = function(orgId){

            AppService.setOrgId(orgId);
            $scope.getMenuList();
            $scope.closePopover();

        };

        $scope.getMenuList = function () {
            HomeService.getMenuList().success(function (data) {
                for (var i = 0; i < data.object.length; i++) {
                    if (data.object[i].text == '网上会签') {
                        $scope.hqMenuList = data.object[i].subMenu;
                    }
                }
            });
        };

        $scope.linkPage = function (item) {
            HomeService.getActionList(item.extra.workflowId, item.extra.stateId).success(function (data) {
                $state.go(item.url, {actionList: data.object});
            });
        };

        // .fromTemplateUrl() 方法
        $ionicPopover.fromTemplateUrl('templates/frame/home/orgs.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };



    }]);