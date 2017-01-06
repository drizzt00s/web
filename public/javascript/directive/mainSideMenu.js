define(['angularAMD'], function(angularAMD){
	angularAMD.directive('toolist', function(){
		return {
			restrict:"E",
			templateUrl:"/mainSideMenu"
		};
	});
});
/*
agMain.directive('toolist', function(){
	return {
		restrict:"E",
		templateUrl:"/mainSideMenu"
	};
});*/