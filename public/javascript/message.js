  function displayAsyMsg(o){
     $(o).parents(".insertMsg").find(".contents").show();
     var store={"con":null};
     var store2={};
     var storeInfo={};
     var user=getTargetCookie("username");//己方用户名
     var whoSent=$(o).parents(".insertMsg").find(".msgFromWhom2").text();//信息是谁发的
     var msgContent=$(o).parents(".insertMsg").find(".contents").text();//信息的内容
     store2["user"]=user;
     store2["msgContent"]=msgContent;
     store2["whoSent"]=whoSent;
     store["con"]=store2;
     $.ajax({
       url:"changeNewMsgToOld.ejs",
       data:store,
       cache:false,
       type:"POST",
       success:function(returnedData){
       },
       complete:function(){
       }
     }); 
  }





  function dAll(o){
      if($(o).attr("checked")){
         $.each($(".confirmDelete"),function(i,v){
             v.checked=true;
         });
      }
      else{
           $.each($(".confirmDelete"),function(i,v){
             v.checked=false;
         });
      }
  }
   function deleteMsg(o){
          //循环所有的checkbox,取出打勾的
          var storeDeleteWrap={"con":null};
          var storeDelete=[];
          $.each($(".confirmDelete"),function(i,v){
              var isChecked=$(v).attr("checked");
              if(isChecked){
                 var storeDeleteJson={};
                 var thisCheckbox=v;
                 var deleteWhoseMsg=$(thisCheckbox).parents(".insertMsg").find(".msgFromWhom2").text();//谁发的消息(帐号);
                 var msgDeleted=$(thisCheckbox).parents(".insertMsg").find(".contents").text();//要删除的消息的内容
                 var url="deletSynMsg.ejs";
                 var targetUser=getTargetCookie("username");
                 storeDeleteJson["deleteWhoseMsg"]=deleteWhoseMsg;
                 storeDeleteJson["msgToBeDelete"]=msgDeleted;
                 storeDeleteJson["targetUser"]=targetUser;
                 storeDelete.push(storeDeleteJson);
              }
          }); 
         
  
          storeDeleteWrap["con"]=storeDelete;
          $.ajax({
            url:"deletSynMsg.ejs",
            cache:false,
            type:"POST",
            data:storeDeleteWrap,
            success:function(returnedData){
                 alert("删除成功!");
                 window.location.href="index.ejs";
            },
            complete:function(){
            }
        });
     }




