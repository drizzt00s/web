agMain.controller('register', function($scope){
	$scope.defaultYearVal = '请选择年';
	$scope.defaultMonthVal = '请选择月';
	$scope.defaultDayVal = '请选择日';
	
	window.showCalendar1();
})