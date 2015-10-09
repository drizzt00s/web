//查看最后登录时间
function checkLastLoginTime(e){
	var checkLastLoginTime="checkLastLoginTime.ejs";
		var checkWhom= $(e.target).parents(".eachUserWrap").find(".userFalseName").text();
		$.ajax({
		  url:checkLastLoginTime,
		  type:"post",
		  data:{"d":checkWhom},
		  success:function(d){
		    alert("此人上次登陆时间为:"+d);
		  },
		  error:function(xhr,textStatus,e){
		    if(e){
			 throw e;
			}
		  }
		});
    }