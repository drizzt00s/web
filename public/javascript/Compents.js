/*ËùÓÐÊµÀý¶¼ÓÐ¸öË½ÓÐÊôÐÔerrorMsg
 * errorMsg.errorInfo=0ÎªÕý³£
 * ÆäËûÔ­ÐÍÊôÐÔ»¹Ã»¶¨Òå
 * 
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
if(!window.PH){
	  function PH(){
	  }
	}
/*==============================================================================================»ùÀà========================================================*/
    function phColor(){};
    phColor.prototype = new PH();
    phColor.prototype.constructor=phColor;
	phColor.prototype.changeSingleColor=function(elementIdArray,colorValue)
    {
	  if(!elementIdArray instanceof Array)
	  {
	    return false;
		alert("elementIdArray must be a string");
	  }
	  for(var i=0;i<elementIdArray.length;i++)
	  {
	   var element=document.getElementById(elementIdArray[i]);
	   $(element).css("color",colorValue);
	  }
	};
/*==============================================================phColor==============================================================*/
   function phDisplay(){
   }
   phDisplay.prototype=new PH();
   phDisplay.prototype.hiddenElements=function(hiddenType,elementIdArray){
       if(!elementIdArray instanceof Array)
	  {
	    return false;
		alert("elementIdArray must be a string");
	  }
	  if(hiddenType==0)
	  {
	      for (var i=0;i<elementIdArray.length;i++){
          $("#"+elementIdArray[i]).hide();
        }
	  }
	  else if(hiddenType==1)
	  {
	      for (var i=0;i<elementIdArray.length;i++){
          $("#"+elementIdArray[i]).remove();
        }
	  }
   };
   phDisplay.prototype.showElements=function(elementIdArray){
        if(!elementIdArray instanceof Array)
	  {
	    return false;
		alert("elementIdArray must be a string");
	  }
	  for (var i = 0; i < elementIdArray.length; i++) {
         var checkNodeName = $("#" + elementIdArray[i])[0].nodeName;
           if (checkNodeName == 'DIV' || checkNodeName == 'P' || checkNodeName == 'UL'||checkNodeName == 'ADDRESS'||checkNodeName == 'BLOCKQUOTE'||checkNodeName == 'CENTER'||checkNodeName == 'DIR'||checkNodeName == 'DL'||checkNodeName == 'FORM'||checkNodeName == 'H1'||checkNodeName == 'H2'||checkNodeName == 'H3'||checkNodeName == 'H4'||checkNodeName == 'H5'||checkNodeName == 'H6'||checkNodeName == 'HR'||checkNodeName == 'OL'||checkNodeName == 'TABLE'||checkNodeName == 'UL') {
              $("#" + elementIdArray[i]).css("display", "block");
       }
          else if (checkNodeName == 'SPAN' || checkNodeName == 'A') {
              $("#" + elementIdArray[i]).css("display", "inline");
       }
     }
   };
   phDisplay.prototype.sealLayer=function(){
       var sealLayer = document.createElement("div");
	   var checkScreenHeight=window.screen.availHeight;
	   var currentContenteight=document.body.clientHeight;
	   if(parseInt(currentContenteight)<parseInt(checkScreenHeight))
	   {
	     var trueHeight=window.screen.availHeight;
	   }
	   else if(parseInt(currentContenteight)>=parseInt(checkScreenHeight))
	   {
	     var trueHeight=document.body.clientHeight;
	   }
        $(sealLayer).attr("id", "seal");
        $(sealLayer).addClass("sealLayer");
        $(sealLayer).css({'width': '100%', 'height': trueHeight+'px', 'background-color': '#000', 'position': 'absolute', 'top': '0px', 'left': '0px' }).animate({ opacity: 0.4 }, 10, function () { $("body").append($(sealLayer)) });
   };
