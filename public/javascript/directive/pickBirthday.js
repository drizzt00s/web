define(['angularAMD'], function(angularAMD){
	angularAMD.directive('pickbirthday', function($modal, Constant){
		return {
			restrict:'E',
			scope:true,
			templateUrl:'/pickBirthday',
			link:function(scope){
				scope.days = null;
				var pickYearPanel = null;
				var pickMonthPanel = null;
				var pickDayPanel = null;
				scope.$parent.selectedYear = scope.selectedYear;
				scope.$parent.selectedMonth = scope.selectedMonth;
				scope.$parent.selectedDay = scope.selectedDay;
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
						container:'.birthdayWrap'
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
						container:'.birthdayWrap'
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
						container:'.birthdayWrap'
					});
				};
				scope.pickYear = function(e){
					scope.selectedYear = $(e.target).text();
					scope.$parent.selectedYear = scope.selectedYear;
					scope.hide(pickYearPanel);
					scope.selMonth();
				}
				scope.pickMonth = function(e){
					scope.selectedMonth = $(e.target).text();
					scope.$parent.selectedMonth = scope.selectedMonth;
					scope.hide(pickMonthPanel);
					scope.days = Constant.daysPerMonth(parseInt(scope.selectedYear), parseInt(scope.selectedMonth));
					scope.selDay();
				};
				scope.pickDay = function(e){
					scope.selectedDay = $(e.target).text();
					scope.$parent.selectedDay = scope.selectedDay;
					scope.hide(pickDayPanel);
				};
			}
		};
	});
});

/*
agMain.directive('pickbirthday', function($modal, Constant){
	return {
		restrict:'E',
		scope:true,
		templateUrl:'/pickBirthday',
		link:function(scope){
			scope.days = null;
			var pickYearPanel = null;
			var pickMonthPanel = null;
			var pickDayPanel = null;
			scope.$parent.selectedYear = scope.selectedYear;
			scope.$parent.selectedMonth = scope.selectedMonth;
			scope.$parent.selectedDay = scope.selectedDay;
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
					container:'.birthdayWrap'
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
					container:'.birthdayWrap'
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
					container:'.birthdayWrap'
				});
			};
			scope.pickYear = function(e){
				scope.selectedYear = $(e.target).text();
				scope.$parent.selectedYear = scope.selectedYear;
				scope.hide(pickYearPanel);
				scope.selMonth();
			}
			scope.pickMonth = function(e){
				scope.selectedMonth = $(e.target).text();
				scope.$parent.selectedMonth = scope.selectedMonth;
				scope.hide(pickMonthPanel);
				scope.days = Constant.daysPerMonth(parseInt(scope.selectedYear), parseInt(scope.selectedMonth));
				scope.selDay();
			};
			scope.pickDay = function(e){
				scope.selectedDay = $(e.target).text();
				scope.$parent.selectedDay = scope.selectedDay;
				scope.hide(pickDayPanel);
			};
		}
	};
});*/