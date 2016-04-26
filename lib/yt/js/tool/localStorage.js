/**
 * Created by ScottChan on 2016/4/23.
 */

var Tools = Tools || {};

Tools.getStorageService = function($window){
    return {
        set:function(key,value){
            $window.localStorage[key] = value;
        },
        get:function(key,defaultValue){
            return $window.localStorage[key] || defaultValue;
        },
        setObject:function(key,value){
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject:function(key){
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}