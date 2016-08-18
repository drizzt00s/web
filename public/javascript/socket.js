$(function(){

/*
  $(".onlinePrivateSend").live("click",function(e){
    var findIframeFrom= ($(e.target).siblings("#iframeImage"))[0].contentDocument.getElementById("sendFile");
     //iframe中的表格
    var findFile=$(($(e.target).siblings("#iframeImage"))[0].contentDocument.getElementById("fileContainer")).val();
     //iframe中的表格的input file控件的值
    var imageName=getImageName(findFile);
     //将图片url转成图片的名字
    var imageSentTo=$(this).parents(".eachUserWrap").find(".userFalseName").text();
     //图片发给谁
    var imageSentBy= $(document.getElementById("userFalseName")).text();
     //发图片的人
    var formHidden=($(e.target).siblings("#iframeImage"))[0].contentDocument.getElementById("whoseImage");
    var formHidden2=($(e.target).siblings("#iframeImage"))[0].contentDocument.getElementById("whoSent");
    $(formHidden).val(imageSentTo);
    $(formHidden2).val(imageSentBy);
     if(findFile){
        socket.emit("getSocketImageFlag",true,function(){
        findIframeFrom.submit();
        //发送图片
        socket.emit("returnImageToSelf",{"whoSent":imageSentBy,"imageName":imageName,"imageSentTo":imageSentTo});
      });
   }
})
*/

})
//首页进来的时候从db中查询所有注册用户的资料,并且显示在页面中




