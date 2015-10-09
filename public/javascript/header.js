﻿window.onload=function(){
setCity();
}
var provinces=["任意","北京","天津","河北","山西","内蒙古","辽宁",
"吉林","黑龙江","上海","江苏","浙江","安徽","福建","江西","山东","河南",
"湖北","湖南","广东","广西","海南","重庆","四川","贵州","云南","西藏","陕西",
"甘肃","青海","宁夏","新疆","台湾","香港","澳门"];
var storeCity=[
{"province":"北京","area":["任意","东城","西城","崇文","宣武","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","怀柔","平谷","密云","延庆"]},
{"province":"天津","area":["任意","和平","河东","河西","南开","河北","红桥","塘沽","汉沽","大港","东丽","西青","津南","北辰","武清","宝坻","静海","蓟县"]},
{"province":"河北","area":["任意","石家庄","唐山","秦皇岛","邯郸","邢台","保定","张家口","承德","沧州","廊坊","衡水"]},
{"province":"山西","area":["任意","太原","大同","阳泉","长治","晋城","朔州","晋中","运城","忻州","临汾市","吕梁"]},
{"province":"内蒙古","area":["任意","呼和浩特","包头","乌海","赤峰","通辽","鄂尔多斯","呼伦贝尔","巴彦淖尔","乌兰察布","兴安","锡林郭勒","阿拉善"]},
{"province":"辽宁","area":["任意","沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"]},
{"province":"吉林","area":["任意","长春","吉林","四平","辽源","通化","白山","松原","白城","延边"]},
{"province":"黑龙江","area":["任意","哈尔滨市","齐齐哈尔","鸡西","鹤岗","双鸭山","大庆","伊春","佳木斯","七台河","牡丹江","黑河","绥化","大兴安岭"]},
{"province":"上海","area":["任意","黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东新区","金山","松江","青浦","南汇","奉贤","崇明"]},
{"province":"江苏","area":["任意","南京","无锡","徐州","常州","苏州","南通","连云港","淮安","盐城","扬州","镇江","泰州","宿迁"]},
{"province":"浙江","area":["任意","杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","丽水"]},
{"province":"安徽","area":["任意","合肥","芜湖","蚌埠","淮南","马鞍山","淮北","铜陵","安庆","黄山","滁州","阜阳","宿州","巢湖","六安","亳州","池州","宣城"]},
{"province":"福建","area":["任意","福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"]},
{"province":"江西","area":["任意","南昌","景德镇","萍乡","九江","新余","鹰潭","赣州","吉安","宜春","抚州","上饶"]},
{"province":"山东","area":["任意","济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","荷泽"]},
{"province":"河南","area":["任意","郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店"]},
{"province":"湖北","area":["任意","武汉","黄石","十堰","宜昌","襄樊","鄂州","荆门","孝感","荆州","黄冈","咸宁","随州","恩施"]},
{"province":"湖南","area":["任意","长沙","株洲","湘潭","衡阳","邵阳","岳阳","常德","张家界","益阳","郴州","永州","怀化","娄底","湘西"]},
{"province":"广东","area":["任意","广州","韶关","深圳","珠海","汕头","佛山","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","东莞","中山","潮州","揭阳","云浮"]},
{"province":"广西","area":["任意","南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","百色","贺州","河池","来宾","崇左"]},
{"province":"海南","area":["任意","海口","三亚"]},
{"province":"重庆","area":["任意","万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双桥","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","璧山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"]},
{"province":"四川","area":["任意","成都","自贡","攀枝花","泸州","德阳","绵阳","广元","遂宁","内江","乐山","南充","眉山","宜宾","广安","达州","雅安","巴中","资阳","阿坝","甘孜","凉山"]},
{"province":"贵州","area":["任意","贵阳","六盘水","遵义","安顺","铜仁","黔西南","毕节","黔东南","黔南"]},
{"province":"云南","area":["任意","昆明","曲靖","玉溪","保山","昭通","丽江","思茅","临沧","楚雄","红河","文山","西双版纳","大理","德宏","怒江傈","迪庆"]},
{"province":"西藏","area":["任意","拉萨","昌都","山南","日喀则","那曲","阿里","林芝"]},
{"province":"陕西","area":["任意","西安","铜川","宝鸡","咸阳","渭南","延安","汉中","榆林","安康","商洛"]},
{"province":"甘肃","area":["任意","兰州","嘉峪关","金昌","白银","天水","武威","张掖","平凉","酒泉","庆阳","定西","陇南","临夏","甘南"]},
{"province":"青海","area":["任意","西宁","海东","海北","黄南","海南","果洛","玉树","海西"]},
{"province":"宁夏","area":["任意","银川","石嘴山","吴忠","固原","中卫"]},
{"province":"新疆","area":["任意","乌鲁木齐","克拉玛依","吐鲁番","哈密","昌吉","博尔塔拉","巴音郭楞","阿克苏","克孜勒苏","喀什","和田","伊犁","塔城","阿勒泰","其他"]},
{"province":"台湾","area":["任意","新竹","高雄","基隆","台中","台南","台北","桃园","云林"]},
{"province":"香港","area":["任意"]},
{"province":"澳门","area":["任意"]}
];
function setCity(){
 $("#searchLocation2").empty();
 var checkProvince=$(document.getElementById("searchLocation").options[$("#searchLocation")[0].selectedIndex]).text();
 //province selected
 if(checkProvince=="任意"){
     var city=$("<option>任意</option>");
     $("#searchLocation2").append(city);
     return false;
 }
 for(var i=0;i<storeCity.length;i++){
    if(storeCity[i]["province"]==checkProvince){
      getArea=storeCity[i]["area"];
      break
    }
 }
 for(var ii=0;ii<getArea.length;ii++){
     var city=$("<option>"+getArea[ii]+"</option>");
      $("#searchLocation2").append(city);
 }
}
//根据不同的省份或者直辖市生成不同的城市




