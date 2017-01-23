define(['angularAMD'], function(angularAMD){
	angularAMD.directive('breadcrumb', function(loginHelp){
		return {
			restrict:"E",
			templateUrl:"/breadcrumb",
			link:function(scope){
				loginHelp.checkIfLogined();
			}
		};
	});
});
