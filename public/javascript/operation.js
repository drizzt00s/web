function Operation(){

}

Operation.prototype={

   submitValidation:function(){

   },

   emailValidation:function(id,eventType,errorWrapId){
      var target=$(document.getElementById(id));
      target.bind(eventType,function(e){
            var validation=new Validation();
            var email=target.val();
            email=$.trim(email);
            var isValidate=validation.validateEmail(email);
            if(isValidate){
            Operation.prototype.removeErrorMsg(errorWrapId);
           // Error.prototype.errorFlag=0;
          }
           else{
            //return false;
             var errorHandler=new Error();
             errorHandler.appendSingelErrorMsg(errorWrapId,"errorMail");
             Error.prototype.errorFlag=1;
          }
      });
   },

   mobileValidation:function(id,eventType,errorWrapId){
   	  var target=$(document.getElementById(id));
   	    target.bind(eventType,function(e){
            var validation=new Validation();
            var mobile=target.val();
            mobile=$.trim(mobile);
            var isValidate=validation.validateMobile(mobile);
            if(isValidate){
             Operation.prototype.removeErrorMsg(errorWrapId);
             // Error.prototype.errorFlag=0;

          }
           else{
            //return false;
             var errorHandler=new Error();
             errorHandler.appendSingelErrorMsg(errorWrapId,"errorMobile");
             Error.prototype.errorFlag=1;
          }
      });

   },
   
   emptyValidation:function(id,eventType,errorWrapId){
   	var target=$(document.getElementById(id));
   	target.bind(eventType,function(e){
        var validation=new Validation();
        var checkValue=target.val();
        var isEmpty=validation.checkStringEmpty(checkValue);
        if(isEmpty){
          var errorHandler=new Error();
          errorHandler.appendSingelErrorMsg(errorWrapId,"errorStringEmpty");
          Error.prototype.errorFlag=1;
        }
        else{
          Operation.prototype.removeErrorMsg(errorWrapId);
          // Error.prototype.errorFlag=0;
        }
   	});
   },

   misMatchValidation:function(id,previousId,eventType,errorWrapId){
   	 var target=$(document.getElementById(id));
   	 target.bind(eventType,function(e){
         var validation=new Validation();
         var checkVal=$(document.getElementById(id)).val();
         var checkPreviousVal=$(document.getElementById(previousId)).val();
         var isMatch=validation.stringIdentity(checkVal,checkPreviousVal);
         if(isMatch){
         	//相同
           Operation.prototype.removeErrorMsg(errorWrapId);
          //  Error.prototype.errorFlag=0;
         }
         else{
            var errorHandler=new Error();
            errorHandler.appendSingelErrorMsg(errorWrapId,"errorMissMatch");
            Error.prototype.errorFlag=1;
         }
   	 });
   },

   removeErrorMsg:function(errorWrapId){
   	   var errorWarp=$(document.getElementById(errorWrapId));
   	   errorWarp.find(".errorsHolder").remove();
   	
   	
   }



}