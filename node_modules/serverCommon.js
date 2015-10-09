exports.getCurrentTime=function(){
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