    function Validation(){
    }     


    Validation.prototype.validateEmail=function(s){
           var emailPatt = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
           return emailPatt.test(s);
    };

    Validation.prototype.validateMobile=function(s){
           var mobilePatth= /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
           return mobilePatth.test(s);
    }


    Validation.prototype.validateLength=function(s,length,isLess){
           if(isLess){
              if(s.length<length){
                 return true;
              }
              else{
                return false;
              }
           }
           else{
              if(s.length>length){
                 return true;
              }
               else{
                return false;
              }
           }
    }


    Validation.prototype.stringIdentity=function(s1,s2){
       return s1===s2;
    }


    Validation.prototype.checkStringEmpty=function(s){
         var stringLength=s.length;
         if(stringLength<=0){
           return true;
         }
         else{
          return false;
         }
    }




    




  



     var indexArray=["gender","birthdayYear","birthdayMonth","birthdayDay","marriageStatus","education","height"];


/*
注释掉$("#submitRegister").live,现在的注册全部改成angularJs提交 提交的逻辑写在对应的controller和service中 
*/

/*
   $("#submitRegister").live(
        "click",function(){
         
        
         var errorHandler=new Error();
         if(errorHandler.errorFlag==1){
           return false;
         }
       
         var isSubmitted=true;
         var password=$("#password").val();
      
         //重新写过选择address的逻辑，现在是控件
         var falseName=$("#falseName").val();
         var gender=$("#gender").val();
         var email=$("#email").val();


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

*/











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

  
