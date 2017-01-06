agMain.controller('landing', function($scope, $http, utility, api, showError){
	$scope.username = '';
	$scope.pass = ''; 

	$scope.allUsers = [
		{falseName:'直率的高跟鞋',profile:'/images/land/landscape_01.jpg','age':26,'address':'上海 市区'},
		{falseName:'土豆',profile:'/images/land/landscape_02.jpg','age':21,'address':'南京 市区'},
		{falseName:'小阮子',profile:'/images/land/landscape_03.jpg','age':24,'address':'武汉 市区'},
		{falseName:'葱哥',profile:'/images/land/landscape_04.jpg','age':27,'address':'上海 市区'},
		{falseName:'海龙',profile:'/images/land/landscape_05.jpg','age':21,'address':'北京 市区'},
		{falseName:'软心',profile:'/images/land/landscape_06.jpg','age':26,'address':'常住 市区'},
		{falseName:'凯哥',profile:'/images/land/landscape_07.jpg','age':23,'address':'丹阳 市区'},
		{falseName:'信服的蘑菇',profile:'/images/land/landscape_08.jpg','age':26,'address':'哈尔滨 市区'},
		{falseName:'不开心的粽子',profile:'/images/land/landscape_09.jpg','age':26,'address':'上海 市区'},
	];

	$scope.login = function(){
		showError.reset();
		var data = {};
		data.username = $scope.username;
		data.pass = $scope.pass;
		$http({
			url:api.login(),
			method:'post',
			data:data
		}).success(function(d){
			if(d.success){
				if(typeof Storage !== "undefined"){
					//支持本地存储
						localStorage.setItem('uid', d.uid);
						localStorage.setItem('username', d.username);
						localStorage.setItem('falseName', d.falseName);
						localStorage.setItem('gender', d.gender);
				}
				window.location.href='/home';
			} else{
				var errArray = utility.createErrorArray(d.errorColumn, d.msg);
				showError.reset();
				showError.displayError(errArray, 'landing');
			}
		})
	};




/*
	function fetchAllUser(){
		var url = '/allUsers';
		$http({
			method:'POST',
			url:url
		}).success(function(data){
			var data =  utility.trimAge(data.allUserInfo);
			data =  utility.trimProfileUrl(data);
			//console.log(data);
			$scope.allUsers = data;

		}).error(function(data){

		})
	}

	fetchAllUser();
	*/
/*
	function startSlide(){
		$('#slideBox').slideBox();
	}

	startSlide();
	*/

});