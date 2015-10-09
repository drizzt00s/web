if(!ajaxData){
 var ajaxData={};
 ajaxData.sendPost=(function(){
    function _send(url,data){
	     alert(url);
		 alert(JSON.stringify(data));
	    $.ajax({
		 url:url,
		 data:{"d":data},
		 type:"post",
		 success:function(r){
		    if(r){
			  alert(r);
			}
		 },
		 error:function(xhr,statusText,e){
		    if(e){
			 throw e;
			}
		 }
		});
	}
	return {
	send:function(url,data){
	  _send(url,data);
	 }
	};
 })();
}
else{
 throw new Error("namespace in use");
}


function watchOthers(o){
  var findTarget=$(o).parents(".eachUserWrap").find(".userFalseName").text();
  var getAccount=getTargetCookie("username");
  var data={
       "findTarget":findTarget,
	   "getAccount":getAccount
  };
  ajaxData.sendPost.send("/WebstormProjects/web/ajax",data);
}