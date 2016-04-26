angular.module('app.frame.home', [])//已通过列表请求参数配置
    .constant("ApiFrameHome", {
        menuList: 'menu.json',
        actionList: 'action.json',
        orgList: 'orgList.json'
    });
