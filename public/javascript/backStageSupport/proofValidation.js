agMain.controller('proofValidation', function($scope, utility){

	$scope.loadProof = function (){
		var url="/backstageSupporter/proofs";
		$.ajax({
			url:url,
			data:null,
			type:"get",
			cache:false,
			success:function(d){
				for(var i=0;i<d.length;i++){
					var eachUserProof="<div>";
					for(var j in d[i]){
						eachUserProof+="<div class='eachProofWraps'>";
						if(j=="username"){
							eachUserProof+="<span class='proofUser'>"+d[i][j]+":</span><br />";
						} else {
							if(j=="identitycard"){
								var proofType="身份证:";
							}
							else if(j=="income"){
								var proofType="收入:";
							}
							else if(j=="drive"){
								var proofType="驾照:";
							}
							else if(j=="gangao"){
								var proofType="港澳通行证:";
							}
							else if(j=="housing"){
								var proofType="房产证:";
							}
							eachUserProof+="<span class='approveType'>"+proofType+"</span>"+"<img src='"+d[i][j]+"' /><a href='#' id='approveProof' ng-click='approve()'>批准</a><a href='#' id='rejectProof' ng-click='reject()'>拒绝</a><br />";
						}
						eachUserProof+="</div>";
					}
					eachUserProof=eachUserProof+"</div>";
					eachUserProof=$(eachUserProof);
					eachUserProof.addClass("checkProofWrap");
					eachUserProof.appendTo($(".wrap"));
				}
				function deleteEmptyList(){
					$.each($(".checkProofWrap"),function(i,v){
						var isProofEmpty=$(v).find(".approveType").length;
						if(isProofEmpty===0){
							$(v).remove();
						}
					});
				}
				//由于server端的逻辑不合理,导致这里当用户没有任何证件需要批准的时候，用户的用户名还是会显示
				//这个函数的作用是当出现这种情况的时候，将这个条目删除
				deleteEmptyList();
			},
			error:function(xhr,textStatus,e){
				if(e){
					throw e;
				}
			}
		});
	};
	$scope.loadProof();

	$scope.approve = function(){
		alert(1);
	};
	$scope.approve = function(){
		alert(2);
	};

});