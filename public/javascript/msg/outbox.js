agMain.controller('outbox', function($scope, $http, utility, api){

	$scope.allSentMsg = null;

	$scope.displaySentAsynMSg = function(){
		var username = localStorage.getItem('username') || utility.getTargetCookie('username');
		var url = api.outboxAllMsg;
		var msgJson = {username:username};
		//自己的uid
		$http({
			url:url,
			method:'POST',
			data:msgJson
		}).success(function(data){
			$scope.allSentMsg = data;
		})
	};
	$scope.displaySentAsynMSg();
});