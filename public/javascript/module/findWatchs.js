//我关注的人有哪些
function findWatchs(){
        var isLogin=getTargetCookie("username");
        if(!isLogin){
            var newCreateHtml=new CreateHtml();
            newCreateHtml.makePlainHtml("请先登录","watchSuccess");
			return false;
        }
        var username=getTargetCookie("username");
        var data={
          "username":username,
          "flag":"checkWatch"
        };
       var newAjaxSearch=new Search();
       newAjaxSearch.ajaxPost("/WebstormProjects/web/ajax",data,lookResult);
       function lookResult(o){
	       $("#whoWatchMe").empty();
		   $("#showing").empty();
	       for(var i=0;i<o.length;i++){
		      var falseName=o[i][0]["falseName"];
			  var address=o[i][0]["province"];
			  var birthYear=parseInt(o[i][0]["birthYear"],10);
			  var age=(new Date().getFullYear())-birthYear;
			  var account=o[i][0]["account"];
			  if(o[i][0]["avatar"]){
			    var pic=(eval("("+o[i][0]["avatar"]+")"))["con"][0];
			    pic="../uploads/pic/"+account+"/"+pic;
			  }
			  else{
			    var pic="../uploads/pic/default/unknown.png"
			  }
			  var wrap=$("<div class='watchWrap'>"+
			             "<a href='userDetails.ejs?check="+account+"'"+"><img src='"+pic+"' /></a>"+
						 "<span>"+falseName+"</span>"+
						 "<span>"+address+"</span>"+
			             "<span>"+age+"</span>"+
						 "</div>");
			  $("#showing").append(wrap);
		   }
	   }
     }
