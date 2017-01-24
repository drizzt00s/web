define(['angular'], function(){
	 angular.module('web.controller').controller('editBasic',['$scope', '$http', 'utility', 'api', 'localStore', 'loginHelp','Constant', function($scope, $http, utility, api, localStore, loginHelp, constant){
		loginHelp.checkIfLogined()//如果没登录 转到登录页面
		$scope.isLogin = loginHelp.isLogined();

		$scope.userAllData = null;

		//$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');//己方昵称
		//$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
		//$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid	

		$scope.falseName = localStore.getUserInfo('falseName') //己方昵称
		$scope.cp_username = localStore.getUserInfo('account') //己方用户名
		$scope.cp_uid =  localStore.getUserInfo('personid') //己方uid	


		$scope.showBasic = true;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
		$scope.submitProof = false;
		//各个tab的初始状态

		$scope.selectJobCategory = function(){
			var selectedIndex = $("#edit3a")[0].selectedIndex;
			var subJobInfo = constant.getSubJobInfo(selectedIndex);
			$("#edit3aSub").empty();
			$.each(subJobInfo, function(i, v){
				var eachOpt = $("<option></option>").text(v);
				eachOpt.appendTo($("#edit3aSub"));
			});
		};

		$scope.showBasicTab = function(){
			$scope.showBasic = true;
			$scope.showCoreInfo = false;
			$scope.showMonolog = false;
			$scope.showProfile = false;
			$scope.showAvatars = false;
			$scope.showMatchCondtion = false;
			$scope.showProofs = false;
			$scope.changePass = false;
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
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
			$scope.submitProof = false;
		};

		$scope.showSubmitProof = function(){
			$scope.showBasic = false;
			$scope.showCoreInfo = false;
			$scope.showMonolog = false;
			$scope.showProfile = false;
			$scope.showAvatars = false;
			$scope.showMatchCondtion = false;
			$scope.showProofs = false;
			$scope.changePass = false;
			$scope.submitProof = true;
		}

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
			$scope.selectJobCategory();

		};

	
		$scope.getUserData = function(){
			if(typeof Storage !== "undefined"){
					$scope.userAllData =JSON.parse(localStore.getUserLocalData('allInfo'));
					$scope.userAllData = $scope.userAllData[0];
					$scope.renderValForCheckbox();
					$scope.setNullValueForSelect();
			
			} else {
				//get data by $rootScope
			}
		};

		$scope.getUserData();


		$scope.updateLocalStorageAllInfo = function(){
			$http({
				url:api.userInfo(),
				method:"post",
				data:{account:utility.getTargetCookie('username')}
			}).success(function(d){
				localStore.setUserLocalData(JSON.stringify(d));
			});
		};

		$scope.updateLocalStorageAllInfo();


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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
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
					$scope.updateLocalStorageAllInfo();
					$scope.changePassTab();
				}
			});
		};


		$scope.editAvatar = function(){
			document.getElementById("editPic").submit();
		};	

		$(".editList_sub").bind('click', function(e){
			$(e.target).css('background-color','#fff');
			$(e.target).parent('li').siblings().find('a').css('background-color','#F3F3F3');
		});

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


		$scope.submitFile = function(o){
			var ele = o.target;
			var checkUsername = utility.getTargetCookie("username");
			if(checkUsername){
				$(ele).parent("form").find(".checkAccount").val(checkUsername);
				var checkFile=$(ele).parent("form").find(".selectFile").val();
				if(checkFile){
					$(ele).parent("form").submit();
				} else {
					alert("请选择文件");
				}
			} 
		};
		
	}]);
});



