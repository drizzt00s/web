main.controller("myForgetPass",function($scope,getPass){
   $scope.data={
   	   mail:""
   };

   $scope.getPassBackRequest=function(){
   	      getPass.save({},{email:$scope.data.mail},function(data){

   	      },function(data){

   	      });
   }
});


