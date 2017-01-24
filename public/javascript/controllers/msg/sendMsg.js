define(['angular'], function(){
	angular.module('web.controller').controller('sendMsg',['$scope', 'utility', 'api', 'localStore', function($scope, utility, api, localStore){
		$scope.msgContents = '';

		var uid = localStore.getUserInfo('personid');


		
		$scope.sendAjaxMsg = function(){ 
			var replyMsg = $scope.msgContents.replace(/'/g, ''); 
		    var url = api.sendOutboxMsg();
		    var msgTag = (new Date()).getTime() + '_' + Math.random() + '_' + uid;
		    var targetProfileUrl = $("#targetProfile").attr("src");
		    var msgJson = {
		        from:utility.getTargetCookie('username'), //发件人用户名
		       // fromFalseName:utility.getTargetCookie('falseName'),//发件人昵称
		      	fromFalseName:localStore.getUserInfo('falseName'),//发件人昵称


		       	uid:uid, //发件人uid
		        data:replyMsg,//发送的信息
		        to:$("#falseNameWrap").text(),//收件人昵称
		        toAccount:$("#account").text(), //收件人用户名
		        targetProfileUrl:targetProfileUrl,//收件人的头像profile url
		        whenSent:(new Date()).toLocaleString(),//发送时间
		        msgTag:msgTag,//这条消息的唯一标识,
		        msgType:'init',
		        msgTimestamp:(new Date()).getTime(),
		        isTheMsgNew:1
		    };

		    $.ajax({
		        url:url,
		        cache:false,
		        type:"POST",
		        data:msgJson,
		        success:function(data){
		            if(data){
		                alert("发送成功!");
		                window.location.reload();
		            }
		        },
		        error:function(jqXHR, textStatus,error){
		            if(error){
		              throw error;
		            }
		        }
		    })
		}
	}]);
});



