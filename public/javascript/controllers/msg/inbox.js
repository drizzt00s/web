define(['angular'], function(){
	angular.module('web.controller').controller('inbox',['$scope', '$http', 'utility', 'api', 'loginHelp',  function($scope, $http, utility, api, loginHelp){
		
		loginHelp.checkIfLogined()//如果没登录 转到登录页面
		$scope.isLogin = loginHelp.isLogined();

		$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid

		var username = localStorage.getItem('username') || utility.getTargetCookie('username');

		$scope.readedAsynMsg = [];//全部已读来信
		$scope.unreadAsynMsg = []; //全部未读来信


		$scope.asynMsgMulitple = [];//多次来信 已读信息
		$scope.asynMsgMulitpleUnread = [];//多次来信 未读信息

		$scope.asynMsgReturned = [];

		$scope.readedMsg = false;
		$scope.unreadMsg = true;
		//控制切换已读信息和未读信息

		$scope.showInbox = true;
		$scope.showOutbox = false;

		$scope.displayInbox = function(){
			$scope.showInbox = true;
			$scope.showOutbox = false;
		};

		$scope.displayOutbox = function(){
			$scope.showInbox = false;
			$scope.showOutbox = true;
		}


		$scope.showReadedMsgInbox = function(){
			$scope.readedMsg = true;
			$scope.unreadMsg = false;

		};

		$scope.showUnreadedMsgInbox = function(){
			$scope.readedMsg = false;
			$scope.unreadMsg = true;
			//window.location.href = window.location.href;

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
		$scope.msgReturned = false; 
		//初始化已读信息的子显示模块

		$scope.showAllReaded = function(){
			$scope.readedMsgTotal = true;
			$scope.readedMsgMutliple = false;
			$scope.readedMsgtimeSort = false;
			$scope.msgReturned = false;
		};
		//显示所有已读信息

		$scope.asynMsgMultiReaded = function(){
			$scope.readedMsgTotal = false;
			$scope.readedMsgMutliple = true;
			$scope.readedMsgtimeSort = false;
			$scope.msgReturned = false;
		};
		//显示所有多次来信的已读信息

		$scope.sortByTimeReaded = function(type){
			$scope.readedMsgTotal = false;
			$scope.readedMsgMutliple = false;
			$scope.readedMsgtimeSort = true;
			$scope.msgReturned = false;
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

		$scope.filterMsgInbox = function(data){
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
	       var url = api.outboxMsg();
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
					$scope.filterMsgInbox(data);
				} else {
					alert("您目前暂无新消息");
				}

			}).error(function(dataBack){
			})
		};

		$scope.receiveAsynMsg();


		/*
		$scope.removeInitList = function(data){
			var newData = [];
			for(var i = 0; i < data.length; i++){
				if(data[i]['msgType'] === 'replay'){
					newData.push(data[i]);
				}
			}
			return newData;
		};


		$scope.readReturned = function(){
			$scope.readedMsgTotal = false;
			$scope.readedMsgMutliple = false;
			$scope.readedMsgtimeSort = false;
			$scope.msgReturned = true;

			var returnedMsgTag = [];
			var returnedMsgTimestamp = [];

			//var storeIndex = [];
			var storeMsgTag = [];
			$.each($(".eachMsg"), function(i, v){
				storeMsgTag.push($(v).find('.msgTagInfo').text());
				returnedMsgTimestamp.push($(v).find('.msgTimestampinfo').text()); 
				//storeIndex.push(i);
			});

			storeMsgTag = utility.removeRedundant(storeMsgTag);
			returnedMsgTimestamp = utility.removeRedundant(returnedMsgTimestamp);

			var url = '/msg/allSentMsg';

			$http({
				method:'GET',
				cache:false,
				url:url + "?username=" + username,
			}).success(function(d){
				sortReadReturned(d, storeMsgTag, returnedMsgTimestamp, username);
			}).error(function(){
				alert('error');
			});

			function sortReadReturned(returnData, storeMsgTag, returnedMsgTimestamp, username){
				
				console.log(storeMsgTag);
				console.log(returnedMsgTimestamp);
				var returnData = $scope.removeInitList(returnData);

				console.log(returnData);
				var returnedMsgTag = [];

				for(var i = 0 ; i < storeMsgTag.length; i++){
					for(var q = 0 ; q < returnData.length; q++){
						if(returnData[q]['msgTag'] == storeMsgTag[i]){
							returnedMsgTag.push(storeMsgTag[i]);
						}
					}
				}
				returnedMsgTag = utility.removeRedundant(returnedMsgTag);
				buildReadReturned(returnedMsgTag);
				
			}

			function buildReadReturned(data){
				var storeReadReturned = [];
				for(var i = 0 ; i < $scope.readedAsynMsg.length; i++){
					for(var q = 0 ; q < data.length; q++){
						if($scope.readedAsynMsg[i]['msgTag'] === data[q]){
							storeReadReturned.push($scope.readedAsynMsg[i]);
						}
					}
				}
				$scope.asynMsgReturned  = storeReadReturned;
			}
		};*/


		//************************************************************************inbox


		$scope.allSentMsg = null;
			//全部已发信息
			$scope.sentMagUnreaded = [];
			//已发信息 对方未读
			$scope.sentMsgReaded = [];
			//已发信息 地方已读

			$scope.outboxAll = true;
			//控制全部信息tab
			$scope.outboxReaded = false;
			//控制已读信息tab
			$scope.outboxUnreaded = false;
			//控制未读信息tab

			$scope.cp_username = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名
			$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid

			$scope.showAll = function(){
				$scope.outboxAll = true;
				$scope.outboxReaded = false;
				$scope.outboxUnreaded = false;
			};

			$scope.showReadedMsg = function(){
				$scope.outboxAll = false;
				$scope.outboxReaded = true;
				$scope.outboxUnreaded = false;
			};

			$scope.showUnreadedMsg = function(){
				$scope.outboxAll = false;
				$scope.outboxReaded = false;
				$scope.outboxUnreaded = true;
			};

			$scope.displaySentAsynMSg = function(){
				var username = localStorage.getItem('username') || utility.getTargetCookie('username');
				var url = api.outboxAllMsg();
				var msgJson = {username:username};
				//自己的uid
				$http({
					url:url,
					method:'POST',
					data:msgJson
				}).success(function(data){
					for(var i = 0; i < data.length; i++){
						var msg = data[i]['sentmsg'];
						msg = msg.substring(0, 3);
						msg += '...';
						data[i]['sentmsg'] = msg;
					}
					$scope.allSentMsg = data;

					if($scope.allSentMsg.length > 0){
						$scope.filterMsg($scope.allSentMsg);
					}
				})
			};
			$scope.displaySentAsynMSg();


			$scope.filterMsg = function(allData){
				for(var i = 0 ; i < allData.length; i++){
					if(allData[i]['isMsgNew'] === '1'){
						$scope.sentMagUnreaded.push(allData[i]);
					} else if(allData[i]['isMsgNew'] === '0'){
						$scope.sentMsgReaded.push(allData[i]);
					}
				}
			};


	}]);
});



