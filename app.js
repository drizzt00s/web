var connect = require('connect');
var express = require('express');
var routes = require('routeIndex.js');



var user=require("moduleUser");




//var commons = require('serverCommon.js');
var http = require('http');
var path = require('path');
var fs=require("fs");
//required modules
var app = express();
var partials=require("express-partials");
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
       secret:"msy",
       key:"kui"//
     }));
 app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


//用户昵称不可以重复
//页面有时候会出现死锁的情况 原因不明 需要解决
//isonline有bug 0表示不在线 1表示在线 可能是用户退出登录的时候字段没有更新


/*==================socket io==========================*/
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8080);
//server.listen(3306);
var storeSocket=[];
var myClosure=null;
var loopIndex=0;
var storeNew=[];
/*
这个数组里面存的是所有当前的socket连接,即所有连上服务器的用户socket连接
格式为[{f:userLogin,c:socket},{f:userLogin,c:socket}.........]
数组每一个元素都是一个json,json有二个属性,f表示该socket连接的用户名,c表示该socket连接的实例
*/

var stroeOnlineUSer=[];
io.sockets.on("connection",function(socket){

//客户端和服务器的socket连接完成
// var result1=socket;
// var result2=io.sockets;
//result1是当前登录用户的那个socket连接实例json,存储的是该用户的信息
//result2也是一个json,但是这个json储存的是当前服务器维护的所有sockets实例信息


socket.on("watchOtherLogin2",function(d,fn){
//added on 2013/10/24
    var username=d["username"];
    var falseName=d["falseName"];
	socket.set("username",username);
	
	
    var allSockets=io.sockets.sockets;//json
    var client=prepareDb();
	var queryString="select whoExpectYouLogin from d where falseName='"+falseName+"'";
	
	
	
	client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	  }
	  
	  console.log(r);
	   console.log(r.length);
	  if(r.length!=0){
		  
		  console.log("1111111111111111111111111111");

		  
	  var r=r[0]["whoExpectYouLogin"]; //包含用户名
	  if(r.length>0){
		   r=eval("("+r+")");
	  
	 
	  
	  for(var j=0;j<r.length;j++){
	    for(var jj2 in allSockets){
	     var eachS=allSockets[jj2];
		  var thisUsername=eachS.store.data.username;
		  console.log("A"+thisUsername);
		  console.log("B"+r[j]);
		   if(thisUsername==r[j]){
			    eachS.emit("watchOtherLogin",{"user":falseName});
			    break;	
		   }
	     }
	   }
	  
	    fn();
		  
	    }
       
	  
	  }
	  
	     console.log("222222222222");
		 return false;
	   
	  fn();
	  
	  
	});
	//added on 2013/10/24
})



    socket.on("noticeLogin",function(d){
	var username=d["username"];
    var falseName=d["falseName"];
    socket.set("username",username);
	
	

    app.get("/WebstormProjects/web/views/onlineMember.ejs",function(req,res){
   // var r=io.sockets.clients();//array;
    var r=io.sockets.sockets;//json
    var storeAllOnlineUser=[];
	for(var i in r){
	 var eachSocket=r[i];
	 var username=eachSocket["store"]["data"]["username"];
	 storeAllOnlineUser.push(username);
	}
	storeAllOnlineUser=removeRedundant(storeAllOnlineUser);
    res.render("./onlineMember.ejs",{title:"在线用户",onlines:JSON.stringify(storeAllOnlineUser)});
  })
   //当用户登录进来的时，将这名用户的socket对象分别设置二个值，用户名和昵称
})



     setTimeout(checkSockets,2000);
     function checkSockets(){
            var r=io.sockets.sockets;//json
            var storeOnlineUser=[];
            for(var i in r){
               var eachSocket=r[i]["store"]["data"]["account"];
              // 用户的昵称
              storeOnlineUser.push(eachSocket);
            }
            //for
            socket.emit("listenOthersSignOut",storeOnlineUser);
            setTimeout(checkSockets,2000);
       }
      //搜集当前所有在线用户,放在一个数组中去,然后通过socket发送到前端,这个函数的作用是每隔10秒告诉前端当前在线用户是哪些人



     function checkIsUserOnline(userfalse){
         var isUserOnline=false;
         var r=io.sockets.sockets;//json
         var storeOnlineUser=[];
         for(var i in r){
            var eachUserFalseName=r[i]["store"]["data"]["account"];
            //每个用户的昵称
            storeOnlineUser.push(eachUserFalseName);
         }
         for(var i=0;i<storeOnlineUser.length;i++){
            if(storeOnlineUser[i]==userfalse){
              isUserOnline=true;
              break;
            }
         }
         return isUserOnline;
     }
     //这个函数的逻辑和上一个函数checkSockets差不多,但是作用不一样,这个函数的作用是检查目标用户是不是在线

	 
	 
	 
	 function repeatBroadcast(o){
	 /*
	    var targetSocket=o.socket;
	    var targetIcon=o.icon;
		var targetContents=o.contents;
		var targetFalseName=o.falseName;
		targetSocket.emit("receiveGlobalBroadcast",{"contents":targetContents,"iconUrl":targetIcon,"falseName":targetFalseName});
	    socket.broadcast.emit("receiveGlobalBroadcast",{"contents":targetContents,"iconUrl":targetIcon,"falseName":targetFalseName});
		*/
		
	 }
	 
	 
	 
	 

       socket.on("globalBroadcast",function(d){
	    var contents=d["d"];
		var username=d["username"];
		var falseName=d["falseName"];
		fs.exists( "./web/uploads/pic/"+username,function(ifExist){
		   if(ifExist){
		    //用户有图片
			fs.readdir("./web/uploads/pic/"+username,function(e,d){
			 if(e){
			  throw e; 
			 }
			 var userIcon= "../uploads/pic/"+username+"/"+d[0];
			 socket.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			 socket.broadcast.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			 function repeatBroadcast(){
			   socket.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			   socket.broadcast.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			   setTimeout(repeatBroadcast,10000);
			 }
			 setTimeout(repeatBroadcast,10000);
			});
		   }
		   else{
		    //用户无图片
			
		    var userIcon="../uploads/pic/default/unknown.png";
			socket.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			socket.broadcast.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			function repeatBroadcast(){
			   socket.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			   socket.broadcast.emit("receiveGlobalBroadcast",{"contents":contents,"iconUrl":userIcon,"falseName":falseName});
			   setTimeout(repeatBroadcast,10000);
			 }
			 setTimeout(repeatBroadcast,10000);
		   }
		});
	 });


     socket.on("getSocketImageFlag",function(data,fn){
         if(data){
           fn();
      }
         sendSocketImage=function (req,res,imageForWhom,imageFromWhom){
         var uploadedImageName=(req.files)["myFile"]["name"];
         var imagePath=__dirname+"/uploads/pic/"+uploadedImageName;
         fs.readFile(imagePath,function(err,data){
            if(err){
             throw err;
            }
     for(var i=0;i<storeSocket.length;i++){
         var eachSocketInfoV=storeSocket[i];//json
         var getEachUserV=eachSocketInfoV.f;//string
         if(imageForWhom==getEachUserV){
                   var targetSocketV=eachSocketInfoV.c;
                   var stringData=data.toString('base64');
                   var storeImageData={};
                   //这个json要存储表示该图片的字符串和谁发的,发给谁这三个信息
                   storeImageData["image"]=stringData;
                   storeImageData["forWhom"]=imageForWhom;
                   storeImageData["fromWhom"]=imageFromWhom;
                   targetSocketV.emit("receiveImage",storeImageData);
                   break;
            }
           }  
         });
      };
      //sendSocketImage
      sendOffLineSocketImage=function(req,res,imageForWhom,imageFromWhom){
            var storeUnreadMsgJson={};
            var unReadMsgFrom=imageFromWhom; //who sent the msg
            var unReadMsgTo=imageForWhom;//msg to whom
            var uploadedImageName=(req.files)["myFile"]["name"];
            var imagePath=__dirname+"/uploads/pic/"+uploadedImageName;
            fs.readFile(imagePath,function(error,data){
              if(error){
                 throw error;
              }
            var unReadMsg=data;
           // 这边的data就是二进制
            var unReadMsg2=unReadMsg.toString('base64');
            var storeUnreadMsg=unReadMsgFrom+"***********"+unReadMsg2+"***********"+unReadMsgTo;
            //string
            storeUnreadMsgJson["whoSent"]=storeUnreadMsg;//json
            var Client =require("mysql").Client;
            var client =new Client();
            client.user="root";
            client.password="5225541a";
            client.query("USE user");
            //check the user's unreadmsg field in db first to check if there is any value in the column
            var queryStringIsValueExist="SELECT * FROM d WHERE falseName="+"'"+unReadMsgTo+"'";
            client.query(queryStringIsValueExist,function(error,result){
                    if(error){
                       throw error;
                    }
                    var checkUnreadMsg=result;
                    if(!checkUnreadMsg[0]){
                      return false;
                    }
                    var r1=checkUnreadMsg[0].unreadimg;
                    //取得第一次查询时unreadmsg字段的值
                    if(!r1){
                        //db中没有这个用户的临时消息
                        var storeUnreadMsgInDb=[];//array
                        storeUnreadMsgInDb.push(JSON.stringify(storeUnreadMsgJson));;
                        //创建一个空数组，并且把本次的临时消息存到这个数组中,本次的消息是个json
                         var queryUpdateUnreadMsg="UPDATE d SET unreadimg="+"'"+storeUnreadMsgInDb+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'"
                        //将数组storeUnreadMsgInDb存入字段unreadmsg
                        client.query(queryUpdateUnreadMsg,function(error){
                                if(error){
                                     throw error;
                                }
                                //临时信息在db中存储完毕
                            
                            }
                           //queryUpdateUnreadMsg
                        ); 
                    }
                    else{
            
                      //该用户有临时信息没读，这些临时信息存储在数据库里的字段unreadmsg中
                        var currentUnMsg=checkUnreadMsg[0]["unreadimg"];//string
                        //console.log("S2:"+currentUnMsg+"length:"+currentUnMsg.length);
                        var currentUnreadMsgC=currentUnMsg.split(",");//array
                        //console.log("A2"+currentUnreadMsgC);
                        currentUnreadMsgC.push(JSON.stringify(storeUnreadMsgJson));
                        var queryUpdateUnreadMsg2="UPDATE d SET unreadimg="+"'"+currentUnreadMsgC+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'";
                        client.query(queryUpdateUnreadMsg2,function(error){
                                if(error){
                                    throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                            //queryUpdateUnreadMsg
                        );
                        //字段unreadmsg更新完毕,这个时候这个用户的临时消息一定超过一条
                    }
                    //else
                }
            );
            //query for queryStringIsValueExist
 
        });
      }
      //sendOffLineSocketImage
    });
   //getSocketImageFlag:服务器收到一个用户发来的图片,并将这张图片转发给其他用户
   
 
   
   socket.on("returnImageToSelf",function(data){
        var whoSent=data.whoSent;
        //发图片的人
        var imageName=data.imageName;
        //图片名
        var imageUrl=__dirname+"/uploads/pic/"+imageName;
        //图片现在在服务器上的位置
        var imageSentTo=data.imageSentTo;
        //这张图片发给谁
        function getImage(){
          fs.readFile(imageUrl,function(error,data){
          if(data){
          var dataString=data.toString("base64");
          //得出这张图片二进制代码的base64字符串表示
          socket.emit("returnImageToWhoSent",{"image":dataString,"toWhom":imageSentTo});
          //在调用下面这个函数之前,必须先确定目标用户是否在线
          //下面这个函数的作用是将用户A发送到服务器的图片转发给用户B,要先确定用户B是否在线
          }
          else{ 
           getImage();
          }
        });
        //readFile
       }//getImage
     getImage();
   })
  //event returnImageToSelf
    
  
  
    socket.on("getUnreadImg",function(data){
            var whoSentRequestB=data.from;//用户昵称
            var whoSentMsgB=data.whoseMsg;//谁发给你的消息
            var Client =require("mysql").Client;
            var client =new Client();
            client.user="root";
            client.password="5225541a";
            client.query("USE user");
            var queryUnreadMsgInDbB="SELECT * FROM d WHERE falseName="+"'"+whoSentRequestB+"'";
            
            client.query(queryUnreadMsgInDbB,function(errorB1,resultB1){
                  if(errorB1){
                       throw errorB1;
                  }
                    var checkUnreadMsgB1=resultB1;//arrays
                    var r1B=checkUnreadMsgB1[0].unreadimg;//string
                    if(!r1B){
                      return false;
                    }

                    var r2B=r1B.split(",");//array;This line may have a bug:can not call method split of none
                    var fetchUnreadMsgB=[];
                    //这个数组存储特定用户发送的所有未读信息
                    var remainingUnreadMsgB=[];
                    //这个数组存储不是这个特定用户发送的所有未读信息，这些信息会被再次更新到db中的unreadmsg字段
                    
                    
                    for(var i=0;i<r2B.length;i++){
                         var eachJsonB=eval("("+r2B[i]+")");
                         var checkWhoSentB=eachJsonB["whoSent"];//string
                        //取得该用户所有在db中的未读信息！！！！
                         var eachWhoSentB=(checkWhoSentB.split("***********"))[0];
                        //每条未读信息是谁发送的
                         if(eachWhoSentB==whoSentMsgB){
                             fetchUnreadMsgB.push((checkWhoSentB.split("***********"))[1]);
                         }
                         else{
                             remainingUnreadMsgB.push(r2B[i]);//array
                         }
                    }//for
                    var queryRemainingUnreadB="UPDATE d SET unreadimg="+"'"+remainingUnreadMsgB+"'"+"WHERE falseName="+"'"+whoSentRequestB+"'";
                    
                   
                
                    client.query(queryRemainingUnreadB,function(errorB){
                              if(errorB){
                                   throw errorB;
                              }
                            //console.log("The final value is"+fetchUnreadMsgB+"!!!!!!!!!!!!!!!!!!!");
                           //return false;
                            socket.emit("returnUnreadImg",{msg:fetchUnreadMsgB,whoSent:whoSentMsgB});
                        }
                    )
                   //将其他用户的未读信息再次存到数据库中
                }
            )
        }
    )
  //getUnreadImg
  
    
    
    socket.on("getUnreadMsg",function(data){
            var whoSentRequest=data.from;
            var whoSentMsg=data.whoseMsg;
            var Client =require("mysql").Client;
            var client =new Client();
            client.user="root";
            client.password="5225541a";
            client.query("USE user");
            var queryUnreadMsgInDb="SELECT * FROM d WHERE account="+"'"+whoSentRequest+"'";
            client.query(queryUnreadMsgInDb,function(error,result){
                  if(error){
                       throw error;
                  }
                    var checkUnreadMsg=result;//arrays
                    if(!checkUnreadMsg){
                     return false;
                    }
                    var r1=checkUnreadMsg[0].unreadmsg;//string
                    if(!r1){
                       return false;
                    }
                    var r2=r1.split(",");//array;This line may have a bug:can not call method split of none
                    var fetchUnreadMsg=[];
                    //这个数组存储特定用户发送的所有未读信息
                    var fetchUnreadMsgTime=[];
                    //这个数组存储特定用户发送的所有未读信息的发送时间
                    var remainingUnreadMsg=[];
                    //这个数组存储不是这个特定用户发送的所有未读信息，这些信息会被再次更新到db中的unreadmsg字段
                    for(var i=0;i<r2.length;i++){
                         var eachJson=eval("("+r2[i]+")");
                         var checkWhoSent=eachJson["whoSent"];//string
                        //取得该用户所有在db中的未读信息！！！！
                         var eachWhoSent=(checkWhoSent.split("?"))[0];
                        //每条未读信息是谁发送的
                        
                         if(eachWhoSent==whoSentMsg){
                             fetchUnreadMsg.push((checkWhoSent.split("?"))[1]);
                             fetchUnreadMsgTime.push((checkWhoSent.split("?"))[3]);
                         }
                         else{
                             remainingUnreadMsg.push(r2[i]);//array
                         }
                    }//for
                    var queryRemainingUnread="UPDATE d SET unreadmsg="+"'"+remainingUnreadMsg+"'"+"WHERE account="+"'"+whoSentRequest+"'";
                    client.query(queryRemainingUnread,function(error){
                              if(error){
                                   throw error;
                              }
                            socket.emit("returnUnreadMsg",{msg:fetchUnreadMsg,whoSent:whoSentMsg,msgTime:fetchUnreadMsgTime});
                        }
                    )
                   //将其他用户的未读信息再次存到数据库中
                }
            )
        }
    )
  //getUnreadMsg




socket.on("receiveImgNotReady",function(data){
            var storeUnreadMsgJson={};
            var unReadMsgFrom=data.from; //who sent the msg
            var unReadMsg=data.imgDetil; //what is the msg
            var unReadMsgTo=data.account;//msg to whom
            var storeUnreadMsg=unReadMsgFrom+"***********"+unReadMsg+"***********"+unReadMsgTo;
            storeUnreadMsgJson["whoSent"]=storeUnreadMsg;//json
            var Client =require("mysql").Client;
            var client =new Client();
            client.user="root";
            client.password="5225541a";
            client.query("USE user");
            //check the user's unreadmsg field in db first to check if there is any value in the column
            var queryStringIsValueExist="SELECT * FROM d WHERE falseName="+"'"+unReadMsgTo+"'";
           //console.log(queryStringIsValueExist);
            client.query(queryStringIsValueExist,function(error,result){
                    if(error){
                       throw error;
                    }
                    var checkUnreadMsg=result;
                    if(!checkUnreadMsg[0]){
                      return false;
                    }
                    var r1=checkUnreadMsg[0].unreadimg;
                    //取得第一次查询时unreadmsg字段的值
                    if(!r1){
                        //db中没有这个用户的临时消息
                        var storeUnreadMsgInDb=[];//array
                       
                        storeUnreadMsgInDb.push(JSON.stringify(storeUnreadMsgJson));
                       //console.log(storeUnreadMsgInDb);
                        //创建一个空数组，并且把本次的临时消息存到这个数组中,本次的消息是个json
                         var queryUpdateUnreadMsg="UPDATE d SET unreadimg="+"'"+storeUnreadMsgInDb+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'";
                        //将数组storeUnreadMsgInDb存入字段unreadmsg
                        client.query(queryUpdateUnreadMsg,function(error){
                                if(error){
                                     throw error;
                                }
                                //临时信息在db中存储完毕
                            
                            }
                           //queryUpdateUnreadMsg
                        );
                    }
                    else{
                      //该用户有临时信息没读，这些临时信息存储在数据库里的字段unreadmsg中
                        var currentUnMsg=checkUnreadMsg[0]["unreadimg"];//string
                        //console.log("S2:"+currentUnMsg+"length:"+currentUnMsg.length);
                        var currentUnreadMsgC=currentUnMsg.split(",");//array
                        //console.log("A2"+currentUnreadMsgC);
                        currentUnreadMsgC.push(JSON.stringify(storeUnreadMsgJson));
                        var queryUpdateUnreadMsg2="UPDATE d SET unreadimg="+"'"+currentUnreadMsgC+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'";
                        client.query(queryUpdateUnreadMsg2,function(error){
                                if(error){
                                    throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                            //queryUpdateUnreadMsg
                        );
                        //字段unreadmsg更新完毕,这个时候这个用户的临时消息一定超过一条
                    }
                    //else
                }
            );
            //query for queryStringIsValueExist
        }
    );
   //接受客户端未读取的消息，存在db中，在适当的时候回传，不能存在cookie中，因为有大小限制



socket.on("receiveMsgNotReady",function(data){
            var storeUnreadMsgJson={};
            var whenSent=data.whenSent;//信息是什么时候发的
            var unReadMsgFrom=data.from; //who sent the msg
            var unReadMsg=data.msgDetil; //what is the msg
            var unReadMsgTo=data.account;//msg to whom
            //var storeUnreadMsg=unReadMsgFrom+"?"+unReadMsg+"?"+unReadMsgTo;
            var storeUnreadMsg=unReadMsgFrom+"?"+unReadMsg+"?"+unReadMsgTo+"?"+whenSent;
            storeUnreadMsgJson["whoSent"]=storeUnreadMsg;//json
            var Client =require("mysql").Client;
            var client =new Client();
            client.user="root";
            client.password="5225541a";
            client.query("USE user");
            //check the user's unreadmsg field in db first to check if there is any value in the column
            var queryStringIsValueExist="SELECT * FROM d WHERE account="+"'"+unReadMsgTo+"'";
            client.query(queryStringIsValueExist,function(error,result){
                    if(error){
                       throw error;
                    }
                    var checkUnreadMsg=result;
                    if(!checkUnreadMsg[0]){
                      return false;
                    
                    }
                    var r1=checkUnreadMsg[0].unreadmsg;
                    //取得第一次查询时unreadmsg字段的值
                    if(!r1){
                        //db中没有这个用户的临时消息
                        var  storeUnreadMsgInDb=[];//array
                        storeUnreadMsgInDb.push(JSON.stringify(storeUnreadMsgJson));
                        //创建一个空数组，并且把本次的临时消息存到这个数组中,本次的消息是个json
                         var queryUpdateUnreadMsg="UPDATE d SET unreadmsg="+"'"+storeUnreadMsgInDb+"'"+" WHERE account="+"'"+unReadMsgTo+"'";
                        //将数组storeUnreadMsgInDb存入字段unreadmsg
                        client.query(queryUpdateUnreadMsg,function(error){
                                if(error){
                                     throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                           //queryUpdateUnreadMsg
                        );
                    }
                    else{
                      //该用户有临时信息没读，这些临时信息存储在数据库里的字段unreadmsg中
                        var currentUnMsg=checkUnreadMsg[0]["unreadmsg"];//string
                        var currentUnreadMsgC=currentUnMsg.split(",");//array
                        currentUnreadMsgC.push(JSON.stringify(storeUnreadMsgJson));
                        var queryUpdateUnreadMsg2="UPDATE d SET unreadmsg="+"'"+currentUnreadMsgC+"'"+" WHERE account="+"'"+unReadMsgTo+"'";
                        client.query(queryUpdateUnreadMsg2,function(error){
                                if(error){
                                    throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                            //queryUpdateUnreadMsg
                        );
                        //字段unreadmsg更新完毕,这个时候这个用户的临时消息一定超过一条
                    }
                    //else
                }
            );
            //query for queryStringIsValueExist
        }
    );
   //接受客户端未读取的消息，存在db中，在适当的时候回传，不能存在cookie中，因为有大小限制





    socket.on("sendFalseName",function(data){
        var userLogin=data;
        //用户的昵称
        socket.set("account",userLogin);
        //将用户的昵称存在socket实例中,注意!:即使以后用户刷新页面,这个值也不会变,但是socket.id的值会变!
        var storeEachInput={};
        storeEachInput.f=userLogin;
        storeEachInput.c=socket
        for(var i=0;i<storeSocket.length;i++){
              var eachSocketInfo=storeSocket[i];
              var checkSocketInArray=eachSocketInfo.f;//数组里的值
              if(checkSocketInArray==userLogin){
                  storeSocket.splice(i,1);
                  break;
              }
        }
        storeSocket.push(storeEachInput);
    })




 socket.on("privateChat",function(data){
     //获取前端传进来的数据
     var msgSentTime=data.whenSent;
     var msg=data.eachMsg.msg;
     var toWhom=data.eachMsg.toWhom;
     //信息发给谁
     var fromWhom=data.eachMsg.fromWhom;
     var isUserOnline=checkIsUserOnline(toWhom);
   //这里要判断用户在线还是不在线
     if(isUserOnline){
        for(var i=0;i<storeSocket.length;i++){
         var eachSocketInfo=storeSocket[i];//json
         var getEachUser=eachSocketInfo.f;//string
         if(toWhom==getEachUser){
                   var targetSocket=eachSocketInfo.c;
                   targetSocket.emit("returnPrivateChatting",{from:fromWhom,msgContents:msg,whenSent:msgSentTime});
                   break;
        }
      }
      //for 
     }
     //用户在线
     else{
       var storeUnreadMsgJson={};
         var whenSent=data.whenSent;//信息是什么时候发的  
         var unReadMsgFrom=data.eachMsg.fromWhom; //who sent the msg
         var unReadMsg=data.eachMsg.msg; //what is the msg
         var unReadMsgTo=data.eachMsg.toWhom;//msg to whom
         var storeUnreadMsg=unReadMsgFrom+"?"+unReadMsg+"?"+unReadMsgTo+"?"+whenSent;
         storeUnreadMsgJson["whoSent"]=storeUnreadMsg;//json
         var Client =require("mysql").Client;
         var client =new Client();
         client.user="root";
         client.password="5225541a";
         client.query("USE user");
        //check the user's unreadmsg field in db first to check if there is any value in the column
            var queryStringIsValueExist="SELECT * FROM d WHERE falseName="+"'"+unReadMsgTo+"'";
            client.query(queryStringIsValueExist,function(error,result){
                    if(error){
                       throw error;
                    }
                    var checkUnreadMsg=result;
                    if(!checkUnreadMsg[0]){
                      return false;
                    }
                    var r1=checkUnreadMsg[0].unreadmsg;
                    //取得第一次查询时unreadmsg字段的值
                    if(!r1){
                        //db中没有这个用户的临时消息
                        var  storeUnreadMsgInDb=[];//array
                        storeUnreadMsgInDb.push(JSON.stringify(storeUnreadMsgJson));
                        //创建一个空数组，并且把本次的临时消息存到这个数组中,本次的消息是个json
                         var queryUpdateUnreadMsg="UPDATE d SET unreadmsg="+"'"+storeUnreadMsgInDb+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'";
                        //将数组storeUnreadMsgInDb存入字段unreadmsg
                        client.query(queryUpdateUnreadMsg,function(error){
                                if(error){
                                     throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                           //queryUpdateUnreadMsg
                        );
                    }
                    else{
                      //该用户有临时信息没读，这些临时信息存储在数据库里的字段unreadmsg中
                        var currentUnMsg=checkUnreadMsg[0]["unreadmsg"];//string
                        var currentUnreadMsgC=currentUnMsg.split(",");//array
                        currentUnreadMsgC.push(JSON.stringify(storeUnreadMsgJson));
                        var queryUpdateUnreadMsg2="UPDATE d SET unreadmsg="+"'"+currentUnreadMsgC+"'"+" WHERE falseName="+"'"+unReadMsgTo+"'";
                        client.query(queryUpdateUnreadMsg2,function(error){
                                if(error){
                                    throw error;
                                }
                                //临时信息在db中存储完毕
                            }
                            //queryUpdateUnreadMsg
                        );
                        //字段unreadmsg更新完毕,这个时候这个用户的临时消息一定超过一条
                    }
                    //else
                }
            );
            //query for queryStringIsValueExist
       }
    })
   //privateChat
   
   

   
   
   socket.on("updateNewMsgCounts",function(data){
    var msgTo=data.d;
	var queryString="select msgAsyn from d where falseName='"+msgTo+"'";
	setTimeout(delayQuery,1500);
	//将查询msgAsyn的逻辑设置一定时间的延迟 来保证下面的代码在运行时 msgAsyn字段已经做了更新
	function delayQuery(){
	  var client=prepareDb();
	client.query(queryString,function(error,d){
	   if(error){
	     throw error;
	   }
	  d=eval("("+d[0]["msgAsyn"]+")");  //解析msgAysn字段的格式
	
	  d=d["con"]; //数组,元素是json
	  var newMsgCounts=0; //isTheMsgNew
	  for(var i=0;i<d.length;i++){
	     if(d[i]["isTheMsgNew"]==1){
		   newMsgCounts++;
		 }
	   } 
	  queryString="select account from d where falseName='"+msgTo+"'";
	  client.query(queryString,function(error,d){
	     if(error){
		   throw error;
		 }
         var thisUsername=d[0]["account"];
	     var s=io.sockets.sockets;
	     for(var c in s){
	     var eachS=s[c]; 
		//console.log(eachS.store.data.username);
		 if(eachS.store.data.username==thisUsername){
		    eachS.emit("updateNewMsgTo",{"newMsg":newMsgCounts});
			//client.end();
			//break;
		 }
	   }
	  });
	 });
	}

	
	
	
	
	
	
	
	
	
  });
   
  
      socket.on("disconnect",function(){
      console.log("disconnect!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
   })
  //socket连接中断
   myClosure=checkIsUserOnline;
})



/*==================socket io==========================*/

app.get("/WebstormProjects/web/views/sendImage.ejs",function(req,res){
       res.render("./sendImage.ejs",{title:"sendImage"});    
});


app.get("/WebstormProjects/web/views/learning.ejs",function(req,res){
       res.render("./learning.ejs",{title:"learning"});    
});



app.post("/WebstormProjects/web/views/socketImage.ejs",function(req,res){
    var uploadedTempPath=(req.files)["myFile"]["path"];
    var uploadedImageName=(req.files)["myFile"]["name"];
    var uploadSize=(req.files)["myFile"]["size"];
    //上传的图片临时位置,图片名,图片大小
    var imageSentTo=req.body.whoGotImage;
    var imageSentBy=req.body.whoSentImage;
   //图片发给谁
    uploadedNewPath=__dirname+"/uploads/pic/"+uploadedImageName;//decide the image's new path
    //console.log(uploadedNewPath);
    fs.readFile(uploadedTempPath,function(error,data){
      //read the uploaded image and get the data(A) of the function readFile
        if(error){
         throw error;
        }
        fs.writeFile(uploadedNewPath,data,function(error){
       //write data A into the a new file.This new file's path is set by the varible uploadedNewPath
        if(error){
          throw error;
         }
         res.redirect("/WebstormProjects/web/views/sendImage.ejs");
         var isUserOnline=myClosure(imageSentTo);
         //服务器转发图片:这里要判断目标用户是否在线
         if(isUserOnline){
           sendSocketImage(req,res,imageSentTo,imageSentBy);
           //目标用户在线
         }
         else{
           sendOffLineSocketImage(req,res,imageSentTo,imageSentBy);
          //目标用户离线
         }
        });

    });
});
//socket聊天图片逻辑



/*=================我的佳缘===============*/

app.post("/WebstormProjects/web/views/imagePreview.ejs",function(req,res){
  var img=req.files;
  res.redirect("/WebstormProjects/web/views/sendImage.ejs");
});



app.get("/WebstormProjects/web/views/checkOffLineMsg.ejs",function(req,res){
    var userFalseName=req.query.userFalseName;
    //谁登录
     var Client =require("mysql").Client;
     var client =new Client();
     client.user="root";
     client.password="5225541a";
     client.query("USE user");
     var queryStringIsValueExist="SELECT * FROM d WHERE falseName="+"'"+userFalseName+"'";
     client.query(queryStringIsValueExist,function(error,result){
      if(error){
        throw error;
      }
      var checkUnreadMsg=result;
                    if(!checkUnreadMsg[0]){
                      return false;
                    }
                    var r1=checkUnreadMsg[0].unreadmsg;
                    //取得第一次查询时unreadmsg字段的值
                    if(!r1){
                        //db中没有这个用户的离线消息
                     res.send("");
                    }
                    else{
                      //该用户有临时信息没读，这些临时信息存储在数据库里的字段unreadmsg中
                        var currentUnMsg=checkUnreadMsg[0]["unreadmsg"];//string
                        res.send(currentUnMsg);
                       
                    }

    });
     //query
});



app.get("/WebstormProjects/web/views/searchLove.ejs",function(req,res){
   var Client =require("mysql").Client;
   var client =new Client();
   client.user="root";
   client.password="5225541a";
   client.query("USE user");
   //准备数据库
  var isSimpleSearch=req.query.simpleSearch;
  //这个变量用于判断是否是复杂搜索,值为1表示简单搜索,值为0表示复杂搜索
  if(isSimpleSearch==1){
   var searchResult=null;
   var searchCondition=null;
   var searchGender=req.query.searchGender;
   if(searchGender=="女朋友"){
     searchGender="女性";
   }
   else{
     searchGender="男性";
   }
   var searchAge=req.query.searchAge1;
   var searchAge2=req.query.searchAge2;
   var searchAgeRange=searchAge+" "+"-"+" "+searchAge2+"岁";
   var searchLocation=req.query.searchLocation+req.query.searchLocation2;
   var pic="";
   var isPicRequired=req.query.hasPic;
   
   //console.log(isPicRequired);
   
   if(isPicRequired){
      pic="有照片";
   }
   else{
      pic="无照片";
   }
   //searchGender,searchAgeRange,searchLocation,pic这几个变量用于提示字符串供用户浏览,接下来还要几个变量供数据库查询使用,这
   //几个变量应该在searchGender,searchAgeRange,searchLocation,pic的基础上生成
   if(searchGender=="女性"){
    var searchGenderQuery="女";
   }
   else{
    var searchGenderQuery="男";
   }
   searchGenderQuery=searchGenderQuery;
   searchYearQuery1=(new Date().getFullYear())-searchAge;
   searchYearQuery2=(new Date().getFullYear())-searchAge2;
   //搜索目标的年龄必须大于等于searchYearQuery1且小于等于searchYearQuery2
   searchProvinceQuery=req.query.searchLocation;
   searchCityQuery=req.query.searchLocation2;
   var searchHasPictureQuery;
   if(pic=="有照片"){
     searchHasPictureQuery="not null";
   }
   else{
     searchHasPictureQuery="null";
   }

   var queryStringJson={
      searchGenderQuery:searchGenderQuery,
      searchYearQuery1:searchYearQuery1,
      searchYearQuery2:searchYearQuery2,
      searchProvinceQuery:searchProvinceQuery,
      searchCityQuery:searchCityQuery,
      searchHasPictureQuery:searchHasPictureQuery
   }
   
  // console.log(queryStringJson);
   
   var loverQuery=searchLoverQuery(1,queryStringJson);
   
  // console.log(loverQuery);
   //console.log("!!!!!!!");
   
   client.query(loverQuery,function(error,result){
      if(error){
        throw error;
      }
 
    client.end();
    //搜索结果
    res.render("searchLove.ejs",{"title":"找二奶","searchConditionGender":searchGender,"searchConditionAgeRange":searchAgeRange,
                                 "searchConditionLocation":searchLocation,"searchConditionIfHasPic":pic,"searchContents":JSON.stringify(result)});
   });
  }
  //if 
});




function searchLoverQuery(searchType,o){
    if(searchType==1){
      //简单搜索,简单搜索只和gender,avatar,pLocation,cLocation,birthYear这几个字段
      var searchGenderQuery=o.searchGenderQuery;
      var searchYearQuery1=o.searchYearQuery1;
      var searchYearQuery2=o.searchYearQuery2;
      var searchProvinceQuery=o.searchProvinceQuery;
      var searchCityQuery=o.searchCityQuery;
      var searchHasPictureQuery=o.searchHasPictureQuery;
      if(searchCityQuery=="任意"&&searchProvinceQuery!="任意"){
       if(searchHasPictureQuery=="not null"){
          //有照片
         var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+"AND pLocation='"+searchProvinceQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'"+" AND avatar is not null";
       }
       else{
         var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+"AND pLocation='"+searchProvinceQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'";
       }
      }
     else if(searchProvinceQuery=="任意"&&searchCityQuery=="任意"){
       if(searchHasPictureQuery=="not null"){
         var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'"+" AND avatar is not null";
       }
       else{
         var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'";
       }
     }
      else{
      if(searchHasPictureQuery=="not null"){
        var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+"AND pLocation='"+searchProvinceQuery+"'"+" AND cLocation='"+searchCityQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'"+" AND avatar is not null";
      }
      else{
        var searchLoverQuery="SELECT * FROM d WHERE gender='"+searchGenderQuery+"'"+"AND pLocation='"+searchProvinceQuery+"'"+" AND cLocation='"+searchCityQuery+"'"+" AND birthYear>="+searchYearQuery2+"&&birthYear<='"+searchYearQuery1+"'";
      }
     }
      return searchLoverQuery; 
    }
    //if 
}




app.get("/WebstormProjects/web/views/advancedSearch.ejs",function(req,res){
  res.render("advancedSearch.ejs",{"title":"高级搜索"});
});

app.post("/WebstormProjects/web/views/deletSynMsg.ejs",function(req,res){
        var storeNewMsgArray=[];
        var data=req.body;//json
        var dataArray=data["con"];//array

        //从前端接受的数据,类型为数组
        var targetUser=dataArray[0]["targetUser"];//在谁的页面上删除信息(帐号)
        //从前端接受数据
        var Client =require("mysql").Client;
        var client =new Client();
        client.user="root";
        client.password="5225541a";
        client.query("USE user");
        //准备数据库
        var queryString1="SELECT * FROM d WHERE account='"+targetUser+"'";
        client.query(queryString1,function(err,data){
              if(err){
               throw err;
              }
              //data is an array from db       
              var dataProcessed0=eval("("+ data[0].msgAsyn+")");//json
              var dataProcessed1=dataProcessed0['con'];//array
              //dataProcessed1 is the output from db
              for(var i=0;i<dataProcessed1.length;i++){
                 var checkMsgSentBy=dataProcessed1[i].fromFalseName;//信息是由谁发的(昵称)(db)
                 var checkMsgContent=dataProcessed1[i].data;//信息体(db)
                 for(var z=0;z<dataArray.length;z++){
                  var deleteWhoseMsg=dataArray[z]["deleteWhoseMsg"];//删除谁发的信息(昵称) 
                  var msgToBeDeleted=dataArray[z]["msgToBeDelete"];//要删除信息的内容
                    if(checkMsgSentBy==deleteWhoseMsg&&checkMsgContent==msgToBeDeleted){
                       delete dataProcessed1[i]; 
                    }
                 }
                 //inner for              
              }
              //outer for
              var storeFinalArray=[];
              for(var ii=0;ii<dataProcessed1.length;ii++){
                 if(dataProcessed1[ii]){
                    storeFinalArray.push(dataProcessed1[ii]);                 
                 }
              }
              //storeFinalArray 是最后删除数据后保留的数据
              dataProcessed0.con=storeFinalArray;
              var dataProcessed0Processed=JSON.stringify(dataProcessed0);//string
              var queryString2="UPDATE d SET msgAsyn='"+dataProcessed0Processed+"' WHERE account='"+targetUser+"'";
              client.query(queryString2,function(err){
                 if(err){
                   throw err;
                 }
                 client.end(); 
              });
        });    
          res.send();
})
//删除收件箱信息



app.post("/WebstormProjects/web/views/changeNewMsgToOld.ejs",function(req,res){
        var data=req.body;//json
        var dataArray=data["con"];//array
        var user=dataArray["user"];
        var msgContent=dataArray["msgContent"];
        var whoSent=dataArray["whoSent"];
        var Client =require("mysql").Client;
        client =new Client();
        client.user="root";
        client.password="5225541a";
        client.query("USE user");
        //准备数据库
        var queryString="SELECT * FROM d WHERE account='"+user+"'";
        client.query(queryString,function(error,data){
           if(error){
             throw error;
           }
           var dataProcessed0=eval("("+ data[0].msgAsyn+")");//json
           var dataProcessed1=dataProcessed0['con'];//array
           //dataProcessed1 is the output from db
            for(var i=0;i<dataProcessed1.length;i++){
               if(dataProcessed1[i]["fromFalseName"]===whoSent&&dataProcessed1[i]["data"]===msgContent){
                    dataProcessed1[i]["isTheMsgNew"]=0;
               }
            }
            //for
              dataProcessed0.con=dataProcessed1;
              var dataProcessed0Processed=JSON.stringify(dataProcessed0);//string
              var queryString2="UPDATE d SET msgAsyn='"+dataProcessed0Processed+"' WHERE account='"+user+"'";
              client.query(queryString2,function(error){
                   if(error){
                      throw error;
                   }
                 client.end();
              });
        });
        //query
});










app.get("/WebstormProjects/web/views/forum.ejs",function(req,res){
    res.render("./forum.ejs",{title:"速配论坛"});
})
app.get("/WebstormProjects/web/views/forum1.ejs",function(req,res){
    res.render("./forum1.ejs",{title:"白领一族"});
})



app.get("/WebstormProjects/web/views/posts.ejs",function(req,res){
    res.render("./posts.ejs",{title:"发帖"});
})



app.post("/WebstormProjects/web/views/posts.ejs",function(req,res){
    var postTitle=req.body.postTitle;
    var postBody=req.body.postContent;

    
})



app.get("/WebstormProjects/web/views/userDetails.ejs",function(req,res){
    var data=req.query.check;
    var Client =require("mysql").Client;
    var client =new Client();
    client.user="root";
    client.password="5225541a";
    client.query("USE user");
    var queryString="SELECT * FROM d WHERE account='"+data+"'";
    client.query(queryString,function(error,result){
            if(error){
             throw error;
            }
          var dataProcessed= JSON.stringify(result[0]);

        client.end();
        res.render("./checkDetail.ejs",{storeData:dataProcessed,title:"查看详细"});
        } );
});
//用户查看其它用户的详细资料



app.get("/WebstormProjects/web/views/initAjax.ejs",function(req,res){
      var Client =require("mysql").Client;
      var client =new Client();
      client.user="root";
      client.password="5225541a";
      client.query("USE user");
      var getQueryType=req.query;//json
      var account=getQueryType["account"];
      var queryType=getQueryType["queryType"];
      if(queryType=="unreadBoxMsg"){
       //读取收件箱的未读信息
        var queryString="select * from d where account='"+account+"'";
          client.query(queryString,function(error,result){
               if(error){
                      throw error;
               }
              if(result[0]["msgAsyn"]){
                  var resultP1= eval("("+result[0]["msgAsyn"]+")");
                  if(resultP1){
                      var resultP2=resultP1["con"];//array
                      var newMsgLength=[];//这个数组存储未读消息，下面会计算它的长度
                     // var unreadBoxMsgLength=resultP2.length;
                      for(var i=0;i<resultP2.length;i++){
                         if(resultP2[i]["isTheMsgNew"]==="1"){
                             newMsgLength.push(resultP2[i]);
                         }
                      }
                      var unreadBoxMsgLength=newMsgLength.length;
                  }
                  else{
                      var unreadBoxMsgLength="";
                  }
              }
            client.end();
            res.send({"unreadBoxMsgLength":unreadBoxMsgLength});
          });
      }
});




app.get("/WebstormProjects/web/views/userPhotoes.ejs",routes.edit);
app.get("/WebstormProjects/web/views/register.ejs",routes.register);
app.post("/WebstormProjects/web/views/register.ejs",routes.registerPost);
app.get("/WebstormProjects/web/views/index.ejs",routes.index);
app.post("/WebstormProjects/web/views/index.ejs",routes.indexPost);
app.get("/WebstormProjects/web/views/signOut.ejs",routes.signOut);
app.get("/WebstormProjects/web/views/edit1.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit1.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/edit2.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit2.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/edit3.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit3.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/edit4.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit4.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/edit5.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit5.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/edit6.ejs",routes.edit);
app.post("/WebstormProjects/web/views/edit6.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/editBasic1.ejs",routes.edit);
app.post("/WebstormProjects/web/views/editBasic1.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/editPic.ejs",routes.edit);
app.post("/WebstormProjects/web/views/editPic.ejs",routes.editPost);
app.get("/WebstormProjects/web/views/picResult.ejs",routes.edit);
app.get("/WebstormProjects/web/views/ajax.ejs",routes.ajaxQuery);
app.post("/WebstormProjects/web/views/ajaxPost.ejs",routes.ajaxQueryPost);
app.get("/WebstormProjects/web/views/ajaxShowUserPic.ejs",routes.ajaxShowUserPic);
app.post("/WebstormProjects/web/views/homePageHelp.ejs",routes.homePageHelp);
app.get("/WebstormProjects/web/views/editProfile.ejs",routes.editProfile);
app.get("/WebstormProjects/web/views/404.ejs",routes.errorPage);
app.post("/WebstormProjects/web/views/checkProfile",routes.checkProfile);
app.post("/WebstormProjects/web/views/updateProfile",routes.updateProfile);
app.post("/WebstormProjects/web/views/deletePic",routes.deletePic);
app.post("/WebstormProjects/web/views/checkSentMsg",routes.checkSentMsgs);
app.post("/WebstormProjects/web/views/fetchReadProfile",routes.fetchReadProfile);
app.post("/WebstormProjects/web/views/updateProfileLink",routes.updateProfileLink);
app.get("/WebstormProjects/web/views/me.ejs",routes.me);
app.get("/WebstormProjects/web/views/matchCondition.ejs",routes.matchCondition);
app.post("/WebstormProjects/web/views/matchConditionPost",routes.matchConditionPost);
app.post("/WebstormProjects/web/views/fetchCondtion",routes.fetchCondtion);
app.post("/WebstormProjects/web/views/fetchDailyMatch",routes.fetchDailyMatch);
app.post("/WebstormProjects/web/views/countNewMsg",routes.countNewMsg);



app.get("/WebstormProjects/web/views/anguarJsTest.ejs",function(req,res){
res.render("./anguarJsTest.ejs",{"title":"anguarJsTest"});
});

app.get("/WebstormProjects/web/views/Angular/index.ejs",function(req,res){
res.render("./Angular/index.ejs",{"title":"anguarJsTest"});
});





/*added on 2013/11/5*/




app.get("/WebstormProjects/web/views/save.ejs",function(req,res){
 console.log("receiveGet!!!!!!!!!!!!!!!!!!");
 console.log(req);
});

app.get("/WebstormProjects/web/views/backbone.ejs",function(req,res){
 var name=req.query.msM;
 if(name=="msMar"){
    res.send({name:"carlo"});
 }
 else{
    res.send(1);
 }
});


app.post("/WebstormProjects/web/views/save.ejs",function(req,res){
 console.log("receive!!!!!!!!!!!!!!!!!!");
 console.log(req.body.name);
 console.log(req.body.age);
});



/*added on 2013/11/5*/





app.get("/WebstormProjects/web/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
        res.sendfile("./uploads/pic/"+username+"/"+pic);
});
app.get("/WebstormProjects/web/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
        res.sendfile("./web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/WebstormProjects/web/uploads/postPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
        res.sendfile("./web/uploads/postPic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/WebstormProjects/web/uploads/postPicPreview/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
        res.sendfile("./web/uploads/postPicPreview/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/WebstormProjects/web/uploads/subPostPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
        res.sendfile("./web/uploads/subPostPic/"+username+"/"+pic);
});
//上传的图片的路由









/*=================我的佳缘===============*/
/*=================爱情搜索================*/
app.get("/WebstormProjects/web/views/search.ejs",routes.search);




/**************************************learning****************************/




app.get("/Users/toshiba/WebstormProjects/web/views/backboneJSTest.ejs",function(req,res){
res.render("./backboneJSTest.ejs",{"title":"backboneJsTest"});
});

app.get("/WebstormProjects/web/views/backboneJSTest.ejs",function(req,res){
res.render("copy/home111.ejs",{"title":"backboneJsTest"});
});



app.get("/",function(req,res){
 console.log(__dirname);
 console.log(__filename);
 res.render("home.ejs",{"title":"searchLover"});

 //res.render("./homeTest.ejs",{"title":"searchLover"});
 //res.render("/views/home.ejs",{"title":"searchLover"});
 //res.render("./copy/homeTest.ejs",{"title":"searchLover"});
 //res.render("/homeTest.ejs",{"title":"searchLover"});
 //res.render("/homeTest",{"title":"searchLover2"});
});


app.get("/test",function(req,res){
 //console.log(__dirname);
 //console.log(__filename);
  res.render("./404.ejs",{"title":"searchLover"}); 


});




app.get("/products",function(req,res){
  res.send({ 
  item: [
      {tite:"A",des:"aa",price:1},
	  {tite:"B",des:"bb",price:2},
	  {tite:"C",des:"cc",price:3}
    ]
  
  });
  
  
  
});



app.post("/",function(req,res){
 var data=req.body.myData;
 res.send(data);
});


app.get("/user/:uid",function(req,res){
var thisUid=req.params.uid;
res.render("./user.ejs",{"title":"test","id":thisUid});



});



app.get("/about",function(req,res){
 res.send("about router!");
});







/*=================爱情搜索================*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

app.post("/WebstormProjects/web/views/advancedSearch.ejs",function(req,res){
    var data=req.body.d;
    var gender=data.gender;
    var ageFrom=data.ageFrom;
    var ageTo=data.ageTo;
    var area1=data.area1;
    var area2=data.area2;
    var area=area1+" "+area2;
    var height1=data.height1;
    var height2=data.height2;
    var education=data.education;
    var profession=data.profession; 
    var marrigeStatus=data.marrigeStatus;
	var ifHasChildren=data.ifHasChildren;
    var monthIncome=data.monthIncome;
    var housing=data.housing;
	var ifHasCar=data.ifHasCar;
    var race=data.race;
    var xz=data.xz;
    var sx=data.sx;
    var bloodType=data.bloodType;
    var ifSmoking=data.ifSmoking;
    var ifDrinking=data.ifdrinking;
	var ifHasPic=data.ifHasPic;
    //ifHasPic==0没照片ifHasPic==1有照片
    var queryString="select * from d where gender='"+gender+"'";
    if(ageFrom==ageTo){
        queryString=queryString+" and age="+ageFrom;
    }
    else{
         queryString=queryString+" and age between "+ageFrom+" and "+ageTo;
    }
    if(height1==height2){
        queryString=queryString+" and intHeight="+height1;
    }
    else{
        queryString=queryString+" and intHeight between "+height1+" and "+height2;
    }
    if(education!="不限"&&education=="小学及以上"){
        queryString=queryString+" and intEducation>=0";
    }
	else if(education!="不限"&&education=="初中及以上"){
        queryString=queryString+" and intEducation>=1";
    }
    else if(education!="不限"&&education=="高中及以上"){
        queryString=queryString+" and intEducation>=2";
    }
    else if(education!="不限"&&education=="大专及以上"){
        queryString=queryString+" and intEducation>=3";
    }
    else if(education!="不限"&&education=="本科及以上"){
        queryString=queryString+" and intEducation>=4";
    }
    else if(education!="不限"&&education=="硕士及以上"){
        queryString=queryString+" and intEducation>=5";
    }
    else if(education!="不限"&&education=="博士及以上"){
        queryString=queryString+" and intEducation=6";
    }
    if(marrigeStatus!="不限"){
        queryString=queryString+" and marriageStatus='"+marrigeStatus+"'";
    }
    if(monthIncome!="不限"){
        queryString=queryString+" and monthincome='"+monthIncome+"'";
    }
    if(housing!="不限"){
        queryString=queryString+" and housingcondition='"+housing+"'";
    }
    if(race!="不限"){
        queryString=queryString+" and race='"+race+"'";
    }
    if(xz!="不限"){
        queryString=queryString+" and sign='"+xz+"'";
    }
    if(sx!="不限"){
        queryString=queryString+" and horoscope='"+sx+"'";
    }

    if(bloodType!="不限"){
        queryString=queryString+" and bloodType='"+bloodType+"'";
    }
    if(ifSmoking!="不限"){
        queryString=queryString+" and ifSmoking='"+ifSmoking+"'";
    }
    if(ifDrinking!="不限"){
        queryString=queryString+" and ifDrinking='"+ifDrinking+"'";
    }
    if(area1!="任意"){
       if(area2=="任意"){
           queryString=queryString+" and province like '"+area1+"%'";
       }
        else{
           queryString=queryString+" and province like '"+area1+" "+area2+"%'";
       }
    }
	 if(ifHasChildren!=="不限"){
	  queryString=queryString+" and ifhaschildren='"+ifHasChildren+"'";
	 }
	 if(profession!=="不限"){
	  queryString=queryString+" and jobinfo1='"+profession+"'";
	 }
	if(ifHasPic==1){
	  queryString=queryString+" and avatar is not null";
	}
    var data=req.query.check; //这个值的作用是什么?
    var Client =require("mysql").Client;
    var client =new Client();
    client.user="root";
    client.password="5225541a";
    client.query("USE user");
	
	console.log(queryString);
	
    client.query(queryString,function(e,r){
        if(e){
           throw e;
        }
		
		//console.log(r);
		
		if(r.length>0){
			var storeAccountName=[];
	      for(var i=0;i<r.length;i++){
	      storeAccountName.push(r[i]["account"]);
	    }
		
		//console.log(storeAccountName);
		
		
		if(storeAccountName.length==1){
		  var accountStr="('"+storeAccountName.join()+"')";
		}
		else if(storeAccountName.length>1){
		   var str="";
		   for(var i=0;i<storeAccountName.length;i++){
		       str+="'"+storeAccountName[i]+"'";
		       if(i!=storeAccountName.length-1){
			     str+=",";
			   }
		   }
		   str="("+str;
		   str=str+")";
		   var accountStr=str;
		}
		
		//console.log(accountStr);
		
		queryString="select level from credits where username in "+accountStr;
		 // console.log(queryString);
		client.query(queryString,function(e,d){
		  if(e){
		    throw e;
		  }
		   // console.log(d);
			//console.log(r);
		   //将level字段的值整合到从表d 查询出来的数组中
		   for(var i=0;i<d.length;i++){
		      var level=d[i]["level"];
		      r[i]["level"]=level;
		   }
		   
		    res.send(r);
		});
			
	  }
	
	      
		
		
		
		
		else{
			
			 res.send(r);
		}
		
		
   
    });
});
//高级搜索(基本完成)











app.post("/WebstormProjects/web/views/displayWhoOnline.ejs",function(req,res){
   var whoIsOnline=req.body.d;
   if(whoIsOnline){
     var whoIsOnlineArray=JSON.parse(whoIsOnline);
     loopQuery(whoIsOnlineArray,res);//json,包含目前在线用户的信息,但是不包含图片
   }
   else{
    throw new Error("没传值过来");
   }
});



function loopQuery(collection,res){
 if(collection){
  var client=prepareDb();
  var storeNew=[];
  var indexFlag=0;
  thisQuery();
  function thisQuery(){
      if(indexFlag==collection.length){
	   loopImg(collection,storeNew);
	    //res.send(storeNew);
	  }
      if(collection[indexFlag]){
	     var queryString="select * from d where account='"+collection[indexFlag]+"'";
	     client.query(queryString,function(e,d){
		    if(e){
			 throw e;
			}
	      var storeEachOnline={};
	      var falseName=d[0]["falseName"];
	      var xinzuo=d[0]["sign"];
	      storeEachOnline["falseName"]=falseName;
	      storeEachOnline["xinzuo"]=xinzuo;
		  storeNew.push(storeEachOnline);
		  indexFlag++;
		  thisQuery();
		 });
	  }
  }
  
  function loopImg(o,existingArray){
    for(var i=0;i<o.length;i++){
	   var picUrl="./web/uploads/pic/"+o[i];
	   var ifIconExists=fs.existsSync(picUrl);
	   if(ifIconExists){
	      var picArray=fs.readdirSync("./web/uploads/pic/"+o[i]);
		  var picArray=picArray[0];
		  existingArray[i]["pic"]="../uploads/pic/"+o[i]+"/"+picArray;
	   }
	   else{
	    console.log("A");
	    existingArray[i]["pic"]="../uploads/pic/default/unknown.png"
	   }
	}
    res.send(existingArray);
  }
 }
}









/*
function loopQuery(collection){
    console.log(collection);
	console.log("BBBBBBBBBBBBBBBBBBBBBBB");
    console.log(loopIndex);
    if(loopIndex==collection.length){
	 console.log(storeNew);
     console.log("!!!!!!!!!!!!!!");
	  return false;
	}
	if(collection){
    var client=prepareDb();
	if(collection[loopIndex]){
	  var queryString="select * from d where account='"+collection[loopIndex]+"'";
	client.query(queryString,function(e,d){
	  if(e){
	    throw e;
	  }
	 //d is Array
	 var storeEachOnline={};
	 var falseName=d[0]["falseName"];
	 var xinzuo=d[0]["sign"];
	 storeEachOnline["falseName"]=falseName;
	 storeEachOnline["xinzuo"]=xinzuo;
	 storeNew.push(storeEachOnline);
	 loopIndex++;
     loopQuery(collection);
	 });
	}
  }
}
*/





/*=======================主页相关=============================*/



/*=======================论坛=============================*/
app.get("/WebstormProjects/web/views/postPicPreview.ejs",function(req,res){
  res.render("postPicPreview.ejs",{"title":"","picFlag":""});
});
app.get("/WebstormProjects/web/views/forum.ejs",function(req,res){
  res.render("forum.ejs",{"title":"论坛"});
});
app.get("/WebstormProjects/web/views/whiteCollar.ejs",function(req,res){
  res.render("whiteCollar.ejs",{"title":"白领交友","postImgWarning":"","postImgWarningFlag":"0"});
});

app.post("/WebstormProjects/web/views/postDetailImg.ejs",routes.forumPostImage);
app.post("/WebstormProjects/web/views/postPicPreview.ejs",routes.displayPostPicPreview);




app.post("/WebstormProjects/web/views/submitPreviewPic.ejs",function(req,res){
  var submitText=JSON.parse(req.body.replyTextDetail);
  var postContents=req.body.postContents;
  var username=submitText["replayByWhom"];
  var url=submitText["url"];
  var time=submitText["timeAx"];
  //var replyContents=submitText["replayContents"];//主贴内容
  var pid=submitText["id"];
  var picStore=req.files;
  var picStoreString=JSON.stringify(picStore);
  for(var i2 in picStore){
    var size=picStore[i2]["size"];
	if(!size){
	 continue;
	}
    var tepPicUrl=picStore[i2]["path"];//图片临时路径
	var submitPicName=picStore[i2].name;//图片名
	if(!(fs.existsSync("./web/uploads/subPostPic/"+username+"_"+time))){
	  //文件夹不存在
	  fs.mkdirSync("./web/uploads/subPostPic/"+username+"_"+time,0755);
	  fs.renameSync(tepPicUrl,"./web/uploads/subPostPic/"+username+"_"+time+"/"+submitPicName);  
	}
	else{
	  fs.renameSync(tepPicUrl,"./web/uploads/subPostPic/"+username+"_"+time+"/"+submitPicName); 
	}
  }//for
  res.redirect(url)
})



app.get("/WebstormProjects/web/views/postDetail.ejs",function(req,res){
  var pid=req.query.pid;
  var ifHasPic=req.query.pic;
  if(ifHasPic==1){
  //主贴带有图片
  var imgFlag=req.query.imgFlag;//主帖可能带有的图片所在的文件夹
  var imgFlagUrl="./web/uploads/postPic/"+imgFlag;  
  fs.readdir(imgFlagUrl,function(e,files){
    if(e){
	 throw e;
	}
	if(files.length==1){
	var postImg="../uploads/postPic/"+imgFlag+"/"+files[0];
    var client=prepareDb();
    var queryString="select * from `post` where id='"+pid+"'";//唯一
    client.query(queryString,function(error,r){
     if(error){
	   throw error;
	 }
	 var contents=r[0]["contents"];
	 var postTitle=(contents.substring(0,12))+"...";//title of post
	 //var byWhom=r[0]["byWhom"];//不显示发帖人的帐号，显示昵称
	 var byWhomeFalseName=r[0]["falseName"];
	 var time=r[0]["time"];
	 res.render("postDetail.ejs",{"contents":contents,"byWhom":byWhomeFalseName,"title":"postTitle","time":time,"imgUrl":postImg,"multiPicFlag":"","imgFlag":""});
	 client.end();
     });
	}
	else{
	  //files是个数组
	  var storeImgName=files//array;
	  var storeImgNameString=JSON.stringify(storeImgName);
	  var client=prepareDb();
	  var queryString="select * from `post` where id='"+pid+"'";//唯一
	  client.query(queryString,function(error,r){
      if(error){
	   throw error;
	 }
	 var contents=r[0]["contents"];
	 var postTitle=(contents.substring(0,12))+"...";//title of post
	 //var byWhom=r[0]["byWhom"];//不显示发帖人的帐号，显示昵称
	 var byWhomeFalseName=r[0]["falseName"];
	 var time=r[0]["time"];
	 res.render("postDetail.ejs",{"contents":contents,"byWhom":byWhomeFalseName,"title":"postTitle","time":time,"imgUrl":"","multiPicFlag":storeImgNameString,"imgFlag":imgFlag});
	 client.end();
    });
	}
   });
  }
  else{
    //主贴没有图片
	var client=prepareDb();
    var queryString="select * from `post` where id='"+pid+"'";//唯一
    client.query(queryString,function(error,r){
     if(error){
	   throw error;
	 }
	 var contents=r[0]["contents"];
	 var postTitle=(contents.substring(0,12))+"...";//title of post
	 //var byWhom=r[0]["byWhom"];//不显示发帖人的帐号，显示昵称
	 var byWhomeFalseName=r[0]["falseName"];
	 var time=r[0]["time"];
	 res.render("postDetail.ejs",{"contents":contents,"byWhom":byWhomeFalseName,"title":"postTitle","time":time,"imgUrl":"",multiPicFlag:"","imgFlag":""});
	 client.end();
     });
  }
});


app.post("/WebstormProjects/web/views/getReplyPics.ejs",function(req,res){
  var time=req.body.storeInfo; //储存每个回帖的数组
  var storeAllPics=[];
  for(var i=0;i<time.length;i++){
    var storeEach={};
    var postTime=time[i]["time"];
	var postBy=time[i]["by"];
	var imgFolderName=postBy+"_"+postTime;
	if(fs.existsSync("./web/uploads/subPostPic/"+imgFolderName)){
	  var postPics=fs.readdirSync("./web/uploads/subPostPic/"+imgFolderName);
	  storeEach["by"]=imgFolderName;
	  storeEach["pic"]=postPics;
	  storeAllPics.push(storeEach);
	}
	else{
	  storeEach["by"]=imgFolderName;
	  storeEach["pic"]=false;
	  storeAllPics.push(storeEach);
	}
  }
  res.send(storeAllPics);
});



app.post("/WebstormProjects/web/views/postDetail.ejs",function(req,res){
 var checkRequest=req.body.requestType;
 if(checkRequest==2){
   //返回当前主贴和所有回复
 var pid=req.body.pid;
 var client=prepareDb();
 var queryString="select * from post where id="+pid;
 client.query(queryString,function(error,r){
    if(error){
	  throw error;
	}
    if(!(r[0]["reply"])){ 
	 res.send(null);
	 client.end();
	}
	else{
	 var allReplies=JSON.parse(r[0]["reply"]); //array
	 res.send(allReplies);
	 client.end();
	 }
    });
 }
 else{
 var replayContents=req.body.replayContents;
 var replayByWhom=req.body.replayByWhom;//帐号
 var replayByWhomFalseName=req.body.falseName//昵称
 var postId=req.body.id;
 var replayTime=req.body.time;
 var replyTimeAx=req.body.timeAx;
 var storeEachReply={};
 storeEachReply["w"]=replayByWhom;//replay by whom
 storeEachReply["f"]=replayByWhomFalseName//昵称
 storeEachReply["c"]=replayContents//replay contents
 storeEachReply["t"]=replayTime//replay time
 storeEachReply["tx"]=replyTimeAx//时间轴
 storeEachReply["subReply"]=false;//子回复
 //all values are ok here!
 var Client=require("mysql").Client;
 var client=new Client();
 client.user="root";
 client.password="5225541a";
 client.query("USE user");
 var queryString="select * from `post` where `id`="+postId;
 client.query(queryString,function(error,r){
     if(error){
	  throw error;
	 } 
    var currentReplay=r[0]["reply"];
	if(!currentReplay){
	  //there are no replies for this post
	  var storeAllReplies=[];
	  storeAllReplies.push(storeEachReply);//array
	  var storeAllRepliesString=JSON.stringify(storeAllReplies)//string
	  var queryInert="update post set reply='"+storeAllRepliesString+"'"+"where id="+postId; 
	  //This is important:to store an array or a json in db, it is needed that the array or json must be changed into a string first
	  //use method JSON.stringify
     var Client=require("mysql").Client;
     var client=new Client();
     client.user="root";
     client.password="5225541a";
     client.query("USE user");
	 client.query(queryInert,function(error,r){
	    if(error){
		  throw error;
		}
	  //store reply success here
	  res.send("1");
      client.end();
	  });
	 //query1
	 var queryString2="select * from sp where id='"+postId+"'";
	 var client2=new Client();
     client2.user="root";
     client2.password="5225541a";
     client2.query("USE user");
	 client2.query(queryString2,function(error,r){
	    if(error){
		  throw error;
		}
		var currentSubRep=r[0]["subRep"];
		if(!currentSubRep){
		  //当前这个主贴没有子回复
		  var storeAllSubRep=[];
		  storeAllSubRep.push(replayContents);
		  var storeAllSubRepString=JSON.stringify(storeAllSubRep);
		  var queryString2="update sp set subRep='"+storeAllSubRepString+"'"+"where id='"+postId+"'";
		  client2.query(queryString2,function(e,r){
		    if(e){
			  throw e;
			}
		  });
		}
		else{
		//当前这个主贴有子回复
		  return false;
		}
	  });
	}
	else{
	  //这个帖子目前有回复
	  var currentReplay=r[0]["reply"];
	  var currentReplayArray=JSON.parse(currentReplay);
	  currentReplayArray.push(storeEachReply);
	  var currentReplayString=JSON.stringify(currentReplayArray);
	  var Client=require("mysql").Client;
      var client=new Client();
      client.user="root";
      client.password="5225541a";
      client.query("USE user");
	  var queryInert="update post set reply='"+currentReplayString+"'"+"where id="+postId;
	  client.query(queryInert,function(error,r){
	    if(error){
		  throw error;
		}
	    //store reply success here
	    res.send("1");
        client.end();
	  });
	  //逻辑1
	 var queryString2="select * from sp where id='"+postId+"'";
	 var client2=new Client();
     client2.user="root";
     client2.password="5225541a";
     client2.query("USE user");
	 client2.query(queryString2,function(error,r){
	    if(error){
		  throw error;
		}
		var currentSubRep=r[0]["subRep"];
		if(!currentSubRep){
		  //当前这个主贴没有子回复
		  var storeAllSubRep=[];
		  storeAllSubRep.push(replayContents);
		  var storeAllSubRepString=JSON.stringify(storeAllSubRep);
		  var queryString2="update sp set subRep='"+storeAllSubRepString+"'"+"where id='"+postId+"'";
		  client2.query(queryString2,function(e,r){
		    if(e){
			  throw e;
			}
			res.send("1");//added 2013-7-3
			client.end(); //added 2013-7-3
		  });
		}
		else{
		//当前这个主贴有子回复
		var currentSubRepArray=JSON.parse(currentSubRep);
		currentSubRepArray.push(replayContents);
		var currentSubRepString=JSON.stringify(currentSubRepArray);
		var queryString2="update sp set subRep='"+currentSubRepString+"'"+"where id='"+postId+"'";
		client2.query(queryString2,function(e,r){
		    if(e){
			  throw e;
			}
			res.send("1"); //added 2013-7-3
			client.end();  //added 2013-7-3
		  });
		}
	 
	 });
	 //回复子贴逻辑2
	}
  });
 }
})




app.post("/WebstormProjects/web/views/savePost.ejs",function(req,res){
   var title=req.body.title;
   var contents=req.body.contents;
   var time=req.body.time;
   var byWhom=req.body.byWhom;
   var byWhomFalse=req.body.byWhomFalseName;
   var postId=req.body.postId;
   var Client=require("mysql").Client;
   var client=new Client();
   client.user="root";
   client.password="5225541a";
   client.query("USE user");
   //准备数据库
   var queryString="insert into `post`(`byWhom`,`time`,`title`,`contents`,`falseName`,`postId`) values('"+byWhom+"'"+","+"'"+time+"'"+","+"'"+title+"'"+","+"'"+contents+"'"+","+"'"+byWhomFalse+"'"+","+"'"+postId+"'"+")";
   client.query(queryString,function(error,result){
     if(error){
	  throw error;
	 }
    res.send("1");
	client.end();
   });
   //表sp:子回复的逻辑
   var queryString2="insert into sp (owner) values('"+byWhomFalse+"')";
   client.query(queryString2,function(error,result){
     if(error){
	   throw error;
	 }
	 client.end();
	});
});

app.get("/WebstormProjects/web/views/displayAllPost.ejs",function(req,res){
  var Client=require("mysql").Client;
  var client=new Client();
  client.user="root";
  client.password="5225541a";
  client.query("USE user");
  var queryString="select * from `post`";
  client.query(queryString,function(error,result){
     if(error){
	    throw error;
	 }
	res.send(result);
	client.end();
  });
});


app.post("/WebstormProjects/web/views/replySubPost.ejs",function(req,res){
   var pid=req.body.pid;//唯一
   //能进到这边，也就是说能回复子回复(非楼主的话),说明pid这个值一定存在
   var replyToWhom=req.body.replyToWhom;
   var replayByWhom=req.body.replayByWhom;
   var falseName=req.body.falseName;
   var currentTime=req.body.currentTime;
   var postContents=req.body.postContents;
   var replyWhichSub=req.body.replyWhichSub;//唯一 回复哪个子回复
   var Client=require("mysql").Client;
   var client=new Client();
   client.user="root";
   client.password="5225541a";
   client.query("USE user");
   var queryString="select * from sp where id='"+pid+"'";
   client.query(queryString,function(e,r){
     if(e){
	  throw e;
	 }
	 var currentSubRep=r[0]["subRep2"];//String
	 if(!currentSubRep){
	   //没有针对子回复的回复
	   var storeFinalRep=[];
	   var storeEachFinalRep={};
	   storeEachFinalRep["replyWhichSub"]=replyWhichSub
	   storeEachFinalRep["contents"]=postContents;
	   storeEachFinalRep["by"]=falseName;
	   storeEachFinalRep["time"]=currentTime;
	   storeFinalRep.push(storeEachFinalRep);
	   var storeFinalRepString=JSON.stringify(storeFinalRep);
	   var queryString="update sp set subRep2='"+storeFinalRepString+"'"+"where id='"+pid+"'";
	   client.query(queryString,function(e,r){
	    if(e){
		  throw e;
		}
		res.send("1");
	    client.end();
	   });
	 }
	 else{
	 //有针对子回复的回复
	    var currentSubRepArray=JSON.parse(currentSubRep);
		var storeEachFinalRep={};
	    storeEachFinalRep["replyWhichSub"]=replyWhichSub
	    storeEachFinalRep["contents"]=postContents;
	    storeEachFinalRep["by"]=falseName;
	    storeEachFinalRep["time"]=currentTime;
	    currentSubRepArray.push(storeEachFinalRep);
		var currentSubRep=JSON.stringify(currentSubRepArray);
	    var queryString="update sp set subRep2='"+currentSubRep+"'"+"where id='"+pid+"'";
	    client.query(queryString,function(e,r){
	    if(e){
		  throw e;
		}
		 res.send("1");
	    client.end();
	   });
	 }
   });
})
//回复子贴




app.get("/WebstormProjects/web/views/getFinalSubReps.ejs",function(req,res){
   var pid=req.query.Pid;
   var Client=require("mysql").Client;
   var client=new Client();
   client.user="root";
   client.password="5225541a";
   client.query("USE user");
   var queryString="select * from sp where id='"+pid+"'";
   client.query(queryString,function(e,r){
     if(e){
	   throw e;
	 }
	 var finalReps=JSON.parse(r[0]["subRep2"])//Arrays
	 res.send(finalReps);
	 client.end();
   });
})


app.post("/WebstormProjects/web/views/returnIcons.ejs",function(req,res){
    var allUSer=req.body.allUser;//array
	var storePicUrl=[];
	var storeAccount=[];
	var client=prepareDb();
	var queryString='select * from d';
	client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	  }
	  for(var i=0;i<r.length;i++){
	    var eachUser=r[i]["falseName"];
		for(var c=0;c<allUSer.length;c++){
		  var eachUser2=allUSer[c];
		  if(eachUser2==eachUser){
			var account=eval("("+r[i]["account"]+")");
			storeAccount.push(account);
		    if(eval("("+r[i]["avatar"]+")")){
			    var pic=(eval("("+r[i]["avatar"]+")"))["con"];
				var pic=pic[0];
				storePicUrl.push(pic);
			}
			else{
			 console.log("AA");
			   var pic="unknown.png";
			   storePicUrl.push(pic);
			}
		  }
		}
	  }
	  res.send({"s":storePicUrl,"a":storeAccount});
	  client.end();
	});
})
//postDetail.ejs页面返回所有回帖人的头像

app.post("/WebstormProjects/web/views/replyPostOwnerIcon.ejs",function(req,res){
  var postOwner=req.body.postOwner;
  var client=prepareDb();
  var queryString="select * from d where falseName='"+postOwner+"'";
  client.query(queryString,function(e,r){
    if(e){
	  throw e;
	}
     var pic=(eval("("+r[0]["avatar"]+")"))["con"];
	 var pic=pic[0];
	 var account=eval("("+r[0]["account"]+")");
     res.send({"pic":pic,"account":account});
	 client.end();
  });
})



app.post("/WebstormProjects/web/views/displayAllPostImg.ejs",function(req,res){
   var postID=req.body.postID//Array
   if(postID){
     var storeAllPic=[];
     var fs=require("fs");
     for(var i=0;i<postID.length;i++){
	    var storeEachImg={};
        var eachPostImg=fs.readdirSync("./web/uploads/postPic/"+postID[i]);
		var key=postID[i];//string
		storeEachImg[key]=eachPostImg;
		storeAllPic.push(storeEachImg);
    }
    res.send(storeAllPic);
   } 
})



app.post("/WebstormProjects/web/ajax",function(req,res){
    var checkFlag=req.body.d.flag;
    if(checkFlag==="checkWatch"){
      var checkUsername=req.body.d.username;
      var dataArray=[checkUsername];
      var columnArray=["username"];
      var queryType=2;
      var tableName="extra2";
      var queryString=common.processString.createQueryString(dataArray,columnArray,queryType,tableName);
	  
	  
	  
      var client=prepareDb();
      client.query(queryString,function(e,r){
         if(e){
           throw e;
         }
         var storeNewR=[];
         for(var i=0;i< r.length;i++){
             var eachJson=r[i]//json
             var findWatch=eachJson["watch"];
             storeNewR.push(findWatch);
         }
         var newR=removeRedundant(storeNewR);
         var storeWatch={};
		 common.processString.recurQuery(newR,"d","falseName",res);
      });
      return false;
    }
	
	if(checkFlag==="whoWatchMe"){
	  var checkFalseName=req.body.d.falseName;
	  var dataArray=[checkFalseName];
	  var columnArray=["watch"];
	  var queryType=2
	  var tableName="extra2";
	  var queryString=common.processString.createQueryString(dataArray,columnArray,queryType,tableName);
	  var client=prepareDb();
	  client.query(queryString,function(e,r){
         if(e){
           throw e;
         }
         var storeNewR=[];
         for(var i=0;i< r.length;i++){
             var eachJson=r[i]//json
             var findWatch=eachJson["username"];
             storeNewR.push(findWatch);
         }
         var newR=removeRedundant(storeNewR);
         var storeWatch={};
		 common.processString.recurQuery(newR,"d","account",res);
      });
	  return false;
	}




    var target=req.body.d.target;
    var whoWatch=req.body.d.whoWatch;
    var dataArray=[whoWatch,target];
    var columnArray=["username","watch"];
    var table="extra2";
    var type=1;
    var queryString=common.processString.createQueryString(dataArray,columnArray,type,table);
    var client=prepareDb();
    client.query(queryString,function(e){
        if(e){
          throw e;
        }
        res.send("1");
    });
})






/*===================================证件认证=============================*/
app.get("/WebstormProjects/web/views/displayRights.ejs",function(req,res){
res.render("displayRights.ejs",{"title":"特权"});
})



/*===================================特权相关=============================*/
app.get("/WebstormProjects/web/views/mapSearch.ejs",function(req,res){
res.render("mapSearch.ejs",{"title":"地图搜索"});
})




/*===================================加入黑名单==========================*/
app.post("/WebstormProjects/web/views/addToBlackList.ejs",function(req,res){
 var blackWhom=req.body.d.blackWhom;
 var whoBlacks=req.body.d.whoBlacks;
 var querySting=common.processString.createQueryString([whoBlacks],["username"],2,"blacklist");
 var client=prepareDb();
 client.query(querySting,function(e,r){
     if(e){
	   throw e;
	 }
	 if(r.length===0){
	   var store=[];
	   store.push(blackWhom);
	   store=JSON.stringify(store);
	   var dataArray=[store,whoBlacks];
	   var column=["blacklist","username"];
	   var queryString=common.processString.createQueryString(dataArray,column,1,"blacklist");
	   client.query(queryString,function(e,r){
	    if(e){
		 throw e;
		 }
		 client.end();
		 res.send("1");
	   });
	 }
	 else{
	    var result= eval("("+r[0]["blacklist"]+")");
        for(var i=0;i<result.length;i++){
		  if(result[i]==blackWhom){
		  //该人已经在黑名单中
		    client.end();
            res.send(blackWhom+"已经在你的黑名单中");
		    return false;
		  }
		}
		result.push(blackWhom);
		result=JSON.stringify(result);
		var queryString="update blacklist set blacklist='"+result+"'"+"where username='"+whoBlacks+"'";
		client.query(queryString,function(e,r){
		  if(e){
		    throw e;
		  }
		  client.end();
		  res.send("1");
		});
	 }
 });
})





/*===================================每日速配=============================*/
var storeAll=[];








app.post("/WebstormProjects/web/views/requireDayMatch.ejs",function(req,res){

  



  var username=req.body.d.username;


console.log("start!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

/*

  for(var i=0;i<storeAll.length;i++){
    if(storeAll[i]["username"]===username){
	  var checkRequestTime=((new Date()).getTime())/1000;
	  if(checkRequestTime-storeAll[i]["requestTime"]<86400){
	    return false;
	  }
	}
  }*/




  var requestTime=((new Date()).getTime())/1000;
  var storeEachUser={};
  storeEachUser.requestTime=requestTime;
  storeEachUser.username=username;
  storeAll.push(storeEachUser);
  var queryString="select * from dd where username='"+username+"'";
  var client=prepareDb();
  client.query(queryString,function(e,r){
    if(e){
	  throw e;
	}
	if(r.length!==0){
	var queryString="select * from d where gender='"+r[0].gender+"'"+" and ";
	if(r[0].ageFrom===r[0].ageTo){
	    queryString=queryString+"age="+r[0].ageFrom+" and ";
	}
	else{
	   queryString=queryString+"age between "+r[0].ageFrom+" and "+r[0].ageTo+" and ";
	}
	if(r[0].area1!=="任意"&&r[0].area2==="任意"){
	   queryString=queryString+"province like '"+r[0].area1+"%'"+" and ";
	}
	else if(r[0].area1!=="任意"&&r[0].area2!=="任意"){
	  queryString=queryString+"province like '"+r[0].area1+" "+r[0].area2+"%'"+" and ";
	}
	if(r[0].height1===r[0].height2){
	   queryString=queryString+"intHeight="+r[0].height1+" and ";
	}
	else{
	   queryString=queryString+"intHeight between "+r[0].height1+" and "+r[0].height2+" and " ;
	}
	var education=r[0]["education"];
	if(education==="高中及以上"){
	   queryString=queryString+"intEducation>=2 and ";
	}
	else if(education==="大专及以上"){
	   queryString=queryString+"intEducation>=3 and ";
	}
	else if(education==="本科及以上"){
	   queryString=queryString+"intEducation>=4 and ";
	}
	else if(education==="硕士及以上"){
	   queryString=queryString+"intEducation>=5 and ";
	}
	else if(education==="博士及以上"){
	   queryString=queryString+"intEducation=6 and ";
	}
	if(r[0].marrige!=="任意"&&r[0].marrige!=="不限"){
	   queryString=queryString+"marriageStatus='"+r[0].marrige+"'"+" and ";
	}
	if(r[0].monthIncome!=="任意"&&r[0].monthIncome!=="不限"){
	  queryString=queryString+"monthincome='"+r[0].monthIncome+"'"+" and ";
	}
	if(r[0].housing!=="任意"&&r[0].housing!=="不限"){
	  queryString=queryString+"housingcondition='"+r[0].housing+"'"+" and ";
	}
    if(r[0].race!=="任意"&&r[0].race!=="不限"){
	  queryString=queryString+"race='"+r[0].race+"'"+" and ";
	}
    if(r[0].xz!=="任意"&&r[0].xz!=="不限"){
	  queryString=queryString+"sign='"+r[0].xz+"'"+" and ";
	}
	if(r[0].sx!=="任意"&&r[0].sx!=="不限"){
	  queryString=queryString+"horoscope='"+r[0].sx+"'"+" and ";
	}
	if(r[0].bloodType!=="任意"&&r[0].bloodType!=="不限"){
	  queryString=queryString+"bloodType='"+r[0].bloodType+"'"+" and ";
	}
	if(r[0].ifSmoking!=="任意"&&r[0].ifSmoking!=="不限"){
	  queryString=queryString+"ifSmoking='"+r[0].ifSmoking+"'"+" and ";
	}
	if(r[0].ifDrinking!=="任意"&&r[0].ifDrinking!=="不限"){
	  queryString=queryString+"ifDrinking='"+r[0].ifDrinking+"'"+" and ";
	}
	var queryString=queryString.substring(0,queryString.length-5);



	 console.log(queryString);			


   

	 client.query(queryString,function(e,r){


	    if(e){
		  throw e;
		}
    console.log(r);
		res.send(r);
	 });
	
	}
	else{
	}
  });
})





/*===================================修改随配条件=============================*/
app.get("/WebstormProjects/web/views/editMatchCondition.ejs",function(req,res){
res.render("editMatchCondition.ejs",{"title":"修改速配条件"});
})

app.post("/WebstormProjects/web/views/editMatchCondition.ejs",function(req,res){
  var userName=req.body.d.username;
  var matchData=req.body.d.data;//json
  var storeData=[];
  for(var i in matchData){
    storeData.push(matchData[i]);
  }
  storeData.push(userName);
  var columnArray=["gender","ageFrom","ageTo","area1","area2","height1","height2","education","job","marrige","monthIncome","housing","race","xz","sx","bloodType","ifSmoking","ifDrinking","userName"];
  var client=prepareDb();
  var queryString="select * from dd where username='"+userName+"'";
  client.query(queryString,function(e,r){
    if(e){
	 throw e;
	}
    if(r.length!==0){
	 var queryString=common.processString.createQueryString(storeData,columnArray,3,"dd");
	 client.query(queryString,function(e,r){
	  if(e){
	  throw e;
	  }
	   res.send("1"); 
	 });
	}
	else{
	 var queryString=common.processString.createQueryString(storeData,columnArray,1,"dd");
	 client.query(queryString,function(e,r){
    if(e){
	  throw e;
	}
	res.send("1");
      });
	}
  });
})





/*===================================关注我的人=============================*/ //added on 2013/8/13
/*
app.post("/WebstormProjects/web/views/requireAutoWatch.ejs",function(req,res){
  var username=req.body.d;
  var queryString="select * from d where account='"+username+"'";
  var client=prepareDb();
  client.query(queryString,function(e,r){
     if(e){
	    throw e;
	 }
	var falseName=r[0]["falseName"];
	var dataArray=[falseName];
    var columnArray=["watch"];
    var queryString=common.processString.createQueryString(dataArray,columnArray,2,"extra2");
    client.query(queryString,function(e,r){
    if(e){
	 throw e;
	}
	var storeNew=[];
	for(var j=0;j<r.length;j++){
	  storeNew.push(r[j]["username"]);
	}
	storeNew=removeRedundant(storeNew);
	common.processString.recurQuery(storeNew,"d","account",res);
	
   });
  });
})
*/





/*

app.post("/WebstormProjects/web/views/returnUserIcon",function(req,res){
   var user=req.body.d;
   fs.exists("uploads/pic/"+user,function(result){
      if(result){
	    //这个用户有图片
	    fs.readdir("uploads/pic/"+user,function(e,r){
		  if(e){
		    throw e;
		  }
		    var img=r[0];
			res.send(img);
		});
	  }
	  else{
	    //没图片
		 console.log("Aaa");
	      img="unknown.png";
		  res.send(img);
	  }
   });
})
*/







/*=====================================commons====================================*/
function prepareDb(){
  var Client=require("mysql").Client;
  var client=new Client();
  client.user="root";
  client.password="5225541a";
  client.query("USE user");
  return client;
}



function removeRedundant(o){
    var storeNewO=[];
    for(var i=0;i< o.length;i++){
        if(i!=0){
            var isIn=detect(o[i]);
            if(isIn){
                storeNewO.push(o[i]);
                continue;
            }
            else{
                continue;
            }
        }
        storeNewO.push(o[i]);
    }
    function detect(item){
        var legal=true;
        for(var i=0;i<storeNewO.length;i++){
            if(storeNewO[i]===item){
                legal=false;
            }
        }
        return legal;
    }
    return storeNewO;
}



if(!common){
    var common={};
    common.processString=(function(){
        function _recurQuery(dataArray,table,targetColumn,res,queryType){
           if(!dataArray instanceof Array){
            throw new Error("dataArray must be an array");
           }
		   if(typeof(table)!='string'){
		     throw new Error("dataArray must be a string");
		   }
		   var recurIndex=0;
	       var client=prepareDb();
	       var storeQueryResult=[];
		   recurQueryDetail(dataArray,table,targetColumn,res);
		   function recurQueryDetail(dataArray,table,targetColumn,res){
		     if(recurIndex===dataArray.length){
		     res.send(storeQueryResult);
			 return false;
		    }
		    var queryString="select * from "+table+" where "+targetColumn+"='"+dataArray[recurIndex]+"'";
		    client.query(queryString,function(e,r){
			  if(e){
			   throw e;
			  }
			  storeQueryResult.push(r);
			  recurIndex++;
			  recurQueryDetail(dataArray,table,targetColumn,res);
		    });
		  }
        }
        function _createQueryString(dataArray,columnArray,queryType,tableName){
            if(arguments.length!==4){
                throw new Error("arguments'length must be four");
            }
            if(!dataArray instanceof Array||!columnArray instanceof Array){
                throw new Error("Two arguments must be Array");
            }
            if(typeof queryType!=="number"){
                throw new Error("queryType must be a number");
            }
            if(typeof tableName!=="string"){
                throw new Error("tableName must be a string");
            }
            var queryString="";
            if(queryType===1){
                //insert
                queryString="insert into "+tableName+"(";
                for(var i=0;i<columnArray.length;i++){
                    if(i===(columnArray.length-1)){
                        queryString+=(columnArray[i]+")");
                        break;
                    }
                    queryString+=(columnArray[i]+",");
                }
                queryString=queryString+" values(";
                for(var j=0;j<dataArray.length;j++){
                    if(j===(dataArray.length-1)){
                        queryString+=("'"+dataArray[j]+"'"+")");
                        break;
                    }
                    queryString+=("'"+dataArray[j]+"'" +",");
                }
                return queryString;
            }
            else if(queryType===2){
            //select
                queryString="select * from "+tableName+" where ";
                if(columnArray.length===1){
                    queryString="select * from "+tableName+" where "+columnArray[0]+"="+"'"+dataArray+"'";
                    return queryString;
                }
                else{
                    for(var i=0;i<columnArray.length;i++){
                        if(i===(columnArray.length-1)){
                            queryString+=(columnArray[i]+"='"+dataArray[i]+"'");
                            break;
                        }
                        queryString+=(columnArray[i]+"='"+dataArray[i]+"'"+" and ");
                    }
                     return queryString;
                }
            }
			else if(queryType==3){
			 //update
			 var queryString="update "+tableName+" set ";
			 for(var i=0;i<columnArray.length;i++){
			    if(i===(columnArray.length-2)){
				  queryString+=(columnArray[i]+"='"+dataArray[i]+"'");
				  continue;
				}
			    if(i===(columnArray.length-1)){
				    queryString+=(" where username='"+dataArray[i]+"'");
					break;
				}
			    queryString+=(columnArray[i]+"='"+dataArray[i]+"'"+",");
			  }
			   return queryString;
			}
        }
        return {
            createQueryString:function(dataArray,columnArray,queryType,tableName){
               var r= _createQueryString(dataArray,columnArray,queryType,tableName);
               return r;
            },
			recurQuery:function(dataArray,table,targetColumn,res,queryType){
			  _recurQuery(dataArray,table,targetColumn,res,queryType);
			}
        };
    })();
}
else{
    throw new error("name space in use");
}





/*===================================提交证件=============================*/
app.get("/WebstormProjects/web/views/submitProof.ejs",function(req,res){
res.render("submitProof.ejs",{"title":"提交证件"});
})
app.get("/WebstormProjects/web/views/proofValidation.ejs",function(req,res){
res.render("proofValidation.ejs",{"title":"证件审核"});
})


app.get("/WebstormProjects/web/uploads/proofPic/identitycard/:username/:pic",function(req,res){
        var username=req.params.username;
        var pic=req.params.pic;
        res.sendfile("./uploads/proofPic/identitycard/"+username+"/"+pic);
});



app.get("/WebstormProjects/web/uploads/proofPic/income/:username/:pic",function(req,res){
        var username=req.params.username;
        var pic=req.params.pic;
        res.sendfile("./uploads/proofPic/income/"+username+"/"+pic);
});
app.get("/WebstormProjects/web/uploads/proofPic/housing/:username/:pic",function(req,res){
        var username=req.params.username;
        var pic=req.params.pic;
        res.sendfile("./uploads/proofPic/housing/"+username+"/"+pic);
});
app.get("/WebstormProjects/web/uploads/proofPic/drive/:username/:pic",function(req,res){
        var username=req.params.username;
        var pic=req.params.pic;
        res.sendfile("./uploads/proofPic/drive/"+username+"/"+pic);
});
app.get("/WebstormProjects/web/uploads/proofPic/gangao/:username/:pic",function(req,res){
        var username=req.params.username;
        var pic=req.params.pic;
        res.sendfile("./uploads/proofPic/gangao/"+username+"/"+pic);
});


app.post("/WebstormProjects/web/backstage/:operationType",function(req,res){
 var operation=req.params.operationType;
 if(operation=="approveProof"){
    var approveWhom=req.body.d.approveWhom;
	var approveType=req.body.d.approveType;
	var client=prepareDb();
	if(approveType=="identitycard"){
	var queryString="select pending from credits where username='"+approveWhom+"'";
	client.query(queryString,function(e,r){
	 if(e){
	   throw e;
	 }
	 var currentPending= eval("("+r[0]["pending"]+")");
	 if(currentPending.length===0){
	     var queryString="update credits set "+approveType+"=1,level=1,identity=1"+" where username='"+approveWhom+"'";
	  client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	   }
	  res.send("1");
	  });
	 }
	 else{
		var indexFlag=0;
		recurUpdate(res);
		function recurUpdate(resObject){
		  if(indexFlag===currentPending.length){
		    //这里要改变用户认证等级字段credits.level
		    var pendingLength=currentPending.length;
			var level=pendingLength+1;
		    var queryString="update credits set pending='[]',"+approveType+"=1,level="+level+",identity=1 where username='"+approveWhom+"'";
			client.query(queryString,function(e){
			  if(e){
			    throw e;
			  }
			  resObject.send("1");
			});
			return false;
		  }
		  var queryString="update credits set "+currentPending[indexFlag]+"=1";
		  client.query(queryString,function(e){
		    if(e){
			  throw e;
			}
			indexFlag++;
			recurUpdate(res);
		  });
		}//recurUpdate
	  }
	 });
	}
	else{
	 var queryString="select level from credits where username='"+approveWhom+"'";
	 var client=prepareDb();
	 client.query(queryString,function(e,r){
	    if(e){
		  throw e;
		}
		var level=r[0]["level"];
		if(level>=1){
		//用户的身份证已经经过认证
		  level+=1;
		  var queryString="update credits set "+approveType+"=1"+",level="+level+" where username='"+approveWhom+"'";
		  client.query(queryString,function(e){
		    if(e){
			  throw e;
			}
			res.send("1");
		  });
		}
		else{
		 //用户的身份证没有经过认证,这种情况要跟新credits.pending字段
		 var queryString="select pending from credits where username='"+approveWhom+"'";
		 client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
		    var currentPending= eval("("+r[0]["pending"]+")");
			currentPending.push(approveType);
			var currentPending=removeRedundant(currentPending);
			var updatedPedning=JSON.stringify(currentPending);
			var queryString="update credits set pending='"+updatedPedning+"'"+"where username='"+approveWhom+"'" ;
			client.query(queryString,function(e,r){
			  if(e){
			    throw e;
			  }
			  res.send("1");
			//credits.pending字段字段更新完毕,但是身份证还没有验证
			});
		 });
		}
	 });
	}
   //else
 }
  else if(operation=="denyProof"){
    var approveWhom=req.body.d.approveWhom;
	var approveType=req.body.d.approveType;
	var approveImgName=req.body.d.approveImgName;
	var client=prepareDb();
  if(approveType=="identitycard"){
     //身份证
	   var queryString="update credits set "+approveType+"=-1,level=0,identity=0"+" where username='"+approveWhom+"'";
	 //var queryString="update credits set "+approveType+"=-1 where username='"+approveWhom+"'";
	  client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	   }
	  // var fsUrl="C:\Users\357570\WebstormProjects\web\uploads\proofPic\"                  +approveType+        "\"+approveWhom+"\";
	     var fsUrl="./uploads/proofPic/"+approveType+"/"+approveWhom+"/"+approveImgName;
	   fs.unlink(fsUrl,function(e){
	     if(e){
		    throw e;
		 }
	   });
	    res.send("1");
		client.end();
	  });
	}
	else{
	//非身份证
	var queryString="update credits set "+approveType+"=-1 where username='"+approveWhom+"'";
	client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	  }
	  var queryString="select pending from credits where username='"+approveWhom+"'";
	  client.query(queryString,function(e,r){
	    if(e){
		 throw e;
		}
		//var fsUrl="./uploads/proofPic/"+approveType+"/"+approveWhom+"/car.jpg";
		//var fsUrl="./uploads/proofPic/"+approveType+"/"+approveWhom+"/";
		var fsUrl="./uploads/proofPic/"+approveType+"/"+approveWhom+"/"+approveImgName;
		fs.unlink(fsUrl,function(e){
		  if(e){
		    throw e;
		  }
		});
		var pending=r[0]["pending"];
		pending=eval("("+pending+")");
		if(pending.length!==0){
		  for(var i=0;i<pending.length;i++){
		   if(pending[i]===approveType){
		      pending.splice(i,1);
			  pending=JSON.stringify(pending);
			  var queryString="update credits set pending='"+pending+"where username='"+approveWhom+"'";
			  console.log(queryString);
			  client.query(queryString,function(e){
			    if(e){
				  throw e;
				  client.end();
				}
			  });
		   }
		 }
		}
		   res.send("1");
	  });
	 });
	}
  }
})







