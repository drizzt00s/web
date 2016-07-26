agMain.directive('pickincome', function($modal){
	return {
		restrict:'E',
		scope:true,
		templateUrl:'/pickIncome',
		link:function(scope){
			scope.selectedIncome = '';
			var pickIncomePanel
			scope.popUpIncome = function(){
				pickIncomePanel = $modal({
					scope:scope,
					title:'pick up income',
					content:'select income',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/pickincomepanel'
				});
			};
			scope.hide = function(){
				pickIncomePanel.hide();
			};
			$(".pickincome-li").live('mouseover', function(){
				$(this).css('background-color','#e8f9fe');
			});
			$(".pickincome-li").live('mouseout', function(){
				$(this).css('background-color','');
			})
			$(".pickincome-li").live('click', function(e){
				var income = $(e.target).text();
				scope.selectedIncome = income;
				scope.$apply();
				scope.hide();
			});
		}
	}
});