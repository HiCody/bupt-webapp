angular.module('app.frame.login')
    .factory("LoginService", ['ApiFrameLogin', 'EnvFrame', '$http', function (api, env, $http) {
        return {
            loginCheck: function (username, password) {
                return $http.post(env.server + api.loginCheck, {username: username, password: password});
            }
        }
    }]);