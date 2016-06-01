$(function(){
	$("#editStep2").bind("submit",function(e){
		var emptyFlag=false;
		/*
		edit2c //是否购车
		edit2d  //厨艺
		edit2e  //家务
		edit2f  //存款
		edit2g   //何时结婚
		edit2h   //是否想要孩子
		edit2i    //是否愿意和父母同住
		*/
		$.each($(".checkEmpty"),function(i,v){
			var checkEmpty=$(v).val();
			if(checkEmpty.indexOf("请选择")!=-1){
				var getInfo=$(v).prev().text();
				alert("请选择"+getInfo);
				emptyFlag=true;
				return false;
			}
		});
		if(emptyFlag){
			return false;
		}
		var checkEmpty1=$("#edit2c").val();
		var checkEmpty2=$("#edit2d").val();
		var checkEmpty3=$("#edit2e").val();
		var checkEmpty4=$("#edit2f").val();
		var checkEmpty5=$("#edit2g").val();
		var checkEmpty6=$("#edit2h").val();
		var checkEmpty7=$("#edit2i").val();
	});
})
