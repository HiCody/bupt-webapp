//bupthq所有模块的加载
angular.module('app.frame', [
    'ionic',
    'app.frame.login',
    'app.frame.home',
    'app.frame.news',
    'app.frame.self'
]);

//已通过列表请求参数配置
angular.module('app.frame').constant("EnvFrame", {
    server: 'http://127.0.0.1:8080/'
});

angular.module('app.frame')
    //全局的样式默认UI样式修改
    .config(function ($ionicConfigProvider) {
        //配置tabs的位置和样式
        $ionicConfigProvider.tabs.position("bottom");
        $ionicConfigProvider.tabs.style("standard ");
    });


angular.module('app.frame')
//frame的路由配置
    .config(function ($stateProvider, $urlRouterProvider) {
        //设置框架的路由
        $stateProvider
            .state('tabs', {
                url: '/tabs',
                abstract: true,
                templateUrl: 'templates/frame/tabs.html'
            });
        //配置意外的跳转
        $urlRouterProvider.otherwise('frame/login');
    });


//全局的服务
angular.module('app.frame')
    .factory("AppService", [function () {
        var userId = 0, orgId = 0;
        return {
            setUserId: function (_userId) {
                userId = _userId;
            },
            getUserId: function () {
                return userId;
            },
            setOrgId: function (_orgId) {
                orgId = _orgId;
            },
            getOrgId: function () {
                return orgId;
            }
        }
    }]);