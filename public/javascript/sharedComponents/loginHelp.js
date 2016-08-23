agMain.factory('loginHelp', function(utility){
	return {
		isLogined:function(){
			return utility.getTargetCookie('falseName') ? true : false;
		},

		checkIfLogined:function(){
			if(!(this.isLogined())){
				window.location.href = '/login';
			}
		}

	};
});