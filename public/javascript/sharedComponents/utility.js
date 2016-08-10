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
		}

	}
});