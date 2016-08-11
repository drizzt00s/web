agMain.controller("userDetail", function($scope, utility){
    $scope.getUserData = function(){
    	$scope.data = utility.trimeProfileUrlObject(JSON.parse($("#myStoreData").text()));
        $scope.data = utility.transferStringUndefined($scope.data);
    }
    $scope.getUserData();

    $scope.populateData = function(){
    	$scope.profile = $scope.data.profile;
    	$scope.falseName =  $scope.data.falseName || '未填';
    	$scope.address = $scope.data.address || '未填';
    	$scope.isonline = $scope.data.isonline || '未填';
    	$scope.education = $scope.data.education || '未填';
    	$scope.marriageStatus = $scope.data.marriageStatus || '未填';
    	$scope.age = $scope.data.age || '未填';
    	$scope.height = $scope.data.height || '未填';
    	$scope.ifHasCar = $scope.data.ifHasCar || '未填';
    	$scope.monthincome = $scope.data.monthincome;
    	$scope.housingcondition = $scope.data.housingcondition || '未填';
    	$scope.weight = ($scope.data.weight) + '公斤' || '未填';
    	$scope.sign = $scope.data.sign || '未填'; //星座
    	$scope.race = $scope.data.race || '未填';
    	$scope.horoscope = $scope.data.horoscope || '未填';//属相
    	$scope.bloodType = $scope.data.bloodType || '未填';
    	//userProfile

    	if($scope.data.avatar){
			$scope.avatars = eval("("+ $scope.data.avatar+")")['con'];// array of images
			$scope.avatars = utility.createCompleteUserImageList($scope.avatars, $scope.data.account);
			$scope.avatarLength = $scope.avatars.length;
    	}
    	//image slides

    	$scope.selfIntr = $scope.data.selfintri || '未填';
        //selft intro

        if(!$scope.data.matchCondtion){
            $scope.matchCondtionFilled = false;
            $scope.matchCondtionNotFilled = true;
            $scope.matchCondtion = '未填';
        } else{
            $scope.matchCondtionFilled = true;
            $scope.matchCondtionNotFilled = false;
            $scope.matchCondtion = utility.createReadableMatchCondition(JSON.parse($scope.data.matchCondtion));
        }
        //择偶要求

        $scope.ifSmoking = $scope.data.ifSmoking || '未填';
        $scope.ifDrinking = $scope.data.ifDrinking || '未填';
        $scope.religion = $scope.data.religion || '未填';
        $scope.mainCosts = $scope.data.mainCosts || '未填';
        $scope.sportsloved = $scope.data.sportsloved || '未填';
        $scope.musicloved = $scope.data.musicloved || '未填';
        $scope.movieloved = $scope.data.movieloved || '未填';
        $scope.mainDateType = $scope.data.mainDateType || '未填';

        $scope.foodloved = $scope.data.foodloved || '未填';
        $scope.eventloved = $scope.data.eventloved || '未填';
        $scope.petloved = $scope.data.petloved || '未填';
        $scope.locationloved = $scope.data.locationloved || '未填';
        //生活方式










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