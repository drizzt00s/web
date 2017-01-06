define('angularAMD', function(angularAMD){
	angularAMD.directive('profile', function(){
		return {
			restrict:"E",
			templateUrl:'/profile'
		}
	});
});

/*
agMain.directive('profile', function(){
	return {
		restrict:"E",
		templateUrl:'/profile'
	}
})
*/
