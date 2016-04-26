angular.module('app.bupthq.contentsdetail')
    .controller('ContentsDetailController', ['$scope', '$state', '$stateParams', 'ContentsDetailsService', '$ionicPopup', 'NeedCheckService',
        function ($scope, $state, $stateParams, ContentsDetailsService, $ionicPopup, NeedCheckService) {
            $scope.needCheck = $stateParams.needCheck;
            $scope.hqContents = {};
            //todo angularjs 的一个诡异bug
            $scope.comment = {
                value: ''
            };

            //加载详细数据
            ContentsDetailsService.loadDetailData($stateParams.dataId, $stateParams.state).success(function (data) {
                var hqContents = data.object;
                //对附件的图标进行样式处理
                for (var i = 0; i < hqContents.hq_contents_attachList.length; i++) {
                    var attachInfo = hqContents.hq_contents_attachList[i];
                    hqContents.hq_contents_attachList[i] = Tools.setFileIcon(attachInfo);
                }
                $scope.hqContents = hqContents;
            });

            //返回
            $scope.goBack = function () {
                if (-1 == $stateParams.state) {
                    $state.go($stateParams.pageUrl);
                } else {
                    //刷新页面
                    $state.go($stateParams.pageUrl, {queryPage: true});
                }
            };

            //下载附件
            $scope.downloadFile = function (name, url) {
                ContentsDetailsService.downloadFile(name, url);
            };

            //审批
            $scope.checkContents = function () {
                $ionicPopup.show({
                    template: '<textarea style="height: 100px;" ng-model="comment.value"   placeholder="请填写审批意见(非必填)" contenteditable="true"></textarea>',
                    title: '审批会签',
                    scope: $scope,
                    buttons: [
                        {
                            text: '不同意',
                            onTap: function () {
                                NeedCheckService.unPassedContents($stateParams.dataId, $scope.comment.value).success(function () {
                                    $ionicPopup.alert({title: '提示', template: '提交成功', okText: '确认'}).then(function () {
                                        $state.go($stateParams.pageUrl, {queryPage: true});
                                    });
                                });
                            }
                        },
                        {
                            text: '同意',
                            type: 'button-positive',
                            onTap: function (e) {
                                NeedCheckService.passedContents($stateParams.dataId, $scope.comment.value).success(function () {
                                    $ionicPopup.alert({title: '提示', template: '提交成功', okText: '确认'}).then(function () {
                                        $state.go($stateParams.pageUrl, {queryPage: true});
                                    });
                                });
                            }
                        }
                    ]
                });
            };

        }]);
