function extend(subClass,supClass){
 var F=function(){
 };
 F.prototype=supClass.prototype;
 subClass.prototype=new F();
 subClass.prototype.constructor=subClass;
}