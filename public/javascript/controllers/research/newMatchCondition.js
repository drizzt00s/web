define(['angular'], function(){
	angular.module('web.controller').controller('matchCondition',['$scope', '$http', 'utility', 
		'api', 'loginHelp', function($scope, $http, utility, api, loginHelp){
			
		$scope.isLogin = false;
		$scope.falseName = '';

		$scope.ifHasChildren = '不限';
		$scope.housingCondition = '不限';
		$scope.monthIncome = '不限';
		$scope.zodiac = '不限';
		$scope.constellation = '不限';
		$scope.region = '不限';

		$scope.checkCookie = function(){
			if(utility.getTargetCookie('username')){
				$scope.falseName = utility.getTargetCookie('username');
				$scope.isLogin = true;
			} 
		};
		$scope.checkCookie();

		$scope.saveMatchCondtion = function(){
			var username = utility.getTargetCookie("username");
			var storeData = {};
			var storeMarriageStatus = [];
			$.each($(".marriageStatus"),function(i,v){
			var isChecked = v.checked;
				if(isChecked){
					storeMarriageStatus.push($(v).val());
				}
			});
			var ageFrom = $("#searchAge1").val();
			var ageTo = $("#searchAge2").val();
			var areaProvince = $("#searchLocation").val();
			var areaCity = $("#searchLocation2").val();
			var heightFrom = $("#height").val();
			var heightTo = $("#height2").val();
			var race = $("#race").val();
			var education = $("#education").val();
			var ifHasPic = $(".ifHasPic:checked").val();
			var proofRanking = $(".proofRanking:checked").val();    
			var isCompulsive = $(".isCompulsive:checked").val();	

			storeData["storeMarriageStatus"] = storeMarriageStatus;
			storeData["ageFrom"] = ageFrom;
			storeData["ageTo"] = ageTo;
			storeData["areaProvince"] = areaProvince;
			storeData["areaCity"] = areaCity;
			storeData["heightFrom"] = heightFrom;
			storeData["heightTo"] = heightTo;
			storeData["race"] = race;
			storeData["education"] = education;
			storeData["ifHasPic"] = ifHasPic;
			storeData["proofRanking"] = proofRanking;
			storeData["isCompulsive"] = isCompulsive;
			storeData["username"] = username;

			storeData['ifHasChildren'] = $scope.ifHasChildren;
			storeData['housingCondition'] = $scope.housingCondition;
			storeData['monthIncome'] = $scope.monthIncome;
			storeData['zodiac'] = $scope.zodiac;
			storeData['constellation'] = $scope.constellation;
			storeData['region'] = $scope.region;



			var url = "/user/matchConditionPost";
			$.ajax({
				url:url,
				type:"post",
				data:{d:storeData},
				success:function(d){
					alert('设置交友条件成功');
					window.location.href = window.location.href;
				},
				error:function(){
				}
			});
		};


		$scope.updateMatchRequirement = function (o){
			var areaProvince  = o.areaProvince;
			if(areaProvince !== "任意"){
				var areaCity = o.areaCity;
				if(areaCity == "任意"){
					var area = areaProvince;
				} else { 
					area = areaProvince+" "+areaCity
				}
				$("#matchArea").text(area);
			}
			var ageFrom = o.ageFrom;
			var ageTo = o.ageTo;
			if(parseInt(ageFrom) == parseInt(ageTo)){
				var ageScope = ageFrom + "岁";
			} else {
				var ageScope = ageFrom + "岁" + " 到 " + ageTo + "岁";
			}
			$("#matchAge").text(ageScope);
			var marriageStatus = o.marriageStatus;
			if(marriageStatus instanceof Array){
				var marriageScope = "";
				for(var i = 0; i < marriageStatus.length; i++){
					marriageScope += marriageStatus[i] + " ";
				}
				$("#matchMarriageStatus").text(marriageScope);
			}
			var heightFrom = o.heightFrom;
			var heightTo = o.heightTo;
			if(parseInt(heightFrom) == parseInt(heightTo)){
				var heightScope = heightFrom + "米";
			} else {
				var heightScope=heightFrom + "米" + " 到 " + heightTo + "米";
			}
			$("#matchHeight").text(heightScope);

			var education = o.education;
			if(education != "任意"){
				$("#matchEducation").text(education);
			}
			var race = o.race;
			if(race != "任意"){
				$("#matchRace").text(race);
			}
			var ifHasPic = o.ifHasPic;
			if(ifHasPic == 0){
				$("#matchIfHasPic").text("不限");
			} else if (ifHasPic == 1){
				$("#matchIfHasPic").text("有");
			}
			var proofRanking = o.proofRanking;
			if(proofRanking == 0){
				$("#matchProofRanking").text("不限");
			} else if (proofRanking == 1){
				$("#matchProofRanking").text("星级会员");
			}
		};



		$scope.updateSetCondtion = function(o){

			function setSelectDefault(id,setValue){
				var select = document.getElementById(id);
				select = $(select);
				options = select.find("option");

				$.each(options,function(i,v){
					if(setValue == $(v).text()){
						select[0].selectedIndex = i;
						return false;
					}
				})
			}

			function setRadioDefault(radioClass,setValue){
				var radio = $("." + radioClass);
				$.each(radio,function(i,v){
					if($(v).val() == setValue){
						v.checked = "checked";
					}
				});
			}

			function setCheckboxDefault(checkboxClass,valueArray){
				var checkbox = $("." + checkboxClass);
				for(var i = 0;i < valueArray.length;i++){
					$.each(checkbox,function(index,v){
						if($(v).val() == valueArray[i]){
							v.checked = "checked";
						}
					});
				}
			}
			var ageFrom = o.ageFrom;
			var ageTo = o.ageTo;
			var areaProvince = o.areaProvince;
			var areaCity = o.areaCity;
			var heightFrom = o.heightFrom;
			var heightTo = o.heightTo;
			var education = o.education;
			var race = o.race;
			var ifHasPic = o.ifHasPic;
			var proofRanking = o.proofRanking;
			var isCompulsive = o.isCompulsive;
			var marriageStatus = o.marriageStatus;
			if(marriageStatus){
				setCheckboxDefault("marriageStatus",marriageStatus);
			}
			setSelectDefault("searchAge1",ageFrom);
			setSelectDefault("searchAge2",ageTo);
			setSelectDefault("searchLocation",areaProvince);
			setCity();
			setSelectDefault("searchLocation2",areaCity);
			setSelectDefault("height",heightFrom);
			setSelectDefault("height2",heightTo);
			setSelectDefault("education",education);
			setSelectDefault("race",race);
			setRadioDefault("ifHasPic",ifHasPic);
			setRadioDefault("proofRanking",proofRanking);
			setRadioDefault("isCompulsive",isCompulsive);
		};

		$scope.showCurrentCondition = function(){
			var username = utility.getTargetCookie("username");
			var url = "/user/fetchCondtion"; 
			$.ajax({
				url:url,
				data:{username:username},
				type:"post",
				cache:false,
				success:function(d){
					if(d[0]['matchCondtion']){
						d = eval("(" + d[0].matchCondtion + ")");
						var storeAll = {};
						storeAll.ageFrom = d.ageFrom;
						storeAll.ageTo = d.ageTo;
						storeAll.areaProvince = d.areaProvince;
						storeAll.areaCity = d.areaCity;
						storeAll.heightFrom = d.heightFrom;
						storeAll.heightTo = d.heightTo;
						storeAll.race = d.race;
						storeAll.education = d.education;
						storeAll.ifHasPic = d.ifHasPic;
						storeAll.proofRanking = d.proofRanking;
						storeAll.isCompulsive = d.isCompulsive;
						storeAll.marriageStatus = d.storeMarriageStatus;

						storeAll.ifHasChildren = d.ifHasChildren;
						storeAll.zodiac = d.zodiac;
						storeAll.region = d.region;
						storeAll.monthIncome = d.monthIncome;
						storeAll.housingCondition = d.housingCondition;
						storeAll.constellation = d.constellation;

						$scope.updateMatchRequirement(storeAll);
						$scope.updateSetCondtion(storeAll);
					}
				}
			});
		};

		$scope.showCurrentCondition();


		
	}]);
});



//NAVM5ZCW5PERKPFT
