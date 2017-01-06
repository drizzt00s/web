define(['angularAMD'], function(angularAMD){
	angularAMD.service('localStore', function(){
		this.setUserLocalData = function(data){
			 window.localStorage.setItem('allInfo', data);
		};
		this.getUserLocalData = function(){
			return window.localStorage.getItem('allInfo');
		};
		this.removeAllLocalStorage = function(){
			window.localStorage.clear();
		};
	});
});