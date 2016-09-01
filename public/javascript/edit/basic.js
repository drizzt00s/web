agMain.controller('editBasic', function($scope, $http, utility, api, localStore){

	$scope.userAllData = null;

	$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');//己方昵称
	$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid	

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

	$scope.showTabsViaTabIndex = function(){
		var tabIndex = $("#tabIndex").text();
		tabIndex = $.trim(tabIndex);
		tabIndex = parseInt(tabIndex);

		switch(tabIndex) {
			case 1:
			$scope.showBasicTab();
			break;

			case 2:
			$scope.showCoreInfoTab();
			break;

			case 3:
			$scope.showMonologTab();
			break;

			case 4:
			$scope.showProfileTab();
			break;

			case 5:
			$scope.showAvatarsTab();
			break;

			case 6:
			$scope.showMatchCondtionTab();
			break;

			case 7:
			$scope.showProofsTab();
			break;

			case 8:
			$scope.changePassTab();
			break;
		}
	};

	$scope.showTabsViaTabIndex();

	$scope.renderValForCheckbox = function(){
		utility.renderValuesForCheck('mainCost', $scope.userAllData.mainCosts);
		utility.renderValuesForCheck('mainRecreation', $scope.userAllData.mainDateType);
		utility.renderValuesForCheck('sportsLoved1', $scope.userAllData.eventloved);
		utility.renderValuesForCheck('sportsLoved2', $scope.userAllData.sportsloved);
		utility.renderValuesForCheck('musicLoved', $scope.userAllData.musicloved);
		utility.renderValuesForCheck('movieLoved', $scope.userAllData.movieloved);
		utility.renderValuesForCheck('foodLoved', $scope.userAllData.foodloved);
		utility.renderValuesForCheck('placeLoved', $scope.userAllData.locationloved);
		utility.renderValuesForCheck('petLoved', $scope.userAllData.petloved);
	};

	
	$scope.setNullValueForSelect = function(){
		$scope.userAllData.monthincome = $scope.userAllData.monthincome ? $scope.userAllData.monthincome : '请选择';
		$scope.userAllData.ifhaschildren = $scope.userAllData.ifhaschildren ? $scope.userAllData.ifhaschildren : '请选择';
		$scope.userAllData.housingcondition = $scope.userAllData.housingcondition ? $scope.userAllData.housingcondition : '请选择';
		$scope.userAllData.weight = $scope.userAllData.weight ? $scope.userAllData.weight : '请选择';
		$scope.userAllData.horoscope = $scope.userAllData.horoscope ? $scope.userAllData.horoscope : '请选择';
		$scope.userAllData.sign = $scope.userAllData.sign ? $scope.userAllData.sign : '请选择';
		$scope.userAllData.bloodType = $scope.userAllData.bloodType ? $scope.userAllData.bloodType : '请选择';
		$scope.userAllData.race = $scope.userAllData.race ? $scope.userAllData.race : '请选择';
		$scope.userAllData.religion = $scope.userAllData.religion ? $scope.userAllData.religion : '请选择';
		$scope.userAllData.ifSmoking = $scope.userAllData.ifSmoking ? $scope.userAllData.ifSmoking : '请选择';
		$scope.userAllData.ifDrinking = $scope.userAllData.ifDrinking ? $scope.userAllData.ifDrinking : '请选择';
		$scope.userAllData.ifHasCar = $scope.userAllData.ifHasCar ? $scope.userAllData.ifHasCar : '请选择';
		$scope.userAllData.cooks = $scope.userAllData.cooks ? $scope.userAllData.cooks : '请选择';
		$scope.userAllData.houseKeeping = $scope.userAllData.houseKeeping ? $scope.userAllData.houseKeeping : '请选择';
		$scope.userAllData.saving = $scope.userAllData.saving ? $scope.userAllData.saving : '请选择';
		$scope.userAllData.whenToMarrige = $scope.userAllData.whenToMarrige ? $scope.userAllData.whenToMarrige : '请选择';
		$scope.userAllData.whenHasChild = $scope.userAllData.whenHasChild ? $scope.userAllData.whenHasChild : '请选择';
		$scope.userAllData.liveWithParents = $scope.userAllData.liveWithParents ? $scope.userAllData.liveWithParents : '请选择';
		$scope.userAllData.parentstatus = $scope.userAllData.parentstatus ? $scope.userAllData.parentstatus : '请选择';
		$scope.userAllData.siblingsstatus = $scope.userAllData.siblingsstatus ? $scope.userAllData.siblingsstatus : '请选择';
		$scope.userAllData.livewithparents2 = $scope.userAllData.livewithparents2 ? $scope.userAllData.livewithparents2 : '请选择';
		$scope.userAllData.jobinfo1 = $scope.userAllData.jobinfo1 ? $scope.userAllData.jobinfo1 : '请选择';
		$scope.userAllData.jobinfo = $scope.userAllData.jobinfo ? $scope.userAllData.jobinfo : '请选择';
		$scope.userAllData.companyinfo = $scope.userAllData.companyinfo ? $scope.userAllData.companyinfo : '请选择';
	};

	
	$scope.getUserDataByHttp = function(){
		$http({
			url:api.global.userInfo,
			method:"post",
			data:{uid:$scope.cp_uid}
		}).success(function(d){
			$scope.userAllData = d[0]; //obj
			$scope.renderValForCheckbox();
			$scope.setNullValueForSelect();
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
				$scope.renderValForCheckbox();
				$scope.setNullValueForSelect();
			}
		} else {
			$scope.getUserDataByHttp();
		}
	};

	$scope.getUserData();




	$scope.editBasic = function(){
		var data = {};
		data.editFalseName = $scope.userAllData.falseName;
		data.editMobile = $scope.userAllData.mobile;
		data.editMail = $scope.userAllData.email;
		data.editIncome = $scope.userAllData.monthincome;
		data.editOffspring = $scope.userAllData.ifhaschildren;
		data.editHouse = $scope.userAllData.housingcondition;
		data.checkSubmit = ''
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/basicInfo',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showBasicTab();
			}
		});
	};

	$scope.edit1 = function(){
		var data = {};
		data.weight = $scope.userAllData.weight;
		data.sign = $scope.userAllData.horoscope;
		data.horoscope = $scope.userAllData.sign;
		data.bloodType = $scope.userAllData.bloodType;
		data.race = $scope.userAllData.race;
		data.religion = $scope.userAllData.religion;
		data.selfIntri = $scope.userAllData.selfintri;
		data.checkSubmit = '';
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit1',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showCoreInfoTab();
			}
		});
	};

	$scope.edit2 = function(){
		var data = {};
		data.edit2a = $scope.userAllData.ifSmoking;
		data.edit2b = $scope.userAllData.ifDrinking;
		data.edit2c = $scope.userAllData.ifHasCar;
		data.edit2d = $scope.userAllData.cooks;
		data.edit2e = $scope.userAllData.houseKeeping;
		data.edit2f = $scope.userAllData.saving;
		data.edit2g = $scope.userAllData.whenToMarrige;
		data.edit2h = $scope.userAllData.whenHasChild;
		data.edit2i = $scope.userAllData.liveWithParents;
		data.checkSubmit = '';
		data.mainCost = utility.returnMultiValuesCheckbox('mainCost');
		data.mainRecreation = utility.returnMultiValuesCheckbox('mainRecreation');
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit2',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showMonologTab();
			}
		});

	};

	$scope.edit4 = function(){
		var data = {};

		var sportsLoved1 = utility.returnMultiValuesCheckbox('sportsLoved1').length > 0 ? utility.returnMultiValuesCheckbox('sportsLoved1') : '';
		var sportsLoved2 = utility.returnMultiValuesCheckbox('sportsLoved2').length > 0 ? utility.returnMultiValuesCheckbox('sportsLoved2') : '';
		var musicLoved = utility.returnMultiValuesCheckbox('musicLoved').length > 0 ? utility.returnMultiValuesCheckbox('musicLoved') : '';
		var movieLoved = utility.returnMultiValuesCheckbox('movieLoved').length > 0 ? utility.returnMultiValuesCheckbox('movieLoved') : '';
		var foodLoved = utility.returnMultiValuesCheckbox('foodLoved').length > 0 ? utility.returnMultiValuesCheckbox('foodLoved') : '';
		var locationloved = utility.returnMultiValuesCheckbox('placeLoved').length > 0 ? utility.returnMultiValuesCheckbox('placeLoved') : '';
		var petloved = utility.returnMultiValuesCheckbox('petLoved').length > 0 ? utility.returnMultiValuesCheckbox('petLoved') : '';

		data.sportsLoved1 = sportsLoved1;
		data.sportsLoved2 = sportsLoved2;
		data.musicLoved = musicLoved;
		data.movieLoved = movieLoved;
		data.foodLoved = foodLoved;
		data.placeLoved = locationloved;
		data.petLoved = petloved;

		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit4',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showProfileTab();
			}
		});
	};

	$scope.edit5 = function(){
		var data = {};
		data.edit5a = $scope.userAllData.hobby;
		data.checkSubmit = '';
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit5',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showAvatarsTab();
			}
		});
	};

	$scope.edit6 = function(){
		var data = {};
		data.editStep6a = $scope.userAllData.parentstatus;
		data.editStep6b = $scope.userAllData.siblingsstatus;
		data.editStep6d = $scope.userAllData.livewithparents2;
		data.editStep6e = $scope.userAllData.talkaboutfamily;
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit6',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.showMatchCondtionTab();
			}
		});
	};

	$scope.edit3 = function(){
		var data = {};

		data.edit3a = $scope.userAllData.jobinfo1;
		data.edit3aSub = $scope.userAllData.jobinfo;
		data.edit3b = $scope.userAllData.companyinfo;
		data.edit3c = $scope.userAllData.joboverview;
		data.checkSubmit = '';
		$.ajax({
			type:'post',
			data:data,
			url:'/edit/edit3',
			success:function(){
				alert('更改成功');
				localStore.removeAllLocalStorage();
				$scope.changePassTab();
			}
		});

	};


	$scope.editAvatar = function(){
		document.getElementById("editPic").submit();
	};	






























































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














/*


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
*/



});