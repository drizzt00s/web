 $(function(){
     var indexArray=["gender","birthdayYear","birthdayMonth","birthdayDay","marriageStatus","education","height"];
   $("#submitRegister").bind(
        "click",function(){
         var isSubmitted=true;
         var password=$("#password").val();
         /*
         var birthPlaceProvince=$("#birthPlaceProvince").val();
         var birthPlaceCity=$("#birthPlaceCity").val();
         */
         //重新写过选择address的逻辑，现在是控件
         


         var falseName=$("#falseName").val();
         var gender=$("#gender").val();
         var email=$("#email").val();
         var trueName=$("#trueName").val();
         var indentityCard=$("#indentityCard").val();
         if(password==""){
             $("#password").parent().find("span.frontToEndErrorRegister").css("display","inline");
         }
         else{
             $("#password").parent().find("span.frontToEndErrorRegister").css("display","none");
         }
         if(birthPlaceProvince=="请选择"){
             $("#birthPlaceProvince").parent().find("span.frontToEndErrorRegister").css("display","inline");
         }
          else{
             $("#birthPlaceProvince").parent().find("span.frontToEndErrorRegister").css("display","none");
         }
           if(birthPlaceCity=="请选择"){
               $("#birthPlaceProvince").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#birthPlaceProvince").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           if(falseName==""){
               $("#falseName").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#falseName").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           if(gender=="请选择"){
               $("#gender").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#gender").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           if(email==""){
               $("#email").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#email").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           if(trueName==""){
               $("#trueName").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#trueName").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           if(indentityCard==""){
               $("#indentityCard").parent().find("span.frontToEndErrorRegister").css("display","inline");
           }
           else{
               $("#indentityCard").parent().find("span.frontToEndErrorRegister").css("display","none");
           }
           $.each($("span.frontToEndErrorRegister"),function(i,v){
                   var checkDisplay=$(v).css("display");
                   if(checkDisplay=="inline"){
                       isSubmitted=false;
                   }
               }
           )
           if(!isSubmitted){
             return false;
           }
           else{
               cookieHelpSelectIndex(indexArray);
             //  var selectDetail=$("#gender")[0].selectedIndex;
             //  document.cookie="selectedIndex1="+selectDetail;
           }
       }
   )
     function cookieHelpSelectIndex(selectIdArray){
         $.each(selectIdArray,function(i,v){
                 var eachSelect=document.getElementById(v);
                 var eachSelectedIndexValue= eachSelect.selectedIndex;
                 document.cookie="selectedIndex"+i+"="+eachSelectedIndexValue;
             }
         )
     }
     function lookIntoCookie(indexArray){
      var selectIndex =document.cookie;
      var selectIndexArray=selectIndex.split(";");
         $.each(selectIndexArray,function(i,v){
                 var eachSelect=document.getElementById(indexArray[i])
                 var eachValue= v.split("=");
                 var index=eachValue[1];
                 eachSelect.selectedIndex=index;
             }
         )
     }
     lookIntoCookie(indexArray);
  })