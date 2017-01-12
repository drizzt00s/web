define(['angular'], function(){
    angular.module('web.controller').controller('userImage',['$scope', '$http','loginHelp', 'api', 'utility', function($scope, $http, loginHelp, api, utility){
		loginHelp.checkIfLogined()//如果没登录 转到登录页面
		$scope.isLogin = loginHelp.isLogined();
		$scope.imgList = null; //用户的全部图片
		$scope.profile = '';//用户的头像，待选择

		var getAvatars = function(){
			$http({
				method:'POST',
				url:api.cpImages(),
				data:{uid:localStorage.getItem('uid')}
			}).success(function(d){
				d = eval("("+ d[0].avatar+")"); 
				var userAccount = localStorage.getItem('username');
				d = utility.createCompleteUserImageListAvatar(d, userAccount);
				console.log(d);
				$scope.imgList = d;
			});

		};
		getAvatars();
	
       $scope.selectImg = function(e){
       		$(e.target).addClass('imgClick');
			$(e.target).siblings().removeClass('imgClick');
			$scope.profile = $(e.target).attr('src');
       };

       $scope.setProfile = function(){
       		if(!$scope.profile){
       			alert('请先选择头像');
       			return false;
       		}
    		var uid = localStorage.getItem('uid');
    		$http({
    			method:'POST',
    			url:api.setProfile(),
    			data:{
    				uid:uid,
    				profile:$scope.profile
    			}
    		}).success(function(d){
    			if(d){
    				alert('设置头像成功');
    				window.location.href = window.location.href;
    			}
    		})
        }







    }]);
})