define(['angular'], function(){
	angular.module('web.controller').controller('register',['$scope', '$http', 'Constant', 'utility', 
		'api', 'validation', 'showError', function($scope, $http, Constant, utility, api, validation, showError){
			
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

		$scope.selCity = Constant.addressMap();
		$scope.heights = Constant.generateHeightList();
		$scope.educations = Constant.Educations();
		$scope.incomes = Constant.Incomes();
		$scope.months = Constant.Months();
		//create meta data for sub directives


		$scope.submitRegister = function(){
			$scope.resetValidation();
			var isFilterValidate = $scope.validate();
			if(!isFilterValidate){
				return false;
			}
			
			var data = $scope.collectData();
			$http({
				url:api.register(),
				method:'post',
				data:data
			}).success(function(d){
				if(d){
					if(!(d.success)){
						var errArr = utility.createErrorArray(d.errorType, d.errorMsg);
						showError.displayError(errArr);
					} else {
						if(typeof Storage !== "undefined"){
							//支持本地存储
							localStorage.setItem('username',d.username);
							localStorage.setItem('falseName',d.falseName);
							localStorage.setItem('gender',d.gender);
						}
						window.location.href='/home';
					}
				} 
			}).error(function(d){
				throw 'error';
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

		$scope.validate = function(){
			var isValidate = true;
			var emptyFileds = checkEmpty();
			if(emptyFileds.length > 0){
				//has empty fileds
				showError.displayError(emptyFileds);
			}
			var defaultBirthday = checkBirthday();
			if(defaultBirthday.length > 0){
					//birthday inputs are not complete
				showError.displayError(defaultBirthday);
			}
			var checkInvalidMobile = validateMobile();
			if(checkInvalidMobile.length > 0){
				//mobile phone number is not in a valid format
				showError.displayError(checkInvalidMobile);
			}
			var checkPasswordIdentity = checkPasswordIdentity();
			if(checkPasswordIdentity.length > 0){
				//password and checkpassword is not the same
				showError.displayError(checkPasswordIdentity);
			}
			var checkPasswordComplex = checkPasswordComplexcity();
			if(checkPasswordComplex.length > 0){
				showError.displayError(checkPasswordComplex);
			}
			if(emptyFileds.length > 0 || defaultBirthday.length > 0 || checkInvalidMobile.length > 0 || checkPasswordIdentity.length > 0){
				isValidate = false;
			}
			function checkEmpty(){
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
			}
			function checkBirthday(){
				var birthdayValue = {
					selectedYear : $scope.selectedYear,
					selectedMonth : $scope.selectedMonth,
					selectedDay : $scope.selectedDay
				};
				return  validation.checkBirthday(birthdayValue);
			}
			function validateMobile(){
				return validation.checkMobileValidation($scope.mobile);
			}

			function checkPasswordIdentity(){
				return validation.checkPasswordIdentity($scope.password, $scope.checkPassword);
			}

			function checkPasswordComplexcity(){
				return validation.checkPasswordComplexcity($scope.password);
			}


			return isValidate;
		};


		$scope.resetValidation = function(){
			showError.reset();
		};
	}]);
});

