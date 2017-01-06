define(['angularAMD'], function(angularAMD){
	angularAMD.service('utility', function(validation){
		this.trimAge = function(d){
			if(d && d instanceof Array){
				for(var i = 0 ; i < d.length; i++){
					d[i]['age'] = d[i]['age'] + '岁';
				}
				return d;
			}
		};
		this.trimProfileUrl = function(d){
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

		};
		this.trimeProfileUrlObject = function(d){
			if(d){
				if(!(d.profile)){
					d.profile = '/uploads/pic/default/unknown.png';
				} else {
					var account = d.account;
					d.profile = '/uploads/pic/' + account + '/' + d['profile'];
				}
				return d;
			}
		};


		this.isLeapYear = function (year){
			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		};

		this.formString = function(str,format){
			var strArr = str.split(' ');
			var str = '';
			for(var i = 0; i<strArr.length; i++){
				str += strArr[i];
				if(i != (strArr.length)-1){
					str += format;
				}
			}
			return str;
		};

		this.createErrorArray = function(errType, errMsg){
			var arr = [];
			var obj = {};
			obj[errType] = errMsg;
			arr.push(obj);
			return arr;
		};

		this.getTargetCookie = function(cookieName){
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
		};

		this.createCompleteUserImageList = function(imageList, userAccount){
			if(imageList.length > 0 && userAccount ){
				var data = [];
				for(var i = 0 ; i < imageList.length; i++ ){
					var newImageUrl = '/uploads/pic/' + userAccount +'/'+imageList[i];
					data.push(newImageUrl);
				}
				return data;
			}
		};

		this.createReadableMatchCondition = function(matchConditionObj){
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
		};

		this.transferStringUndefined = function(obj){
			for(var i in obj){
				if(obj[i] === 'undefined'){
					obj[i] = undefined;
				}
			}
			return obj;
		};

		this.getCurrentTime = function(){
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
		};

		this.constructPrivateMsg = function(currentTime, getMsg){
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
		};

		this.getUidFromUrl = function(url){
			if(url.indexOf('uid') == -1){
				return false;
			} else {
				var index = url.indexOf('uid=');
				var uid = url.substring(index + 4);
				return uid;
			}
		};

		this.sortDataByTimestamp = function (data){
			var sortNumber = function(a,b){
				return a - b;
			};

			var sortedData = [];
			var arr = [];
			for(var i = 0; i < data.length; i++){
				for(var q in data[i]){
					if(q === 'msgTimestamp'){
						arr.push(data[i][q]);
					}

				}
			}
			arr.sort(sortNumber);
			
			for(var c = 0; c < arr.length; c++){
				for(var x = 0; x < data.length; x++){
					if(data[x]['msgTimestamp'] === arr[c] ){
						sortedData.push(data[x]);
					}
				}
			}
			return sortedData;
		};

		this.removeRedundant = function(o){
		    var storeNewO=[];
		    for(var i=0;i< o.length;i++){
		        if(i!=0){
		            var isIn=detect(o[i]);
		            if(isIn){
		                storeNewO.push(o[i]);
		                continue;
		            }
		            else{
		                continue;
		            }
		        }
		        storeNewO.push(o[i]);
		    }
		    function detect(item){
		        var legal=true;
		        for(var i=0;i<storeNewO.length;i++){
		            if(storeNewO[i]===item){
		                legal=false;
		            }
		        }
		        return legal;
		    }
		    return storeNewO;
		};

		this.getTimestampByUrl = function(url){
			var index = url.indexOf('msgTimestamp=');
			var newStr = url.substring((index + 13));
			return newStr;
		};

		this.buildSubProfessionTree = function(){
			$("#edit3aSub").empty();
			var checkSelectedIndex = $(this)[0].selectedIndex;
			var subOptions = [];
			if(checkSelectedIndex == 0){
				$("#edit3aSub").append("<option>请选择</option>");
			}
			else if(checkSelectedIndex == 1){
				subOptions = ["请选择","销售总监","销售经理","销售主管","销售专员","渠道/分销管理","渠道/分销专员","经销商","客户经理","客户代表","其他"];
			}
			else if(checkSelectedIndex == 2){
				subOptions = ["请选择","客服经理","客服主管","客服专员","客服协调","客服技术支持","其他"];
			}
			else if(checkSelectedIndex == 3){
				subOptions = ["请选择","IT技术总监","IT技术经理","IT工程师","系统管理员","测试专员","运营管理","网页设计","网站编辑","网站产品经理","其他"];
			}
			else if(checkSelectedIndex == 4){
				subOptions = ["请选择","通信技术","电子技术","其他"];
			}
			else if(checkSelectedIndex == 5){
				subOptions = ["请选择","工厂经理","工程师","项目主管","营运经理","营运主管","车间主任","物料管理","生产领班","操作工人","安全管理","其他"];
			}
			else if(checkSelectedIndex == 6){
				subOptions = ["请选择","物理经理","物流主管","物流专员","仓库经理","仓库管理员","货运代理","集装箱业务","海关事务管理","报单员","快递员","其他"];
			}
			else if(checkSelectedIndex == 7){
				subOptions = ["请选择","商务经理","商务专员","采购经理","采购专员","外贸经理","外贸专员","业务跟单","报关员","其他"];
			}
			else if(checkSelectedIndex == 8){
				subOptions = ["请选择","人事总监","人事经理","人事专员","招聘经理","招聘专员","培训经理","培训专员","秘书","文员","后勤","其他"];
			}
			else if(checkSelectedIndex == 9){
				subOptions = ["请选择","总经理","副总经理","合伙人","总监","经理","总裁助理","其他"];
			}
			else if(checkSelectedIndex == 10){
				subOptions = ["请选择","广告客户经理","广告客户专员","广告设计经理","广告设计专员","广告策划","市场营销经理","市场营销专员","市场策划","市场调研与分析","市场拓展","公关经理","公关专员","媒介经理","媒介专员","品牌经理","品牌专员","其他"];
			}
			else if(checkSelectedIndex == 11){
				subOptions = ["请选择","主编","编辑","作家","撰稿人","文案策划","出版发行","导演","记者","主持人","演员","模特","经纪人","摄影师","影视后期制作","设计师","画家","音乐家","舞蹈","其他"];
			}
			else if(checkSelectedIndex == 12){
				subOptions = ["请选择","生物工程","药品生产","临床研究","医疗器械","医药代表","化工工程师","其他"];
			}
			else if(checkSelectedIndex == 13){
				subOptions = ["请选择","医疗管理","医生","心理医生","药剂师","护士","其他"];
			}
			else if(checkSelectedIndex == 14){
			subOptions = ["请选择","投资","保险","金融","银行","证券","其他"];
			}
			else if(checkSelectedIndex == 15){
				subOptions = ["请选择","建筑师","工程师","规划师","景观设计","房地产策划","房地产交易","物业管理","其他"];
			}
			else if(checkSelectedIndex == 16){
				subOptions = ["请选择","专业顾问","咨询经理","咨询师","培训师","其他"];
			}
			else if(checkSelectedIndex == 17){
				subOptions = ["请选择","律师","律师助理","法务助理","法务专员","知识产权专员","其他"];
			}
			else if(checkSelectedIndex == 18){
				subOptions = ["请选择","财务总监","财务经理","财务主管","会计","注册会计师","审计师","税务经理","税务专员","成本经理","其他"];
			}
			else if(checkSelectedIndex == 19){
				subOptions = ["请选择","教授","讲师/助教","中学教师","小学教师","幼师","教务管理人员","职业技术教师","培训师","科研管理人员","科研人员","其他"];
			}
			else if(checkSelectedIndex == 20){
				subOptions = ["请选择","餐饮管理","厨师","餐厅服务员","酒店管理","大堂经理","酒店服务员","导游","美容师","健身教练","商场经理","零售店店长","店员","保安经理","保安人员","家政服务","其他"];
			}
			else if(checkSelectedIndex == 21){
				subOptions = ["请选择","飞行员","空乘人员","地勤人员","列车司机","乘务人员","船长","船员","司机","其他"];
			}
			else if(checkSelectedIndex == 22){
				subOptions = ["请选择","公务员","其他"];
			}
			else if(checkSelectedIndex == 23){
				subOptions = ["请选择","军人","警察","其他"];
			}
			else if(checkSelectedIndex == 24 || checkSelectedIndex == 25 || checkSelectedIndex == 26 || checkSelectedIndex == 27 || checkSelectedIndex == 28){
				subOptions = ["请选择"];
			}
			for(var i = 0;i < subOptions.length; i++){
				var eachOption = $("<option></option>");
				eachOption.text(subOptions[i]);
				$("#edit3aSub").append(eachOption);
			}
		};

		this.returnMultiValuesCheckbox = function(checkboxName){
			var selectedVal = [];
			$.each($("input[name='" + checkboxName + "']"), function(i, v){
				var isSelected = $(v).attr('checked');
				if(isSelected){
					selectedVal.push($(v).attr('value'));	
				}
			});  
			 return selectedVal;
		};

		this.renderValuesForCheck = function(checkboxName, values){
			if(validation.isEmpty(values)){
				return false;
			}
			var checkboxs = $("input[name='" + checkboxName + "']");
			var selectValues = values.split(',');
			for(var i = 0 ; i < selectValues.length; i++ ){
				$.each(checkboxs, function(index, val){
					if( $(val).attr('value') ==  selectValues[i]  ){
						$(val).attr('checked', 'checked')
					}
				});
			}
		};

	});
});