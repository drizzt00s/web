agMain.controller('login', function($scope, $http, api, showError, utility){
	$scope.username = '';
	$scope.pass = ''; 
	$scope.login = function (){
		showError.reset();
		var data = {};
		data.username = $scope.username;
		data.pass = $scope.pass;
		$http({
			url:api.login(),
			method:'post',
			data:data
		}).success(function(d){
			if(d.success){
				if(typeof Storage !== "undefined"){
					//支持本地存储
						localStorage.setItem('uid', d.uid);
						localStorage.setItem('username', d.username);
						localStorage.setItem('falseName', d.falseName);
						localStorage.setItem('gender', d.gender);
				}
				window.location.href='/home';
			} else{
				var errArray = utility.createErrorArray(d.errorColumn, d.msg);
				showError.displayError(errArray);
			}
		})

	};

});