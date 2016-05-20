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


//用户昵称不可以重复
//页面有时候会出现死锁的情况 原因不明 需要解决
//isonline有bug 0表示不在线 1表示在线 可能是用户退出登录的时候字段没有更新


require('socketAll.js').startSocket();
var utility = require('utlity.js');




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

app.get("/WebstormProjects/web/views/searchLove.ejs",function(req,res){
   var Client =require("mysql").Client;
   var client =new Client();
   client.user="root";
   client.password="5611559w";
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
   
   var loverQuery = utility.searchLoverQuery(1,queryStringJson);
   
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

app.post("/WebstormProjects/web/views/changeNewMsgToOld.ejs",function(req,res){
        var data=req.body;//json
        var dataArray=data["con"];//array
        var user=dataArray["user"];
        var msgContent=dataArray["msgContent"];
        var whoSent=dataArray["whoSent"];
        var Client =require("mysql").Client;
        client =new Client();
        client.user="root";
        client.password="5611559w";
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
    client.password="5611559w";
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


app.get("/",routes.index);

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
 console.log(req.body.name);
 console.log(req.body.age);
});

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

app.post("/login",function(reg,res){
    var account=reg.body.username;
    var pass=reg.body.pass;
    var User=user.user;
    var userInstance=new User();
    userInstance.loginCheck(account,pass,reg,res);
});

app.post("/WebstormProjects/web/views/expectOtherLogin.ejs",function(req,res){
    var expectWhomLogin=req.body.expectWhomLogin; //希望谁登录时提醒(昵称)
    var whoExpects=req.body.whoExpects; //谁希望(帐号)
    var client=utility.prepareDb();
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
//特定用户登录时提醒

app.post("/WebstormProjects/web/views/checkLastLoginTime.ejs",function(req,res){
    var checkWhoseLastLogin=req.body.d;
    var client=utility.prepareDb();
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
            var client=utility.prepareDb();
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
             var client=utility.prepareDb();
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
            var client=utility.prepareDb();
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
           var client=utility.prepareDb();
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
            var client=utility.prepareDb();
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
          var client=utility.prepareDb();
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
            var client=utility.prepareDb();
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
         var client=utility.prepareDb();
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
            var client=utility.prepareDb();
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
           var client = utility.prepareDb();
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
});

app.get("/WebstormProjects/web/views/loadProof.ejs",function(req,res){
 //查询credits表,返回数据给业务人员操作
 var queryString="select username,identitycard,income,drive,gangao,housing from credits";
 var client=utility.prepareDb();
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
});

app.post("/WebstormProjects/web/backstage/:operationType",function(req,res){
 var operation=req.params.operationType;
 if(operation=="approveProof"){
    var approveWhom=req.body.d.approveWhom;
    var approveType=req.body.d.approveType;
    var client=utility.prepareDb();
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
     var client=utility.prepareDb();
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
    var client=utility.prepareDb();
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
});

/*===================================提交证件=============================*/
app.get("/WebstormProjects/web/views/submitProof.ejs",function(req,res){
res.render("submitProof.ejs",{"title":"提交证件"});
});

app.get("/WebstormProjects/web/views/proofValidation.ejs",function(req,res){
res.render("proofValidation.ejs",{"title":"证件审核"});
});

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

/*===================================修改随配条件=============================*/
app.get("/WebstormProjects/web/views/editMatchCondition.ejs",function(req,res){
res.render("editMatchCondition.ejs",{"title":"修改速配条件"});
});

app.post("/WebstormProjects/web/views/editMatchCondition.ejs",function(req,res){
  var userName=req.body.d.username;
  var matchData=req.body.d.data;//json
  var storeData=[];
  for(var i in matchData){
    storeData.push(matchData[i]);
  }
  storeData.push(userName);
  var columnArray=["gender","ageFrom","ageTo","area1","area2","height1","height2","education","job","marrige","monthIncome","housing","race","xz","sx","bloodType","ifSmoking","ifDrinking","userName"];
  var client=utility.prepareDb();
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
});

/*===================================证件认证=============================*/
app.get("/WebstormProjects/web/views/displayRights.ejs",function(req,res){
res.render("displayRights.ejs",{"title":"特权"});
});

/*===================================特权相关=============================*/
app.get("/WebstormProjects/web/views/mapSearch.ejs",function(req,res){
res.render("mapSearch.ejs",{"title":"地图搜索"});
});

/*===================================加入黑名单==========================*/
app.post("/WebstormProjects/web/views/addToBlackList.ejs",function(req,res){
 var blackWhom=req.body.d.blackWhom;
 var whoBlacks=req.body.d.whoBlacks;
 var querySting=common.processString.createQueryString([whoBlacks],["username"],2,"blacklist");
 var client=utility.prepareDb();
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
});

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
});

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
    var client=utility.prepareDb();
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
      var client=utility.prepareDb();
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
    var client=utility.prepareDb();
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
 var client=utility.prepareDb();
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
 client.password="5611559w";
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
     client.password="5611559w";
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
     client2.password="5611559w";
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
      client.password="5611559w";
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
     client2.password="5611559w";
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
});

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
   client.password="5611559w";
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
  client.password="5611559w";
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
   client.password="5611559w";
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
});
//回复子贴

app.get("/WebstormProjects/web/views/getFinalSubReps.ejs",function(req,res){
   var pid=req.query.Pid;
   var Client=require("mysql").Client;
   var client=new Client();
   client.user="root";
   client.password="5611559w";
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
});

app.post("/WebstormProjects/web/views/returnIcons.ejs",function(req,res){
    var allUSer=req.body.allUser;//array
    var storePicUrl=[];
    var storeAccount=[];
    var client=utility.prepareDb();
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
});
//postDetail.ejs页面返回所有回帖人的头像

app.post("/WebstormProjects/web/views/replyPostOwnerIcon.ejs",function(req,res){
  var postOwner=req.body.postOwner;
  var client=utility.prepareDb();
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
});

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
});

app.post("/WebstormProjects/web/ajax",function(req,res){
    var checkFlag=req.body.d.flag;
    if(checkFlag==="checkWatch"){
      var checkUsername=req.body.d.username;
      var dataArray=[checkUsername];
      var columnArray=["username"];
      var queryType=2;
      var tableName="extra2";
      var queryString=common.processString.createQueryString(dataArray,columnArray,queryType,tableName);
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
    var client=utility.prepareDb();
    client.query(queryString,function(e){
        if(e){
          throw e;
        }
        res.send("1");
    });
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
    client.password="5611559w";
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
     utility.loopQuery(whoIsOnlineArray,res);//json,包含目前在线用户的信息,但是不包含图片
   }
   else{
    throw new Error("没传值过来");
   }
});

/*===================================每日速配=============================*/
var storeAll=[];
app.post("/WebstormProjects/web/views/requireDayMatch.ejs",function(req,res){
  var username=req.body.d.username;
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
  var client=utility.prepareDb();
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


app.get("/user/:uid",function(req,res){
var thisUid=req.params.uid;
res.render("./user.ejs",{"title":"test","id":thisUid});
});















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
           var client=utility.prepareDb();
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



