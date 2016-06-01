$(function(){
	function renderProfile(){
		var thisUrl=window.location.href;
		var username=getUserNameByUrlQuery(thisUrl);
		var url="/cp/checkProfile";
		$.ajax({
			url:url,
			type:"post",
			cache:false,
			data:{
				username:username
			},
			success:function(d){
				if(d){
					var profileUrl="../uploads/pic/"+username+"/"+d;
				} else {
					var profileUrl="../uploads/pic/default/unknown.png";
					$(".editProfle").empty();
				}
				$("#profile").attr("src",profileUrl);
			},
			error:function(jqXHR,textStatus,error){
				alert('error');
			}
		});
	}
 	renderProfile();

	function renderPictures(){
		var profileList=$("#renderPictures").text();
		if(profileList.indexOf("unknown")!=-1){
			insertedPictures="<img src='"+profileList+"'</>";
		} else {
			profileList=JSON.parse(profileList);
			var insertedPictures="";
			var url=window.location.href;
			var username=getUserNameByUrlQuery(url);
			for(var i=0;i<profileList.length;i++){
				insertedPictures+="<img style='cursor:pointer;' onclick='setProfile(this);' src='"+"../uploads/pic/"+username+"/"+profileList[i]+"' /><span style='cursor:pointer;' onclick='deletePic(this);'>删除照片</span><br />";
			}
		}
		$(".editProfle").append(insertedPictures);
	}
	renderPictures();
  })
  
function setProfile(o){
	var isConfirmed=confirm("确认将这张图片设置成头像?");
	if(!isConfirmed){
		return false;
	}
	var thisUrl=window.location.href;
	var username=getUserNameByUrlQuery(thisUrl);
	var profileUrl=o.src;
	var flag=profileUrl.lastIndexOf("/");
	profileUrl=profileUrl.substring(flag+1);
	var url="/cp/profile";
	$.ajax({
		url:url,
		type:"post",
		data:{
			profileUrl:profileUrl,
			username:username
		},
		cache:false,
		success:function(d){
			alert('set img success');
		},
		error:function(jqXHR,textStatus,error){
			alert('set img error');
		}		  
	});
}
  
function deletePic(o){
	//用户删除照片
	var thisUrl=window.location.href;
	var username=getUserNameByUrlQuery(thisUrl);
	var url="/cp/profile_deletion";
	var pic=$(o).prev();
	var picUrl=pic[0].src;
	var flag=picUrl.lastIndexOf("/");
	picUrl=picUrl.substring(flag+1);
	$.ajax({
		url:url,
		type:"post",
		data:{
			pic:picUrl,
			username:username
		},
		success:function(d){
			if(d){
				errorMsg=d["errorMsg"];
				if(errorMsg){
					alert(errorMsg);
				} else {
					alert("删除成功");
					window.location.href=window.location.href;
				}
			}
		},
		error:function(xhr,textStatus,error){
			alert('delete img fail');
		}
	});
}