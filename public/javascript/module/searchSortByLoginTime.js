function sortSearchResults(e){ 
		 var sortTypeClass=e.data.sortTypeClass
		 var store=[];
		   $.each($("."+sortTypeClass),function(i,v){
		       store.push(parseInt($(v).text()));
		   });
		  var storeNew = store.sort(function sortNumber(a, b){
		      return b-a
           });
		  for(var z=0;z<storeNew.length;z++){
		    $.each($(".eachResult"),function(i,v){
		       if(storeNew[z]==parseInt($(v).find("."+sortTypeClass).text())){
			     $("#advancedSearchResult").append($(v));
			   }
		   });
		}  
	}
