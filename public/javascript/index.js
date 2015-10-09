 $(function(){

     function checkIsSignUp(){
      var flag=$("#checkLogin").val();
      if(flag==1){
         $(".secret").css("display","block");
         $(".register").css("display","none");
         $(".userInfo").css("display","block");
      }
      else if(flag==0){
        $(".secret").css("display","none");
        $(".register").css("display","block");
        $(".userInfo").css("display","none");
      }
     }

      checkIsSignUp();

  })