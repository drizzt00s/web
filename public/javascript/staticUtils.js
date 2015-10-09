$(function(){
      function fillUpUser(){
         var username=getTargetCookie("username");
         if(username&&username!=0){
            $("#welcomeUser").show()
            $("#userLogin").text(username);
         }
          else{
             $("#welcomeUser").hide()
             $("#userLogin").text("");

         }
      }
    fillUpUser();









})