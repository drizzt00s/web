define(['angularAMD'], function(angularAMD){
	angularAMD.service('loginHelp', function(utility){
		this.isLogined = function(){
			return utility.getTargetCookie('username') ? true : false;
		};

		this.checkIfLogined = function(){
			if(!(this.isLogined())){
				alert('cookie 已失效， 你将被转到登录页面');
				window.location.href = '/landing';
			}
		};
	});
});