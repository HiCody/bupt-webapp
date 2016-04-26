angular.module('app.bupthq.newcontents')
    .factory("CheckerListService", ['ApiBupthqNewContents', 'EnvBupthq', '$http' , function (api, env, $http) {
        var loadSuccess = false,
            checkerList = [], recentCheckerList = [],
            selectedCheckerList = [], currentSelectedCheckerList = [];

        return {
            loadCheckerList: function (callback) {
                return $http.post(env.server + api.checkerList).success(function (data) {
                    loadSuccess = true;
                    var _checkerList = data.object.checkerList,
                        _recenterCheckerList = data.object.recentCheckerList;

                    for (var i = 0; i < _checkerList.length; i++) {
                        checkerList.push({id: _checkerList[i].id, name: _checkerList[i].name, children: _checkerList[i].children});
                    }
                    for (var i = 0; i < _recenterCheckerList.length; i++) {
                        recentCheckerList.push({checkers: _recenterCheckerList[i].checkers, checkerNames: _recenterCheckerList[i].checkerNames});
                    }
                    callback();
                });
            },
            getLoadSuccess: function () {
                return loadSuccess;
            },
            getRecentCheckerList: function () {
                return recentCheckerList;
            },
            setCheckerList: function (_checkerList) {
                return checkerList = _checkerList;
            },
            getCheckerList: function () {
                return checkerList;
            },
            setRecentCheckerList: function (_recentCheckerList) {
                return recentCheckerList = _recentCheckerList;
            },
            setSelectedCheckerList: function (_selectedCheckerList) {
                selectedCheckerList = _selectedCheckerList;
            },
            getSelectedCheckerList: function () {
                currentSelectedCheckerList = selectedCheckerList.clone();
                return selectedCheckerList;
            },
            getCurrentSelectedCheckerList: function () {
                return currentSelectedCheckerList;
            },
            selectedChecker: function (item) {
                if (currentSelectedCheckerList.indexOf(item) != -1) {
                    currentSelectedCheckerList.removeObj(item);
                } else {
                    currentSelectedCheckerList.push(item);
                }
            },
            isSelectedChecker: function (item) {
                for (var i = 0; i < selectedCheckerList.length; i++) {
                    if (item.id == selectedCheckerList[i].id && item.name == selectedCheckerList[i].name) {
                        return true;
                    }
                }
                return false;
            },
            unSelectedChecker: function (item) {
                currentSelectedCheckerList.removeObj(item);
            },
            getSelectedCheckerNames: function () {
                var checkerNames = '';
                for (var i = 0; i < selectedCheckerList.length; i++) {
                    if (i < selectedCheckerList.length - 1) {
                        checkerNames += selectedCheckerList[i].name + ";";
                    } else {
                        checkerNames += selectedCheckerList[i].name;
                    }
                }
                return checkerNames;
            },
            getPostSelectedCheckerData: function () {
                var selectedCheckerData = [];
                for (var i = 0; i < selectedCheckerList.length; i++) {
                    var userId = selectedCheckerList[i].id, nextUserId = 0;
                    if (i < selectedCheckerList.length - 1) {
                        nextUserId = selectedCheckerList[i + 1].id;
                    }
                    selectedCheckerData.push({userid: userId, nextUserid: nextUserId, sort: i});
                }
                return selectedCheckerData;
            },
            getHqCheckersSnapShot: function () {
                var checkers = [], checkerNames = [];
                for (var i = 0; i < selectedCheckerList.length; i++) {
                    checkers.push(selectedCheckerList[i].id);
                    checkerNames.push(selectedCheckerList[i].name);
                }
                return {checkers: checkers.join(";"), checkerNames: checkerNames.join(";")};
            }
        }

    }]);
