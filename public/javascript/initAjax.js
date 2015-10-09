function InitAjax(initType){
             var queryIndex="";
             var account=getTargetCookie("username");
             var url="../../views/initAjax.ejs";
             if(initType==1){
                 queryIndex="unreadBoxMsg";
                 url="initAjax.ejs?queryType="+queryIndex+"&account="+account+"&dummy="+(new Date().getTime());
                 $.ajax({
                     url:url,
                     type:"GET",
                     data:null,
                     success:function(d){
                        var msgLength= d["unreadBoxMsgLength"];
                         var text=msgLength+"条新消息";
                         if(!msgLength){
                             text=""
                         }
                        $("#newMsgLength").text(text);
                     },
                     error:function(e){
                        throw e;
                     }
                 });
             }
       }



















