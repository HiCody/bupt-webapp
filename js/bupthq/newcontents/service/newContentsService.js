angular.module('app.bupthq.newcontents')
    .factory("NewContentsService", ['ApiBupthqNewContents', 'EnvBupthq', '$http', 'HqTypeService', 'CheckerListService', 'ReaderListService', 'ContentsDetailsService',
        function (api, env, $http, HqTypeService, CheckerListService, ReaderListService, ContentsDetailsService) {
            var hqContents = newContent(), attachFileList = [],
                submitUrl = '', savedUrl = '';

            function newContent() {
                //设置默认的类型为第一个事项类
                var hqTypeList = HqTypeService.getHqTypeListData(), type = 0, typeName = '';
                if (hqTypeList.length > 0) {
                    type = hqTypeList[0].id;
                    typeName = hqTypeList[0].name;
                }
                return  {
                    id: 0,
                    title: '',
                    type: type,
                    typeName: typeName,
                    contents: ''
                }
            };

            return {
                getHqContent: function () {
                    return hqContents;
                },
                resetHqContent: function () {
                    hqContents = newContent();
                    return hqContents;
                },
                reEditHqContents: function (dataId, success) {
                    ContentsDetailsService.loadDetailData(dataId).success(function (data) {

                        var hq_contents = data.object.hq_contents,
                            hq_contents_checkersList = data.object.hq_contents_checkersList,
                            hq_contents_readersList = data.object.hq_contents_readersList,
                            selectedCheckers = [], selectedReaders = [];

                        hqContents = {
                            id: hq_contents.id,
                            title: hq_contents.title,
                            type: hq_contents.type,
                            typeName: hq_contents.typeName,
                            contents: hq_contents.contents
                        };

                        for (var i = 0; i < hq_contents_checkersList.length; i++) {
                            selectedCheckers.push({id: hq_contents_checkersList[i].userid, name: hq_contents_checkersList[i].realName});
                        }
                        CheckerListService.setSelectedCheckerList(selectedCheckers);


                        for (var i = 0; i < hq_contents_readersList.length; i++) {
                            selectedReaders.push({id: hq_contents_readersList[i].userid, name: hq_contents_readersList[i].realName});
                        }
                        ReaderListService.setSelectedReaderList(selectedReaders);
                        success();
                    });
                },
                getPostHqContent: function () {
                    return {
                        hq_contents: {
                            id: hqContents.id,
                            title: hqContents.title,
                            type: hqContents.type,
                            contents: hqContents.contents
                        },
                        hq_contents_attachList: attachFileList,
                        hq_contents_checkersList: CheckerListService.getPostSelectedCheckerData(),
                        hq_contents_readersList: ReaderListService.getPostSelectedReaderData(),
                        hq_checkers_snapShot: CheckerListService.getHqCheckersSnapShot(),
                        hq_readers_snapShot: ReaderListService.getHqReadersSnapShot()
                    }
                },
                savedHqContent: function (url) {
                    var self = this,
                        url = url.replace("/bupthq/", "");
                    return $http.post(env.server + url, {hqContents: JSON.stringify(self.getPostHqContent())});
                },
                uploadAttachFile: function (file, uploadSuccess, uploadError) {
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = file.substr(file.lastIndexOf('/') + 1);
                    options.mimeType = "text/plain";

                    var ft = new FileTransfer();
                    ft.upload(file, encodeURI(env.server.replace("bupthq/", "") + api.uploadAttachFile), uploadSuccess, uploadError, options);
                },
                setUploadAttachFile: function (imageList) {
                    for (var i = 0; i < imageList.length; i++) {
                        if (imageList[i].data.status == 0 || imageList[i].data.status == 500) {
                            attachFileList = [];
                            return false;
                        } else {
                            attachFileList.push(imageList[i].data);
                        }
                    }
                    return true;
                },
                setActionList: function (actionList) {
                    for (var i = 0; i < actionList.length; i++) {
                        if (actionList[i].name == 'submit') {
                            submitUrl = actionList[i].url;
                        } else if (actionList[i].name == 'save') {
                            savedUrl = actionList[i].url;
                        }
                    }
                },
                getSubmitUrl: function () {
                    return submitUrl;
                },
                getSavedUrl: function () {
                    return savedUrl;
                }
            }
        }]);