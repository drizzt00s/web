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
var dbUtlity = require('dbUtlity.js');
var routerLogin = require('routerLogin.js');

















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
   

   
   var loverQuery = utility.searchLoverQuery(1,queryStringJson);
      
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




app.get("/WebstormProjects/web/views/posts.ejs",function(req,res){
    res.render("./posts.ejs",{title:"发帖"});
})

app.post("/WebstormProjects/web/views/posts.ejs",function(req,res){
    var postTitle=req.body.postTitle;
    var postBody=req.body.postContent; 
})



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















app.post("/WebstormProjects/web/views/ajaxPost.ejs",routes.ajaxQueryPost);
app.get("/WebstormProjects/web/views/ajaxShowUserPic.ejs",routes.ajaxShowUserPic);


app.get("/WebstormProjects/web/views/404.ejs",routes.errorPage);

app.post("/WebstormProjects/web/views/updateProfile",routes.updateProfile);
app.post("/WebstormProjects/web/views/deletePic",routes.deletePic);
app.post("/WebstormProjects/web/views/checkSentMsg",routes.checkSentMsgs);
app.post("/WebstormProjects/web/views/fetchReadProfile",routes.fetchReadProfile);
app.post("/WebstormProjects/web/views/updateProfileLink",routes.updateProfileLink);



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



app.post("/WebstormProjects/web/views/save.ejs",function(req,res){
 console.log(req.body.name);
 console.log(req.body.age);
});

app.get("/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
       // res.sendfile("./web/uploads/pic/"+username+"/"+pic);
        res.sendfile("/Users/wanmengj/pro/web/uploads/pic/"+username+"/"+pic);
        
});
app.get("/uploads/pic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/pic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/postPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/postPic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/postPicPreview/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/postPicPreview/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro/web/uploads/pic/"+username+"/"+pic);
});
//上传的图片的路由
app.get("/uploads/subPostPic/:name/:pic",function(req,res){
        var username=req.params.name;
        var pic=req.params.pic;
      //  res.sendfile("./web/uploads/subPostPic/"+username+"/"+pic);
       res.sendfile("/Users/wanmengj/pro/web/uploads/pic/"+username+"/"+pic);
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









/*===================================证件认证=============================*/
app.get("/payment",function(req,res){
res.render("displayRights.ejs",{"title":"特权"});
});



/*===================================加入黑名单==========================*/
app.post("/WebstormProjects/web/views/addToBlackList.ejs",function(req,res){
 var blackWhom=req.body.d.blackWhom;
 var whoBlacks=req.body.d.whoBlacks;
 var querySting = dbUtlity.createQueryString([whoBlacks],["username"],2,"blacklist");
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
       var queryString = dbUtlity.createQueryString(dataArray,column,1,"blacklist");
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

app.get("/WebstormProjects/web/views/whiteCollar.ejs",function(req,res){
  res.render("whiteCollar.ejs",{"title":"白领交友","postImgWarning":"","postImgWarningFlag":"0"});
});

app.post("/WebstormProjects/web/views/postPicPreview.ejs",routes.displayPostPicPreview);





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
         var newR=removeRedundant(storeNewR);
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
         var newR=removeRedundant(storeNewR);
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

/*=================爱情搜索================*/
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



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

















app.get("/",routes.index);
/*
app.get("/WebstormProjects/web/views/index.ejs",routes.index);
入口的备用路由，代码稳定后删除
*/



/* on login */
app.get("/route/login/showUserPic",routerLogin.showUserPic);
/*
app.get("/WebstormProjects/web/views/ajax.ejs",routes.ajaxQuery);
入口页面showUserPic的备用路由，代码稳定后删除
*/
app.post("/login",routerLogin.login);
/* on login */


/* search */
app.get("/search",routes.getSearchTpl);
app.post("/search",routes.search);
//高级搜索(基本完成)
/* search */



/* register */
app.get("/register",routes.register);
app.get("/logoff",routes.logoff);
app.post("/register",routes.registerPost);
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
/* forum */




/* map */
app.get("/mapSearch",routes.mapSearch);
/* map */





/* user */
app.get("/user/userDetails.ejs", routes.checkUserDetails);
//用户查看其它用户的详细资料
app.get("/user/match_condition",routes.getMatchCondition);
app.post("/user/edit_match_condition",routes.editMatchCondition);
app.get("/user/editBasic1.ejs",routes.edit);
app.post("/user/editBasic1.ejs",routes.editPost);
app.get("/user/edit1.ejs",routes.edit);
app.post("/user/edit1.ejs",routes.editPost);
app.get("/user/edit2.ejs",routes.edit);
app.post("/user/edit2.ejs",routes.editPost);
app.get("/user/edit3.ejs",routes.edit);
app.post("/user/edit3.ejs",routes.editPost);
app.get("/user/edit4.ejs",routes.edit);
app.post("/user/edit4.ejs",routes.editPost);
app.get("/user/edit5.ejs",routes.edit);
app.post("/user/edit5.ejs",routes.editPost);
app.get("/user/edit6.ejs",routes.edit);
app.post("/user/edit6.ejs",routes.editPost);
app.get("/user/editPic.ejs",routes.edit);
app.post("/user/editPic.ejs",routes.editPost);
app.get("/user/userPhotoes.ejs",routes.edit);
app.get("/user/matchCondition.ejs",routes.matchCondition);
app.post("/user/matchConditionPost",routes.matchConditionPost);
app.post("/user/fetchCondtion",routes.fetchCondtion);
app.get("/user/editProfile",routes.editProfile);
/* user */


app.get("/WebstormProjects/web/views/picResult.ejs",routes.edit);

app.post("/homePageHelp.ejs",routes.homePageHelp);



/* cp */

app.post("/cp/checkProfile",routes.checkProfile);


/* cp */
