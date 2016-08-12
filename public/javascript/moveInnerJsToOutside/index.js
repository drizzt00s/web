$(function(){
	function cechkLogin(){
		if(checkLogin()){
			$(".watch").live("click",function(e){
				watch(e.target);
			});
			$(".lastLoginTime").live("click",function(e){
				checkLastLoginTime(e);
			});
			$(".loginReminder").live("click",function(e){
				loginReminder(e);
			});
		} else {
			alert("请登录");
		}
	}

	function showProfile(){
		//先检查用户是否已经登录
		if($("#checkLogin").val()==0){
			return false;
		}
		var username=getTargetCookie("username");
		var url="/homePageHelp.ejs";
		$.ajax({
			url:url,
			type:"post",
			data:{"username":username},
			success:function(d){
				if(d.indexOf("unknown.png")!=-1){
					var profileUrl=d;
				} else {
					var profileUrl="../uploads/pic/"+username+"/"+d;
				}
				$("#myProfile").attr("src",profileUrl);
				$("#myProfileLink").attr("href", "/user/editProfile?user="+username);
			},
			error:function(xhr,textStatus,e){
				if(e){
					throw e;
				}
			}
		});
	}
	
	function fetchDailyMatch(){
		if($("#checkLogin").val()==0){
			return false;
		}
		var url="/match/dailyMatch";
		var currentTime=(new Date()).getTime();
		$.ajax({
			url:url,
			data:{d:currentTime},
			cache:false,
			type:"post",
			success:function(d){
				if(d instanceof Object){
					for(var i=0;i<d.length;i++){
						if(i!=d.length-1){
							var dailyMatch="<div class='dailyMatch'>";
							if(d[i]["profile"].length==0){
								//没有profile
								dailyMatch+="<a href='userDetails.ejs?check="+d[i]["username"]+"' >"+"<img src='../uploads/pic/default/unknown.png' />"+"</a>";
							} else {
								dailyMatch+="<a href='userDetails.ejs?check="+d[i]["username"]+"' >"+"<img src='../uploads/pic/"+d[i]["username"]+"/"+d[i]["profile"]+"' />"+"</a><br />";
							}
							dailyMatch+="<a href='userDetails.ejs?check="+d[i]["username"]+"' >"+"<span>"+d[i]["falseName"]+"</span>"+"</a><br />";
							dailyMatch+="<span>"+d[i]["age"]+"</span>";
							dailyMatch+="<span>"+d[i]["location"]+"</span>";
							dailyMatch+="<span>"+d[i]["height"]+"</span>";
							dailyMatch=$(dailyMatch);
							$("#todayMatch").append(dailyMatch);
						}
						if(i==d.length-1){
							var matchString="你的择友要求:";
							matchString+=d[i]["conditionString"];
							$("#myMatch").text(matchString);
						}
					}  
				} else {
					alert(d);
				}
			}
		});	
	}

	function requireAutoWatch(){
		var username = getTargetCookie("username");
		if(username){
			var newAjax = new Search();
			newAjax.ajaxPost("/match/autoWatch",username,callBack);
			function callBack(o){
				for(var i = 0; i < o.length; i++){
					var falseName = o[i][0]["falseName"];
					var username = o[i][0]["account"];
					var address = o[i][0]["province"];
					var pic = o[i][0]["avatar"];
					if(!pic){
						pic = "../uploads/pic/default/unknown.png";
					} else {
						pic = "../uploads/pic/"+username+"/"+(eval("("+pic+")")["con"][0]);
					}
					var wrap = $("<div>"+
					"<span class='autoWatchFalseName'>"+falseName + "</span>"+
					"<span class='autoWatchAddress'>" + address + "</span>"+
					"<a href='userDetails.ejs?check=" + username + "'" + "><img class='autoWatchImg' src='" + pic + "' /></a>"+
					"</div>");
					wrap.appendTo($("#whoWatchMe2"));
				}
			}
		}
	}
	
	function requireNewMsgLength(){
		if($("#checkLogin").val()==0){
			return false;
		}
		var username=getTargetCookie("username");
		var data={
			"username":username
		};
		var url="/msg/newMsg";
		$.ajax({
			url:url,
			data:data,
			cache:false,
			type:"post",
			success:function(d){
				$("#remindNewMsg").text(d.newMsg);
			} 
		});
	}



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

	function checkIsSignUp(){
		var flag=$("#checkLogin").val();
		if(flag==1){
		$(".secret").css("display","block");
		$(".register").css("display","none");
		$(".userInfo").css("display","block");
		} else if(flag==0) {
		$(".secret").css("display","none");
		$(".register").css("display","block");
		$(".userInfo").css("display","none");
		}
	}



		function showUserPic(){
        var url = "/route/login/showUserPic";
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
                    var eachUserWrap=$("<div class='eachUserWrap' style='border:solid 1px red;'><span class='eachUserWrap1'>"+"<a href='#' class='userFalseName'>"+falseName+"</a>"+"</span>"+
                        "<img src='"+picUrl+"'"+" />"+
                        "<span class='eachUserWrap2'>"+ageProcessed+"</span>"+
                        "<span class='eachUserWrap3'>"+locationProcessed+"</span>"+
                        "<span class='eachUserWrap4'>"+height+"</span>"+
                        "<span class='eachUserWrap5'>"+education+"</span>"+
                        "<span class='eachUserWrap6'>"+income+"</span>"+
                        "<div class='eachUserWrap7'>"+selfIntro+"</div>"+
						"<span class='rights'><a href='/payment'>开通特权</a></span>"+
					    "<p class='lastLoginTime'><a href='#'>最后登陆时间</a></p>"+ //added on 2013/10/23
						"<p class='loginReminder'><a href='#'>上线提醒</a></p>"+  //added on 2013/10/24
                        "<p><span><a href='javascript:void(0)' id='sendMsg'>发送悄悄话</a></span></p>"+
                        "<p><span><a href='javascript:void(0)' id='sendMsg2'>在线聊天</a></span></p>"+
                       //"<p><span><a href='javascript:void(0)' id='watch' onclick='watch(this)'>关注Ta</a></span></p>"+
                        "<p><span><a href='#' class='watch'>关注Ta</a></span></p>"+
						"<p><span><a href='javascript:void(0)' id='addToBlackList' onclick='addToBlackList(this)'>加入黑名单</a></span></p>"+
                        "<div><a class='eachUserWrap8' href='/user/userDetails.ejs?check="+account+"'"+">查看详细</a></div>"+
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

	cechkLogin();

	showProfile();

	fetchDailyMatch();

	requireAutoWatch();

	requireNewMsgLength();
	//ajax获取用户收件箱里有几条未读信息
    //InitAjax(1);


    checkIsSignUp();

    showUserPic();
})


