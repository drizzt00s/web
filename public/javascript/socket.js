$(function(){
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




function checkUnreadMsg(){
        var currentCookie=document.cookie;//array
        //alert(currentCookie);
        var currentCookieArray=currentCookie.split(";");
        for(var i=0;i<currentCookieArray.length;i++){
            var eachIndex=currentCookieArray[i].indexOf("=");//等号的下标
            var targetCookieB=currentCookieArray[i].substring(0,eachIndex);//每个cookie的名称,也即发送未读消息的人
            var targetCookieBValue=currentCookieArray[i].substring(eachIndex+1);//每个cookie的值
            $.each($(".eachUserWrap"),function(index,value){
                var findUser=$(value).find(".userFalseName").text();
                //页面上每个用户的昵称
                    if(findUser==$.trim(targetCookieB)){
                      if(targetCookieBValue!="false"){
                        $(value).find("#sendMsg2").addClass("remindMsg");
                      } 
                }
            })
        }
        //for
 }




function showUserPic(){
        var url="ajax.ejs";
        $.ajax({
            url:url+"?isShowPic=showAllUserPics",
            cache:false,
            success:function(data){
                var allUSerInfoArray=data.allUserInfo;
				var A=JSON.stringify(allUSerInfoArray);
                for(var i=0;i<allUSerInfoArray.length;i++ ){
                    var account=allUSerInfoArray[i].account;
                    var falseName=allUSerInfoArray[i].falseName;
                    var ageRaw=allUSerInfoArray[i].birthday;
                    var ageProcessed=(new Date().getFullYear())-parseInt(ageRaw.substring(0,4));
                    var locationRaw=allUSerInfoArray[i].province;
                    var locationArray=locationRaw.split(" ");
                    var locationProcessed=locationArray[0];
                    var height=allUSerInfoArray[i].height;
                    var education=allUSerInfoArray[i].education;
                    var income=allUSerInfoArray[i].monthincome;
                    if(!income){
                      income="";
                    }
                    var selfIntro=allUSerInfoArray[i].hobby;
                    if(!selfIntro){
                       selfIntro="";
                    }
                    var userFirstPicString=allUSerInfoArray[i].avatar;
                    var userFirstPicJson=eval("("+userFirstPicString+")");
                    if(!userFirstPicJson||userFirstPicJson['con'].length==0){
					
                        var picUrl="../uploads/pic/default/unknown.png";
						//var picUrl="/WebstormProjects/web/uploads/pic/default/unknown.png";
						    
                    }
                    else{
                        var firstPicAtServer=userFirstPicJson['con'];
                        var firstPicAtServerProcessed=firstPicAtServer[0];
                        var picUrl="../uploads/pic/"+account+"/"+firstPicAtServerProcessed;
                    }
                    //取得数据库中该用户的第一张图片
                    //取得该用户数据完毕,这些数据只是很少一部分，放在首页供人稍微浏览下
                    var eachUserWrap=$("<div class='eachUserWrap'><span class='eachUserWrap1'>"+"<a href='#' class='userFalseName'>"+falseName+"</a>"+"</span>"+
                        "<img src='"+picUrl+"'"+" />"+
                        "<span class='eachUserWrap2'>"+ageProcessed+"</span>"+
                        "<span class='eachUserWrap3'>"+locationProcessed+"</span>"+
                        "<span class='eachUserWrap4'>"+height+"</span>"+
                        "<span class='eachUserWrap5'>"+education+"</span>"+
                        "<span class='eachUserWrap6'>"+income+"</span>"+
                        "<div class='eachUserWrap7'>"+selfIntro+"</div>"+
						"<span class='rights'><a href='displayRights.ejs'>开通特权</a></span>"+
					    "<p class='lastLoginTime'><a href='#'>最后登陆时间</a></p>"+ //added on 2013/10/23
						"<p class='loginReminder'><a href='#'>上线提醒</a></p>"+  //added on 2013/10/24
                        "<p><span><a href='javascript:void(0)' id='sendMsg'>发送悄悄话</a></span></p>"+
                        "<p><span><a href='javascript:void(0)' id='sendMsg2'>在线聊天</a></span></p>"+
                       //"<p><span><a href='javascript:void(0)' id='watch' onclick='watch(this)'>关注Ta</a></span></p>"+
                        "<p><span><a href='#' class='watch'>关注Ta</a></span></p>"+
						"<p><span><a href='javascript:void(0)' id='addToBlackList' onclick='addToBlackList(this)'>加入黑名单</a></span></p>"+
                        "<div><a class='eachUserWrap8' href='userDetails.ejs?check="+account+"'"+">查看详细</a></div>"+
                       "<div class='isOnline'></div>"+
                        "</div>");
                    eachUserWrap.appendTo($("#showingPic")); 
                }
                  checkUnreadMsg();
            },
            error:function(){

            },
            complete:function(){
            }
        })
    }
   showUserPic();
    //不管用户登录没登录都显示图片,在主页显示所有用户信息
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
                getFalseName=$("#userFalseName").text();
                setTimeout("socket.emit('sendFalseName',getFalseName)",1000);
                socket.on("returnPrivateChatting",function(data){
                    //查看发送消息的用户的聊天界面是否打开!!!!!!!
                    $.each($(".eachUserWrap"),function(i,v){
                        var whenSent=data.whenSent;
                        var msgFrom=data.from;//谁发的信息，值是用户的昵称
                        var myUnreadMsg=data.msgContents;//消息体string
                        var checkEachFalse=$(v).find(".userFalseName").text();
                        if(checkEachFalse==msgFrom){
                            var checkWhoSentInterface=$(v).find(".onlineTalkInterface");
                            if(!checkWhoSentInterface[0]){
                                //接受消息的用户没有打开发送消息用户相应的聊天界面
                                var thisUser=getTargetCookie("username");
                                noticeUserOfMsg2(msgFrom);
                                //调用这个纯前端函数提醒用户有新消息到达
                                document.cookie=msgFrom+"="+"1";
                                //在cookie里加一个flag:hasUnreadMsg,标志用户有没读的消息,这个flag的值如果是1的话说明特定用户(msgFrom)
                                //有没读的值
                                socket.emit("receiveMsgNotReady",{from:msgFrom,msgDetil:myUnreadMsg,account:thisUser,whenSent:whenSent});
                                //将消息传回服务器并准备存在数据库中，因为客户端的聊天界面没打开，这个没读的消息不能存在前端，因为当
                                //用户关闭浏览器后，这些消息会丢失
                            }
                            else{
                                //接受消息的用户打开了发送消息用户相应的聊天界面
                                var myUnreadMsg=data.msgContents;//信息内容
                                var msgFrom=data.from;//谁发的信息，值是用户的昵称
                                var whenSent=data.whenSent;//消息是什么时候发的
                                var msgWrapEnd=$("<div class='msgWrapFrom'></div>");
                                var msgWrapEndSpan2=$("<span class='msgWrapEndSpan2'></span>");
                                msgWrapEndSpan2.text(whenSent);
                                var msgWrapEndSpan3=$("<p class='msgWrapEndSpan3'></p>");
                                var getMsg=myUnreadMsg;
                                msgWrapEndSpan3.text(getMsg);
                                msgWrapEndSpan2.appendTo(msgWrapEnd);
                                msgWrapEndSpan3.appendTo(msgWrapEnd);
                                $(v).find(".msgMain").append(msgWrapEnd);
                            }
                        }
                    })
                })
                //returnPrivateChatting
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
    
   

    //单击事件一，检查用户是否登录，如果处于登录状态，整个逻辑开始(1)
    $("#sendMsg2").live("click",onlineTalk);
    function onlineTalk(e){
        //firsty check if this user has logged in
        var checkLogin=$("#checkLogin").val();
        if(checkLogin!=1){
            alert("请先登录");
            return false;
        }
        //创建聊天界面
        var onlineTalkInterface=$("<div class='onlineTalkInterface'>"+
            "<a href='#' id='closeTalk' class='closeTalk' onclick='closeTalk(this)'></a>"+
            "<div class='msgMain' id='msgMain'></div>"+
            "<div><input type='text' name='sendMsg' id='onlinePrivateMyMsg' style='height:70px;width:494px;border:solid 3px #000;border-top:none;border-right:1px;' /></div>"+
            "<iframe src='sendImage.ejs' frameborder='0' height='20' width='100%' scrolling='no' id='iframeImage'>"+
            "</iframe>"+
            "<br />"+ 
            "<input type='button' value='发送' class='onlinePrivateSend' />"+
            "</div>" ); 
            
        
            
        $(this).parents(".eachUserWrap").append(onlineTalkInterface);
        //先检查该用户是否有没读的离线消息
         var rOffLineMsg=$(this).hasClass("remindOfflineImg");
         if(rOffLineMsg){
            //用户有未读的离线消息
         }
         else{
         }
        //先检查该用户是否有没读的消息
        
       
        
        var r1=$(this).hasClass("remindMsg");
        if(r1){
            //用户有消息没有读
            var questFromWhom=getTargetCookie("username");
            var msgFromWhom=$(e.target).parents(".eachUserWrap").find("a.userFalseName").text();
            socket.emit("getUnreadMsg",{from:questFromWhom,whoseMsg:msgFromWhom});
            $(this).removeClass("remindMsg");
        }
        
        var questFromWhomB=$("#userFalseName").text();
        //这里发送用户的昵称
        var msgFromWhomB=$(e.target).parents(".eachUserWrap").find("a.userFalseName").text();
        socket.emit("getUnreadImg",{from:questFromWhomB,whoseMsg:msgFromWhomB});
        //发送一个事件向服务器询问是否有没读的图片
        //当发送消息的界面生成后，为界面中的按钮添加发送消息的单击事件句柄
        $(e.target).parents(".eachUserWrap").find (".onlinePrivateSend").bind("click",getMsg)
 
        
    }
    //onlineTalk
    
    
    
    
    function getMsg(e){
//取得该用户要发送的消息
        var getMsg= $(e.target).parents(".onlineTalkInterface").find("#onlinePrivateMyMsg").val();
        var getImage;
        var sCheckImage= $(e.target).parents(".onlineTalkInterface").find("#fileContainer");
        var checkImage=$(($(e.target).parents(".onlineTalkInterface").find("iframe"))[0].contentWindow.document.getElementById("fileContainer")).val();
        var sFindFile=$(($(e.target).parents(".onlineTalkInterface").find("iframe"))[0].contentWindow.document.getElementById("sendFile")).find("#fileContainer");
        if(getMsg==""&&!checkImage){
            alert("发送的信息不能为空");
            return false;
        }
        var whoSent=$("#userFalseName").text();
        var currentTime=getCurrentTime();
        var msgWrapTo=$("<div class='msgWrapTo'></div>");
        var msgWrapToSpan2=$("<span class='msgWrapToSpan2'></span>");
        msgWrapToSpan2.text(currentTime);
        var msgWrapToSpan3=$("<p class='msgWrapToSpan3'></p>");
        var getMsg=whoSent+":"+getMsg;
        msgWrapToSpan3.text(getMsg);
        msgWrapToSpan2.appendTo(msgWrapTo);
        msgWrapToSpan3.appendTo(msgWrapTo);
        var findThisInterface=$(e.target).parents(".eachUserWrap").find(".msgMain");
        msgWrapTo.appendTo(findThisInterface);
        var msgFromWhom=$("#userFalseName").text();
        var msgTo=$(e.target).parents(".eachUserWrap").find("a.userFalseName").text();
        var msgJson={
            msg:getMsg,
            fromWhom:msgFromWhom,
            toWhom:msgTo
        };
        $(e.target).parents(".onlineTalkInterface").find("#onlinePrivateMyMsg").val("");
        socket.emit("privateChat",{eachMsg:msgJson,user:msgFromWhom,whenSent:currentTime});
        //前端通过socket发送信息到server
    }
	
	
	
	

  
 
  
  
  
  
  
  
  
})









