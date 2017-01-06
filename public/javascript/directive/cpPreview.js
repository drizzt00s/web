define(['angularAMD'], function(angularAMD){
	angularAMD.directive('cppreview', function(){
		return {
			restrict:"E",
			scope:true,
			controller:function($scope){
				
			},
			link:function($scope){
				
			},
			templateUrl:"/cpPreview"
		};
	});
});

/*
agMain.directive('cppreview', function(){
	return {
		restrict:"E",
		scope:true,
		controller:function($scope){
			
		},
		link:function($scope){
			
		},
		templateUrl:"/cpPreview"
	};
});
*/
