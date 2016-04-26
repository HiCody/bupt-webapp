angular.module('app.bupthq.contentsdetail')
    .factory("ContentsDetailsService", ['ApiBupthqContentsDetail', 'EnvBupthq', '$http', function (api, env, $http) {
        return {
            loadDetailData: function (dataId, state) {
                return $http.post(env.server + api.contentsDetail, {dataId: dataId, state: state});
            },
            downloadFile: function (name, url) {
                window.open(api.downloadFileUrl + url);
            }
        }
    }]);

