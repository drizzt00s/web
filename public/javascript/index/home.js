agMain.controller('home', function($scope, $http, utility, api, loginHelp){

	loginHelp.checkIfLogined()//如果没登录 转到登录页面
	$scope.isLogin = loginHelp.isLogined();
	$scope.falseName = loginHelp.getFalseName();
	if($scope.isLogin){
		loginHelp.setUid();
	}

	$scope.allUsers = null;

	$scope.getMatchCondition = function(){
		$http({
			method:'POST',
			url:api.matchCondition(),
			data:{uid:localStorage.getItem('uid')}
		}).success(function(d){
			console.log(d);
		})
	};

	$scope.getMatchCondition();

	$scope.fetchAllUser = function(){
		$http({
			method:'POST',
			url:api.getAllUsers(),
		}).success(function(data){
			var data = utility.trimAge(data.allUserInfo);
			data =  utility.trimProfileUrl(data);
			$scope.allUsers = data;
		})
	};
	$scope.fetchAllUser();

});

