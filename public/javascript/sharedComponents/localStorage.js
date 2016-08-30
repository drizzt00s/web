agMain.factory('localStore', function(){
	return {
		setUserLocalData:function(data){
			 window.localStorage.setItem('allInfo', data);
		},
		getUserLocalData:function(){
			return window.localStorage.getItem('allInfo');
		},
		removeAllLocalStorage:function(){
			window.localStorage.clear();
		}
	}
});