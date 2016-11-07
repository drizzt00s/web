agMain.factory('loginHelp', function(utility){
	return {
		isLogined:function(){
			return utility.getTargetCookie('falseName') ? true : false;
		},

		checkIfLogined:function(){
			if(!(this.isLogined())){
				window.location.href = '/login';
			}
		},

		getFalseName:function(){
				if(this.isLogined){
					var falseName = utility.getTargetCookie('falseName');
				} else {
					var falseName = undefined;
				}
				return falseName;
		},

		setUid:function(){
			$.ajax({
				url:'/global/uid',
				type:'post',
				data:{data:utility.getTargetCookie('username')},
				success:function(d){
				if(typeof Storage !== "undefined"){
						//支持本地存储
						localStorage.setItem('uid',d.data);
					}
				}
			});
		}

	};
});