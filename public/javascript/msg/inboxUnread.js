agMain.controller('inboxUnread', function($scope, $http, utility, api){

	$scope.cp_uid =  localStorage.getItem('uid') || utility.getTargetCookie("uid");//己方uid

	$scope.filterUnreadMsg = function(totalMsg){

	};

	function displayAsyMsg(o){
		var store = {"con":null};
		var store2 = {};
		var storeInfo = {};
		var user = getTargetCookie("username");//己方用户名
		var whoSent = $(o).parents(".insertMsg").find(".msgFromWhom2").text();//信息是谁发的
		var msgContent = $(o).parents(".insertMsg").find(".contents").text();//信息的内容
		store2["user"] = user;
		store2["msgContent"] = msgContent;
		store2["whoSent"] = whoSent;
		store["con"] = store2;
		$.ajax({
				url:"/oldMsg",
				data:store,
				cache:false,
				type:"POST",
			success:function(returnedData){
				
			}
		}); 
	}


	$scope.receiveAsynMsg = function(){
       var catchUserName = localStorage.getItem('username') || utility.getTargetCookie("username");//己方用户名

       var url = api.outboxMsg;

       	$http({
			method:'GET',
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

				$scope.asynMessages = data;
			} else {
				alert("您目前暂无新消息");
			}




			//必须通过属性isTheMessageNew 判断是否已读还是未读 1为未读 0为已读


			//alert(JSON.stringify($scope.asynMessages));

                /*
                for(var i=0;i<data1.length;i++){
                    var isTheMsgNewFlag="";
                    var contents=data1[i].data;
					if(contents.length>10){
					  var msgPreview=contents.substring(0,10);
					  msgPreview=msgPreview+"...";
					}
					else{
					  msgPreview=contents;
					}
                    var fromWhom=data1[i].fromFalseName;
                    var msgTo=data1[i].to;
                    var sentTime=data1[i]["whenSent"];
                    var isTheMsgNew=data1[i]["isTheMsgNew"];//用户有没有读过这个信息
                    var sentTimeProcessed=sentTime.substring(0,(sentTime.length)-2);
                    //将日期最后二位AM或者PM去掉
                    var msgInserted=$("<div class='insertMsg'>"+"<input type='checkbox'  class='confirmDelete' />"+
                                    "<span class='msgFromWhom1'>来自:</span>"+"<span class='msgFromWhom2'>"+fromWhom+"</span>"+
                                    "<span class='readMsg' onclick='displayAsyMsg(this)'>读消息</span>"+
                                    "<span class='contents'>"+contents+"</span><br />"+
                                    "<span class='sentTime'>"+sentTime+"</span><br />"+
									"<span class='msgPreview'>"+msgPreview+"</span>"+
                                    "</div>");
                    if(isTheMsgNew==1){
					 //根据这个值来决定 msgInserted 插在哪个div里面
                      msgInserted.appendTo($("#newMsgContainer"));
                    }
                    else{
                      msgInserted.appendTo($("#oldMsgContainer"));
                    }
                    if(i==((data1.length)-1)){
					 //最后一个循环
                      var deleteAllIcon=$("<span>全选</span>");
                      var deleteAll=$("<input type='checkbox' id='deleteAllMsg' onclick='dAll(this)' />");
                      var deleteButton=$("<input type='button' class='deleteThisMsg' value='删除' onclick='deleteMsg(this);'>");
                       if(isTheMsgNew==1){
                        deleteAllIcon.appendTo($("#newMsgContainer"));
                        deleteAll.appendTo($("#newMsgContainer"));
                        deleteButton.appendTo($("#newMsgContainer"));
                       }
                       else{
                        deleteAllIcon.appendTo($("#oldMsgContainer"));
                        deleteAll.appendTo($("#oldMsgContainer"));
                        deleteButton.appendTo($("#oldMsgContainer"));
                       }
                    }  
                }*/
		

		}).error(function(dataBack){

		})

       
	};

	$scope.receiveAsynMsg();


});