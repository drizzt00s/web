
main.factory("getPass",["$resource",function($resource){
     // return $resource("/forgetPass/:username",{username:"@username"});
      return $resource("/forgetPass");
}]);




