define(['angularAMD'], function(angularAMD){
	angularAMD.service('loginHelp', function(utility){
		this.isLogined = function(){
			return utility.getTargetCookie('falseName') ? true : false;
		};

		this.checkIfLogined = function(){
			if(!(this.isLogined())){
				window.location.href = '/login';
			}
		};

		this.getFalseName = function(){
				if(this.isLogined){
					var falseName = utility.getTargetCookie('falseName');
				} else {
					var falseName = undefined;
				}
				return falseName;
		};

		this.setUid = function(){
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
		};
	});
});