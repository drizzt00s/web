$(function(){
	function cechkLogin(){
		if(checkLogin()){
			requireEachDayMatch();
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
		var username=getTargetCookie("username");
		if(username){
			var newAjax=new Search();
			newAjax.ajaxPost("/match/autoWatch",username,callBack);
			function callBack(o){
				for(var i=0;i<o.length;i++){
					var falseName=o[i][0]["falseName"];
					var username=o[i][0]["account"];
					var address=o[i][0]["province"];
					var pic=o[i][0]["avatar"];
					if(!pic){
						pic="../uploads/pic/default/unknown.png";
					} else {
						pic="../uploads/pic/"+username+"/"+(eval("("+pic+")")["con"][0]);
					}
					var wrap=$("<div>"+
					"<span class='autoWatchFalseName'>"+falseName+"</span>"+
					"<span class='autoWatchAddress'>"+address+"</span>"+
					"<a href='userDetails.ejs?check="+username+"'"+"><img class='autoWatchImg' src='"+pic+"' /></a>"+
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

	cechkLogin();

	showProfile();

	fetchDailyMatch();

	requireAutoWatch();

	requireNewMsgLength();
	//ajax获取用户收件箱里有几条未读信息
    //InitAjax(1);
})
