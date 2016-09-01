var connect = require('connect');
var express = require('express');
var routes = require('routeIndex.js');
var user = require("moduleUser");
//var commons = require('serverCommon.js');
var http = require('http');
var path = require('path');
var fs = require("fs");
//required modules
var app = express();
var partials = require("express-partials");
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

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//用户昵称不可以重复
//页面有时候会出现死锁的情况 原因不明 需要解决
//isonline有bug 0表示不在线 1表示在线 可能是用户退出登录的时候字段没有更新

require('socketAll.js').startSocket();
var utility = require('utlity.js');
var dbUtlity = require('dbUtlity.js');
var tools = require('tools/tools.js');

var routerLogin = require('routerLogin.js');
var routeMsg = require('routerMsg.js');
var register = require('register/register.js');
var routeEdit = require('modules/edit/routerEdit.js');

var globalApi = require('modules/global/global.js');







app.get("/WebstormProjects/web/views/sendImage.ejs",function(req,res){
       res.render("./sendImage.ejs",{title:"sendImage"});    
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
     client.password="5611559w";
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








app.post("/deletSynMsg",function(req,res){
        var storeNewMsgArray=[];
        var data=req.body;//json
        var dataArray=data["con"];//array

        //从前端接受的数据,类型为数组
        var targetUser=dataArray[0]["targetUser"];//在谁的页面上删除信息(帐号)
        //从前端接受数据
        var Client =require("mysql").Client;
        var client =new Client();
        client.user="root";
        client.password="5611559w";
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










app.get("/WebstormProjects/web/views/initAjax.ejs",function(req,res){
      var Client =require("mysql").Client;
      var client =new Client();
      client.user="root";
      client.password="5611559w";
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

app.post("/WebstormProjects/web/views/index.ejs",routes.indexPost);


app.get("/WebstormProjects/web/views/ajaxShowUserPic.ejs",routes.ajaxShowUserPic);

app.get("/WebstormProjects/web/views/404.ejs",routes.errorPage);

app.post("/WebstormProjects/web/views/checkSentMsg",routes.checkSentMsgs);

app.post("/WebstormProjects/web/views/updateProfileLink",routes.updateProfileLink);



app.get("/WebstormProjects/web/views/save.ejs",function(req,res){


});

app.post("/WebstormProjects/web/views/save.ejs",function(req,res){

});

app.get("/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
       // res.sendfile("./web/uploads/pic/"+username+"/"+pic);
        res.sendfile("/Users/wanmengj/pro2/web/uploads/pic/"+username+"/"+pic);
        
});
app.get("/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/pic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro2/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/postPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/postPic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro2/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/postPicPreview/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/postPicPreview/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro2/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/subPostPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/subPostPic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro2/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由


app.get("/WebstormProjects/web/views/search.ejs",routes.search);

/*********************************** reconstructions**********************************/

app.get("/WebstormProjects/web/views/emailReg.ejs",function(req,res){
   res.render("new/emailReg",{title:"emailReg"});
});

app.get("/forgetPass",function(req,res){
    res.render("new/forgetPass",{title:"forgetPass"});
});

app.post("/forgetPass",function(req,res){
     //console.log(req.body);
     var email=req.body.email;
     var client = utility.prepareDb();
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





























app.post("/WebstormProjects/web/ajax",function(req,res){
    var checkFlag=req.body.d.flag;
    if(checkFlag==="checkWatch"){
      var checkUsername=req.body.d.username;
      var dataArray=[checkUsername];
      var columnArray=["username"];
      var queryType=2;
      var tableName="extra2";
      var queryString = dbUtlity.createQueryString(dataArray,columnArray,queryType,tableName);
      var client=utility.prepareDb();
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
         var newR=utility.removeRedundant(storeNewR);
         var storeWatch={};
         dbUtlity.recurQuery(newR,"d","falseName",res);
      });
      return false;
    }
    
    if(checkFlag==="whoWatchMe"){
      var checkFalseName=req.body.d.falseName;
      var dataArray=[checkFalseName];
      var columnArray=["watch"];
      var queryType=2
      var tableName="extra2";
      var queryString = dbUtlity.createQueryString(dataArray,columnArray,queryType,tableName);
      var client=utility.prepareDb();
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
         var newR=utility.removeRedundant(storeNewR);
         var storeWatch={};
         dbUtlity.recurQuery(newR,"d","account",res);
      });
      return false;
    }
    var target=req.body.d.target;
    var whoWatch=req.body.d.whoWatch;
    var dataArray=[whoWatch,target];
    var columnArray=["username","watch"];
    var table="extra2";
    var type=1;
    var queryString = dbUtlity.createQueryString(dataArray,columnArray,type,table);
    var client=utility.prepareDb();
    client.query(queryString,function(e){
        if(e){
          throw e;
        }
        res.send("1");
    });
});


























/* on login */
app.get("/ajax.ejs",routes.ajaxQuery);
//入口页面showUserPic的备用路由，代码稳定后删除
app.post("/login", routerLogin.login);
app.get("/login", routerLogin.getLogin)
/* on login */


/* search */
app.get("/search/searchLove",routes.searchLove);
app.get("/search",routes.getSearchTpl);
app.post("/search",routes.search);
//高级搜索(基本完成)
/* search */


/* register */
app.get("/register",routes.register);
//old register page
app.get("/logoff",routes.logoff);
app.post("/register",routes.registerPost);
app.get("/regist", register.register);


/* register */

/* self info */
app.get("/info/me",routes.me);
/* self info */

/* forum */
app.get("/forum", routes.getForum);
app.post("/forum/getForumImgsOnEntering", routes.getForumImgsOnEntering);
app.post("/forum/postDetail", routes.postDetail);
app.post("/forum/replyPost", routes.replyPost);
app.post("/postDetailImg.ejs", routes.forumPostImage);
app.post("/forum/submitPreviewPic.ejs", routes.submitPreviewPic);
app.get("/forum/postDetail.ejs", routes.getPostDetail);
app.post("/forum/getReplyPics.ejs", routes.getReplyPics);
app.get("/WebstormProjects/web/views/postPicPreview.ejs", routes.postPicPreview);
app.get("/WebstormProjects/web/views/whiteCollar.ejs", routes.whiteCollar);
app.post("/WebstormProjects/web/views/postPicPreview.ejs",routes.displayPostPicPreview);
app.post("/WebstormProjects/web/views/savePost.ejs", routes.savePost);
app.get("/WebstormProjects/web/views/displayAllPost.ejs", routes.displayAllPost);
app.post("/WebstormProjects/web/views/replySubPost.ejs", routes.replySubPost);
//回复子
app.get("/WebstormProjects/web/views/getFinalSubReps.ejs",routes.getFinalSubReps);
app.post("/WebstormProjects/web/views/returnIcons.ejs", routes.returnIcons);
//postDetail.ejs页面返回所有回帖人的头像
app.post("/WebstormProjects/web/views/replyPostOwnerIcon.ejs", routes.replyPostOwnerIcon);

app.get("/WebstormProjects/web/views/posts.ejs",function(req,res){
    res.render("./posts.ejs",{title:"发帖"});
})

app.post("/WebstormProjects/web/views/posts.ejs",function(req,res){
    var postTitle=req.body.postTitle;
    var postBody=req.body.postContent; 
})
/* forum */




/* map */
app.get("/mapSearch",routes.mapSearch);
/* map */



app.get("/WebstormProjects/web/views/picResult.ejs",routes.edit);
app.post("/homePageHelp.ejs",routes.homePageHelp);


/* match */
app.post("/match/dailyMatch",routes.dailyMatch);
app.post("/match/autoWatch",routes.autoWatch);

/* match */




/* check */
app.post("/check/last_login", routes.getLastLoginTime);

app.post("/check/backlist", routes.addBlackList);


app.post("/check/other_login",routes.expectOtherLogin);
//特定用户登录时提醒



/* check */



/* payment */
app.get("/payment",routes.payemnt);
/* payment */




/* backstage supporter */

app.get("/backstageSupporter/proofs", routes.loadProof);

app.post("/backstageSupporter/proofs/:operationType", routes.vlidateProofs);

app.get("/backstageSupporter/proof_validation", routes.getProofValidationPage);

/* backstage supporter */



/* cp */
app.post("/cp/checkProfile",routes.checkProfile);
app.get("/cp/proof",routes.getProofPage);
app.post("/cp/proof",routes.submitProof);
app.post("/cp/profile",routes.updateProfile);
app.post("/cp/profile_deletion",routes.deleteProfile);








app.get("/uploads/proofPic/identitycard/:username/:pic", routes.identitycard);
app.get("/uploads/proofPic/income/:username/:pic", routes.income);
app.get("/uploads/proofPic/housing/:username/:pic", routes.housing);
app.get("/uploads/proofPic/drive/:username/:pic", routes.drive);
app.get("/uploads/proofPic/gangao/:username/:pic", routes.gangao);
/* cp */




/* directive template */
app.get("/breadcrumb",routes.breadcrumb);
app.get("/spotlight",routes.spotlight);
app.get("/profile",routes.dirProfile);
app.get("/cpPreview",routes.cpPreview);
app.get("/mainSideMenu",routes.mainSideMenu);
app.get("/registerpanel",routes.registerpanel);
app.get("/pickAddress",tools.pickAddress);
app.get('/pickHeight', routes.pickHeight);
app.get('/pickEducation', routes.pickEducation);
app.get('/pickIncome', routes.pickIncome);
app.get('/pickBirthday', routes.pickBirthday);




/* directive template */



/* angularstrap modal template */
app.get('/pickaddresspanel', routes.pickAddressPanel);   
app.get('/pickcity', routes.pickCity);  
app.get('/pickheightpanel', routes.pickheightpanel); 
app.get('/pickeducationpanel', routes.pickeducationpanel); 
app.get('/pickincomepanel', routes.pickincomepanel); 
app.get('/selyearpanel', routes.selyearpanel);
app.get('/selmonthpanel', routes.selmonthpanel);
app.get('/seldaypanel', routes.seldaypanel);
app.get('/onlineTalk', routes.onlineTalk);




/* angularstrap modal template */

app.get("/",routes.index);


















app.post("/WebstormProjects/web/views/fetchReadProfile",routes.fetchReadProfile);





app.post("/oldMsg",function(req,res){
        var data = req.body;//json
        var dataArray = data["con"];//array
        var user = dataArray["user"];
        var msgContent = dataArray["msgContent"];
        var whoSent = dataArray["whoSent"];
        var Client = require("mysql").Client;
        client = new Client();
        client.user = "root";
        client.password ="5611559w";
        client.query("USE user");
        //准备数据库
        var queryString = "SELECT * FROM d WHERE account='" + user + "'";
        client.query(queryString,function(error,data){
           if(error){
             throw error;
           }
           var dataProcessed0 = eval("("+ data[0].msgAsyn+")");//json
           var dataProcessed1 = dataProcessed0['con'];//array
           //dataProcessed1 is the output from db
            for(var i = 0; i < dataProcessed1.length; i++){
               if(dataProcessed1[i]["fromFalseName"] === whoSent && dataProcessed1[i]["data"] === msgContent){
                    dataProcessed1[i]["isTheMsgNew"] = 0;
               }
            }
            //for
              dataProcessed0.con = dataProcessed1;
              var dataProcessed0Processed = JSON.stringify(dataProcessed0);//string
              var queryString2 = "UPDATE d SET msgAsyn='" + dataProcessed0Processed + "' WHERE account='" + user + "'";
              client.query(queryString2,function(error){
                   if(error){
                      throw error;
                   }
                 client.end();
              });
        });
        //query
});










/* for test angular */


app.get("/test",function(req,res){
       res.render("./test.ejs",{title:"sendImage"});    
});

/* for test angular  */





/************************************************************* remade*****************************/

app.get("/home",routes.home);
//new index page




/* global */
app.post("/global/uid",function(req, res){
    var userName = req.body.data;
    var queryString = "select personid from d where account='" + userName + "'";


    console.log(queryString);

    var client = utility.prepareDb();

    client.query(queryString, function(error, d){
        if(error){
            throw error;
        }
        console.log( 'result:' +JSON.stringify(d) );
        var uid = d[0]['personid'];
        res.send({data:uid});
        client.end();

    });
});

app.post("/global/userInfo", globalApi.returnUserInfo);
/* global */



/* landing */
app.post("/allUsers",routerLogin.showAllUsers);
app.get("/landing",routes.landing);
//show all register users in another page, not in index page
/* landing */



/* msg */
app.post("/msg/newMsg",routeMsg.countNewMsg);
app.post("/msg/msgsent",routeMsg.msgsent);
app.post("/msg/outboxAllMsg",routeMsg.returnAllSentMsg);//全部发送的消息
app.post("/msg/msgDetail",routeMsg.replayMsgDetail);
app.post("/msg/mySentMsg",routeMsg.getAllSentMsg);
app.post("/msg/turnOldMsg",routeMsg.changeNewMsgToOld);



app.get('/msg/sendMsg',routeMsg.sendMsg);
app.get('/msg/inbox',routeMsg.inbox);
app.get('/msg/outbox',routeMsg.outbox);
app.get('/msg/detail',routeMsg.msgDetail);
app.get('/msg/msgAsyn',routeMsg.getMsgAsyn);//所有信息

app.get('/msg/outboxDetail',routeMsg.outboxDetail);//get发件箱的详细页面


app.get("/msg/allSentMsg", function(req, res){
    var username = req.query.username;
    var queryString = "select * from message where username='" + username + "'";
    var client = utility.prepareDb();
    client.query(queryString, function(error, d){
        if(error){
            throw error;
        }

       // console.log(typeof d);

        res.send(d);
        client.end();

    });


});


/* msg */



/* cp */
app.get("/cp/matchCondition",routes.newMatchCondition);
/* cp */




/* edit */


app.get("/user/userDetails.ejs", routes.checkUserDetails);
//用户查看其它用户的详细资料
app.get("/user/match_condition",routes.getMatchCondition);
app.post("/user/edit_match_condition",routes.editMatchCondition);

app.get("/user/editBasic1.ejs",routes.edit);
app.get("/user/edit1.ejs",routes.edit);
app.get("/user/edit2.ejs",routes.edit);
app.get("/user/edit3.ejs",routes.edit);
app.get("/user/edit4.ejs",routes.edit);
app.get("/user/edit5.ejs",routes.edit);
app.get("/user/edit6.ejs",routes.edit);
app.get("/user/editPic.ejs",routes.edit);

app.get("/user/editProfile",routes.editProfile);
app.get("/user/userPhotoes.ejs",routes.edit);
app.get("/user/matchCondition.ejs",routes.matchCondition);
app.get("/route/login/showUserPic",routerLogin.showUserPic);


app.post("/user/editBasic1.ejs",routes.editPost);
app.post("/user/edit1.ejs",routes.editPost);
app.post("/user/edit2.ejs",routes.editPost);
app.post("/user/edit3.ejs",routes.editPost);
app.post("/user/edit4.ejs",routes.editPost);
app.post("/user/edit5.ejs",routes.editPost);
app.post("/user/edit6.ejs",routes.editPost);
app.post("/user/editPic.ejs",routes.editPost);

app.post("/user/matchConditionPost",routes.matchConditionPost);
app.post("/user/fetchCondtion",routes.fetchCondtion);
app.post("/user/whoOnline",routes.who_online);
/* edit */



/* user edit */
app.get("/edit/basic",routeEdit.editBasic);

app.post('/edit/basicInfo', routeEdit.basicInfo);
app.post('/edit/edit1', routeEdit.edit1);
app.post('/edit/edit2', routeEdit.edit2);
app.post('/edit/edit4', routeEdit.edit4);
app.post('/edit/edit5', routeEdit.edit5);

app.post('/edit/edit6', routeEdit.edit6);

app.post('/edit/edit3', routeEdit.edit3);

app.post('/edit/editAvatar', routeEdit.editAvatar);

/* user edit */


















































