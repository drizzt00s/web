agMain.controller('sendMsg', function($scope, utility, api){

	$scope.msgContents = '';

	var uid = localStorage.getItem('uid') || utility.getTargetCookie('uid');
	


	$scope.sendAjaxMsg = function(){   
	    var url = api.sendOutboxMsg;
	    var msgTag = (new Date()).getTime() + '_' + Math.random();
	    var targetProfileUrl = $("#targetProfile").attr("src");



	    var msgJson = {
	        from:utility.getTargetCookie('username'), //发件人用户名
	        fromFalseName:utility.getTargetCookie('falseName'),//发件人昵称
	       	uid:uid, //发件人uid
	        data:$scope.msgContents,//发送的信息
	        to:$("#falseNameWrap").text(),//收件人昵称
	        targetProfileUrl:targetProfileUrl,//收件人的头像profile url
	        whenSent:(new Date()).toLocaleString(),//发送时间
	        msgTag:msgTag,//这条消息的唯一标识
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
});