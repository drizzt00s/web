agMain.controller('register', function($scope, $http, Constant, utility){
	$scope.gender = '';
	$scope.marriageStatus = '';
	$scope.falseName = '';
	$scope.selCity = Constant.addressMap;
	$scope.heights = Constant.generateHeightList();
	$scope.educations = Constant.Educations;
	$scope.incomes = Constant.Incomes;
	$scope.months = Constant.Months;
	$scope.mobile = '';
	$scope.password = '';
	$scope.checkPassword = '';
	$scope.username = '';

	$scope.submitRegister = function(){
		var data = $scope.collectData();

		$http({
			url:Constant.register,
			method:'post',
			data:data
	
		}).success(function(d){
			if(d){
				window.location.reload();
			}
		}).error(function(d){
			alert('error');
		});

	};
	$scope.collectData = function(){
		var data = {};
		
		data.gender = $scope.gender;

		var storeBirthday = [];
		storeBirthday.push($scope.selectedYear);
		storeBirthday.push($scope.selectedMonth);
		storeBirthday.push($scope.selectedDay);
		data.birthday = storeBirthday;

		data.address = utility.formString($scope.adress, ',');
		data.marriageStatus = $scope.marriageStatus;
		data.userHeight = parseInt($scope.selectedHeight);
		data.education = $scope.selectedEducation;
		data.monthIncome = $scope.selectedIncome;
		data.mobile = $scope.mobile;
		data.password = $scope.password;
		data.checkPassword = $scope.checkPassword;
		data.falseName = $scope.falseName;
		data.username = $scope.username;

		return data;

	};



})