if(!fileSubmit){
	var fileSubmit={};
	//这边必须要加var, 如果加var的话,在js的预编译阶段
	//会声明这个变量,并且会给这个变量一个默认值:undefinied
	//当代码进入执行期时,这个变量是经过声明的变量,值是undefinied
	//所以可以参与表达式计算,如果没有var,这个变量在参与表达式计算的时候,是未声明的,任何
	//未声明的变量参与表达式计算会抛出异常
	fileSubmit.file=(function(){
		function _submitFile(o){
			var checkUsername=getTargetCookie("username");
			if(checkUsername){
				$(o).parent("form").find(".checkAccount").val(checkUsername);
				var checkFile=$(o).parent("form").find(".selectFile").val();
				if(checkFile){
					$(o).parent("form").submit();
				} else {
					alert("请选择文件");
				}
			} else {
				throw new Error("用户未登录");
			}
		}
		return {
			submitFile:function(o){
				_submitFile(o);
			}
		};
	})()
} else {
	throw new Error("name space in use");
}