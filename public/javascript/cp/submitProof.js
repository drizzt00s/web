agMain.controller('submitProof', function($scope, utility){
	$scope.submitFile = function(o){
		var ele = o.target;
		var checkUsername = utility.getTargetCookie("username");
		if(checkUsername){
			$(ele).parent("form").find(".checkAccount").val(checkUsername);
			var checkFile=$(ele).parent("form").find(".selectFile").val();
			if(checkFile){
				$(ele).parent("form").submit();
			} else {
				alert("请选择文件");
			}
		} 
	};
});