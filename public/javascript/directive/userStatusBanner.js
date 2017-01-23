define(['angularAMD'], function(angularAMD){
	angularAMD.directive('userstatus', function($http, localStore,api){
		return {
			restrict:'E',
			scope:{},
			template:"<div>"+
			          	"<span>你好,{{falseName}} </span><span style='cursor:pointer;' ng-click='logOff()'>退出</span>"+
			          "</div>",
			link:function(scope){
				scope.getFalseName = function(){
					scope.falseName = localStore.getUserInfo('falseName');
					scope.$apply();
				};
				setTimeout(scope.getFalseName, 1000);

				scope.logOff = function(){
					 ///logoff
					 $http({
					 	method:'get',
					 	url:api.userLogoff()
					 }).success(function(d){
					 	if(d.data){
					 		localStore.removeAllLocalStorage();
					 		window.location.href = '/landing';
					 	}
					 });
				}
			}
		}
	});
});

