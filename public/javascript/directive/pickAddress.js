agMain.directive('pickaddress', function($modal){
	return {
		restrict:"E",
		templateUrl:'/pickAddress',
		scope:{


		},
		link:function(scope){
			var pickAddressPanel = null;


			scope.popUpAddress = function(){
				pickAddressPanel = $modal({
					scope:scope,
					title:'pick up address',
					content:'select address',
					show:true,
					keyboard:false,
					backdrop:'static',
					templateUrl:'/pickaddresspanel'

				});
			}



		}
	}
});

