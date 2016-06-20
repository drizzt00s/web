
define('login', ['angular'], function(angular){
	var indexPage = angular.module("indexPage",["ngResource"]);
	indexPage.factory("login",["$resource",function($resource){
    return $resource("/login");
}]);
})

