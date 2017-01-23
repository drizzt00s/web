define(['angularAMD'], function(angularAMD){
	angularAMD.service('localStore', function(){
		this.setUserLocalData = function(data){
			 window.localStorage.setItem('allInfo', data);
		};
		this.getUserLocalData = function(){
			return window.localStorage.getItem('allInfo');
		};

		this.getUserInfo = function(attr){
			var data = '';
			var localAllData = this.getUserLocalData();
			if(localAllData){
				data = JSON.parse(localAllData)[0][attr];
				return data;
			} else {
				return null;
			}

		};

		this.removeAllLocalStorage = function(){
			window.localStorage.clear();
		};
	});
});