function extend(subClass,supClass){
   var o=function(){};
   o.prototype=new supClass();
   subClass.prototype=new o();
   subClass.prototype.constructor=subClass;
}

function FrontToEnd(){
}





function Interface(name,methods){
  if(arguments.length!=2){
    throw new Error("��Ҫ��������");
  }
  if(!(methods instanceof Array)){
    throw new Error("�ڶ�����������Ϊ����");
  }
  this.name=names;
  this.methods=[];
  for(var i=0;i<methods.legnth;i++){
    if(typeof methods[i]!='string'){
	  throw new Error("����������Ϊ�ַ���");
	}
	this.methods.push(methods[i]);
  }
}
//�ӿ���


Interface.ensureImplement=function(o){
  if(arguments.length<2){
    throw new Error("����Ҫ�ж�������");
  }
  for(var i=1,len=arguments.length;i<len;i++){
    var thisInterface=arguments[i];
	if(thisInterface.constructor!==Interface){
	  throw new Error("Function Interface.ensureImplement expects at least two arguments,and they are must be the instance of class Interface");
	}
	for(var j=0;methodLen=thisInterface.methods.length;j<methodLen;j++){
	  var method=thisInterface.methods[j];
	  if(!o[method]||typeof o[method]!=="function"){
	    throw new Error("some interface is not implemented");
	  }
	}
  }
}



