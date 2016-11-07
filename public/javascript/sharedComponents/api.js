agMain.factory('api', function(){
	return {
		register:'/register',
		login:'/login',
		getAllUsers:'/allUsers',
		sendOutboxMsg:'/msg/msgsent',
		returnUid:'/global/uid',
		outboxMsg: '/msg/msgAsyn',
		outboxAllMsg:'/msg/outboxAllMsg',
		outbox:'/msg/outbox',
		changeNewMsgToOld: '/msg/turnOldMsg',
		search:{
			'autoSearch':'/search/autoSearch',
			'matchCondition':'/search/matchCondition'
		},
		global:{
			'userInfo':'/global/userInfo',
			'userGender':'/global/userGender'
		}


	}
});