app.get("/WebstormProjects/web/views/loadProof.ejs",function(req,res){
 //查询credits表,返回数据给业务人员操作
 var queryString="select username,identitycard,income,drive,gangao,housing from credits";
 var client=prepareDb();
 client.query(queryString,function(e,r){
    if(e){
	 throw e;
	}
	var storeAll=[];
	for(var i=0;i<r.length;i++){
	  var store={};
	  for(var j in r[i]){
	    if(r[i][j]!==-1&&r[i][j]!==1){
		  store[j]=r[i][j];
		}
	  }
	  storeAll.push(store);
	}
	var storePicUrl=[];
	for(var l=0;l<storeAll.length;l++){
	  for(var k in storeAll[l]){
	    if(k=="username"){
		   var username=storeAll[l][k];
		}
		else{
		 var picUrl="./uploads/proofPic/"+k+"/"+username;
		 var picArray=fs.readdirSync(picUrl); //此处逻辑有问题
		 var picProof=picArray[0]
		 storeAll[l][k]="../uploads/proofPic/"+k+"/"+username+"/"+picProof;
		}
	  }
	}
	res.send(storeAll);
 });
})






app.post("/WebstormProjects/web/views/Proof.ejs",function(req,res){
 var proofType=req.body.proofType;
 var checkUsername=req.body.checkUsername;
 var checkFile=req.files.uploadFile.path;
 var checkFileName=req.files.uploadFile.name;
 
 if(proofType==1){
    fs.exists("./uploads/proofPic/identitycard/"+checkUsername,function(exists){
    if(!exists){
	  //不存在
	     fs.mkdir("./uploads/proofPic/identitycard/"+checkUsername,function(e){
		    if(e){
			 throw e;
			}
		  fs.rename(checkFile,"./uploads/proofPic/identitycard/"+checkUsername+"/"+checkFileName,function(){
		    var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,identitycard,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set identitycard=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		  });
		 });
	}
	else{
	    //如果图片同名则不做处理,文件夹中不会出现同名的图片
	    fs.rename(checkFile,"./uploads/proofPic/identitycard/"+checkUsername+"/"+checkFileName,function(){
		     var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,identitycard,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set identitycard=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		});
	    res.render("submitProof.ejs",{"title":"提交证件"});
	 }
    });
   }
  else if(proofType==2){
    fs.exists("./uploads/proofPic/income/"+checkUsername,function(exists){
    if(!exists){
	  //不存在
	     fs.mkdir("./uploads/proofPic/income/"+checkUsername,function(e){
		    if(e){
			 throw e;
			}
		   fs.rename(checkFile,"./uploads/proofPic/income/"+checkUsername+"/"+checkFileName,function(){
		    var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,income,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set income=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e,r){
			    if(e){
				 throw e
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		  });
		 });
	}
	else{
	    //如果图片同名则不做处理,文件夹中不会出现同名的图片
	    fs.rename(checkFile,"./uploads/proofPic/income/"+checkUsername+"/"+checkFileName,function(){
		   var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,income,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set income=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e,r){
			    if(e){
				 throw e
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		});
	    res.render("submitProof.ejs",{"title":"提交证件"});
	 }
    });
   }
   else if(proofType==3){
    fs.exists("./uploads/proofPic/housing/"+checkUsername,function(exists){
    if(!exists){
	  //不存在
	     fs.mkdir("./uploads/proofPic/housing/"+checkUsername,function(e){
		    if(e){
			 throw e;
			}
		   fs.rename(checkFile,"./uploads/proofPic/housing/"+checkUsername+"/"+checkFileName,function(){
		    var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,housing,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set housing=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		  });
		 });
	}
	else{
	    //如果图片同名则不做处理,文件夹中不会出现同名的图片
	    fs.rename(checkFile,"./uploads/proofPic/housing/"+checkUsername+"/"+checkFileName,function(){		
		  var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,housing,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
			else{
			 var querystring="update credits set housing=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			 });
			}
		   });
		});
	    res.render("submitProof.ejs",{"title":"提交证件"});
	 }
    });
   }
   else if(proofType==4){
    fs.exists("./uploads/proofPic/gangao/"+checkUsername,function(exists){
    if(!exists){
	  //不存在
	     fs.mkdir("./uploads/proofPic/gangao/"+checkUsername,function(e){
		    if(e){
			 throw e;
			}
		   fs.rename(checkFile,"./uploads/proofPic/gangao/"+checkUsername+"/"+checkFileName,function(){
		    var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,gangao,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			 }
			 else{
			 var querystring="update credits set gangao=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
		    });
		   });
		 });
	}
	else{
	    //如果图片同名则不做处理,文件夹中不会出现同名的图片
	    fs.rename(checkFile,"./uploads/proofPic/gangao/"+checkUsername+"/"+checkFileName,function(){
		 var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,gangao,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			 }
			 else{
			 var querystring="update credits set gangao=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				throw e;
				}
				res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
		    });
		});
	    res.render("submitProof.ejs",{"title":"提交证件"});
	 }
    });
   }
   else if(proofType==5){
    fs.exists("./uploads/proofPic/drive/"+checkUsername,function(exists){
    if(!exists){
	  //不存在
	     fs.mkdir("./uploads/proofPic/drive/"+checkUsername,function(e){
		    if(e){
			 throw e;
			}
		   fs.rename(checkFile,"./uploads/proofPic/drive/"+checkUsername+"/"+checkFileName,function(){
		    var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,drive,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			 }
			 else{
			 var querystring="update credits set drive=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
			   res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
		    });
		   });
		 });
	}
	else{
	    //如果图片同名则不做处理,文件夹中不会出现同名的图片
	    fs.rename(checkFile,"./uploads/proofPic/drive/"+checkUsername+"/"+checkFileName,function(){
		   var client=prepareDb();
		    var queryString="select uploaded from credits where username='"+checkUsername+"'";
		    client.query(queryString,function(e,r){
		    if(e){
			 throw e;
			}
			if(r.length===0){
			  var querystring="insert into credits (uploaded,drive,username) values(1,0,'"+checkUsername+"')";
			  client.query(querystring,function(e,r){
			    if(e){
			    throw e;
			   }
			    res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			 }
			 else{
			 var querystring="update credits set drive=0 where username='"+checkUsername+"'";
			 client.query(querystring,function(e){
			    if(e){
				 throw e;
				}
			   res.render("submitProof.ejs",{"title":"提交证件"});
			  });
			}
		    });
		});
	    res.render("submitProof.ejs",{"title":"提交证件"});
	 }
    });
   }
})




