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
			scope.$parent.adress = scope.adress;



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

			pickCity = function(e){
				scope.cities = scope.selCity[$(e).attr('data')];
				scope.adress = $(e).text();
				scope.$parent.adress = scope.adress;
			


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
				scope.$parent.adress = scope.adress;

			

				
				scope.$apply();

			},

			scope.hide = function(o){
				o.hide();
			},

			scope.globalHide = function(){
				if(pickAddressPanel){
					pickAddressPanel.hide();
				}
				if(pickCityPanel){
					pickCityPanel.hide();

				}
			}

			bindHide = function(){
				$(".container-fluid").live('click', function(event){
					scope.globalHide();
				});
				$(".modal-content").live('click', function(event){
					return false;
				});
			};
			bindHide();

			$(".sel-detail a").live('mouseover', function(){
				$(this).css('color','#fff').css('background-color','#009ad6');
			});
			$(".sel-detail a").live('mouseout', function(){
				$(this).css('color','#666').css('background-color','');
			});
			$(".sel-c a").live('mouseover', function(){
				$(this).css('color','#fff').css('background-color','#009ad6');
			});
			$(".sel-c a").live('mouseout', function(){
				$(this).css('color','#666').css('background-color','');
			});

		}
	}
});

