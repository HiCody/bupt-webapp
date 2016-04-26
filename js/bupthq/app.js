//bupthq所有模块的加载
angular.module('app.bupthq', [
    'ionic',
    'app.bupthq.newcontents',
    'app.bupthq.contentsdetail',
    'app.bupthq.saved',
    'app.bupthq.passed',
    'app.bupthq.readhistory',
    'app.bupthq.checkedhistory',
    'app.bupthq.unpassed',
    'app.bupthq.needcheck',
    'app.bupthq.needread',
    'app.bupthq.inProcessing'
]);

//已通过列表请求参数配置
angular.module('app.bupthq').constant("EnvBupthq", {
    server: 'http://127.0.0.1:8080/bupthq/'
});

//模块启动时,加载的数据请求地址
angular.module('app.bupthq').constant("ApiBupthq", {
    htTypeList: "hqtype/json/hqTypeList.json"
});

//模块请求,加载一些必要的共用数据
angular.module('app.bupthq').run(['$rootScope', 'HqTypeService', function ($rootScope, HqTypeService) {
    //1.会签类型加载
    HqTypeService.loadHqTypeListData();
}]);

//service服务声明
angular.module('app.bupthq')
    .factory("HqTypeService", ['ApiBupthq', 'EnvBupthq', '$http', function (api, env, $http) {
        var hqTypeDataList = [];
        return {
            loadHqTypeListData: function () {
                $http.post(env.server + api.htTypeList).success(function (data) {
                    hqTypeDataList = data.object;
                });
            },
            getHqTypeQueryListData: function () {
                var data = hqTypeDataList.clone();
                data.insert(0, {id: 0, name: "不限"});
                return data;
            },
            getHqTypeListData: function () {
                return hqTypeDataList.clone();
            }
        }
    }]);
