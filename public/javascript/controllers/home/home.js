define(['angular'], function(){
	 angular.module('web.controller').controller('home', ['$scope', '$http', 'utility', 'api', 'loginHelp', function($scope, $http, utility, api, loginHelp){
		 loginHelp.checkIfLogined()//如果没登录 转到登录页面
		$scope.isLogin = loginHelp.isLogined();
		$scope.falseName = loginHelp.getFalseName();

		$scope.profile = '';
		$scope.uid = localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid	
		$scope.username = localStorage.getItem('username') || utility.getTargetCookie("username");	

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
				data = utility.trimProfileUrl(data);
				$scope.allUsers = data;
			})
		};
		$scope.fetchAllUser();


		



	 }]);
});