$("#oldMsg").bind("click",function(){

        if($(".msg3").css("display")=="none"){
            $(".msg3").show();
        }
        else{
            $(".msg3").hide();
            $("#newMsgContainer").empty();
            $("#oldMsgContainer").empty();
            return false;
        }


    }
)


 $(function(){
     $("#sendMsg").live("click",sendMsgInit);
     //为html绑定单击事件，开始消息发送功能的逻辑
     $("#msg2").bind("click",receiveMsg);
     //为html绑定单击事件，接受消息
    function sendMsgInit(e){
       var isSignIn= parseInt($("#checkLogin").val());
       if(isSignIn===0){
           alert("请先登录!");
           return false;
       }
       var getTargetFalseName= $(e.target).parents(".eachUserWrap").find(".userFalseName").text();
       //取得对方的昵称，注意昵称不可重复，但是现在没有逻辑限制重复的昵称，以后要添加
       var createMsgBox=$("<div class='msgBox'>" +
           "<p>发送给:"+"<span class='msTo'>"+getTargetFalseName+"</span>"+"</p>" +
           "<p><textarea id='msgContents'></textarea></p>"+
           "<input type='button' value='发送' id='sendMsgButton' style='float:right' />"+
           "</div>");
        //在内存中创建发消息的html用户界面
        $("#showingPic").append(createMsgBox);
        //插入到dom里
        $("#sendMsgButton").bind("click",{targetName:getTargetFalseName},sendAjaxMsg);
		// $("#sendMsgButton") 还有一个click事件在socket.js中，是为了让用户能看到目前有几条没读信息
		
    }
function sendAjaxMsg(e){
   //前端收件箱逻辑   
    var url="/WebstormProjects/web/views/ajaxPost.ejs";
    var catchUserName=getTargetCookie("username");//己方用户名
    var catchFalseName=$("#userFalseName").text();//己方昵称
    var msgBody=$("#msgContents").val();
    var toWhom= e.data.targetName//对方昵称
    var whenSent=(new Date()).toLocaleString();
    //哪个用户发送的信息
    var msgJson={
        from:catchUserName,//帐号
        fromFalseName:catchFalseName,//昵称
        data:msgBody,
        to:toWhom,
        whenSent:whenSent,
        isTheMsgNew:1
    };
    //js data ready
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
   function receiveMsg(){
    //点击首页"收件箱"触发
      if($(".msg3").css("display")=="none"){
          $(".msg3").show();
      }
      else{
          $(".msg3").hide();
          $("#newMsgContainer").empty();
          $("#oldMsgContainer").empty();
		  //此处empty()有什么用??
          return false;
      }
       var catchUserName=getTargetCookie("username");//己方用户名
       var url="ajax.ejs";
       $.ajax({
           url:url+"?isShowPic=getMsg&username="+catchUserName,
           cache:false,
           success:function(dataBack){
                var data1=dataBack.dataServer.con;
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
                }
           },
           error:function(jqXHR, textStatus,error){
               if(error){
                    throw error;
               }
           }
       });
   }





//点击发件箱触发
$("#sendBoxlink").live("click",function(e){
      var catchUserName=getTargetCookie("username");//己方用户名
	  var url="checkSentMsg";
	  $.ajax({
	     url:url,
	     type:"post",
		 cache:false,
		 data:{"username":catchUserName},
		 success:function(d){
		     //var d=JSON.stringify(d);
			 
		
			 
			 var unread=d["unreadMsg"];
			 var read=d["readMsg"];
			 for(var i=0;i<unread.length;i++){
			     var data=unread[i]["data"];
				 var msgTo=unread[i]["to"];
			     var whenSent=unread[i]["whenSent"];
				 var wrapDiv=$("<div class='checkSentMsg'><a class='msgTo' href='#'>"+msgTo+"</a>"+
                               "<span class='msgData'>"+data+"</span>"+
							   "<span class='msgWhen'>"+whenSent+"</span>"+
				                "</div>");
                 wrapDiv.appendTo($("#sendUnread"));
			 }
			 for(var i=0;i<read.length;i++){
			     var data=read[i]["data"];
				 var msgTo=read[i]["to"];
			     var whenSent=read[i]["whenSent"];
				 var wrapDiv=$("<div class='checkReadMsg'><a class='msgTo' href='#'>"+msgTo+"</a>"+
                               "<span class='msgData'>"+data+"</span>"+
							   "<span class='msgWhen'>"+whenSent+"</span>"+
				                "</div>");
                 wrapDiv.appendTo($("#sendRead"));
			 } 
			 
			 
			 
			 updateProfileLink()
			 
			 
		 }
	  });
    });
	
	$("#mySendRead").bind("click",function(e){
	    var storeFalseName=[];
		$.each($(".checkReadMsg"),function(i,v){
		  var falseName=$(v).find(".msgTo").text();
		  storeFalseName.push(falseName);
		})
		storeFalseName=removeRedundant(storeFalseName);
        var url="fetchReadProfile";
		$.ajax({
		  url:url,
		  type:"post",
		  cache:false,
		  data:{
		    "fetchProfile":storeFalseName,
			"checkType":"read"
		  
		  },
		  success:function(d){
		     for(var i=0;i<d.length;i++){
			    var userName=d[i]["whoseProfile"];
				var profile=d[i]["profileName"]["profile"];
				var username=d[i]["ProfileUsername"]["account"];
				if(profile.length>0){
				  profile="../uploads/pic/"+username+"/"+profile;
				}
				else{
				 profile="../uploads/pic/default/unknown.png";
				}
			    //在页面上找到和userName对应的div的位置
			  $.each($("#sendRead").find(".msgTo"),function(i,v){
			      var checkUserName=$(v).text();
				  if(checkUserName==userName){
				     //在页面上找到对应的昵称
					 var img=$("<img class='thisProfile'></img>");
				     img.attr("src",profile);
					 img.insertAfter($(v));
				  }
			  });
			 }
		  }
		});
	});
	
	$("#mySendUnread").bind("click",function(e){
	    var storeFalseName=[];
		$.each($(".checkSentMsg"),function(i,v){
		  var falseName=$(v).find(".msgTo").text();
		  storeFalseName.push(falseName);
		})
		storeFalseName=removeRedundant(storeFalseName);
		var url="fetchReadProfile";
	$.ajax({
		  url:url,
		  type:"post",
		  cache:false,
		  data:{
		    "fetchProfile":storeFalseName,
			"checkType":"unread"
		  
		  },
		  success:function(d){
		     for(var i=0;i<d.length;i++){
			    var userName=d[i]["whoseProfile"];
				var profile=d[i]["profileName"]["profile"];
				var username=d[i]["ProfileUsername"]["account"];
				if(profile.length>0){
				  profile="../uploads/pic/"+username+"/"+profile;
				}
				else{
				 profile="../uploads/pic/default/unknown.png";
				}
			    //在页面上找到和userName对应的div的位置
			  $.each($("#sendUnread").find(".msgTo"),function(i,v){
			      var checkUserName=$(v).text();
				  if(checkUserName==userName){
				     //在页面上找到对应的昵称
					 var img=$("<img class='thisProfile'></img>");
				     img.attr("src",profile);
					 img.insertAfter($(v));
				  }
			  });
			 } 
		  }
		});
	});
	
	function updateProfileLink(){
	    var storeFalseName=[];
		var storeFalseNameRead=[];
		var url="updateProfileLink";
		$.each($("#sendUnread").find(".msgTo"),function(i,v){
		  storeFalseName.push($(v).text());
		});
		storeFalseName=removeRedundant(storeFalseName);
		$.each($("#sendRead").find(".msgTo"),function(i,v){
		  storeFalseNameRead.push($(v).text());
		});
		storeFalseNameRead=removeRedundant(storeFalseNameRead);
		
		var storeAll={};
		storeAll["read"]=storeFalseNameRead;
		storeAll["unread"]=storeFalseName;
		
		
		$.ajax({
		   url:url,
		   type:"post",
		   cache:false,
		   data:{"fetchUsername":storeAll},
		   success:function(d){
		      var unread=d["unread"];
              var read=d["read"];
		        $.each($("#sendUnread").find(".msgTo"),function(i,v){
				    var checkfalseName=$(v).text();
					for(var i=0;i<unread.length;i++){
					  if(checkfalseName==unread[i]["falseName"]){
					    var findAccount=unread[i]["account"]["account"];
					    $(v).attr("href","userDetails.ejs?check="+findAccount);
					  
					  }
					}
				});
			   
			   $.each($("#sendRead").find(".msgTo"),function(i,v){
				    var checkfalseName2=$(v).text();
					for(var z=0;z<read.length;z++){
					  if(checkfalseName2==read[z]["falseName"]){
					    var findAccount2=read[z]["account"]["account"];
					    $(v).attr("href","userDetails.ejs?check="+findAccount2);
					  
					  }
					}
				});
			   
			   
			   //userDetails.ejs?check=2222222
			   
		   
                      
		   
		   }
		});
	}
	
	
	
	
  })