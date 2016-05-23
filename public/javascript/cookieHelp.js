function getTargetCookie(cookieName){
    var userCookies=document.cookie;
    var userCookiesArray=userCookies.split(";");
    for(var i=0;i<userCookiesArray.length;i++){
        var checkCookie=userCookiesArray[i].indexOf(cookieName);
        if(checkCookie!=-1){
            var targetCookie=userCookiesArray[i];
            var targetValue=(targetCookie.split("="))[1];
        }
    }
    return targetValue;
}



function delCookie(name){
    document.cookie=name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function noticeUserOfMsg2(fromWhom){
    var whoSentMsg=null;
    $.each($(".eachUserWrap"),function(i,v){
            var findTarget=$(v).find(".userFalseName").text();
            if(fromWhom==findTarget){
                whoSentMsg=$(v).find("#sendMsg2");
                whoSentMsg.addClass("remindMsg");
                return false;
            }
        }
    )
}
//将发消息的那个人高亮

function getCurrentTime(){
 var newDate=new Date();
// var currentTime=newDate.toLocaleTimeString();
 var getHour=(newDate.getHours());
 var getMinute=(newDate.getMinutes());
 var getSecond=(newDate.getSeconds());
 var currentTime=getHour+":"+getMinute+":"+getSecond;
 var getYear=newDate.getFullYear();
 var getMonth=(newDate.getMonth())+1;
 var getDay=newDate.getDate();
 var currentTimeF=getYear+"-"+getMonth+"-"+getDay+" "+currentTime;
 return currentTimeF;
}
//取得当前时间,对服务器或者客户端

function getImageName(imageUrl){
   var imageUrlArray=imageUrl.split("\\");
   var imageUrlArrayLastElement=imageUrlArray[(imageUrlArray.length-1)];
   return imageUrlArrayLastElement;
}

function closeTalk(o){
  var r=$(o).parent(".onlineTalkInterface");
  r.remove();
}

function getUrlIndex(){
   var index=(window.location.href).indexOf("?pid=");
   var pid=parseInt(window.location.href.substring(index+5),10);//post's id
   return pid;
}

function getPostImgFlag(){
 var currentUrl=window.location.href;
 var findIndex=currentUrl.indexOf("&imgFlag=");
 var imgFlag=currentUrl.substring(findIndex+9);
 return imgFlag;
}

function createHtml(array,htmlType){
    var inserted="";
    if(htmlType==1){
        for(var i=0;i<array.length;i++){
            inserted+="<option>"+array[i]+"</option>\n";
        }
    }
    return inserted;
}

function createOptions(firstOption,length){
    var options="";
    for(var i=firstOption;i<length;i++){
        options+="<option>"+i+"</option>\n"
    }
    return options;
}

//这个函数去除数组中的重复元素
function removeRedundant(o){
    var storeNewO=[];
    for(var i=0;i< o.length;i++){
        if(i!=0){
            var isIn=detect(o[i]);
            if(isIn){
                storeNewO.push(o[i]);
                continue;
            }
            else{
                continue;
            }
        }
        storeNewO.push(o[i]);
    }
    function detect(item){
        var legal=true;
        for(var i=0;i<storeNewO.length;i++){
            if(storeNewO[i]===item){
                legal=false;
            }
        }
        return legal;
    }
    return storeNewO;
}


function getUserNameByUrlQuery(url){
    var flag=url.indexOf("=");
    var username=url.substring(flag+1); 
    return username;
}