//ËøÆÁ
  phDisplay.prototype.switchTabOnly=function(tabClass,currentClass,eventType){
   $("."+tabClass).live(eventType,function(){
	  $(this).addClass(currentClass);
	})
	    if(eventType="mouseout")
   {
     $("."+tabClass).live(eventType,function(){
	  $(this).removeClass(currentClass);
	})
   }
  };
  //µ¥Ò»tabÇÐ»»
  phDisplay.prototype.switchTable=function(switchTabIdArray,switchDivIdArray,activatedTabStyle){
      for (var i = 0; i < switchTabIdArray.length; i++) {
            (function (s) {
                $("#" + switchTabIdArray[s]).live("click", function () {
                    checkCurrentStyle = $(this).hasClass(activatedTabStyle);
                    if (checkCurrentStyle) {
                        return false;
                    }
                    else {
                        $(this).addClass(activatedTabStyle);
                        $(this).siblings().removeClass(activatedTabStyle);
					    $(document.getElementById(switchDivIdArray[s])).css("display", "block");
                        $(document.getElementById(switchDivIdArray[s])).siblings().css("display", "none");
                    }
                })
           })(i);
       }
  };
//tabºÍÄÚÈÝÇÐ»»byID
  phDisplay.prototype.popDiv = function (cssClass, isSealed, contents) {
      if (isSealed) {
          var newPhDisplay = new phDisplay();
          newPhDisplay.sealLayer();
      }
      var popDiv = $("<div></div>").addClass(cssClass);
      popDiv.attr("id", "idForRemoval");
      popDiv.html(contents);
      popDiv.css("position", "absolute").css("z-index", "999999");
      popDiv.appendTo($("body"));
  };
//µ¯³ö²ã 
 phDisplay.prototype.divSelect=function(divSelectNumber,faterParent,wrapCssClass,divSelectCssClass,divSelectHtml){
  if(!divSelectHtml instanceof Array){
    return false;
  }
  var divSelectWrap=$("<div></div>");
  divSelectWrap.css("position","absolute").css("z-index","99999");
  divSelectWrap.attr("id","popDiv");
  divSelectWrap.addClass(wrapCssClass);
  for(var i=0;i<divSelectNumber;i++){
  var eachDivSelect=$("<div></div>");
  var eachDivSelectHtml=divSelectHtml[i];
  eachDivSelect.html(eachDivSelectHtml);
  eachDivSelect.addClass(divSelectCssClass);
  eachDivSelect.appendTo(divSelectWrap);
  divSelectWrap.appendTo(faterParent);
  }
 };
 //divÄ£Äâselect 
 phDisplay.prototype.getCoordinate=function(elementId){
 	coordinateObject=null;
 	var element=document.getElementById(elementId);
 	coordinateObject=element.getBoundingClientRect();
 	return coordinateObject;
 };
 //retun a object containing the element's coordinate
phDisplay.prototype.preLoadImg=function(imgUrl,targetId){
  var img=new Image();
  img.src=imgUrl;
  var trueImgUrl=img.src;
if(img.complete){
document.getElementById(targetId).src=trueImgUrl;
return true;
}
img.onload=function(){
document.getElementById(targetId).src=trueImgUrl; 
  }
 };
//Í¼Æ¬Ô¤¼ÓÔØ
phDisplay.prototype.preLoadShiftImg=function(imgIndexObject,newImg,imgArray,ifNext,targetId,loadingImgUrl,callback){
var imgLength=imgArray.length;
var newCount=imgIndexObject;
var i;
for(i in newCount){
	var imgIndex=i;
}
  	if(ifNext)
  {
  	if(newCount[imgIndex]!=imgLength-1){
  		document.getElementById(targetId).src=loadingImgUrl;
  	 newCount[imgIndex]++;
  	 var imgUrl=imgArray[newCount[imgIndex]];
  	 newImg.src=imgUrl;
  	 newImg.onload=function(){
  	 	document.getElementById(targetId).src=newImg.src;
  	 }
  	}
  	else{
  		callback();
  	} 
  }
   else{
   	 	if(newCount[imgIndex]!=0){
  		document.getElementById(targetId).src=loadingImgUrl;
  	 newCount[imgIndex]--;
  	 var imgUrl=imgArray[newCount[imgIndex]];
  	 newImg.src=imgUrl;
  	 newImg.onload=function(){
  	 	document.getElementById(targetId).src=newImg.src;
  	 }
  	}
  	else{
  		callback();
  	}
   }
 }
