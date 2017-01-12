define(['angularAMD'], function(angularAMD){
	angularAMD.directive('cppreview', function($http, api, utility){
		return {
			restrict:"E",
			scope:{},
			controller:function($scope){
				
			},
			link:function($scope){
				$scope.uid = localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid	
				$scope.username = localStorage.getItem('username') || utility.getTargetCookie("username");	
				$scope.getProfile = function(){
					$http({
						method:'post',
						url:api.getProfile(),
						data:{uid:$scope.uid}
					}).success(function(d){
						if(d && d.type == 'profile'){
							$scope.profile = d.profile;
						} else if(d && d.type == 'avatar'){
							$scope.profile = d.profile;
						$scope.profile = '/uploads/avatar/' + $scope.username + '/' + $scope.profile;
						} else if(d && d.type == 'empty'){
							$scope.profile = '/images/default/nohead.png';
						}
					});
				};
				$scope.getProfile();
			},
			templateUrl:"/cpPreview"
		};
	});
});

