angular.module('app.bupthq.needcheck')
    .factory("NeedCheckService", ['ApiBupthqNeedCheck', 'EnvBupthq', '$http', function (api, env, $http) {
        var needCheckListToday = [],
            needCheckListBefore = [],
            pageIndex = 0,
            pageSize = 10,
            hasNextPage = true,
            condition = {
                type: 0,
                typeName: "不限",
                title: ""
            },
            passedUrl,
            unPassedUrl;

        return {
            loadListData: function (successCallBack) {
                var self = this,
                    searchFilter = this.getSearchFilter();

                ++pageIndex;
                $http.post(env.server + api.needCheckList, {idx: self.getPageIndex(), pageSize: pageSize, search: JSON.stringify(searchFilter)}).success(function (data) {
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
                this.setNeedCheckListBefore([]);
                this.setNeedCheckListToday([]);
            },
            loadListDataCallback: function (data) {
                var pageInfo = data.object,
                    today = new Date().format("yyyy-MM-dd");

                for (var i = 0; i < pageInfo.items.length; i++) {
                    //区分数据是今天的数据还是以往的数据
                    if (today == new Date(pageInfo.items[i].currentStateDate).format('yyyy-MM-dd')) {
                        needCheckListToday.push(pageInfo.items[i]);
                    } else {
                        needCheckListBefore.push(pageInfo.items[i]);
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
            setNeedCheckListToday: function (_needCheckListToday) {
                needCheckListToday = _needCheckListToday;
            },
            getNeedCheckListToday: function () {
                return needCheckListToday;
            },
            getNeedCheckListBefore: function () {
                return needCheckListBefore;
            },
            setNeedCheckListBefore: function (_needCheckListBefore) {
                needCheckListBefore = _needCheckListBefore;
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
            },
            setActionList: function (actionList) {
                for (var i = 0; i < actionList.length; i++) {
                    if (actionList[i].name == 'unPass') {
                        passedUrl = actionList[i].url;
                    } else if (actionList[i].name == 'pass') {
                        unPassedUrl = actionList[i].url;
                    }
                }
            },
            getPassedUrl: function () {
                return passedUrl.replace("/bupthq/", "");
            },
            getUnPassedUrl: function () {
                return unPassedUrl.replace("/bupthq/", "");
            },
            passedContents: function (id, comment) {
                var self = this;
                return $http.post(env.server + self.getPassedUrl(), {data: JSON.stringify({id: id, comment: comment, state: 1})});
            },
            unPassedContents: function (id, comment) {
                var self = this;
                return $http.post(env.server + self.getUnPassedUrl(), {data: JSON.stringify({id: id, comment: comment, state: 2})});
            }
        }
    }]);