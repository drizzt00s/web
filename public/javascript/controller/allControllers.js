/*
home page controllers
*/



indexPage.controller("loginAreaController",function($scope,login){
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


indexPage.controller("loginController",function($scope){


     /*
      $scope.poplogin=function(){
      	    var newCompents=new phDisplay();
            var loginContents="<form action='#' method='post' id='loginForm'>"+
                                   "<p><label for='account'>账号:</label><input type='text' id='account' name='account' autocomplete='on' /><span id='accErrorMsg'><%=accErrMsg%></span></p>"+
                                   "<p><label for='pass'>密码:</label><input type='password' id='pass' name='password' autocomplete='on' /><span id='passErrorMsg'><%=passwordErrMsg%></span></p>"+
                                   "<input type='button' value='提交' id='submitThis'><br />"+
                                   "<input type='hidden' name='checkSubmit'>"+
                                   "</form>";
                 newCompents.popDiv("popDiv",true,loginContents);
                 $("#accErrorMsg").css("display","none");
                 $("#passErrorMsg").css("display","none");
      };
*/
    


});
