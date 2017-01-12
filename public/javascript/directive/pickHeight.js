define(['angularAMD'], function(angularAMD){
	angularAMD.directive('pickheight', function($modal){
		return {
			restrict:'E',
			templateUrl:'/pickHeight',
			scope:true,
			link:function(scope){
				var pickHeightPanel = null;
				
				scope.$parent.selectedHeight = scope.selectedHeight;
				scope.popUpHeight = function(){
					pickHeightPanel = $modal({
						scope:scope,
						title:'pick up height',
						content:'select height',
						show:true,
						keyboard:false,
						backdrop:true,
						templateUrl:'/pickheightpanel',
						container:'.heightWrap'
					});
				};
				scope.hide = function(){
					pickHeightPanel.hide();
				};
				$(".pickheight-li").live('mouseover', function(){
					$(this).css('background-color','#e8f9fe');
				});
				$(".pickheight-li").live('mouseout', function(){
					$(this).css('background-color','');
				});

				$(".pickheight-li").live('click', function(e){
					var height = $(e.target).text();
					scope.selectedHeight = height;
					scope.$parent.selectedHeight = scope.selectedHeight;
					scope.$apply();
					scope.hide();
				});

			}
		}
	});
});

