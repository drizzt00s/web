agMain.controller('msgDetail', function($scope, $http, utility, api){

	$scope.replyMsg = '';
	$scope.msgTag = '';


	$scope.msgData = '';
	$scope.fromFalseName = '';
	$scope.profile = '';
	$scope.whenSent = '';
	$scope.msgTag = '';

	var uid = localStorage.getItem('uid') || utility.getTargetCookie('uid');

	$scope.replayDetail = function(){
		var url = api.sendOutboxMsg;
		var targetProfileUrl = $("#targetProfile").attr("src");

		var msgJson = {
	        from:localStorage.getItem('username') || utility.getTargetCookie('username'), //发件人用户名 
	        fromFalseName:localStorage.getItem('falseName') || utility.getTargetCookie('falseName'),//发件人昵称
	       	uid:uid, //发件人uid
	        data:$scope.replyMsg,//发送的信息
	        to:$("#falseNameWrap").text(),//收件人昵称
	        targetProfileUrl:targetProfileUrl,//收件人的头像profile url
	        whenSent:(new Date()).toLocaleString(),//发送时间
	        msgTag:$scope.msgTag,//这条消息的唯一标识

	   		msgType:'replay',


	        isTheMsgNew:1
	        
	    };


		$http({
			method:'post',
			url:url,
			data:msgJson

		}).success(function(d){
			alert(d);
		}).error(function(){
			alert('replay error!!');
		});

	};



	$scope.changeUnreadMsgToReadMsg = function(){
		var url = '/turnOldMsg';
		var data = {
			msgTag:$scope.msgTag,
			uid:uid
		}

		$http({
			method:'post',
			url:url,
			data:data
		}).success(function(d){
			if(d){
				//alert(d.data);
			}
		}).error(function(){
			alert('change msg to old error!');
		})

	};


	$scope.getMsgTag = function(){
		$scope.msgTag  = $("#storeMsgTag").text();
		$scope.changeUnreadMsgToReadMsg();
	};
	$scope.getMsgTag();


	$scope.populateData = function(){
		//alert($("#storeAll").text());
		var data = $("#storeAll").text();
		data = eval("(" + data + ")");
		data = data[0];



		$scope.msgData = data.data;

		$scope.fromFalseName = data.fromFalseName;
		$scope.profile = data.profile;
		$scope.whenSent = data.whenSent;
		$scope.msgTag = data.msgTag;

	}


	$scope.populateData();



	




});