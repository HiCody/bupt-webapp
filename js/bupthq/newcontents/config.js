angular.module('app.bupthq.newcontents', ['ngCordova'])
    //已通过列表请求参数配置
    .constant("ApiBupthqNewContents", {
        checkerList: "contents/json/checkerList.json",
        readerList: "contents/json/readerList.json",
        uploadAttachFile: '/upload/upload.json'
    });

