agMain.directive('pickaddress', function(){
	return {
		restrict:"E",
		templateUrl:'/pickAddress',
		scope:{

		},
		link:function(scope){
			scope.popUpAddress = function(){
				alert(11);
			}
		}
	}
});

