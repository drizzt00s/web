agMain.controller('home', function($scope, utility){
	$scope.isLogin = false;
	$scope.falseName = '';

	$scope.checkCookie = function(){
		if(utility.getTargetCookie('username')){
			$scope.falseName = utility.getTargetCookie('username');
			$scope.isLogin = true;
		} 
	}
	$scope.checkCookie();


});