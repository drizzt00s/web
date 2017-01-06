define(['angularAMD'], function(angularAMD){
	angularAMD.directive('breadcrumb', function(){
		return {
			restrict:"E",
			templateUrl:"/breadcrumb"
		};
	});
});
