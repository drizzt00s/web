function cpPreview(agMain){
	agMain.directive('cppreview', function(){
		return {
			restrict:"E",
			templateUrl:"/cpPreview"
		};
	});
}
module.exports = cpPreview;