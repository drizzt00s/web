agMain.directive('userstatus', function($http, localStore){
	return {
		restrict:'E',
		scope:false,
		template:"<div>"+
		          	"<span>hi {{falseName}}</span><span style='cursor:pointer;' ng-click='logOff()'>退出</span>"+
		          "</div>",
		link:function(scope){
			scope.logOff = function(){
				 ///logoff
				 $http({
				 	method:'get',
				 	url:'/logoff'
				 }).success(function(d){
				 	if(d.data){
				 		localStore.removeAllLocalStorage();
				 		window.location.href = '/home';
				 	}
				 });
			}
		}
	}
});