
    var frontCommon={};
	frontCommon.string=(function(){
	   function _reverseString(s){
	   var readNewArray=[];
	   var index=(s.length)-1;
	   var sArray=s.split("");
	   reverseString(sArray);
	   function reverseString(o){
	      if(index<0){
		   return false;
		  }
	      readNewArray.push(o[index]);
		  index=index-1;
		  reverseString(o);
	   }
	     var readNewArray2=function(){
	     var r=readNewArray.join("");
		 return r;
	   };
	   return readNewArray2;
	} 
	return {
	  reverseString:function(s){
	     var r=_reverseString(s);
		 var r2=r();
		 return r2;
	  }
	};
   })();
    frontCommon.display=(function(){
           function _hideElement(target){
                var findParentWrap=$(target).parents(".watchSuccess");
                findParentWrap.remove();
           }   
	//���رհ�
        return {
            hideElement:function(o){
                _hideElement(o);
            }
        };
    })();
	frontCommon.array=(function(){
	    function _getArrayRandomEle(array,counts){
        //ȡ�������е����ĳ����Ԫ��
     var storeNewArray=[];
	 var index=1;
	 getRandom(array);
	 function getRandom(array){
	    if(index===(counts+1)){
		  return false;
		}
	    var myRandom=Math.random()
        myRandom=parseInt(myRandom*(array.length));
		var eachRandom=array[myRandom];
		storeNewArray.push(eachRandom);
		array.splice(myRandom,1);
	    index++;
		getRandom(array);
	 }
	 var returnRandom=function(){
	    return storeNewArray;
	 }
	    return returnRandom;
   }
   //���رհ�
   return {
       getArrayRandomEle:function(array,counts){
	      var randomArray=_getArrayRandomEle(array,counts);
		  return randomArray;
	   }
     };
	})();







function moveBroadcast(){
	var movingWidth=(window.screen.width)+50;
	$("#broadcastWrap").animate({
		right: "+="+movingWidth
	}, 3000, function(){
		$("#broadcastWrap").remove();
	});
}