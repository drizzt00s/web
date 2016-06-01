$(function(){
	$("#editStep3").bind("submit",function(e){
		//#edit3a,#edit3aSub,#edit3b 不能为空
		var errorMsg="不能为空!";
		var errorField="";
		var errorFlag=false;
		$.each($(".checkEmpty"),function(i,v){
			var eachValue=$(v).val();
			if(eachValue.indexOf("请选择")!=-1){
				errorFlag=true;
				var checkId=$(v).attr("id");
				if(checkId=="edit3a"||checkId=="edit3aSub"){
					var errorField="职业类别,";
				} else if (checkId=="edit3b"){
					var errorField="公司类别,";
				}
				errorMsg=errorField+errorMsg;
			}
		});
		if(errorFlag){
			alert(errorMsg);
			return false;
		}
	})
})
