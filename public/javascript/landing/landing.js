agMain.controller('landing', function($scope, $http){
	$scope.allUsers = null;

	function fetchAllUser(){
		var url = '/allUsers';
		$http({
			method:'POST',
			url:url
		}).success(function(data){
			console.log(JSON.stringify(data)); 
			$scope.allUsers = data.allUserInfo;

		}).error(function(data){

		})
	}

	fetchAllUser();














});