define(['angularAMD'], function(angularAMD){
	angularAMD.service('api', function(){
		this.register = function(){
			return '/register';
		};
		this.login = function(){
			return '/login';
		};
		this.getAllUsers = function(){
			return '/allUsers';
		};
		this.sendOutboxMsg = function(){
			return '/msg/msgsent';
		};
		this.returnUid = function(){
			return '/global/uid';
		};
		this.outboxMsg = function(){
			return '/msg/msgAsyn';
		};
		this.outboxAllMsg = function(){
			return '/msg/outboxAllMsg';
		};
		this.outbox = function(){
			return '/msg/outbox';
		};
		this.changeNewMsgToOld = function(){
			return '/msg/turnOldMsg';
		};
		this.autoSearch = function(){
			return '/search/autoSearch';
		};
		this.matchCondition = function(){
			return '/search/matchCondition';
		};
		this.userInfo = function(){
			return '/global/userInfo';
		};
		this.userGender = function(){
			return '/global/userGender';
		};
	});
});

