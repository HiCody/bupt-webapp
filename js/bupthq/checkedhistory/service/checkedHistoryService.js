angular.module('app.bupthq.checkedhistory')
    .factory("CheckedHistoryService", ['ApiBupthqCheckedHistory', 'EnvBupthq', '$http', function (api, env, $http) {
        var checkedHistoryListToday = [],
            checkedHistoryListBefore = [],
            pageIndex = 0,
            pageSize = 10,
            hasNextPage = true,
            condition = {
                type: 0,
                typeName: "不限",
                title: ""
            };

        return {
            loadListData: function (successCallBack) {
                var self = this,
                    searchFilter = this.getSearchFilter();

                ++pageIndex;
                $http.post(env.server + api.checkedHistoryList, {idx: self.getPageIndex(), pageSize: pageSize, search: JSON.stringify(searchFilter)}).success(function (data) {
                    self.loadListDataCallback(data);
                    successCallBack();
                });
            },
            refreshListData: function (successCallBack) {
                this.resetCondition();
                this.resetCachedData();
                this.loadListData(successCallBack);
            },
            resetCachedData: function () {
                this.setPageIndex(0);
                this.setHasNextPage(true);
                this.setCheckedHistoryListBefore([]);
                this.setCheckedHistoryListToday([]);
            },
            loadListDataCallback: function (data) {
                var pageInfo = data.object,
                    today = new Date().format("yyyy-MM-dd");

                for (var i = 0; i < pageInfo.items.length; i++) {
                    //区分数据是今天的数据还是以往的数据
                    if (today == new Date(pageInfo.items[i].checkDate).format('yyyy-MM-dd')) {
                        checkedHistoryListToday.push(pageInfo.items[i]);
                    } else {
                        checkedHistoryListBefore.push(pageInfo.items[i]);
                    }
                }

                if (pageIndex >= pageInfo.pageCount) {
                    hasNextPage = false;
                } else {
                    hasNextPage = true;
                }
            },
            getCondition: function () {
                return condition;
            },
            resetCondition: function () {
                condition.type = 0;
                condition.typeName = "不限";
                condition.title = "";
                return condition;
            },
            getSearchFilter: function () {
                var type = condition.type;
                var title = condition.title;
                return {type: type, title: title};
            },
            setCheckedHistoryListToday: function (_checkedHistoryListToday) {
                checkedHistoryListToday = _checkedHistoryListToday;
            },
            getCheckedHistoryListToday: function () {
                return checkedHistoryListToday;
            },
            getCheckedHistoryListBefore: function () {
                return checkedHistoryListBefore;
            },
            setCheckedHistoryListBefore: function (_checkedHistoryListBefore) {
                checkedHistoryListBefore = _checkedHistoryListBefore;
            },
            setPageIndex: function (_pageIndex) {
                pageIndex = _pageIndex;
            },
            getPageIndex: function () {
                return pageIndex;
            },
            hasNextPage: function () {
                return hasNextPage;
            },
            setHasNextPage: function (_hasNextPage) {
                hasNextPage = _hasNextPage;
            }
        }
    }]);
