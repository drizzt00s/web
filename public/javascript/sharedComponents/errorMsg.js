agMain.factory('errorMsg', function(){
	return {
			emptyErrors:{
				'gender' : '请选择性别',
				'address' : '请选择常住地',
				'marriageStatus' : '请选择婚姻状况',
				'selectedHeight' : '请选择身高',
				'selectedEducation' : '请选择学历',
				'selectedIncome' : '请选择月薪',
				'mobile' : '请填写手机号码',
				'password' : '密码不能为空',
				'checkPassword' : '请确认密码',
				'falseName' : '请填写昵称',
				'username' : '请填写用户名'
			},

			getError : function(error, errorType){
				var err = '';
				if(errorType === 'empty'){
					for(var errorKey in this.emptyErrors){
						if(errorKey === error){
							err = this.emptyErrors[errorKey];
							break;
						}
					}
				} else if(errorType === 'invalidMobile'){
					err = '请输入正确的手机号码';
				} else if(errorType === 'passNotSame'){
					err = '二次密码输入不一致';
				}
				return err;
			}
	};
});