define(['angular'], function(){
    angular.module('web.controller').controller('userImage',['$scope', '$http','loginHelp', 'api', 'utility', 'validation', 'localStore', function($scope, $http, loginHelp, api, utility, validation, localStore){
		loginHelp.checkIfLogined()//如果没登录 转到登录页面
		$scope.isLogin = loginHelp.isLogined();
		$scope.imgList = null; //用户的全部图片
		$scope.profile = '';//用户的头像，待选择

        $scope.getAvatars = function(){
             $scope.imgList = eval("(" + localStore.getUserInfo('avatar') + ")");
             var username = localStore.getUserInfo('account');
             $scope.imgList = utility.createCompleteUserImageListAvatar($scope.imgList, username);
        };

		$scope.getAvatars();
	
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