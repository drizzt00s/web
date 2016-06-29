function addBreadcrumb(agMain){
	agMain.directive('breadcrumb', function(){
		return {
			restrict:"E",
			templateUrl:"/breadcrumb"
		};
	});
}

module.exports = addBreadcrumb;



