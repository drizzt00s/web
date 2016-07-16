agMain.controller('landing', function($scope, $http, utility){

	$scope.allUsers = null;

	function fetchAllUser(){
		var url = '/allUsers';
		$http({
			method:'POST',
			url:url
		}).success(function(data){
			var data =  utility.trimAge(data.allUserInfo);
			data =  utility.trimProfileUrl(data);
			//console.log(data);
			$scope.allUsers = data;

		}).error(function(data){

		})
	}

	fetchAllUser();

	function startSlide(){
		$('#slideBox').slideBox();
	}

	startSlide();

});