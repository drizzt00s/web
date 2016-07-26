agMain.controller('register', function($scope, Constant){
	$scope.defaultYearVal = '请选择年';
	$scope.defaultMonthVal = '请选择月';
	$scope.defaultDayVal = '请选择日';
	$scope.selCity = Constant.addressMap;
	$scope.heights = Constant.generateHeightList();
	$scope.educations = Constant.Educations;
	$scope.incomes = Constant.Incomes;
	$scope.mobile = '';
	$scope.password = '';

	//window.showCalendar1();
})