//ÓÃÁËÍ¼Æ¬Ô¤¼ÓÔØ¹¦ÄÜµÄÕÕÆ¬Ç½
/*==============================================================phDisplay==============================================================*/
function phShiftElements(){}
phShiftElements.prototype=new PH();
phShiftElements.prototype.shiftImg=function(imgId,imgSrcArray,fadeOutDuration,shiftGap,index){
var newPhShiftElements=new phShiftElements();
if(!imgSrcArray instanceof Array){
  return false;
 }
$(document.getElementById(imgId)).fadeOut(fadeOutDuration,function(){ 
countIndex=index;
countIndex++;
if(countIndex==imgSrcArray.length){
countIndex=0;
}
$(document.getElementById(imgId)).attr("src",imgSrcArray[countIndex]);
$(document.getElementById(imgId)).fadeIn(fadeOutDuration);
});
setTimeout(function(){newPhShiftElements.shiftImg(imgId,imgSrcArray,fadeOutDuration,shiftGap,countIndex)},shiftGap);
};
//Í¼Æ¬ÂÖÑ¯½¥Òþ½¥³ö
/*==============================================================phShiftElements==============================================================*/
function phValidation(){}
phValidation.prototype=new PH();
phValidation.constructor=phValidation;
phValidation.prototype.checkSpecialCharacter=function(e,specialCharacterType){  
if(specialCharacterType==0){
 if(e.shiftKey){
   return false;
 }
//½ûÓÃshift¼ü£¬²»ÄÜÓÃif(e.keyCode=16À´ÅÐ¶Ï)
 if(e.keyCode==192||e.keyCode==219||e.keyCode==221||e.keyCode==220||e.keyCode==186||e.keyCode==222||e.keyCode==191||e.keyCode==190||e.keyCode==188||e.keyCode==110||e.keyCode==106||e.keyCode==111)
 {
   return false;
  }
 }
};
//²»×¼ÊäÈëÈÎºÎÌØÊâ×Ö·û
phValidation.prototype.isArray=function(value){
return value&&typeof value==="object"&&typeof value.length==="number"&&typeof value.splice==="function"&&!(value.propertyIsEnumerable("length"))
}
/*==============================================================phValidation==============================================================*/
 function phEventDelegation(){
 this.errorMsg={};
 this.errorMsg.errorInfo=0;
 }
 phEventDelegation.prototype=new PH();
 phEventDelegation.prototype.constructor=phEventDelegation;
 phEventDelegation.prototype.eventDelegation=function(delegationElementId,delegatedEventId,eventType,eventHandle){
 	var delegationElement=document.getElementById(delegationElementId);
     $(delegationElement).bind(eventType,function(e){
     var eventTarget=e.target;
	 if(eventTarget.id==delegatedEventId)
	 {
	   eventHandle();
	 }
    })	
 };
 //ÊÂ¼þÎ¯ÍÐ
 phEventDelegation.prototype.javascriptMenu=function(memuContents,cssClass){
 	if(!memuContents instanceof Array){
return false;
}
$("html").bind(
"contextmenu",function(){
return false;
})
$("body").bind(
"mousedown",function(e){
if($("#jsMenu"))
{
 $('#jsMenu').remove()  
}
 var checkLeftOrRightButton=e.button;
  if(checkLeftOrRightButton==2)
 {
 var x=e.offsetX;
 var y=e.offsetY;
 if(e.offsetX==undefined){
  var posForFirefox=getOffset(e);
  var xFirefox=posForFirefox.offsetX;
  var yFirefox=posForFirefox.offsetY;
 }
 var xFinal=x||xFirefox;
 var yFinal=y||yFirefox;
 var wrap=$("<div></div>");
 wrap.css("position","absolute").css("z-index",99999);
 wrap.addClass(cssClass);
 wrap.attr("id","jsMenu");
 wrap.bind(
  "mousedown",function(e){
   e.stopPropagation();
  })
 for(var i=0;i<memuContents.length;i++){
    var eachMenu=$("<div></div>");
	var eachMenuContent=memuContents[i];
	eachMenu.html(eachMenuContent);
	wrap.append(eachMenu);
 }
 $("body").append(wrap);
 wrap.css("left",xFinal+"px").css("top",yFinal+"px");
 }
})
};
//×Ô¶¨Òå²Ëµ¥£¬¸²¸ÇÏµÍ³²Ëµ¥¡£±ØÐëÒªÓÃµ½fixOffset.js£¬À´ÐÞÕýoffsetXÔÚFFÏÂµÄ¼æÈÝÎÊÌâ£¬·ñÔòÎÞ·¨ÊµÏÖ
phEventDelegation.prototype.simulatedEvent=function(targetId,eventType,extraData){
	if(extraData){
	   if(!extraData instanceof Array){
	   return false;
	 }
	}
	var targetElement=document.getElementById(targetId);
	$(targetElement).trigger(eventType,extraData)
};
//Ä£ÄâÊÂ¼þ
//targetId:Ä£ÄâÊÂ¼þÄ¿±êÔªËØID
//eventType:Ä£ÄâÊÂ¼þÊÂ¼þÀàÐÍ
//extraData:´«µÝ¸øÔ­Ê¼ÊÂ¼þ¾ä±úµÄ¶îÍâ²ÎÊý£¬ÀàÐÍ±ØÐëÊÇArray,arrayÖÐµÄÃ¿Ò»Ïî¶ÔÓ¦ÓÚÔ­Ê¼ÊÂ¼þ¾ä±úµÄ2+nÏî
//extraData[0]¶ÔÓ¦Ô­Ê¼ÊÂ¼þ¾ä±úµÄµÚ¶þ¸ö²ÎÊý£¬extraData[1]¶ÔÓ¦Ô­Ê¼ÊÂ¼þ¾ä±úµÄµÚÈý¸ö²ÎÊý¡£ÒòÎª´«¸øÊÂ¼þ¾ä±úµÄµÚÒ»¸ö²ÎÊýÎÞ·¨¿ØÖÆ£¬ÊÇÓÉä¯ÀÀÆ÷×Ô¶¯´«µÝµÄ£¬ÇÒ±ØÎªevent¶ÔÏó
phEventDelegation.prototype.addEventHandlers=function(elementIdArray,eventTypeArray,eventHandlerArray){
	 if(elementIdArray instanceof Array&&eventTypeArray instanceof Array&&eventHandlerArray instanceof Array){
	 	 for(var i=0;i<elementIdArray.length;i++){
	 	 	var element=document.getElementById(elementIdArray[i]);
	 	 	$(element).bind(eventTypeArray[i],eventHandlerArray[i]
	 	 	)
	 	}	
	 	return this.errorMsg;
	}
	else{
		this.errorMsg.errorInfo=1;
		return this.errorMsg;
	}
};
//°ó¶¨ÊÂ¼þ¾ä±ú£¬Ö§³Ö¶àÔªËØ£¬¶àÊÂ¼þÀàÐÍ£¬¶à¾ä±ú£¬ËùÓÐµÄ²ÎÊýÎªÊý×é
/*==============================================================phEventDelegation==============================================================*/
function phNode(){};
phNode.prototype=new PH();
phNode.prototype.checkElementNode=function(event,eventTarget){
	event.stopPropagation();
	if(event.type!="click")
	{
	   return false;
	}
	var eventTarget=eventTarget;
	alert(eventTarget[0].nodeName);
};
//µã»÷²é¿´µãµÄÊÇÊ²Ã´ÔªËØ
phNode.prototype.getElementLeftAndTop=function(targetId){
	var elementOffset={};
	var target=document.getElementById(targetId);
    var actualLeft=target.offsetLeft;
    var actualTop=target.offsetTop;
    var thisOffsetParent=target.offsetParent;
    while(thisOffsetParent){
    	actualLeft+=thisOffsetParent.offsetLeft;
    	actualTop+=thisOffsetParent.offsetTop;
    	thisOffsetParent=thisOffsetParent.offsetParent;
    }
    elementOffset.offsetX=actualLeft;
    elementOffset.offsetY=actualTop;
    return elementOffset;
};
phNode.prototype.getPositionTarget=function(targetId){
	var target=document.getElementById(targetId);
	var thisOffsetParent=target.offsetParent;
    return thisOffsetParent;
};
//·µ»ØÒ»¸ö¶ÔÏó£¬°üº¬ÁËÄ¿±êÔªËØÔÚÎÄµµÖÐµÄXºÍY·½ÏòµÄÆ«ÒÆÁ¿£¬µ¥Î»ÊÇPX
phNode.prototype.loadScript=function(url){
	var script=document.createElement("script");
	script.type="text/javascript";
	script.url=url;
	document.body.appendChild(script);
}
//Ìí¼Ó¶¯Ì¬½Å±¾£¬Î´ÍêÉÆ
/*==================================================================phNode========================================================================*/
function Monitor(){};
Monitor.prototype=new PH();
Monitor.prototype.getClientSize=function(){
	var thisClientWidth=document.documentElement.clientWidth;//»ñµÃÒ³ÃæhtmlÔªËØµÄ¿É¼ûÇøÓòµÄ¿í¶È
	var thisClientHeight=document.documentElement.clientHeight;//»ñµÃÒ³ÃæhtmlÔªËØµÄ¿É¼ûÇøÓòµÄ¸ß¶È
	return {
		width:thisClientWidth,
		height:thisClientHeight
	};
};
/*==================================================================Monitor========================================================================*/
function Range(){};
Range.prototype=new PH();
Range.prototype.myCreateRange=function(targetId,rangeType){
	if(typeof document.createRange=="function"){
		var newRange=document.createRange();
		var targetElement=document.getElementById(targetId);
		if(rangeType==1){
			newRange.selectNode(targetElement);
			return newRange;
		}
		else{
			newRange.selectNodeContents(targetElement);
			return newRange;
		}
	}
	else{
		return false;
	}
}
/*==================================================================Range========================================================================*/
function Sortvalue(){};
Sortvalue.prototype=new PH();
Sortvalue.prototype.constructor=Sortvalue;
Sortvalue.prototype.sortByValue=function(valueArray,ascending){
 var sortbyAscending=function(a,b){
   return a-b;
 };
 var sortByDescending=function(a,b){
   return b-a;
 };
 if(ascending){
  valueArray.sort(sortbyAscending);
  return valueArray;
 }
 else{
  valueArray.sort(sortByDescending);
  return valueArray;
 }
}
//µÚÒ»¸ö²ÎÊýÊÇÒ»¸ö×Ö·û´®Êý×é£¬½«»á±»ÅÅÐò;µÚ¶þ¸ö²ÎÊýÊÇ¸ö²¼¶ûÖµ£¬true´ú±íÉýÐò,false´ú±í½µÐò






