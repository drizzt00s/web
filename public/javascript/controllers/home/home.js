define(['angular'], function(){
	 angular.module('web.controller').controller('home', ['$scope', '$http', 'utility', 'api', 'loginHelp', 'localStore', function($scope, $http, utility, api, loginHelp, localStore){
		
		loginHelp.checkIfLogined()//如果没登录 转到登录页面, 这个逻辑应该放到被公共使用的directive中
		
		$scope.allUsers = null;
	
		$scope.getUserData = function(){
			if(typeof Storage !== "undefined"){
				//get all user data and store it in localStorage
				var localAllInfo = JSON.parse( localStore.getUserLocalData('allInfo')); 
				if(!localAllInfo || localAllInfo.length == 0){
					$http({
						url:api.userInfo(),
						method:"post",
						data:{account:utility.getTargetCookie('username')}
					}).success(function(d){
						localStore.setUserLocalData(JSON.stringify(d));
					});
				} 
			} 
			else {
				//not support localStorage, store data in $rootScope
			}
		};

		$scope.getUserData();

		
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
