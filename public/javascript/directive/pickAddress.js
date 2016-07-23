agMain.directive('pickaddress', function($modal){
	return {
		restrict:"E",
		templateUrl:'/pickAddress',
		scope:true,
		link:function(scope){
			var pickAddressPanel = null;
			var pickCityPanel = null;
			scope.cities = null;
			scope.adress = '';
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
			},

			scope.hide = function(o){
				o.hide();
			},

			pickCity = function(e){
				scope.cities = scope.selCity[$(e).attr('data')];
				scope.adress = $(e).text();
				scope.hide(pickAddressPanel);
				pickCityPanel = $modal({
					scope:scope,
					title:'pick up city',
					content:'select city',
					show:true,
					keyboard:false,
					backdrop:'static',
					templateUrl:'/pickcity'
				});
			},
			selAddress = function(e){
			    scope.hide(pickCityPanel);
				scope.adress = scope.adress + ' ' + $(e).text();
				scope.$apply();
			}
		}
	}
});

