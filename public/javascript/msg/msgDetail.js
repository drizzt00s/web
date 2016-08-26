agMain.controller('msgDetail', function($scope, $http, utility, api){
	$scope.MsgTree = null;

	$scope.replyMsg = '';
	$scope.msgTag = '';

	$scope.msgData = '';
	$scope.fromFalseName = '';
	$scope.profile = '';
	$scope.whenSent = '';
	$scope.msgTag = '';

	$scope.targetUsername = '';//对方的用户名

	var uid = localStorage.getItem('uid') || utility.getTargetCookie('uid');
	var username = localStorage.getItem('username') || utility.getTargetCookie('username');

	$scope.replayDetail = function(){
		var url = api.sendOutboxMsg;
		var targetProfileUrl = $("#targetProfile").attr("src");

		var msgJson = {
	        from:localStorage.getItem('username') || utility.getTargetCookie('username'), //发件人用户名 
	        fromFalseName:localStorage.getItem('falseName') || utility.getTargetCookie('falseName'),//发件人昵称
	       	uid:uid, //发件人uid
	        data:$scope.replyMsg,//发送的信息
	        to:$("#falseNameWrap").text(),//收件人昵称
	        toAccount:$("#storeTargetAccount").text(),//收件人用户名
	        targetProfileUrl:targetProfileUrl,//收件人的头像profile url
	        whenSent:(new Date()).toLocaleString(),//发送时间
	        msgTag:$("#storeMsgTag").text(),//这条消息的唯一标识

	   		msgType:'replay',
	   		msgTimestamp:(new Date()).getTime(),

	        isTheMsgNew:1
	        
	    };

		$http({
			method:'post',
			url:url,
			data:msgJson

		}).success(function(d){
			//alert(d);
			alert('replay success!');
		}).error(function(){
			alert('replay error!!');
		});

	};



	$scope.changeUnreadMsgToReadMsg = function(msgTag, msgTimestamp){
		var url = api.changeNewMsgToOld;
		var data = {
			msgTag:$("#storeMsgTag").text(),
			uid:uid,
			msgTimestamp:msgTimestamp,
			targetUsername:$scope.targetUsername
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


	$scope.getThisMsg = function(){
		//var thisMsg = receivedMsg[receivedMsg.length - 1]
		//alert(thisMsg);
		//var msgTag = thisMsg.msgTag;
		//var msgTimestamp = thisMsg.msgTimestamp;

		 var msgTag = $("#storeMsgTag").text();
		 var msgTimestamp = utility.getTimestampByUrl(window.location.href);

		$scope.changeUnreadMsgToReadMsg(msgTag, msgTimestamp);
	};
	//实际的信息

	$scope.buildMsgTree = function(){
		var url = '/msg/mySentMsg';
		var msgTag = $("#storeMsgTag").text();

		$http({
			method:'post',
			url:url,
			data:{
				username:username,
				msgTag:msgTag
			}
		}).success(function(d){
			var receivedMsg = $("#storeAll").text();
			receivedMsg = eval("(" + receivedMsg + ")");
			var sentMsg = d;
			var dataAll = buildData(receivedMsg, sentMsg);
			$scope.MsgTree = sortData(dataAll);
			//$scope.getThisMsg(receivedMsg);
			$scope.getThisMsg();
		});




		function buildData(receivedMsg, sentMsg){
			var dataAll = [];
		
			for(var i = 0 ; i < receivedMsg.length; i++){
				var obj = {};
				for(var q in receivedMsg[i]){
					if(q === 'fromFalseName'){
						obj['fromFalseName'] = receivedMsg[i][q];
					}
					if(q === 'data'){
						obj['data'] = receivedMsg[i][q];
					}
					if(q === 'whenSent'){
						obj['whenSent'] = receivedMsg[i][q];
					}
					if(q === 'msgTimestamp'){
						obj['msgTimestamp'] = receivedMsg[i][q];
					}
					if(q === 'profile'){
						obj['profile'] = receivedMsg[i][q];
					}
				}
				dataAll.push(obj);
			}

			for(var c = 0 ; c < sentMsg.length; c++){
				var obj = {};
				for(var m in sentMsg[c]){
					if(m === 'selfFasleName'){
						obj['fromFalseName'] = sentMsg[c][m];
					}
					if(m === 'sentmsg'){
						obj['data'] = sentMsg[c][m];
					}
					if(m === 'time'){
						obj['whenSent'] = sentMsg[c][m];
					}
					if(m === 'msgTimestamp'){
						obj['msgTimestamp'] = sentMsg[c][m];
					}
					if(m === 'selfProfile'){
						obj['profile'] = sentMsg[c][m];
					}
				}
				dataAll.push(obj);
			}

			return dataAll;
		}

		function sortData(data){
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
		}
	};



	var sortNumber = function(a, b){
		return a - b;
	};




	$scope.populateData = function(){
		//alert($("#storeAll").text());
		var data = $("#storeAll").text();
		data = eval("(" + data + ")");
		data = data[0];

		$scope.msgData = data.data;

		$scope.fromFalseName = data.fromFalseName;
		$scope.profile = data.profile;
		$scope.whenSent = data.whenSent;

		$scope.targetUsername = data.from;

		$("#storeMsgTag").text(data.msgTag);
		
		$scope.buildMsgTree();
	}

	$scope.populateData();

	





	



	




});