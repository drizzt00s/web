agMain.controller('register', function($scope, $http, Constant){
	$scope.selCity = Constant.addressMap;
	$scope.heights = Constant.generateHeightList();
	$scope.educations = Constant.Educations;
	$scope.incomes = Constant.Incomes;
	$scope.months = Constant.Months;
	$scope.mobile = '';
	$scope.password = '';



	$scope.submitRegister = function(){
		$http({
			url:Constant.register,
			method:'post'
	
		})
	}
	$scope.collectData = function(){

	}



})