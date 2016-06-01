$(function(){
	$("#editStep6").bind("submit",function(e){
		var emptyFlag=false;
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
	});
})
