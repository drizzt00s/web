function updateMatchCondition(){
    var dataAll={};
	  var username=getTargetCookie("username");
    var storeData={};
	  var matchGender="男";
	  if($("#gender2").attr("checked")){
	  var matchGender="女";
	 }
	  var ageFrom=$("#ageFrom").val();
   	var ageTo=$("#ageTo").val();
   	var area1=$("#area1").val();
    var area2=$("#area2").val();
   	var ifHasPic=$("#ifHasImage").val();
    var height1=$("#height").val();
   	var height2=$("#height2").val();
   	var education=$("#education").val();
   	var profession=$("#profession").val();
   	var marrigeStatus=$("#marrigeStatus").val();
   	var monthIncome=$("#monthIncome").val();
    var housing=$("#housing").val();
   	var race=$("#race").val();
   	var xz=$("#xz").val();
   	var sx=$("#sx").val();
    var bloodType=$("#bloodType").val();
    var ifSmoking=$("#ifSmoking").val();
    var ifdrinking=$("#ifdrinking").val();
	  storeData.gender=matchGender;
   	storeData.ageFrom=ageFrom;
   	storeData.ageTo=ageTo;
   	storeData.area1=area1;
   	storeData.area2=area2;
   	storeData.height1=height1;
    storeData.height2=height2;
   	storeData.education=education;
   	storeData.profession=profession;
   	storeData.marrigeStatus=marrigeStatus;
   	storeData.monthIncome=monthIncome;
   	storeData.housing=housing;
   	storeData.race=race;
    storeData.xz=xz;
   	storeData.sx=sx;
   	storeData.bloodType=bloodType;
   	storeData.ifSmoking=ifSmoking;
   	storeData.ifdrinking=ifdrinking;
	  dataAll.username=username;
	  dataAll.data=storeData;
	  var newSearch=new Search();
	  newSearch.ajaxPost("/WebstormProjects/web/views/editMatchCondition.ejs",dataAll,editMatchCallback);
    function editMatchCallback(){
	  alert("修改速配条件成功!");
	 }
}
