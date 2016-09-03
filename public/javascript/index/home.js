agMain.controller('home', function($scope, $http, utility, api, loginHelp){

	loginHelp.checkIfLogined()//如果没登录 转到登录页面

	$scope.isLogin = false;
	$scope.falseName = '';
	$scope.allUsers = null;


	$scope.checkCookie = function(){
		if(utility.getTargetCookie('username')){
			$scope.falseName = utility.getTargetCookie('username');
			$scope.isLogin = true;
		} 
	};
	$scope.checkCookie();

	$scope.setUid = function(){
		$.ajax({
			url:'/global/uid',
			type:'post',
			data:{data:utility.getTargetCookie('username')},
			success:function(d){
				if(typeof Storage !== "undefined"){
					//支持本地存储
					localStorage.setItem('uid',d.data);
				}
			}
		});

	};

	if($scope.isLogin){
		$scope.setUid();
	}

	$scope.fetchAllUser = function(){
		$http({
			method:'POST',
			url:api.getAllUsers,
		}).success(function(data){
			var data =  utility.trimAge(data.allUserInfo);
			data =  utility.trimProfileUrl(data);
			$scope.allUsers = data;
		})
	};
	$scope.fetchAllUser();

});

