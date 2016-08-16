agMain.controller("userDetail", function($scope, utility, $modal){
    $scope.showOnlineTalk = false;


    $scope.setUserOnlineStatus = function(){
        $scope.userTitle =  $scope.data.gender === '男' ? '他' : '她';
        if($scope.data.isonline === 0){
             $scope.userStatus = $scope.userTitle + '不在线';
        } else if($scope.data.isonline ===1){
            $scope.userStatus = $scope.userTitle +'目前在线, 快和' + $scope.userTitle +'聊天吧';
        }
    };

    $scope.populateData = function(){
        $scope.uid = $scope.data.personid;
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

        $scope.cooks = $scope.data.cooks || '未填';
        $scope.hobby = $scope.data.hobby || '未填';
        //生活方式

        $scope.monthincome = $scope.data.monthincome || '未填';
        $scope.housingcondition = $scope.data.housingcondition || '未填';
        $scope.ifHasCar = $scope.data.ifHasCar || '未填';
        $scope.saving = $scope.data.saving || '未填';
        //经济实力

        $scope.companyinfo = $scope.data.companyinfo || '未填';
        $scope.professionType = $scope.data.jobinfo || '未填';
        $scope.duty = $scope.data.jobinfo1 || '未填';
        $scope.dutyOverview = $scope.data.joboverview || '未填';
        //工作

        $scope.ifWantChild = $scope.data.whenHasChild || '未填';
        $scope.whenGetMarried = $scope.data.whenToMarrige || '未填';
        $scope.siblingsstatus = $scope.data.siblingsstatus || '未填';
        $scope.parentstatus = $scope.data.parentstatus || '未填';
        $scope.liveWithParents = $scope.data.liveWithParents || '未填';
        $scope.ifhaschildren = $scope.data.ifhaschildren || '未填';
        $scope.houseKeeping = $scope.data.houseKeeping || '未填';
        //婚姻观念
    };

    $scope.getUserData = function(){
    	$scope.data = utility.trimeProfileUrlObject(JSON.parse($("#myStoreData").text()));
        $scope.data = utility.transferStringUndefined($scope.data);
        $scope.populateData();
        $scope.setUserOnlineStatus();
    };
    $scope.getUserData();

    $scope.alignMainImg = function(){
    	$('.mainImg')[0].onload = function(){
    		var mainImgWidth = $('.mainImg').width();
    		var mainImgHeight = $('.mainImg').height();
    		var marginLeft = '-' + (mainImgWidth/2) + 'px';
    		var marginTop = '-' + (mainImgHeight/2) + 'px';
    		$('.mainImg').css('position','absolute').css('top','50%').css('left','50%').css('marginTop',marginTop).css('marginLeft',marginLeft);
    	};
    };
    $scope.alignMainImg();

    $scope.popOnlineTalk = function(e){
        $scope.showOnlineTalk = true;
  
        $scope.test = '11234';
        $(".onlineTalk").show();
        $('.newMsg').hide();
    };

})