requirejs.config({
	baseUrl:'/javascript/libs',
	paths: {
		modules:'../modules'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'angular':{
			exports: 'angular',
		},
		'angular-resource':{
			deps:['angular'],
			exports:'angular-resource'
		},
		'modules/agMain':{
			deps:['angular']
		}
	

	}
});

var modules = [
'jquery', 
'angular',
'angular-resource',
'modules/userEdit', 
'modules/Compents', 
'modules/cookieHelp', 
'modules/socket', 
'modules/message',
'modules/index',
'modules/moveoutIndex',
'modules/header',
'modules/agMain'
];



require(modules, function ($, angular) {  
	

var main = angular.module("main",[]);


main.factory("login",["$resource",function($resource){
    return $resource("/login");
}]);


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






});