agMain.directive('onlinetalk', function(utility){
	return {
		restrict:'E',
		templateUrl:"/onlineTalk",
		link:function(scope){

			scope.closeTalk = function(){
				//$(".onlineTalk").hide();
				 scope.showOnlineTalk = false;

			}

			scope.getUserMsg = function(){
				var getMsg= $("#onlinePrivateMyMsg").val();
				//message contents
				if(getMsg == ""){
					alert("发送的信息不能为空");
					return false;
				}

				var whoSent = utility.getTargetCookie('falseName');
				//谁发的信息 昵称
				var currentTime = utility.getCurrentTime();
				//当前时间
				var getMsg = whoSent + ":" + getMsg;
				//完整的消息
				utility.constructPrivateMsg(currentTime, getMsg);
				var msgTo = $(".falseNameWrap ").text();
				//信息发给谁 昵称
				var msgJson = {
					msg:getMsg,
					fromWhom:whoSent,
					toWhom:msgTo
				};
				$("#onlinePrivateMyMsg").val("");
				//清空发消息的框
				socket.emit("privateChat",{eachMsg:msgJson,user:whoSent,whenSent:currentTime});
			}

			

		}
	}
});