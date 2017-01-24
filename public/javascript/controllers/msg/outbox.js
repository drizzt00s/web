define(['angular'], function(){
	angular.module('web.controller').controller('outbox', ['$scope', '$http', 'utility', 'api', 'localStore', function($scope, $http, utility, api, localStore){
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

			$scope.cp_username = localStore.getUserInfo('account');//己方用户名
			$scope.cp_uid =  localStore.getUserInfo('persionid');//己方uid

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
				var username = localStore.getUserInfo('account');
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
	}])})



