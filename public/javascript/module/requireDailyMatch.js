    function requireEachDayMatch(){
	     var username=getTargetCookie("username");
		 if(username){
		   var data={
		   "username":username
		 };
		 //var newAjax=new Search();
		  // newAjax.ajaxPost("/WebstormProjects/web/views/requireDayMatch.ejs",data,displayMatch);
	      // newAjax.ajaxPost("/WebstormProjects/web/views/requireDayMatch.ejs",data);

	      $.ajax({
           url:"/WebstormProjects/web/views/requireDayMatch.ejs",
           data:{"d":data},
           type:"post",
           success:function(r){
                 //alert(JSON.stringify(r));
             displayMatch(r);

           },
           error:function(statusText,xhr,e){
           	   alert("requireDayMatch error");

           },
           complete:function(){
           	  	  
           }

	      });
		 }
	  }


	  function displayMatch(o){
		    if(o.length!==0){
			  if(o.length<=10){
			   //如果长度小于10,则全部显示
			    for(var i=0;i<o.length;i++){
			     var userName=o[i]["account"];
			     var falseName=o[i]["falseName"];
				 var age=o[i]["age"];
				 var address=o[i]["province"];
				 if(o[i]["avatar"]){
				   var pic=eval("("+o[i]["avatar"]+")")["con"][0];
				   var pic="../uploads/pic/"+userName+"/"+pic;
				 }
				 else{
				    var pic="../uploads/pic/default/unknown.png"
				 }
			     var matchWrap=$("<div>"+
				                "<a href='userDetails.ejs?check="+userName+"'>"+"<span>"+falseName+"</span></a><br />"+
								 "<span>"+age+"</span><br />"+
			                     "<span>"+address+"</span><br />"+
								 "<img src='"+pic+"' />"+
								 "</div>");
				 matchWrap.appendTo($("#eachDayMatch"));
			   } 
			  }
			  else{
			    //如果长度大于10则随机选10条
				 var randomArray=frontCommon.array.getArrayRandomEle(o,10);
			     randomArray=randomArray();
				 for(var i=0;i<randomArray.length;i++){
			     var userName=randomArray[i]["account"];
			     var falseName=randomArray[i]["falseName"];
				 var age=randomArray[i]["age"];
				 var address=randomArray[i]["province"];
				 if(randomArray[i]["avatar"]){
				   var pic=eval("("+randomArray[i]["avatar"]+")")["con"][0];
				   var pic="../uploads/pic/"+userName+"/"+pic;
				 }
				 else{
				    var pic="../uploads/pic/default/unknown.png"
				 }
			     var matchWrap=$("<div>"+
				                "<a href='userDetails.ejs?check="+userName+"'>"+"<span>"+falseName+"</span></a><br />"+
								 "<span>"+age+"</span><br />"+
			                     "<span>"+address+"</span><br />"+
								 "<img src='"+pic+"' />"+
								 "</div>");
				 matchWrap.appendTo($("#eachDayMatch"));
			   } 
			  }   
			}
			else{
			  //throw new Error("ajax 返回的数组长度为0");
			  return false;
			}
		  }





