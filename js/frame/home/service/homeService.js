angular.module('app.frame.home')
    .factory("HomeService", ['ApiFrameHome', 'EnvFrame', '$http', function (api, env, $http) {
        return {
            getMenuList: function () {
                return $http.post(env.server + api.menuList);
            },
            getActionList: function (workflowId, stateId) {
                return $http.post(env.server + api.actionList, {workflowId: workflowId, stateId: stateId});
            },
            getOrgList: function () {
                return $http.post(env.server + api.orgList);
            }
        }
    }]);