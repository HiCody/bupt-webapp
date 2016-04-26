var Tools = Tools || {};

Tools.setFileIcon = function (attachInfo) {
    if (attachInfo.url.indexOf('.txt') != -1) {
        attachInfo.icon = '&#xe61d;';
    } else if (attachInfo.url.indexOf('.doc') != -1 || attachInfo.url.indexOf('.docx') != -1) {
        attachInfo.icon = '&#xe65c;';
    } else if (attachInfo.url.indexOf('.xls') != -1 || attachInfo.url.indexOf('.xlsx') != -1) {
        attachInfo.icon = '&#xe659;';
    } else if (attachInfo.url.indexOf('.ppt') != -1 || attachInfo.url.indexOf('.pptx') != -1) {
        attachInfo.icon = '&#xe65b;';
    } else if (attachInfo.url.indexOf('.pdf') != -1) {
        attachInfo.icon = '&#xe65a;';
    } else if (attachInfo.url.indexOf('.rar') != -1 || attachInfo.url.indexOf('.zip') != -1) {
        attachInfo.icon = '&#xe65d;';
    } else if (attachInfo.url.indexOf('.jpeg') != -1 || attachInfo.url.indexOf('.jpg') != -1 || attachInfo.url.indexOf('.png') != -1 || attachInfo.url.indexOf('.bmp') != -1) {
        attachInfo.icon = '&#xe64c;';
    } else {
        attachInfo.icon = '&#xe61c;';
    }
    return attachInfo;
};