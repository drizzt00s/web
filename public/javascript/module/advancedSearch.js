function advancedSearch(){
  var storeData={};
          var gender="男";
          if($("#gender2").attr("checked")){
             gender="女";
          }
       var ageFrom=$("#ageFrom").val();
       var ageTo=$("#ageTo").val();
       var area1=$("#area1").val();
       var area2=$("#area2").val();
       var ifHasPic=$("#ifHasImage")[0].checked; 
     if(ifHasPic){
       var picFlag=1;
     }
     else{
        var picFlag=0;
     }
       var height1=$("#height").val();
       var height2=$("#height2").val();
       var education=$("#education").val();
       var profession=$("#profession").val();
       var marrigeStatus=$("#marrigeStatus").val();
       var ifHasChildren=$("#ifHasChild").val();
       var monthIncome=$("#monthIncome").val();
       var ifHasCar=$("#ifHasCar").val();
       var housing=$("#housing").val();
       var race=$("#race").val();
       var xz=$("#xz").val();
       var sx=$("#sx").val();
       var bloodType=$("#bloodType").val();
       var ifSmoking=$("#ifSmoking").val();
       var ifdrinking=$("#ifdrinking").val();
       storeData.gender=gender;
       storeData.ageFrom=ageFrom;
       storeData.ageTo=ageTo;
       storeData.area1=area1;
       storeData.area2=area2;
       storeData.height1=height1;
       storeData.height2=height2;
       storeData.education=education;
       storeData.profession=profession;
       storeData.marrigeStatus=marrigeStatus;
       storeData.ifHasChildren=ifHasChildren;
       storeData.monthIncome=monthIncome;
       storeData.housing=housing;
       storeData.ifHasCar=ifHasCar
       storeData.race=race;
       storeData.xz=xz;
       storeData.sx=sx;
       storeData.bloodType=bloodType;
       storeData.ifSmoking=ifSmoking;
       storeData.ifdrinking=ifdrinking;
       storeData.ifHasPic=picFlag;
       var newSearch=new Search();
       //取值
     //alert(JSON.stringify(storeData));
       newSearch.ajaxSearch("/search",storeData,"post","advancedSearchResult");
}