/*******************************************new added here!!! 2013/10/23****************************************/
//察看最近登陆时间 需要付费
app.post("/WebstormProjects/web/views/checkLastLoginTime.ejs",function(req,res){
    var checkWhoseLastLogin=req.body.d;
	var client=prepareDb();
	var queryString="select lastLogin from d where falseName='"+checkWhoseLastLogin+"'";
	client.query(queryString,function(e,r){
	  if(e){
	    throw e;
	  }
	  var lastLoginTime=r[0]["lastLogin"];
	  res.send(lastLoginTime);
	  client.end();
	});
});

app.post("/WebstormProjects/web/views/expectOtherLogin.ejs",function(req,res){

   
    var expectWhomLogin=req.body.expectWhomLogin; //希望谁登录时提醒(昵称)
	var whoExpects=req.body.whoExpects; //谁希望(帐号)
	
    var client=prepareDb();
	var queryString="select whoExpectYouLogin from d where falseName='"+expectWhomLogin+"'";
	
	 console.log(queryString);
	
	client.query(queryString,function(e,r){
	   if(e){
	     throw e;
	   }
	   console.log(r);
	   
	   
	      if(r.length!=0){ 
		  var r=r[0]["whoExpectYouLogin"];
		  if(r.length>0){
			   var r=eval("("+r+")"); //array
		  r.push(whoExpects);
		  r=removeRedundant(r);//清除重复的值
		  r=JSON.stringify(r);
		  queryString="update d set whoExpectYouLogin='"+r+"' where falseName='"+expectWhomLogin+"'";
		  client.query(queryString,function(e,r){
		       if(e){
	              throw e;
	            }
				res.send("1");
		  });
		  }
		 else if(r.length==0){
			 var r=[];
			 r.push(whoExpects);
			 r=JSON.stringify(r);
			 queryString="update d set whoExpectYouLogin='"+r+"' where falseName='"+expectWhomLogin+"'";
			   client.query(queryString,function(e,r){
		       if(e){
	              throw e;
	            }
				res.send("1");
		  });
		 }
		  
		  
		  
		  
		  
		  
		 }
	      
		  
		  
		  
	});

	
	


});
//特定用户登录时提醒,需要付费






