function profile(agMain){
	agMain.directive('profile', function(){
		return {
			restrict:"E",
			templateUrl:'/profile'
		}
	})
}

module.exports = profile;