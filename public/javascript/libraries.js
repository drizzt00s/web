﻿function Search(){    function _ajaxPost(url,data,callBack){        $.ajax({             url:url,             type:"post",             data:{d:data},             success:function(r){                if(r){                  if(r==="1"){                    if(callBack){                       callBack();                    }                  }				         else if(r instanceof Array){				           callBack(r);				          }				         else{				    alert(r);//意外信息				  }                }             },            error:function(statusText,xhr,e){                if(e){                   throw e;                }            }        });    }    function _ajaxSearch(url,data,type,htmlContainerId){        $.ajax({           url:url,           data:{"d":data},           type:type,           success:function(d){		                   if(d&&d instanceof Array){				 if(d.length<=0){					  alert("没有找到搜索结果");					   $(document.getElementById(htmlContainerId)).empty();					  return false;				 }                  $(document.getElementById(htmlContainerId)).empty();                  //返回的数据类型是数组                for(var i=0;i<d.length;i++){								    var level=d[i]["level"];										//alert(level);				    var lastLoginTime=d[i]["loginTimeInt"];                    var falseName=d[i]["falseName"];                    var age=d[i]["age"];                    var location=d[i]["province"];                    var education=d[i]["education"];                    var account=d[i]["account"];                    var pic=d[i]["avatar"];                    if(pic){                     var pic=eval("("+pic+")");                     var pic= (pic["con"])[0];                     var pic="../uploads/pic/"+account+"/"+pic;                    }                    else{                        var pic="../uploads/pic/default/unknown.png"                    }                    var wrap=$("<div class='eachResult'>"+                              "<img class='advancedSearch0' src='"+pic+"' / >"+							  "<div  style='margin-left:10px;' class='proofWrap'></div>"+                              "<span style='margin-left:10px;' class='advancedSearch1'>"+falseName+"</span>"+                              "<span style='margin-left:10px;' class='advancedSearch2'>"+age+"</span>"+                              "<span style='margin-left:10px;' class='advancedSearch3'>"+location+"</span>"+                              "<span style='margin-left:10px;' class='advancedSearch4'>"+education+"</span>"+							  "<span style='margin-left:10px;display:none' class='lastLoginTime'>"+lastLoginTime+"</span>"+							  "<span style='margin-left:10px;' class='proofRanking'>"+level+"</span>"+                              "</div>");                    $(document.getElementById(htmlContainerId)).append(wrap);					 //再添加一个逻辑 收集查询结果的全部昵称去credits表里找认证等级 										                }              }           },           error:function(xhr,statusText,error){             if(error){               throw error;             }           }        });	   //搜集前端的全部数据	}   this.ajaxSearch=function(url,data,type,htmlContainerId){       _ajaxSearch(url,data,type,htmlContainerId);    };    this.ajaxPost=function(url,data,callBack){		  _ajaxPost(url,data,callBack);    };};function CreateHtml(){   function _makePlainHtml(plainWords,cssClass){        var wrap=$("<div></div>");        wrap.text(plainWords);        wrap.addClass(cssClass);        $("<button onclick='frontCommon.display.hideElement(this);'>确定</button>").appendTo(wrap);        wrap.appendTo($("body"));   }   this.makePlainHtml=function(plainWords,cssClass){       _makePlainHtml(plainWords,cssClass);   };}