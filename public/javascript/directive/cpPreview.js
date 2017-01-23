define(['angularAMD'], function(angularAMD){
	angularAMD.directive('cppreview', function($http, api, localStore){
		return {
			restrict:"E",
			scope:{},
			controller:function($scope){
			},
			link:function($scope){
				$scope.getProfile = function(){
					$scope.profile = localStore.getUserInfo('profile') ? localStore.getUserInfo('profile') : "/images/default/nohead.png";
					$scope.$apply();
				};

				setTimeout($scope.getProfile, 1000);
				
			},
			templateUrl:"/cpPreview"
		};
	});
});

