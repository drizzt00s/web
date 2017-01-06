define(['angularAMD'], function(angularAMD){
	angularAMD.directive('spotlight', function(){
		return {
			restrict:"E",
			templateUrl:'/spotlight'
		}
	});
});
/*
agMain.directive('spotlight', function(){
	return {
		restrict:"E",
		templateUrl:'/spotlight'
	}
})*/
