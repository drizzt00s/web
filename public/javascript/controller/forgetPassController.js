forgetPassModule.controller("myForgetPass",function($scope,getPass){
   $scope.data={
   	   mail:""
   };

   $scope.getPassBackRequest=function(){
   	      getPass.save({},{email:$scope.data.mail},function(data){

   	      },function(data){

   	      });
   }
});


/*
forgetPassModule.controller("forgetPass",function($scope){
   $scope.data={};
   $scope.getPassBackRequest=function(){
   	 alert($scope.data.mail);
   }
});*/