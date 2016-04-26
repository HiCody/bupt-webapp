angular.module('app.bupthq.newcontents')
    .factory("ReaderListService", ['ApiBupthqNewContents', 'EnvBupthq', '$http' , function (api, env, $http) {
        var loadSuccess = false,
            readerList = [], recentReaderList = [],
            selectedReaderList = [],currentSelectedReaderList = [];

        return {
            loadReaderList: function (callback) {
                return $http.post(env.server + api.readerList).success(function (data) {
                    loadSuccess = true;
                    var _readerList = data.object.readerList,
                        _recenterReaderList = data.object.recentReaderList;

                    for (var i = 0; i < _readerList.length; i++) {
                        readerList.push({id: _readerList[i].id, name: _readerList[i].name, children: _readerList[i].children});
                    }
                    for (var i = 0; i < _recenterReaderList.length; i++) {
                        recentReaderList.push({readers: _recenterReaderList[i].readers, readerNames: _recenterReaderList[i].readerNames});
                    }
                    callback();
                });
            },
            getLoadSuccess: function () {
                return loadSuccess;
            },
            getRecentReaderList: function () {
                return recentReaderList;
            },
            setReaderList: function (_readerList) {
                return readerList = _readerList;
            },
            getReaderList: function () {
                return readerList;
            },
            setRecentReaderList: function (_recentReaderList) {
                return recentReaderList = _recentReaderList;
            },
            setSelectedReaderList: function (_selectedReaderList) {
                selectedReaderList = _selectedReaderList;
            },
            getSelectedReaderList: function () {
                currentSelectedReaderList = selectedReaderList.clone();
                return selectedReaderList;
            },
            getCurrentSelectedReaderList: function () {
                return currentSelectedReaderList;
            },
            selectedReader: function (item) {
                if (currentSelectedReaderList.indexOf(item) != -1) {
                    currentSelectedReaderList.removeObj(item);
                } else {
                    currentSelectedReaderList.push(item);
                }
            },
            isSelectedReader: function (item) {
                for (var i = 0; i < selectedReaderList.length; i++) {
                    if (item.id == selectedReaderList[i].id && item.name == selectedReaderList[i].name) {
                        return true;
                    }
                }
                return false;
            },
            unSelectedReader: function (item) {
                currentSelectedReaderList.removeObj(item);
            },
            getSelectedReaderNames: function () {
                var readerNames = '';
                for (var i = 0; i < selectedReaderList.length; i++) {
                    if (i < selectedReaderList.length - 1) {
                        readerNames += selectedReaderList[i].name + ";";
                    } else {
                        readerNames += selectedReaderList[i].name;
                    }
                }
                return readerNames;
            },
            getPostSelectedReaderData: function () {
                var selectedReaderData = [];
                for (var i = 0; i < selectedReaderList.length; i++) {
                    selectedReaderData.push({userid: selectedReaderList[i].id});
                }
                return selectedReaderData;
            },
            getHqReadersSnapShot: function () {
                var readers = [], readerNames = [];
                for (var i = 0; i < selectedReaderList.length; i++) {
                    readers.push(selectedReaderList[i].id);
                    readerNames.push(selectedReaderList[i].name);
                }
                return {readers: readers.join(";"), readerNames: readerNames.join(";")};
            }
        }
    }]);
