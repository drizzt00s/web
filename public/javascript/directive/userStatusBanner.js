agMain.directive('userstatus', function(){
	return {
		restrict:'E',
		scope:true,
		template:"<div>"+
		          	"<span>hi {{falseName}}</span><span><a href='/logoff'>退出</a></span>"+
		          "</div>"
	}
});