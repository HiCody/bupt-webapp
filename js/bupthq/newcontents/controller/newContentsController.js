angular.module('app.bupthq.newcontents')
    .controller("newContentsController", ['$scope', '$state', '$stateParams', '$ionicPopup', 'NewContentsService', 'CheckerListService', '$cordovaCamera', '$cordovaImagePicker', '$ionicActionSheet', '$ionicLoading', 'ReaderListService',
        function ($scope, $state, $stateParams, $ionicPopup, NewContentsService, CheckerListService, $cordovaCamera, $cordovaImagePicker, $ionicActionSheet, $ionicLoading, ReaderListService) {

            $scope.imageList = [];

            $scope.$on('$ionicView.beforeEnter', function () {
                if ($stateParams.actionList) {
                    NewContentsService.setActionList($stateParams.actionList);
                }
                $scope.hqContents = NewContentsService.getHqContent();
                $scope.checkerNames = CheckerListService.getSelectedCheckerNames();
                $scope.readerNames = ReaderListService.getSelectedReaderNames();
            });

            //提交数据
            $scope.submit = function () {
                //validate验证
                if (!$scope.validateData()) {
                    return;
                }

                //判断文件是否都上传完毕
                if (!NewContentsService.setUploadAttachFile($scope.imageList)) {
                    $ionicPopup.alert({title: '提示', template: '一个或多个文件正在上传或上传失败,请删除后重新上传!'});
                }

                //数据提交提示框
                $ionicLoading.show({template: '数据提交中...'});
                NewContentsService.savedHqContent(NewContentsService.getSubmitUrl()).success(function (data) {
                    $ionicLoading.hide();
                    if (200 === data.status) {
                        $ionicPopup.confirm({
                            title: '提示',
                            template: '提交成功!',
                            buttons: [
                                {
                                    text: '返回',
                                    onTap: function (e) {
                                        $scope.resetData();
                                        $state.go($stateParams.pageUrl, {queryPage: true});
                                    }
                                },
                                {
                                    text: '新申请',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        $scope.resetData();
                                    }
                                }
                            ]
                        })
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: '提示', template: '提交失败,请重新尝试!'});
                    }
                }).error(function () {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: '提示', template: '提交失败,请重新尝试!'});
                });
            };

            //验证提交数据
            $scope.validateData = function () {
                if (CheckerListService.getSelectedCheckerList().length == 0) {
                    $ionicPopup.alert({title: '提示', template: '请选择会签审批人!'});
                    return false;
                }

                if (NewContentsService.getHqContent().title == '') {
                    $ionicPopup.alert({title: '提示', template: '请填写主题!'});
                    return false;
                }

                if (NewContentsService.getHqContent().contents == '') {
                    $ionicPopup.alert({title: '提示', template: '请填写会签内容!'});
                    return false;
                }
                return true;
            };

            //返回
            $scope.goBack = function () {
                $ionicPopup.confirm({
                    title: '提示',
                    template: '是否保存草稿箱?',
                    buttons: [
                        {
                            text: '取消',
                            onTap: function (e) {
                                $scope.resetData();
                                if ($stateParams.pageUrl) {
                                    $state.go($stateParams.pageUrl);
                                } else {
                                    $state.go('tabs.home');
                                }
                            }
                        },
                        {
                            text: '保存',
                            type: 'button-positive',
                            onTap: function (e) {
                                NewContentsService.savedHqContent(NewContentsService.getSavedUrl()).success(function () {
                                    var alertPopup = $ionicPopup.alert({
                                        title: '提示',
                                        template: '保存成功',
                                        okText: '确认'
                                    });
                                    alertPopup.then(function () {
                                        $scope.resetData();
                                        $state.go('bupthq/saved-list', {queryPage: true});
                                    });
                                }).error(function () {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: '保存失败,请重新尝试!'
                                    })
                                });
                            }
                        }
                    ]
                });
            };

            $scope.resetData = function () {
                $scope.hqContents = NewContentsService.resetHqContent();
                CheckerListService.setSelectedCheckerList([]);
                ReaderListService.setSelectedReaderList([]);
            };


            //todo  需要封装的工具
            $scope.takePhoto = function () {
                var options = {
                    //这些参数可能要配合着使用，比如选择了sourcetype是0，destinationtype要相应的设置
                    quality: 100,                                            //相片质量0-100
                    destinationType: Camera.DestinationType.FILE_URI,        //返回类型：DATA_URL= 0，返回作为 base64 編碼字串。 FILE_URI=1，返回影像档的 URI。NATIVE_URI=2，返回图像本机URI (例如，資產庫)
                    sourceType: Camera.PictureSourceType.CAMERA,             //从哪里选择图片：PHOTOLIBRARY=0，相机拍照=1，SAVEDPHOTOALBUM=2。0和1其实都是本地图库
                    allowEdit: false,                                        //在选择之前允许修改截图
                    encodingType: Camera.EncodingType.JPEG,                   //保存的图片格式： JPEG = 0, PNG = 1
                    targetWidth: 800,                                        //照片宽度
                    targetHeight: 800,                                       //照片高度
                    mediaType: 0,                                             //可选媒体类型：圖片=0，只允许选择图片將返回指定DestinationType的参数。 視頻格式=1，允许选择视频，最终返回 FILE_URI。ALLMEDIA= 2，允许所有媒体类型的选择。
                    cameraDirection: 0,                                       //枪后摄像头类型：Back= 0,Front-facing = 1
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true, //保存进手机相册
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.uploadAttachFile(imageData);
                }, function (err) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '拍照失败,请重新尝试!'
                    });
                });
            };

            $scope.pickImage = function () {
                var options = {
                    maximumImagesCount: 5,
                    width: 800,
                    height: 800,
                    quality: 100
                };

                $cordovaImagePicker.getPictures(options)
                    .then(function (results) {
                        for (var i = 0; i < results.length; i++) {
                            $scope.uploadAttachFile(results[i]);
                        }
                    }, function (error) {
                        $ionicPopup.alert({
                            title: '提示',
                            template: '选取照片失败,请重新尝试!'
                        });
                    });
            };

            $scope.previewOrDelete = function (imgIndex) {
                $ionicActionSheet.show({
                    buttons: [
                        {text: '预览'}
                    ],
                    destructiveText: '删除',
                    cancelText: '关闭',
                    cancel: function () {
                        return true;
                    },
                    buttonClicked: function () {
                        PhotoViewer.show($scope.imageList[imgIndex]);
                        return true;
                    },
                    destructiveButtonClicked: function () {
                        $scope.imageList.splice(imgIndex, 1);
                        return true;
                    }
                });
            };

            $scope.uploadAttachFile = function (imageData) {
                var item = {src: imageData, statusMsg: '上传中...', status: 0, statusClass: ''};
                $scope.imageList.push(item);

                NewContentsService.uploadAttachFile(imageData, function (data) {
                    if (item) {
                        var object = JSON.parse(data.response).object[0];
                        item.statusMsg = '上传成功!';
                        item.status = 200;
                        item.statusClass = 'green';
                        item.data = {
                            name: object.uploadSimpleName,
                            url: object.savedFileName
                        };
                        $scope.$apply();
                    }

                }, function () {
                    if (item) {
                        item.statusMsg = '上传失败!';
                        item.status = 500;
                        item.statusClass = 'red';
                        item.data = {};
                    }
                });

            };
        }]);