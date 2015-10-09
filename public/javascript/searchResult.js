$(function(){
   var searchResultString=$("#searchResult").text();
   var searchResultArray=eval("("+searchResultString+")");
   for(var i=0;i<searchResultArray.length;i++){
      var pictureSrc=""
      ifHasPicture=eval("("+searchResultArray[i]["avatar"]+")");
      if(ifHasPicture){
        pictureSrc= "../uploads/pic/"+searchResultArray[i]["account"]+"/"+eval("("+searchResultArray[i]["avatar"]+")")["con"][0];
      }
      else{
        pictureSrc="../uploads/pic/default/unknown.png";
      }
     var eachSearchResult=$("<div class='eachSearchResult'>"+
                               "<div class='memberType' id='memberType'></div>"+
                               "<img src='"+pictureSrc+"'/><br />"+
                               "<span id='userFalseName' class='userFalseName'>"+searchResultArray[i]["falseName"]+"</span>"+
                               "<span id='realIdentity' class='realIdentity'><a href='#'></a></span><br />"+
                               "<span id='age' class='age'>"+((new Date().getFullYear())-searchResultArray[i]["birthYear"])+"</span>"+
                               "<span id='location' class='location'>"+searchResultArray[i]["province"]+"</span>"+
                               "<span id='education' class='education'>"+searchResultArray[i]["education"]+"</span><br />"+
                               "<span id='sayHellow' class='sayHellow'><a href='#'></a></span>"+
                               "<span id='sendMsg' class='sendMsg'><a href='#'></a></span>"+
                               "</div>");            
      $("#showSearchResult").append(eachSearchResult);    
      
   }
   //for
})