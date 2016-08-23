agMain.directive('userstatus', function(){
	return {
		restrict:'E',
		scope:false,
		template:"<div>"+
		          	"<span>hi {{falseName}}</span><span><a href='/logoff'>退出</a></span>"+
		          "</div>"
	}
});