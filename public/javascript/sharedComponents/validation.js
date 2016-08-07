agMain.factory('validation', function(errorMsg){
	return {
		isEmpty:function(value) {
			return (value === null) || (value === undefined) || (angular.isArray(value) && value.length === 0) || ((value + "") === "") || (typeof value === "object" && !hasProperty(value));
		},

		checkPasswordComplex:function (pwd){
			return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(pwd);
			//必须且只含有数字和字母，6-10位
		},

		validateMobile:function(mobileNumber){
			return (/^1[358][0-9]{9}$/.test(mobileNumber));
		},

		checkEmpty:function(checkEmptyObject){
			var storeError = [];
			for(var key in checkEmptyObject){
				var isEmpty = this.isEmpty(checkEmptyObject[key]);
				if(isEmpty){
					var errObj = {};
					errObj[key] = errorMsg.getError(key, 'empty');
					storeError.push(errObj);
				}
			}
			return storeError;
		},

		checkDefault:function(checkDefaultValObj){
			var storeDefault = [];
			for(var key in checkDefaultValObj){
				var isDefault = this.isDefault(checkDefaultValObj[key]);
				if(isDefault){
					var errObj = {};
					errObj[key] = errorMsg.getError(key, 'default');
					storeDefault.push(errObj);
				}
			}
			return storeDefault;
		},

		checkBirthday:function(birthdayObj){
			var storeBirthday = [];
			var birthdayErrorObj = {};
			for(var key in birthdayObj){
				if(birthdayObj[key] === '请选择日' || birthdayObj[key] === '请选择月' || birthdayObj[key] === '请选择日'){
					var birthdayError = '请完整填写生日';
					birthdayErrorObj.birthday = birthdayError;
					storeBirthday.push(birthdayErrorObj);
					break;
				}
			}

			return storeBirthday;
		},

		checkMobileValidation:function(mobileNumber){
			var storeMobieError = [];
			var invalidMobileObj = {};
			var validMobile = this.validateMobile(mobileNumber);
			if(!validMobile){
				invalidMobileObj['mobile'] = errorMsg.getError('mobile', 'invalidMobile');
				storeMobieError.push(invalidMobileObj);
			} 
			
			return storeMobieError;
		},

		checkPasswordIdentity:function(pass, rePass){
			var storePasswordIdentity = [];
			var passNotSame = {};
			var ifPassSame = pass === rePass;
			if(!ifPassSame){
				passNotSame['checkPassword'] = errorMsg.getError('checkPassword', 'passNotSame');
				storePasswordIdentity.push(passNotSame);
			}
			return storePasswordIdentity;
		},

		checkPasswordComplexcity:function(pass){
			var storePasswordComplexcity = [];
			var isPassComplicated = this.checkPasswordComplex(pass);
			if(!isPassComplicated){
				storePasswordComplexcity.push({});
				storePasswordComplexcity[0]['password'] = errorMsg.getError('password', 'passNotComplicated');
			}
			return storePasswordComplexcity;
		}


	};
});