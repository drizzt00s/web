agMain.factory('api', function(){
	return {
		register:'/register',
		login:'/login',
		getAllUsers:'/allUsers',
		sendOutboxMsg:'/msg/msgsent',
		returnUid:'/global/uid'
	}
});