agMain.controller("userDetail", function($scope,utility){
	$scope.data = null;
	function getUserData(){
		var userData = $("#myStoreData").text();
		console.log(userData);




	}
    getUserData();

})