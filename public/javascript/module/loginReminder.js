//提醒用户某人某人上线
function loginReminder(e){
	var expectWhomLogin=$(e.target).parents(".eachUserWrap").find(".userFalseName").text();//希望观察谁登陆(昵称)
	var whoExpects=getTargetCookie("username");//谁希望观察(帐号)
	var url="/check/other_login";
	$.ajax({
		url:url,
		type:"post",
		data:{"expectWhomLogin":expectWhomLogin,"whoExpects":whoExpects},
		success:function(d){
			if(d=="1"){
				alert("添加成功,该人下次登录时,如果你在线的话系统会通知你");
			}
		},
		error:function(xhr,responseText,e){
			alert('添加失败');
		} 
	});
}