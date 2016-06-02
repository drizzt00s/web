$(function(){
	function loadProof(){
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
							eachUserProof+="<span class='approveType'>"+proofType+"</span>"+"<img src='"+d[i][j]+"' /><a href='#' id='approveProof'>批准</a><a href='#' id='rejectProof'>拒绝</a><br />";
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
	}
	loadProof();

	$("#approveProof").live("click",function(e){
		var approveWhom=$(e.target).parents(".checkProofWrap").find(".proofUser").text();
		var approveWhom=approveWhom.substring(0,approveWhom.length-1);
		var approveType=$(e.target).parents(".eachProofWraps").find(".approveType").text();
		if(approveType.indexOf("身份证")!=-1){
			approveType="identitycard";
		}
		else if(approveType.indexOf("收入")!=-1){
			approveType="income";
		}
		else if(approveType.indexOf("身份证")!=-1){
			approveType="identitycard";
		}
		else if(approveType.indexOf("驾照")!=-1){
			approveType="drive";
		}
		else if(approveType.indexOf("港澳通行证")!=-1){
			approveType="gangao";
		}
		else if(approveType.indexOf("房产证")!=-1){
			approveType="housing";
		}
		var newSearch = new Search();
		var url="/backstageSupporter/proofs/approveProof";
		var data={
			approveWhom:approveWhom,
			approveType:approveType
		}
		function cb(){
			alert("审核成功!");
			window.location.href='/backstageSupporter/proof_validation';
		}
		newSearch.ajaxPost(url,data,cb);
	});
	//允许认证

	$("#rejectProof").live("click",function(e){
		var approveWhom=$(e.target).parents(".checkProofWrap").find(".proofUser").text();
		var approveWhom=approveWhom.substring(0,approveWhom.length-1);
		var approveType=$(e.target).parents(".eachProofWraps").find(".approveType").text();
		var proofImgName=$(e.target).parents(".eachProofWraps").find("img").attr("src");
		var pIndex=proofImgName.lastIndexOf("/");
		proofImgName=proofImgName.substring(pIndex+1);
		//文件,图片的名字
		if(approveType.indexOf("身份证")!=-1){
			approveType="identitycard";
		}
		else if(approveType.indexOf("收入")!=-1){
			approveType="income";
		}
		else if(approveType.indexOf("身份证")!=-1){
			approveType="identitycard";
		}
		else if(approveType.indexOf("驾照")!=-1){
			approveType="drive";
		}
		else if(approveType.indexOf("港澳通行证")!=-1){
			approveType="gangao";
		}
		else if(approveType.indexOf("房产证")!=-1){
			approveType="housing";
		}
		var newSearch=new Search();
		var url="/backstageSupporter/proofs/denyProof";
		var data={
			approveWhom:approveWhom,
			approveType:approveType,
			approveImgName:proofImgName
		}
		function cb(){
			alert("审核成功!");
			window.location.href='/backstageSupporter/proof_validation';
		}
		//回调
		newSearch.ajaxPost(url,data,cb);
	});
	//拒绝认证
})
