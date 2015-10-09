function Error(){

}

Error.prototype={
    errorMsg:{
    	"errorMail":"请输入正确的电子邮件",
    	"errorMobile":"请输入正确的手机号码",
    	"errorMissMatch":"二次输入不相符",
    	"errorStringEmpty":"请填写内容"
    },

    appendSingelErrorMsg:function(id,errorType){
        var errors=(Error.prototype.errorMsg)[errorType];
        var errorsHolder=$("<span class='errorsHolder'></span>");
        errorsHolder.text(errors);
       $(document.getElementById(id)).append(errorsHolder);
    },

    errorFlag:0
};

