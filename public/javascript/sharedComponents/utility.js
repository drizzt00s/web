agMain.factory('utility', function(){
	return {
		trimAge:function(d){
			if(d && d instanceof Array){
				for(var i = 0 ; i < d.length; i++){
					d[i]['age'] = d[i]['age'] + '岁';
				}
				return d;
			}
		},
		trimProfileUrl:function(d){
			if(d && d instanceof Array){
				for(var i = 0 ;i < d.length; i++){
					if(d[i]['profile'].length > 0){
						var falseName = d[i]['account'];
						d[i]['profile'] = '/uploads/pic/' + falseName + '/' + d[i]['profile'];
					} else if(d[i]['profile'].length <=0 ){
						d[i]['profile'] = '/uploads/pic/default/unknown.png';
					}
				}
				return d;
			}

		},
		trimeProfileUrlObject:function(d){
			if(d){
				if(!(d.profile)){
					d.profile = '/uploads/pic/default/unknown.png';
				} else {
					var falseName = d.falseName;
					d.profile = '/uploads/pic/' + falseName + '/' + d['profile'];
				}
				return d;
			}
		},


		isLeapYear:function (year){
			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		},

		formString:function(str,format){
			var strArr = str.split(' ');
			var str = '';
			for(var i = 0; i<strArr.length; i++){
				str += strArr[i];
				if(i != (strArr.length)-1){
					str += format;
				}
			}
			return str;
		},

		createErrorArray:function(errType, errMsg){
			var arr = [];
			var obj = {};
			obj[errType] = errMsg;
			arr.push(obj);
			return arr;
		},

		getTargetCookie:function(cookieName){
			var userCookies=document.cookie;
			var userCookiesArray=userCookies.split(";");
			for(var i=0;i<userCookiesArray.length;i++){
				var checkCookie=userCookiesArray[i].indexOf(cookieName);
				if(checkCookie!=-1){
					var targetCookie=userCookiesArray[i];
					var targetValue=(targetCookie.split("="))[1];
				}
			}
			return targetValue;
		},

		createCompleteUserImageList:function(imageList, userAccount){
			if(imageList.length > 0 && userAccount ){
				var data = [];
				for(var i = 0 ; i < imageList.length; i++ ){
					var newImageUrl = '/uploads/pic/' + userAccount +'/'+imageList[i];
					data.push(newImageUrl);
				}
				return data;
			}
		},

		createReadableMatchCondition:function(matchConditionObj){
			var data = {};

			var age = matchConditionObj.ageFrom + '-' + matchConditionObj.ageTo + '之间';
			var height = matchConditionObj.heightFrom + '-' + matchConditionObj.heightTo + '厘米';
			var race = matchConditionObj.race;
			var education = matchConditionObj.education;
			var ifHasPic = matchConditionObj.ifHasPic === 1 ? '有照片' : '不限';
			var marriageStatus = (matchConditionObj.storeMarriageStatus).join(',');
			var area = matchConditionObj.areaProvince + ' ' + matchConditionObj.areaCity;

			data.age = age;
			data.height = height;
			data.race = race;
			data.education = education;
			data.ifHasPic = ifHasPic;
			data.marriageStatus = marriageStatus;
			data.area = area;

			return data;
		},

		transferStringUndefined:function(obj){
			for(var i in obj){
				if(obj[i] === 'undefined'){
					obj[i] = undefined;
				}
			}
			return obj;
		},

		getCurrentTime:function(){
			var newDate = new Date();
			// var currentTime=newDate.toLocaleTimeString();
			var getHour = (newDate.getHours());
			var getMinute = (newDate.getMinutes());
			var getSecond = (newDate.getSeconds());
			var currentTime = getHour+":"+getMinute+":"+getSecond;
			var getYear = newDate.getFullYear();
			var getMonth = (newDate.getMonth())+1;
			var getDay = newDate.getDate();
			var currentTimeF = getYear + "-" + getMonth + "-"+getDay + " " + currentTime;
			return currentTimeF;
		},

		constructPrivateMsg:function(currentTime, getMsg){
				var msgWrapTo = $("<div class='msgWrapTo'></div>");
				var msgWrapToSpan = $("<span class='msgWrapToSpan2'></span>");
				msgWrapToSpan.text(currentTime);
				var msgWrapToSpanMsg = $("<p class='msgWrapToSpan3'></p>");
				
				msgWrapToSpanMsg.text(getMsg);
				msgWrapToSpan.appendTo(msgWrapTo);
				msgWrapToSpanMsg.appendTo(msgWrapTo);

				var findThisInterface = $(".msgMain");
				// class = msgMain directive
				msgWrapTo.appendTo(findThisInterface);
		}


	}
});