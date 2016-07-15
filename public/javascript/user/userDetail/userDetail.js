agMain.controller("userDetail", function($scope,utility){
	$scope.data = null;
	function getUserData(){
		var userData = $("#myStoreData").text();
		userData = utility.trimeProfileUrlObject(JSON.parse(userData));         
		console.log(userData);




	}
    getUserData();

})