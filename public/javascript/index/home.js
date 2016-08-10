agMain.controller('home', function($scope, $http, utility, api){
	$scope.isLogin = false;
	$scope.falseName = '';
	$scope.allUsers = null;

	$scope.checkCookie = function(){
		if(utility.getTargetCookie('username')){
			$scope.falseName = utility.getTargetCookie('username');
			$scope.isLogin = true;
		} 
	}
	$scope.checkCookie();

	$scope.fetchAllUser = function(){
		$http({
			method:'POST',
			url:api.getAllUsers,
		}).success(function(data){
			var data =  utility.trimAge(data.allUserInfo);
			data =  utility.trimProfileUrl(data);
			$scope.allUsers = data;
		})
	}
	$scope.fetchAllUser();
});