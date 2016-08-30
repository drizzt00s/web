agMain.controller('editBasic', function($scope, $http, utility, api, localStore){
	$scope.userAllData = null;
	$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');

	$scope.showBasic = true;
	$scope.showCoreInfo = false;
	$scope.showMonolog = false;
	$scope.showProfile = false;
	$scope.showAvatars = false;
	$scope.showMatchCondtion = false;
	$scope.showProofs = false;
	$scope.changePass = false;
	//各个tab的初始状态

	$scope.showBasicTab = function(){
		$scope.showBasic = true;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showCoreInfoTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = true;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showMonologTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = true;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showProfileTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = true;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showAvatarsTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = true;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showMatchCondtionTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = true;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showProofsTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = true;
		$scope.changePass = false;
	};

	$scope.changePassTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = true;
	};

	$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid	




	$scope.getUserDataByHttp = function(){
		$http({
			url:api.global.userInfo,
			method:'post',
			data:{uid:$scope.cp_uid}
		}).success(function(d){
			$scope.userAllData = d[0]; //obj
			if(typeof Storage !== "undefined"){
				localStore.setUserLocalData(JSON.stringify(d));
			}
		});
	};

	$scope.getUserData = function(){
		if(typeof Storage !== "undefined"){
			if(!localStore.getUserLocalData('allInfo')){
				$scope.getUserDataByHttp();
			} else {
				$scope.userAllData =JSON.parse(localStore.getUserLocalData('allInfo'));
				$scope.userAllData = $scope.userAllData[0];
			}
		} else {
			$scope.getUserDataByHttp();
		}
	};

	$scope.getUserData();



	$scope.editBasic1 = function(){
		var data = {};
		data.editFalseName = $scope.userAllData.falseName;
		data.editMobile = $scope.userAllData.mobile;
		data.editMail = $scope.userAllData.email;
		data.editIncome = $scope.userAllData.monthincome;
		data.editOffspring = $scope.userAllData.ifhaschildren;
		data.editHouse = $scope.userAllData.housingcondition;
		data.checkSubmit = ''
		$http({
			mehtod:'post',
			data:data,
			url:'/user/editBasic1.ejs'
		}).success(function(d){
			alert(1);
		}).error(function(){
			alert('error');
		});
	};




































































	$("#edit3a").bind("change",utility.buildSubProfessionTree);

	function checkUploadedPicStatus(){
        var url="/route/login/showUserPic";
        $.ajax({
            url:url,
            type:"GET",
            cache:false,
            success:function(data, textStatus, jqXHR){
                leftPicLength = data.remainingPic;
            },
            error:function(jqXHR, textStatus, errorThrown){
                alert('function checkUploadedPicStatus error!');
            }
        })
    }

    checkUploadedPicStatus();


	function checkFileType(){
		var flag = true;
		$.each($(".myUpLoadPic"),function(i,v){
			var checkType = $(".myUpLoadPic").val();
			checkType = checkType.toLowerCase();
			var checkTypeProcessed = checkType.lastIndexOf(".");
			checkType = checkType.substring(checkTypeProcessed+1);
			if(checkType.indexOf("gif") == -1 && checkType.indexOf("jpg") == -1 && checkType.indexOf("png") == -1){
				var checkIndex = $(".myUpLoadPic").index(v);
				$(".myUpLoadPic").eq(checkIndex).next().show();
				flag = false;
				return false;
			}
		}); 
		alert(flag);
		if(flag){
			return true;
		} else {
			return false;
		}
	}


function checkIsAllowedToUpload(){
	var checkFile = checkFileType();
	if(!checkFile){
		return false;
	}
	var upLoadPicNumber = 0;
		$.each($(".myUpLoadPic"),function(index,value){
		var checkIfPicUpload = $(value).val();
		if(checkIfPicUpload != ""){
			upLoadPicNumber++
		}
	})
	if(upLoadPicNumber > leftPicLength){
		alert("您只能上传12张图片，您现在已经上传了" + (12 - leftPicLength) + "张图片!");
		return false;
	} else {
		var currentSubmitTime = parseInt($("#jsCheckRefresh").val());
		currentSubmitTime++;
		$("#jsCheckRefresh").val(currentSubmitTime.toString());
		document.getElementById("editPic").submit();
	}
}

$("#submitPic").bind("click",checkIsAllowedToUpload);



});