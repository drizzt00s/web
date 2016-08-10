agMain.controller("userDetail", function($scope, utility){
    $scope.getUserData = function(){
    	$scope.data = utility.trimeProfileUrlObject(JSON.parse($("#myStoreData").text())); 
    }
    $scope.getUserData();

    $scope.populateData = function(){
    	$scope.profile = $scope.data.profile;
    	$scope.falseName =  $scope.data.falseName;
    	$scope.address = $scope.data.address;
    	$scope.isonline = $scope.data.isonline;
    	$scope.education = $scope.data.education;
    	$scope.marriageStatus = $scope.data.marriageStatus;
    	$scope.age = $scope.data.age;
    	$scope.height = $scope.data.height;
    	$scope.ifHasCar = $scope.data.ifHasCar;
    	$scope.monthincome = $scope.data.monthincome;
    	$scope.housingcondition = $scope.data.housingcondition;
    	$scope.weight = ($scope.data.weight) + '公斤';
    	$scope.sign = $scope.data.sign; //星座
    	$scope.race = $scope.data.race;
    	$scope.horoscope = $scope.data.horoscope;//属相
    	$scope.bloodType = $scope.data.bloodType;
    	//userProfile

    	if($scope.data.avatar){
			$scope.avatars = eval("("+ $scope.data.avatar+")")['con'];// array of images
			$scope.avatars = utility.createCompleteUserImageList($scope.avatars, $scope.data.account);
			$scope.avatarLength = $scope.avatars.length;
    	}
    	//image slides

    	$scope.selfIntr = $scope.data.selfintri;



    }
    $scope.populateData();

    $scope.alignMainImg = function(){
    	$('.mainImg')[0].onload = function(){
    		var mainImgWidth = $('.mainImg').width();
    		var mainImgHeight = $('.mainImg').height();
    		var marginLeft = '-' + (mainImgWidth/2) + 'px';
    		var marginTop = '-' + (mainImgHeight/2) + 'px';
    		$('.mainImg').css('position','absolute').css('top','50%').css('left','50%').css('marginTop',marginTop).css('marginLeft',marginLeft);
    		
    	};

    	


    
    }

    $scope.alignMainImg();

})