agMain.controller('register', function($scope, $http, Constant, utility, api, validation, showError){
	$scope.selectedYear = '请选择年';
	$scope.selectedMonth = '请选择月';
	$scope.selectedDay = '请选择日';
	$scope.adress = '';
	$scope.marriageStatus = '';
	$scope.selectedHeight = '';
	$scope.selectedEducation = '';
	$scope.selectedIncome = '';

	$scope.gender = '';
	$scope.falseName = '';
	$scope.mobile = '';
	$scope.password = '';
	$scope.checkPassword = '';
	$scope.username = '';

	$scope.selCity = Constant.addressMap;
	$scope.heights = Constant.generateHeightList();
	$scope.educations = Constant.Educations;
	$scope.incomes = Constant.Incomes;
	$scope.months = Constant.Months;
	//create meta data for sub directives


	$scope.submitRegister = function(){
		$scope.resetValidation();

		var emptyFileds = $scope.checkEmpty();
		if(emptyFileds.length > 0){
			//has empty fileds
			showError.displayError(emptyFileds);
		}
		var defaultBirthday = $scope.checkBirthday();
			//birthday inputs are not complete
		if(defaultBirthday.length > 0){
			showError.displayError(defaultBirthday);
		}

		var checkInvalidMobile = $scope.validateMobile();
		if(checkInvalidMobile.length > 0){
			showError.displayError(checkInvalidMobile);
		}

		var checkPasswordIdentity = $scope.checkPasswordIdentity();
		if(checkPasswordIdentity.length > 0){
			showError.displayError(checkPasswordIdentity);
		}

		return false;

		var data = $scope.collectData();
		$http({
			url:api.register,
			method:'post',
			data:dataw
	
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

	$scope.checkEmpty = function(){
		var checkEmptyObject = {
			gender : $scope.gender,
			address : $scope.adress,
			marriageStatus : $scope.marriageStatus,
			selectedHeight: $scope.selectedHeight,
			selectedEducation : $scope.selectedEducation,
			selectedIncome : $scope.selectedIncome,
			mobile : $scope.mobile,
			password : $scope.password,
			checkPassword : $scope.checkPassword,
			falseName : $scope.falseName,
			username : $scope.username
		};
	    return validation.checkEmpty(checkEmptyObject);
	};

	$scope.checkBirthday = function(){
		var birthdayValue = {
			selectedYear : $scope.selectedYear,
			selectedMonth : $scope.selectedMonth,
			selectedDay : $scope.selectedDay
		};
		return  validation.checkBirthday(birthdayValue);
	};

	$scope.validateMobile = function(){
		return validation.checkMobileValidation($scope.mobile);
	};

	$scope.checkPasswordIdentity = function(){
		return validation.checkPasswordIdentity($scope.password, $scope.checkPassword);
	};











	$scope.resetValidation = function(){
		showError.reset();
	};



})