/*===========================================================Sortvalue===================================================*/



function Others(){};
Others.prototype=new PH();
Others.prototype.constructor=Others;
Others.prototype.createArray=function(arrayLength,arrayJson){
var newArray=[];
for(var i=0;i<arrayLength;i++){
newArray[i]=arrayJson[i.toString()];
}
return newArray;
}
//´´ÔìÒ»¸öÊý×é1
Others.prototype.createArrayJson=function(arrayJson){
 var newArray=new Array();
 var p;
 var jsonLegnth=0;
 for(p in arrayJson){
 newArray[jsonLegnth]=arrayJson[p];
 jsonLegnth++;
 }
 return newArray;
}
//´«ÈëÒ»¸öjsonÈ»ºó·µ»ØÊý×é£¬¿É´´Ôì¶þÎ¬Êý×é
Others.prototype.arrayToJson=function(valueArray,indexArray){
var newJson={};
for(var i=0;i<valueArray.length;i++){
  newJson[indexArray[i]]=valueArray[i];
 }
 return newJson;
}
Others.prototype.jsTrim=function(targetString){
   var stringArray=targetString.split("");
   var newStringArray=[];
   for(var i=0;i<stringArray.length;i++){
      if(stringArray[i]!=" "){
	     newStringArray.push(stringArray[i])
	  }
   }
   var newString=newStringArray.join("");
   return newString;
}
//É¾³ý×Ö·û´®ÖÐµÄËùÓÐ¿Õ¸ñ
/*===============================================================Others===========================================================================*/


