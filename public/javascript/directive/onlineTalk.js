agMain.directive('onlinetalk', function(utility){
	return {
		restrict:'E',
		templateUrl:"/onlineTalk",
		link:function(scope){

			scope.closeTalk = function(){
				$(".onlineTalk").hide();
				scope.$parent.isChatPanelOpen = 'closed';
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


				var msgWrapTo = $("<div class='msgWrapTo'></div>");
				var msgWrapToSpan2 = $("<span class='msgWrapToSpan2'></span>");
				msgWrapToSpan2.text(currentTime);
				var msgWrapToSpan3 = $("<p class='msgWrapToSpan3'></p>");
				var getMsg = whoSent + ":" + getMsg;
				msgWrapToSpan3.text(getMsg);
				msgWrapToSpan2.appendTo(msgWrapTo);
				msgWrapToSpan3.appendTo(msgWrapTo);

				var findThisInterface = $(".msgMain");
				// class = msgMain directive
				msgWrapTo.appendTo(findThisInterface);


				var msgFromWhom = utility.getTargetCookie('falseName');
				//谁发的信息 昵称 这个值同 whoSent

				var msgTo = $(".falseNameWrap ").text();
				//信息发给谁 昵称

				var msgJson = {
					msg:getMsg,
					fromWhom:msgFromWhom,
					toWhom:msgTo
				};

				$("#onlinePrivateMyMsg").val("");
				//清空发消息的框
				socket.emit("privateChat",{eachMsg:msgJson,user:msgFromWhom,whenSent:currentTime});


			}

			

		}
	}
});