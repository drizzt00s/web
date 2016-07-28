agMain.directive('pickheight', function($modal){
	return {
		restrict:'E',
		templateUrl:'/pickHeight',
		scope:false,
		link:function(scope){
			var pickHeightPanel = null;
			scope.selectedHeight = '';
			scope.popUpHeight = function(){
				pickHeightPanel = $modal({
					scope:scope,
					title:'pick up height',
					content:'select height',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/pickheightpanel'
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
				scope.$apply();
				scope.hide();
			});

		}
	}
});