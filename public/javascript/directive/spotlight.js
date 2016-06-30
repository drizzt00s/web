function spotlight(agMain){
	agMain.directive('spotlight', function(){
		return {
			restrict:"E",
			templateUrl:'/spotlight'
		}
	})
}

module.exports = spotlight;