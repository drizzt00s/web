agMain.controller('login', function($scope, api, $http){
	$scope.username = '';
	$scope.pass = ''; 
	$scope.login = function (){
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
				alert(d.msg);
			}
		})

	};

});