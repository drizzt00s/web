define(['angularAMD'], function(angularAMD){
	angularAMD.service('loginHelp', function(utility){
		this.isLogined = function(){
			return utility.getTargetCookie('username') ? true : false;
		};

		this.checkIfLogined = function(){
			if(!(this.isLogined())){
				window.location.href = '/landing';
			}
		};
	});
});