document.write("<div class='search'>"+
"<form action='searchLove.ejs' method='get' id='searchForm'>"+
"<span>我要找</span>"+
"<select id='searchGender' name='searchGender'>"+
"<option>男朋友</option>"+
"<option>女朋友</option>"+
"</select>"+
"<span>年龄</span>"+
"<select id='searchAge1' name='searchAge1'>");
for(var i=18;i<66;i++){
document.write("<option value='"+i+"'>"+i+"</option>");
}
document.write("</select>"+
"<span>岁 至</span>"+
"<select id='searchAge2' name='searchAge2'>");
for(var i=18;i<66;i++){
document.write("<option value='"+i+"'>"+i+"</option>");
}
document.write("</select>"+
"<span>岁</span>"+
"<span>地区</span>");
document.write("<select onchange='setCity()' id='searchLocation' name='searchLocation'>");
for(var i2=0;i2<provinces.length;i2++){
document.write("<option value='"+provinces[i2]+"'>"+provinces[i2]+"</option>");
}
document.write("</select>");
document.write("<select id='searchLocation2' name='searchLocation2'>");
document.write("</select>");
document.write("<span>有照片</span>"+
"<input type='checkbox' name='hasPic' id='ifHasImage' />"+
"<input type='hidden' name='simpleSearch' value='1' id='simpleSearch' />"+
"<input type='submit' id='submit' value='搜索' />"+
"<a href='advancedSearch.ejs'>高级搜索</a>"+
"</form>");
document.write(
"<a href='mapSearch.ejs' id='searchByMap'>地图搜索</a>"+
"<a href='forum.ejs' id='forum'>速配论坛</a>"+
"<a href='latestMember.ejs' id='newestMember'>最新会员</a>"+
"<a href='onlineMember.ejs' id='onlineMember'>在线会员</a>"+
//"<a href='#' id='newCrystalMemeber'>新水晶会员</a>"+
"</div>");








