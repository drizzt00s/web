 window.onload=function(){
        var performValidation=new Operation();
        performValidation.emailValidation("username","blur","l1");
        performValidation.emptyValidation("password","blur","l2");
        performValidation.emptyValidation("falseName","blur","l4");
        performValidation.misMatchValidation("checkPassword","password","blur","l3");
        performValidation.mobileValidation("mobile","blur","l5");

        


  }

  
/*
 注册页面验证
*/

    
  