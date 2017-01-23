define(['angular'], function(){
	angular.module('web.controller').controller('search', ['$scope', '$http', 'api', 'showError', 'utility', 'validation', 'loginHelp', function($scope, $http, api, showError, utility, validation, loginHelp){



	$scope.autoSearchData = null;

	$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');//己方昵称
	$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid

	$scope.gender =  localStorage.getItem('gender') || utility.getTargetCookie("gender");//己方uid








	}])
});