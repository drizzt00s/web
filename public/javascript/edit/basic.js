agMain.controller('editBasic', function($scope){
	$scope.falseName = localStorage.getItem('falseName') || utility.getTargetCookie('falseName');

	$scope.showBasic = true;
	$scope.showCoreInfo = false;
	$scope.showMonolog = false;
	$scope.showProfile = false;
	$scope.showAvatars = false;
	$scope.showMatchCondtion = false;
	$scope.showProofs = false;
	$scope.changePass = false;
	//各个tab的初始状态

	$scope.showBasicTab = function(){
		$scope.showBasic = true;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showCoreInfoTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = true;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showMonologTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = true;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showProfileTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = true;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showAvatarsTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = true;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showMatchCondtionTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = true;
		$scope.showProofs = false;
		$scope.changePass = false;
	};

	$scope.showProofsTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = true;
		$scope.changePass = false;
	};

	$scope.changePassTab = function(){
		$scope.showBasic = false;
		$scope.showCoreInfo = false;
		$scope.showMonolog = false;
		$scope.showProfile = false;
		$scope.showAvatars = false;
		$scope.showMatchCondtion = false;
		$scope.showProofs = false;
		$scope.changePass = true;
	};




});