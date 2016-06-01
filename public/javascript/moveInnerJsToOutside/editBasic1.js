$(function(){
	$("#editBasic1").bind("submit",function(e){
		var checkEmpty=$("#editOffspring").val();
		if(checkEmpty.indexOf("请选择")!=-1){
			alert("请选择有无孩子");
			return false;
		}
		var checkProvince=$("#birthPlaceProvince").val();
		var checkCity=$("#birthPlaceCity").val();
		if(checkProvince.indexOf("请选择")!=-1||checkCity.indexOf("请选择")!=-1){
			alert("请填写城市和省份");
			return false;
		}
	});
})