function prepareDb(){
  var Client=require("mysql").Client;
  var client=new Client();
  client.user="root";
  client.password="5225541a";
  client.query("USE user");
  return client;
}

//解析msgAysn字段的格式在749行













/*********************************** reconstructions**********************************/

app.get("/WebstormProjects/web/views/emailReg.ejs",function(req,res){
   res.render("new/emailReg",{title:"emailReg"});
  
})


app.get("/forgetPass",function(req,res){
   res.render("new/forgetPass",{title:"forgetPass"});
  
})


app.post("/forgetPass",function(req,res){
     //console.log(req.body);
     var email=req.body.email;
     var client=prepareDb();
     var queryString="select account from d where account='"+email+"'";
     client.query(queryString,function(e,r){
        if(e){
          throw e;
        }
        if(r.length<=0){
            res.send("没有这个邮箱");
        }
        else{
        }
     });
});


app.post("/login",function(reg,res){
    var account=reg.body.username;
    var pass=reg.body.pass;
    var User=user.user;
    var userInstance=new User();
    userInstance.loginCheck(account,pass,reg,res);
});


/*

exports.indexPost=function(reg,res){
     var clientData=reg.param("ajaxData");
     var jsonClientData=eval("("+clientData+")");
     var acc=jsonClientData.Con.username;
     var pass=jsonClientData.Con.pass;
     var User=user.user;
     var userInstance=new User();
     userInstance.loginCheck(acc,pass,reg,res);
   //loginCheck方法在module.js里
}*/