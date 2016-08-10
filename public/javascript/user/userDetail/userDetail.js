agMain.controller("userDetail", function($scope, utility){
    $scope.getUserData = function(){
    	$scope.data = utility.trimeProfileUrlObject(JSON.parse($("#myStoreData").text())); 
    }
    $scope.getUserData();

    $scope.populateData = function(){
    	$scope.profile = $scope.data.profile;
    	$scope.falseName =  $scope.data.falseName;
    	$scope.address = $scope.data.address;
    	$scope.isonline = $scope.data.isonline;
    	$scope.education = $scope.data.education;
    	$scope.marriageStatus = $scope.data.marriageStatus;
    	$scope.age = $scope.data.age;
    	$scope.height = $scope.data.height;
    	$scope.ifHasCar = $scope.data.ifHasCar;
    	$scope.monthincome = $scope.data.monthincome;
    	$scope.housingcondition = $scope.data.housingcondition;
    	$scope.weight = ($scope.data.weight) + '公斤';
    	$scope.sign = $scope.data.sign; //星座
    	$scope.race = $scope.data.race;
    	$scope.horoscope = $scope.data.horoscope;//属相
    	$scope.bloodType = $scope.data.bloodType;

    	$scope.avatar = eval("("+ $scope.data.avatar+")")['con'];// array of images
    					
    	$scope.avatarLength = $scope.avatar.length;
    }
    $scope.populateData();
})