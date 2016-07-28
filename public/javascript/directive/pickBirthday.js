agMain.directive('pickbirthday', function($modal, Constant){
	return {
		restrict:'E',
		scope:false,
		templateUrl:'/pickBirthday',
		link:function(scope){
			scope.days = null;
			var pickYearPanel = null;
			var pickMonthPanel = null;
			var pickDayPanel = null;

			scope.selectedYear = '请选择年';
			scope.selectedMonth = '请选择月';
			scope.selectedDay = '请选择日';

			scope.hide = function(o){
				o.hide();
			};
			scope.selYear = function(){
				pickYearPanel = $modal({
					scope:scope,
					title:'pick up year',
					content:'select year',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/selyearpanel',
					container:'#selYearPanel'
				});
			};
			scope.selMonth = function(){
				pickMonthPanel = $modal({
					scope:scope,
					title:'pick up month',
					content:'select month',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/selmonthpanel',
					container:'#selMonthPanel'
				});
			};
			scope.selDay = function(){
				pickDayPanel = $modal({
					scope:scope,
					title:'pick up day',
					content:'select day',
					show:true,
					keyboard:false,
					backdrop:true,
					templateUrl:'/seldaypanel',
					container:'#selDayPanel'
				});
			};
			scope.pickYear = function(e){
				scope.selectedYear = $(e.target).text();
				scope.hide(pickYearPanel);
				scope.selMonth();
			}
			scope.pickMonth = function(e){
				scope.selectedMonth = $(e.target).text();
				scope.hide(pickMonthPanel);
				scope.days = Constant.daysPerMonth(parseInt(scope.selectedYear), parseInt(scope.selectedMonth));
				scope.selDay();
			};
			scope.pickDay = function(e){
				scope.selectedDay = $(e.target).text();
				scope.hide(pickDayPanel);
			};
		}
	};
});
