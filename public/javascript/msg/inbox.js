agMain.controller('inbox', function($scope, $http, utility, api){

	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid
	$scope.readedAsynMsg = [];//全部已读来信
	$scope.unreadAsynMsg = []; //全部未读来信


	$scope.asynMsgMulitple = [];//多次来信 已读信息
	$scope.asynMsgMulitpleUnread = [];//多次来信 未读信息

	$scope.readedMsg = false;
	$scope.unreadMsg = true;
	//控制切换已读信息和未读信息

	$scope.showReadedMsg = function(){
		$scope.readedMsg = true;
		$scope.unreadMsg = false;
	};

	$scope.showUnreadedMsg = function(){
		$scope.readedMsg = false;
		$scope.unreadMsg = true;
	};
	//切换已读信息和未读信息的tab


	$scope.readedMsgTotalUnread = true;
	$scope.readedMsgMutlipleUnread = false;
	$scope.readedMsgtimeSortUnread = false;
	//初始化未读信息的子显示模块

	$scope.showAllUnread = function(){
		$scope.readedMsgTotalUnread = true;
		$scope.readedMsgMutlipleUnread = false;
		$scope.readedMsgtimeSortUnread = false;
	};
	//显示所有未读信息

	$scope.asynMsgMultiUnread = function(){
		$scope.readedMsgTotalUnread = false;
		$scope.readedMsgMutlipleUnread = true;
		$scope.readedMsgtimeSortUnread = false;
	};
	//显示所有多次来信的未读信息

	$scope.sortByTimeUnread = function(){
		$scope.readedMsgTotalUnread = false;
		$scope.readedMsgMutlipleUnread = false;
		$scope.readedMsgtimeSortUnread = true;
	};
	//显示所有按时间排序的未读信息信息


	$scope.readedMsgTotal = true;
	$scope.readedMsgMutliple = false;
	$scope.readedMsgtimeSort = false;
	//初始化已读信息的子显示模块

	$scope.showAllReaded = function(){
		$scope.readedMsgTotal = true;
		$scope.readedMsgMutliple = false;
		$scope.readedMsgtimeSort = false;
	};
	//显示所有已读信息

	$scope.asynMsgMultiReaded = function(){
		$scope.readedMsgTotal = false;
		$scope.readedMsgMutliple = true;
		$scope.readedMsgtimeSort = false;
	};
	//显示所有多次来信的已读信息

	$scope.sortByTimeReaded = function(type){
		$scope.readedMsgTotal = false;
		$scope.readedMsgMutliple = false;
		$scope.readedMsgtimeSort = true;
	};
	//显示所有按时间排序的已读信息



	$scope.asynMsgMulitpleComes = function(data){
		var arr = [];
		for(var i = 0 ; i < data.length; i++){
			arr.push(data[i]['uid']);
		}
		var repeatedArr = [];

		for(var i = 0; i < arr.length; i++){
			for(var q = (i+1); q < arr.length; q++){
				if(arr[i] === arr[q]){
					repeatedArr.push(arr[i]);
				}
			}
		}
		var mutipleComesUids = utility.removeRedundant(repeatedArr);
		var finalData = []; //多次来信的所有信息
		for(var i = 0; i < mutipleComesUids.length; i++){
			for(var q = 0; q < data.length; q++){
				if(mutipleComesUids[i] === data[q]['uid']){
					finalData.push(data[q]);
				}
			}
		}
		//console.log(finalData);
		$scope.asynMsgMulitple = finalData;
	};


	$scope.asynMsgMulitpleComesUnread = function(data){
		var arr = [];
		for(var i = 0 ; i < data.length; i++){
			arr.push(data[i]['uid']);
		}
		var repeatedArr = [];

		for(var i = 0; i < arr.length; i++){
			for(var q = (i+1); q < arr.length; q++){
				if(arr[i] === arr[q]){
					repeatedArr.push(arr[i]);
				}
			}
		}
		var mutipleComesUids = utility.removeRedundant(repeatedArr);
		var finalData = []; //多次来信的所有信息
		for(var i = 0; i < mutipleComesUids.length; i++){
			for(var q = 0; q < data.length; q++){
				if(mutipleComesUids[i] === data[q]['uid']){
					finalData.push(data[q]);
				}
			}
		}
		//console.log(finalData);
		$scope.asynMsgMulitpleUnread = finalData;
	};

	$scope.filterMsg = function(data){
		for(var i = 0; i < data.length; i++){
			if(data[i]['isTheMsgNew'] == 0){
				$scope.readedAsynMsg.push(data[i]);
			} else if(data[i]['isTheMsgNew'] == 1){
				$scope.unreadAsynMsg.push(data[i]);
			}
		}
		$scope.readedAsynMsg = utility.sortDataByTimestamp($scope.readedAsynMsg);
		$scope.unreadAsynMsg = utility.sortDataByTimestamp($scope.unreadAsynMsg);
		$scope.asynMsgMulitpleComes($scope.readedAsynMsg);
		$scope.asynMsgMulitpleComesUnread($scope.unreadAsynMsg);
	};


	$scope.receiveAsynMsg = function(){
       var catchUserName = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名

       var url = api.outboxMsg;

       	$http({
			method:'GET',
			cache:false,
			url:url + "?username=" + catchUserName,
		}).success(function(dataBack){
			if(dataBack.dataServer){
				//已经包含消息的全部属性
				var data = dataBack.dataServer.con
				for(var i = 0; i < data.length; i++){
					var msg = data[i]['data'];
					msg = msg.substring(0, 3);
					msg += '...';
					data[i]['data'] = msg;
				}
				//将消息内容缩略化 只显示前三个字符，后面加省略号

				$scope.filterMsg(data);
				

			} else {
				alert("您目前暂无新消息");
			}

		}).error(function(dataBack){

		})

       
	};

	$scope.receiveAsynMsg();


});