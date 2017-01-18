define(['angular'], function(){
	angular.module('web.controller').controller('outboxDetail', ['$scope', '$http', 'utility', 'api', function($scope, $http, utility, api){

		$scope.msg = [];


		$scope.buildData = function(){
			var sentMsg = $("#storeAll").text();
			sentMsg = JSON.parse(sentMsg);
			var msgTag = sentMsg[0]['msgTag'];
			var whoSentAccount = sentMsg[0]['from'];
			var toWhomAccount = sentMsg[0]['toAccount'];
			var data = {};
			data.msgTag = msgTag;
			data.whoSentAccount = whoSentAccount;
			data.toWhomAccount = toWhomAccount;
			$http({
				method:'post',
				url:api.buildDataTree(),
				data:data
			}).success(function(d){
				var totalData = sentMsg;
				totalData = totalData.concat(d);
				$scope.sortData(totalData);
			}).error(function(){
				console.log('buildData error');
			});

		};

		$scope.sortData = function(data){
			var totalData = [];
			for(var i = 0 ; i < data.length; i++){
				var eachMsg = {};
				eachMsg.data = data[i]['data'];
				eachMsg.from = data[i]['fromFalseName'];
				eachMsg.time = data[i]['whenSent'];
				eachMsg.profile = data[i]['profile'];
				eachMsg.msgTimestamp = data[i]['msgTimestamp'];
				totalData.push(eachMsg);
			}
			$scope.sortD(totalData);
		};

		$scope.sortD = function(data){
				var sortNumber = function(a, b){
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
				$scope.msg = sortedData;
		}



		$scope.buildData();






	}])})



