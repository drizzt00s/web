agMain.directive('pickeducation', function($modal){
	return {
		restrict:'E',
		scope:true,
		templateUrl:'/pickEducation',
		link:function(scope){
			var pickEducationPanel = null;
			scope.selectedEducation = '';
			scope.$parent.selectedEducation = scope.selectedEducation;
			scope.popUpEducation = function(){
					pickEducationPanel = $modal({
					scope:scope,
					title:'pick up education',
					content:'select education',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/pickeducationpanel'
				});
			}
			scope.hide = function(){
				pickEducationPanel.hide();
			};
			$(".pickEducation-li").live('mouseover', function(){
				$(this).css('background-color','#e8f9fe');
			});
			$(".pickEducation-li").live('mouseout', function(){
				$(this).css('background-color','');
			});
			$(".pickEducation-li").live('click', function(e){
				var education = $(e.target).text();
				scope.selectedEducation = education;
				scope.$parent.selectedEducation = scope.selectedEducation;
				scope.$apply();
				scope.hide();
			});
		}
	}	
});