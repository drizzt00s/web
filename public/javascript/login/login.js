agMain.controller('login', function($scope, $http, api, showError, utility){
	$scope.username = '';
	$scope.pass = ''; 
	$scope.login = function (){
		showError.reset();
		var data = {};
		data.username = $scope.username;
		data.pass = $scope.pass;
		$http({
			url:api.login,
			method:'post',
			data:data
		}).success(function(d){
			if(d.success){
				window.location.href='/home';
			} else{
				var errArray = utility.createErrorArray(d.errorColumn, d.msg);
				showError.displayError(errArray);
			}
		})

	};

});