/*
home page controllers
*/


main.controller("loginAreaController",function($scope, login){
     $scope.checkIfLogined=function(){
         return parseInt(jQuery("#checkLogin").val());
     }
 
     $scope.data={
     	showLoginArea:$scope.checkIfLogined(),
        account:"",
        pass:"",
        accErrorMsg:"",
        passErrorMsg:"",
        userFalseName:"",
        username:""
     };


      $scope.submitLogin=function(){
      	   var username=$scope.data.account;
      	   var pass=$scope.data.pass;
           login.save({},{username:username,pass:pass},function(d){
             $scope.data.accErrorMsg=d.accResult;
             $scope.data.passErrorMsg=d.passResult;
             if(!d.accResult&&!d.passResult){
                var userFalseName=getTargetCookie("falseName");
                var username=getTargetCookie("username");
                socket = io.connect('http://localhost:8080');
                socket.on("connect",function(){
		        socket.emit("watchOtherLogin2",{"username":username,"falseName":userFalseName},function(){
		        window.location.reload();
		      });
		     });
            }


          },function(d){

          });
           
      }


});



