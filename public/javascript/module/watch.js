function watch(o){
       var target=$(o).parents(".eachUserWrap").find(".userFalseName").text();
       var whoWatch=getTargetCookie("username");
       var data={
         "target":target,
         "whoWatch":whoWatch
       };
       var newAjax=new Search();
       newAjax.ajaxPost("/WebstormProjects/web/ajax",data,callBack);
       function callBack(){
           var makeHtml=new CreateHtml();
           makeHtml.makePlainHtml("关注成功，你可以在我的关注中查看已关注的人","watchSuccess");
       }
     }