$(function(){
    //在线私聊
    initSocket();
    //只有在用户登录状态下才实例化socket!而且在用户登录情况下，如果用户刷新页面，不能生成新的socket实例!!!
    function initSocket(){
     
	    var isUserLogin=$("#checkLogin").val();
       // var isUserSignUp=$("#checkLogin").val();
		var isUserSignUp=getTargetCookie("username");
        //用户没登录的情况下，不实例化socket
        //alert(isUserSignUp);
        if(!isUserSignUp){
            return false;
        }
        else{ 

          
            socket = io.connect('http://localhost:8080');
			socket.on("connect",function(){
		    socket.emit("noticeLogin",{"username":getTargetCookie("username"),"falseName":getTargetCookie("falseName")});
            /*
            当这句执行完毕后,即生成一个socket连接,服务器会管理这个连接,以后用户所有的聊天信息,都凭借这个socket连接传送.
            当用户刷新页面时,会产生一个新socket连接,这个新的socket连接不会覆盖上一次旧的socket连接,但这个时候,在服务器上
            对于同一个用户来说,该用户的socket连接会有1+N个,取决于用户刷新的次数,这是因为最初的socket连接不会马上被服务器删除掉,
            然而过一段时间之后,刷新的上一次,或上N次的socket连接会被服务器删除,最后的结果就是服务器只维护这名用户最后刷新产生的那个socket连接(1个)
            */
        });
          //checkOfflineMsg();

		  socket.on("receiveGlobalBroadcast",function(d){
		        var falseName=d["falseName"];
				var contents=d["contents"];
				var icon=d["iconUrl"];
				var broadCastWrap=$("<div class='broadcastWrap' id='broadcastWrap'>"+
				                    "<span class='broadcastUser'>"+falseName+"</span>"+
									"<img  onclick='#' width='50' height='50' src='"+icon+"' />"+
				                    "<span class='broadcastContent'>"+contents+"</span>"+
									"</div>");
				broadCastWrap.appendTo("body");
				moveBroadcast();
		   });
		  

          function checkOfflineMsg(){
             var userFalseName=$(document.getElementById("userFalseName")).text();
             //登录进来的用户的昵称
             var url="checkOffLineMsg.ejs";
             $.ajax({
             url:url,
             cache:false,
             data:"userFalseName="+userFalseName,
             success:function(data){
             if(data==""){
                return true;
             }
             else{
                var thisFalseName=$(document.getElementById("userFalseName")).text();
                var dataArray=data.split(",");//array
                var unreadOfflineMsg="";
                
                for(var i=0;i<dataArray.length;i++){
                   var eachValueString=dataArray[i];//string
                   var eachValueJson=eval("("+eachValueString+")");//json
                   var eachValue=eachValueJson["whoSent"];//string:键whoSent的值
                   //alert(eachValue);
                   var r=eachValue.split("?");//array
                   var whoSent=r[0];
                   //离线信息是谁发送的
                   var offLineMsgContents=r[1];
                   //离线消息的内容
                   var offLineSentTime=r[(r.length)-1];
                   //离线消息发送的时间
                   //当用户登录进来的时候用ajax取到这三个数据,但这个时候,用户界面上的聊天框还没打开,所以要用前端方法提示用户有离线消息
                   // alert(whoSent);
                    //alert(offLineMsgContents);
                    //alert(offLineSentTime);
                    
                    var offLineMsgContentsProcessed=offLineMsgContents.substring(offLineMsgContents.indexOf(":")+1);
                    unreadOfflineMsg+=offLineMsgContentsProcessed+"\n";
                    
                    
                    
                   
                   
                }
                //for
                
               
                
                 $.each( $(".eachUserWrap"),function(i,v){
                     var findEachUser=$(v).find(".userFalseName").text();
                     if(findEachUser==whoSent){
                       $(v).find("#sendMsg2").addClass("remindOfflineImg");
                     
 
                     }
                  }); 
             }
             //else
                
  
             },
             complete:function(){
             },
             error:function(){
               }
             });
          }
 //checkOfflineMsg

 

 
 
            socket.on("listenOthersSignOut",function(data){
                 var whoIsOnLine=data;
                // alert(whoIsOnLine);
                 //从服务端取得一个数组,里面的值是目前在线的用户的昵称
                  $.each($(".eachUserWrap"),function(i2,v2){
                     $(v2).find(".isOnline").text("");
                   });
                for(var i=0;i<whoIsOnLine.length;i++){
                  $.each($(".eachUserWrap"),function(index,value){
                  var findEachUser=$(value).find(".userFalseName").text();
                  if(findEachUser==whoIsOnLine[i]){
                  $(value).find(".isOnline").text("在线");
                  return false;
         }
        });//jquery each
      }//for 
                 
  });
            
            
            
            
            socket.on("receiveImage",function(data){
            var myImage=data["image"];
            var imageForWhom=data["forWhom"];
            var imageByWhom=data["fromWhom"];
            var img = $("<img />");
                img.attr("src", 'data:image/jpg;base64,' + myImage);
                //img.appendTo($("#msgMain"));
               $.each($(".eachUserWrap"),function(i,v){
                  var checkEachFalse=$(v).find(".userFalseName").text();
                     if(checkEachFalse==imageByWhom){
                     var checkWhoSentInterface=$(v).find(".onlineTalkInterface");
                     if(!checkWhoSentInterface[0]){
                                //接受消息的用户没有打开发送消息用户相应的聊天界面
                                var thisUser=$("#userFalseName").text();
                                //这里改成传用户的昵称
                                 socket.emit("receiveImgNotReady",{from:imageByWhom,imgDetil:myImage,account:thisUser});
                                //将图片传回服务器并准备存在数据库中，因为客户端的聊天界面没打开，这个没读的消息不能存在前端，因为当
                                //用户关闭浏览器后，这些消息会丢失
                            }
                            else{
                                //接受消息的用户打开了发送消息用户相应的聊天界面
                                $(v).find(".msgMain").append(img);
                            }
                     }
               });
            });
            //receiveImage
            
            
            

            socket.on("returnUnreadImg",function(data){
                    var msgBody=data.msg;//array
                    var whoSent=data.whoSent//string
                    unreadImgHtmlWrap=$("<div class='unreadMsgAll2'></div>");
                    for(var i=0;i<msgBody.length;i++){
                    var img = $("<img />");
                    img.attr("src", 'data:image/jpg;base64,' + msgBody[i]);
                    var imgWrap=$("<div class='imgWrap'></div>");
                    imgWrap.append(img);
                    imgWrap.appendTo(unreadImgHtmlWrap);
                   }
                    $.each($(".eachUserWrap"),function(i,v){
                        var whoSent=data.whoSent//string
                        var checkFasleName=$(v).find(".userFalseName").text();
                        if(checkFasleName==whoSent){
                            $(v).find("#msgMain").append(unreadImgHtmlWrap);
                        }
                    })
                }
                //客户端接受上次用户没读的信息
            );
            
            
            

          socket.on("returnImageToWhoSent",function(data){
          var imgSentToWhom=data.toWhom;
          var imgBase64String=data.image;
          var img = $("<img />");
          img.attr("src", 'data:image/jpg;base64,' + imgBase64String);
          $.each( $(".eachUserWrap"),function(i,v){
             var findEachUserName=$(v).find(".userFalseName").text();
             if(findEachUserName==imgSentToWhom){
             var targeTalkInterface=$(v).find(".msgMain");
             targeTalkInterface.append(img);
             }
          });
    });
    
    
    
    
            socket.on("returnUnreadMsg",function(data){
                    var msgBody=data.msg;//array
                   // var whoSent=(data.whoSent)[0];
                    var whoSent=data.whoSent//string
                    var msgBodyTime=data.msgTime;
                    var wrapAllUnread=$("<div class='wrapAllUnread'></div>");
                    for(var i=0;i<msgBody.length;i++){
                        var eachUnreadMsgTime=$("<p>"+msgBodyTime[i]+"</p>");
                        var eachUnreadMsg=$("<p>"+msgBody[i]+"</p>");
                        wrapAllUnread.append(eachUnreadMsgTime).append(eachUnreadMsg);
                        //eachUnreadMsg.appendTo(wrapAllUnread);
                    }

                    $.each($(".eachUserWrap"),function(i,v){
                        var whoSent=data.whoSent//string
                        var checkFasleName=$(v).find(".userFalseName").text();
                        if(checkFasleName==whoSent){
                            $(v).find("#msgMain").append(wrapAllUnread);
                        }
                    })
                    //移除标志着用户用未读消息的css类remindMsg
                    $.each( $(".showingPic"),function(i,v){
                        var findTarget=$(v).find(".userFalseName").text();
                        if(findTarget==whoSent){
                            $(v).find("#sendMsg2").removeClass("remindMsg");
                        }
                    })
                    //each
                    var checkUnreadFlag=getTargetCookie(whoSent);
                    if(checkUnreadFlag){
                        falseFlag=false;
                        document.cookie=whoSent+"="+falseFlag;
                    }
                }
                //客户端接受上次用户没读的信息
            );
            
            
			
			
			/*********************** 观察某人上线 added on 2013 10 25*******************/
			
			socket.on("watchOtherLogin",function(data){
			  var user=data.user;
			  alert(user+"上线了!");
			});
			/*********************** 观察某人上线 added on 2013 10 25*******************/
			
			
            
            
socket.on("connect",function(){



    getFalseName = getTargetCookie('falseName'); //for new

    setTimeout("socket.emit('sendFalseName',getFalseName)",100);

    socket.on("returnPrivateChatting",function(data){
        function appendPrivateMsg(data){
            var whenSent = data.whenSent;
            var msgFrom = data.from;//谁发的信息，值是用户的昵称
            var myUnreadMsg = data.msgContents;//消息体string
            var whenSent = data.whenSent;//消息是什么时候发的
            var msgWrapEnd = $("<div class='msgWrapFrom'></div>");
            var msgWrapEndSpan = $("<span class='msgWrapEndSpan2'></span>");
            msgWrapEndSpan.text(whenSent);
            var msgWrapEndSpanMsg = $("<p class='msgWrapEndSpan3'></p>");
            msgWrapEndSpanMsg.text(myUnreadMsg);
            msgWrapEndSpan.appendTo(msgWrapEnd);
            msgWrapEndSpanMsg.appendTo(msgWrapEnd);
            $('.msgMain').append(msgWrapEnd);
        }
        //查看发送消息的用户的聊天界面是否打开

        if($(".showOnlineTalk").is(":hidden")){
            $('.newMsg').show();
            appendPrivateMsg(data);
        } else {
            appendPrivateMsg(data);
        }
    })
    //在线私聊 发消息 类似QQ

    socket.on('userLeftCurrentPage', function(data){
        alert(data.msg);
    });
})
//实例化socket对象
			
			
			
$("#sendMsgButton").live("click",function(e){
    var isEmpty=$(e.target).prev().find("textarea").val();
    if(isEmpty.length>0){
        var msgTo=$(e.target).parent(".msgBox").find(".msTo").text();
        socket.emit("updateNewMsgCounts",{d:msgTo});
    }

});
			
socket.on("updateNewMsgTo",function(d){
    $("#remindNewMsg").text(d.newMsg);
});
			
			
			
			
			
	
    }
}
    
   

  
})












