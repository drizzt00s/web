//新添加了一个表blacklist,并且删除了表extra2中的字段blacklist
     function addToBlackList(o){
	     var blackWhom=$(o).parents(".eachUserWrap").find(".eachUserWrap1").text();
	     var whoBlacks=getTargetCookie("username");
		 var d={
		 "blackWhom":blackWhom,
		 "whoBlacks":whoBlacks
		 };
		 var newSearch=new Search();
		 newSearch.ajaxPost("/check/backlist",d,callBack);
		 function callBack(){
		     alert(blackWhom+"已成功添加进黑名单");
		 } 
	  }