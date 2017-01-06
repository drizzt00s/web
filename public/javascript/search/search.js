agMain.controller('search', function($scope, $http, api, showError, utility, validation){

	$scope.autoSearchData = null;

	$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');//己方昵称
	$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid

	$scope.gender =  localStorage.getItem('gender') || utility.getTargetCookie("gender");//己方uid

	$scope.getGenderByHttp = function(){
		$http({
			url:api.userGender(),
			method:'post',
			data:{username:$scope.cp_username}
		}).success(function(d){
			$scope.gender = d[0]['gender'];
		})
	}

	if(validation.isEmpty($scope.gender)){
		$scope.getGenderByHttp();
	}

	$scope.autoSearch = function(){
		//页面刚进来 根据用户性别 $scope.gender 返回所有db中的结果
		$http({
			url:api.autoSearch(),
			method:'post',
			data:{userGender:$scope.gender}
		}).success(function(d){
			d =	utility.trimProfileUrl(d);
			$scope.autoSearchData = d;
		})
	};

	$scope.autoSearch();




});