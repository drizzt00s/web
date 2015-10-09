$(function(){
    $("#edit3a").bind(
        "change",function(){
            $("#edit3aSub").empty();
           var checkSelectedIndex=$(this)[0].selectedIndex;
           var subOptions=[];
           if(checkSelectedIndex==0){
               $("#edit3aSub").append("<option>请选择</option>");
           }
           else if(checkSelectedIndex==1){
               subOptions=["请选择","销售总监","销售经理","销售主管","销售专员","渠道/分销管理","渠道/分销专员","经销商","客户经理","客户代表","其他"];
           }
           else if(checkSelectedIndex==2){
               subOptions=["请选择","客服经理","客服主管","客服专员","客服协调","客服技术支持","其他"];
           }
           else if(checkSelectedIndex==3){
               subOptions=["请选择","IT技术总监","IT技术经理","IT工程师","系统管理员","测试专员","运营管理","网页设计","网站编辑","网站产品经理","其他"];
           }
           else if(checkSelectedIndex==4){
               subOptions=["请选择","通信技术","电子技术","其他"];
           }
           else if(checkSelectedIndex==5){
               subOptions=["请选择","工厂经理","工程师","项目主管","营运经理","营运主管","车间主任","物料管理","生产领班","操作工人","安全管理","其他"];
           }
           else if(checkSelectedIndex==6){
               subOptions=["请选择","物理经理","物流主管","物流专员","仓库经理","仓库管理员","货运代理","集装箱业务","海关事务管理","报单员","快递员","其他"];
           }
           else if(checkSelectedIndex==7){
               subOptions=["请选择","商务经理","商务专员","采购经理","采购专员","外贸经理","外贸专员","业务跟单","报关员","其他"];
           }
           else if(checkSelectedIndex==8){
               subOptions=["请选择","人事总监","人事经理","人事专员","招聘经理","招聘专员","培训经理","培训专员","秘书","文员","后勤","其他"];
           }
           else if(checkSelectedIndex==9){
               subOptions=["请选择","总经理","副总经理","合伙人","总监","经理","总裁助理","其他"];
           }
           else if(checkSelectedIndex==10){
               subOptions=["请选择","广告客户经理","广告客户专员","广告设计经理","广告设计专员","广告策划","市场营销经理","市场营销专员","市场策划","市场调研与分析","市场拓展","公关经理","公关专员","媒介经理","媒介专员","品牌经理","品牌专员","其他"];
           }
           else if(checkSelectedIndex==11){
               subOptions=["请选择","主编","编辑","作家","撰稿人","文案策划","出版发行","导演","记者","主持人","演员","模特","经纪人","摄影师","影视后期制作","设计师","画家","音乐家","舞蹈","其他"];
           }
           else if(checkSelectedIndex==12){
               subOptions=["请选择","生物工程","药品生产","临床研究","医疗器械","医药代表","化工工程师","其他"];
           }
           else if(checkSelectedIndex==13){
               subOptions=["请选择","医疗管理","医生","心理医生","药剂师","护士","其他"];
           }
           else if(checkSelectedIndex==14){
               subOptions=["请选择","投资","保险","金融","银行","证券","其他"];
           }
           else if(checkSelectedIndex==15){
               subOptions=["请选择","建筑师","工程师","规划师","景观设计","房地产策划","房地产交易","物业管理","其他"];
           }
           else if(checkSelectedIndex==16){
               subOptions=["请选择","专业顾问","咨询经理","咨询师","培训师","其他"];
           }
           else if(checkSelectedIndex==17){
               subOptions=["请选择","律师","律师助理","法务助理","法务专员","知识产权专员","其他"];
           }
           else if(checkSelectedIndex==18){
               subOptions=["请选择","财务总监","财务经理","财务主管","会计","注册会计师","审计师","税务经理","税务专员","成本经理","其他"];
           }
           else if(checkSelectedIndex==19){
               subOptions=["请选择","教授","讲师/助教","中学教师","小学教师","幼师","教务管理人员","职业技术教师","培训师","科研管理人员","科研人员","其他"];
           }
           else if(checkSelectedIndex==20){
               subOptions=["请选择","餐饮管理","厨师","餐厅服务员","酒店管理","大堂经理","酒店服务员","导游","美容师","健身教练","商场经理","零售店店长","店员","保安经理","保安人员","家政服务","其他"];
           }
           else if(checkSelectedIndex==21){
               subOptions=["请选择","飞行员","空乘人员","地勤人员","列车司机","乘务人员","船长","船员","司机","其他"];
           }
           else if(checkSelectedIndex==22){
               subOptions=["请选择","公务员","其他"];
           }
           else if(checkSelectedIndex==23){
               subOptions=["请选择","军人","警察","其他"];
           }
           else if(checkSelectedIndex==24||checkSelectedIndex==25||checkSelectedIndex==26||checkSelectedIndex==27||checkSelectedIndex==28){
               subOptions=["请选择"];
           }
            for(var i=0;i<subOptions.length;i++){
                var eachOption=$("<option></option>");
                eachOption.text(subOptions[i]);
                $("#edit3aSub").append(eachOption);
            }
        }
    )
    $("#edit3c").bind(
        "keyup",{id:"edit3c",maxLength:500,infoContainerId1:"edit3cCounter1",infoContainerId2:"edit3cCounter2"},getInputLength
    )
/*=====================================edit3==================================*/
    $("#edit5a").bind(
        "keyup",{id:"edit5a",maxLength:500,infoContainerId1:"edit5cCounter1",infoContainerId2:"edit5cCounter2"},getInputLength
    )
/*=====================================edit5==================================*/
$("#birthPlaceProvince").bind(
     "click",function(){

         $("#provinceInfo").css("display","block");
         $("#cityInfo").css("display","none");
    }
)
$("#birthPlaceCity").bind(
    "click",function(){
        $("#provinceInfo").css("display","none");
          var checkWhichProvince=$("#birthPlaceProvince").val();
          if(checkWhichProvince=="请选择"){
               return false;
          }
          else{
             if(checkWhichProvince=="广东"){
                 var isSubselect=true;
                 createCityInfoDiv(isSubselect,cityArray1);
             }
              if(checkWhichProvince=="江苏"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray2);
              }
              if(checkWhichProvince=="浙江"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray3);
              }
              else if(checkWhichProvince=="四川"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray4);
              }
              else if(checkWhichProvince=="福建"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray5);
              }
              else if(checkWhichProvince=="山东"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray6);
              }
              else if(checkWhichProvince=="湖北"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray7);
              }
              else if(checkWhichProvince=="河北"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray8);
              }
              else if(checkWhichProvince=="山西"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray9);
              }
              else if(checkWhichProvince=="内蒙古"){
                  var isSubselect=true;
                  createCityInfoDiv(isSubselect,cityArray10);
              }
          }
    }
)


  $("#provinceInfo span").live(
       "click",function(){
           var whichCity=$(this).text();
           $("#birthPlaceProvince").val(whichCity);
           $(this).addClass("selected");

            if(whichCity=="广东"){
               var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray1);
            }
          else if(whichCity=="江苏"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray2);
            }
            else if(whichCity=="浙江"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray3);
            }
            else if(whichCity=="四川"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray4);
            }
            else if(whichCity=="福建"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray5);
            }
            else if(whichCity=="山东"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray6);
            }
            else if(whichCity=="湖北"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray7);
            }
            else if(whichCity=="河北"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray8);
            }
            else if(whichCity=="山西"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray9);
            }
            else if(whichCity=="内蒙古"){
                var isSubselect=true;
                createCityInfoDiv(isSubselect,cityArray10);
            }
      }
  )

$(".eachCitySpan").live(
    "click",function(){
         var cityValue="";
         var isSelectSub=$(this).parent("div").find("span:first").attr("class");
         if(isSelectSub=="notForSelect"){
             cityValue=$(this).parent("div").find("span:first").text();
             cityValue+=(" "+$(this).text());
             $("#birthPlaceCity").val(cityValue);
             $(".cityInfo").css("display","none");
         }
    }
)

    function createCityInfoDiv(isSubSelect,cityData){
        $("#cityInfo").find("div").not(":first").remove();
        var cityInfoWrap=$("<div class='cityInfoWrap'></div>")
        if(isSubSelect){
            $.each(cityData,function(i,v){
                    var eachCityDiv=$("<div class='eachCityDiv'></div>");
                    $.each(v,function(index,value){
                            var eachCitySpan=$("<span class='eachCitySpan'></span>");
                            if(index==0){
                                eachCitySpan.removeClass("eachCitySpan");
                                eachCitySpan.addClass("notForSelect");
                            }
                            eachCitySpan.text(value);
                            eachCitySpan.appendTo(eachCityDiv);
                        }
                    )
                    eachCityDiv.appendTo(cityInfoWrap);
                }
            )
        }
        cityInfoWrap.appendTo($("#cityInfo"));
        $("#cityInfo").css("display","block");
        $("#provinceInfo").css("display","none");
    }


    $("#provinceInfo span").live(
        "mouseover",function(){
            $(this).addClass("selected");
        }
    )
    $("#provinceInfo span").live(
        "mouseout",function(){
            $(this).removeClass("selected");
        }
    )

    $("#cityInfo span").live(
        "mouseover",function(){
            $(this).addClass("selected");
        }
    )
    $("#cityInfo span").live(
        "mouseout",function(){
            $(this).removeClass("selected");
        }
    )
$(document).bind(
    "click",function(e){
              var eventTarget= e.target;
              var checkIsPopDiv=$(eventTarget).attr("class");
              if(  checkIsPopDiv=="selectProvince selected"||checkIsPopDiv=="birthPlaceProvince"||checkIsPopDiv=="provinceInfo"||checkIsPopDiv=="provinceInfo1"||checkIsPopDiv=="provinceInfo2"||checkIsPopDiv=="provinceInfo3"||checkIsPopDiv=="cityInfo"||checkIsPopDiv=="cityInfoTitle"||checkIsPopDiv=="cityInfoWrap"||checkIsPopDiv=="eachCityDiv"){
                  return true;
              }
              else{
                         if(checkIsPopDiv.indexOf("birthPlaceCity")!=-1){
                              return false;
                         }
                         $("#provinceInfo").css("display","none");
                         $("#cityInfo").css("display","none");
              }
    }
)
/*=====================================edit6==================================*/
$("#editFixedInfo").bind(
        "click",function(){
            var checkDisplay=$(".toEditFixedInfo").css("display");
            if(checkDisplay=="none"){
                $(".toEditFixedInfo").css("display","block");
            }
        }
    )

    $("#closeToEditFixedInfo").bind(
        "click",function(){
            var checkDisplay=$(".toEditFixedInfo").css("display");
            if(checkDisplay=="block"){
                $(".toEditFixedInfo").css("display","none");
            }
        }
    )



    $("#submitPic").bind(
      "click",function(){


            var isSubmitAllowed=true;
            $.each($(".myUpLoadPic"),function(i,v){
                var picValue= $(v).val().toLocaleLowerCase();
                if(picValue!=""){
                if (picValue.indexOf("gif")==-1&&picValue.indexOf("png")==-1&&picValue.indexOf("bmp")==-1&&picValue.indexOf("jpg")==-1&&picValue.indexOf("jpeg")==-1){
                 $(v).siblings("span.errorInfo").css("display","inline");
                }
                else{
                    $(v).siblings("span.errorInfo").css("display","none");

                }
               }
             }
            )
            $.each($("span.errorInfo"),function(i,v){
                    var checkErrorInfo=$(v).css("display");
                    if(checkErrorInfo=="inline"){
                         isSubmitAllowed=false;
                    }
                }
            )
            if(!isSubmitAllowed){
                return false;
            }

        }
    )
//这个函数在前端控制用户只能上传图片，或者不传图片。不能够上传图片之外的文件
//editPic
/*=====================================================editBasic1============================================*/





























/*=====================================================editPic============================================*/
    function checkSubmit(id){
        var checkElement=document.getElementById(id);
        var checkValue=$(checkElement).val();
        if(checkValue=="true"){
            $(".editPic").css("display","none");
            $(".showUploadPicResult").css("display","block");
            $.each($(".myUpLoadPic"),function(i,v){

                $(v).remove();

            })


        }
        else{
            $(".editPic").css("display","block");
            $(".showUploadPicResult").css("display","none");
        }
    }
    checkSubmit("checkSubmitted");





    function checkUploadedPic(){
   $(".uploadedPicWrap:contains('undefined')").remove();
}
    checkUploadedPic();
/*
    function checkIsAllowedToUploadPic(){
        var upLoadPicNumber=0;
        var userCookies=document.cookie;
        var userCookiesArray=userCookies.split(";");
        for(var i=0;i<userCookiesArray.length;i++){
            var checkPicCookie=userCookiesArray[i].indexOf("userRemainingPic2");
            if(checkPicCookie!=-1){
                var targetCookie=userCookiesArray[i];
                var targetValue=(targetCookie.split("="))[1];
            }
        }
        $.each($(".myUpLoadPic"),function(index,value){
                var checkIfPicUpload=$(value).val();
                if(checkIfPicUpload!=""){
                    upLoadPicNumber++
                }
           }
        )
        if(upLoadPicNumber>targetValue){
            alert("您只能上传12张图片，您现在已经上传了"+(12-targetValue)+"张图片!");
            return false;
        }
    }
$("#submitPic").bind("click",checkIsAllowedToUploadPic);
//利用cookie查询用户能否继续上传图片不靠谱，因为cookie可以被用户主动删除，无法控制
*/


function getInputLength(e){
    var targetId= e.data.id;
    var targetElement=document.getElementById(targetId);
    var infoId1= e.data.infoContainerId1;
    var infoElement1=document.getElementById(infoId1);
    var infoId2= e.data.infoContainerId2;
    var infoElement2=document.getElementById(infoId2);
    var maxInputLength= e.data.maxLength;
    var checkInputLength=$(targetElement).text().length;
    var unusedLength=maxInputLength-checkInputLength;
    $(infoElement1).text(checkInputLength);
    $(infoElement2).text(unusedLength);
}
var cityArray1=[];
    cityArray1[0]=["广州","荔湾区","越秀区","荔湾区","海珠区","天河区","白云区","黄浦区","番禺区","花都区","南沙区","萝岗区","增城","从化"];
    cityArray1[1]=["深圳","罗湖区","南山区","宝安区","龙岗区","岩田区"];
    cityArray1[2]=["韶关","市辖区","始兴","仁化","翁源","乳源","新丰","乐昌","南雄"];
    cityArray1[3]=["珠海","市辖区"];
    cityArray1[4]=["汕头","市辖区","南澳"];
    cityArray1[5]=["佛山","市辖区"];
    cityArray1[6]=["江门","市辖区","台山","开平","鹤山","恩平"];
    cityArray1[7]=["湛江","市辖区","遂溪","徐闻","廉江","雷州","吴川"];
    cityArray1[8]=["茂名","市辖区","电白","高州","化州","信宜"];
    cityArray1[9]=["肇庆","市辖区","广宁","怀集","封开","德庆","高要","四会"];
    cityArray1[10]=["惠州","市辖区","博罗","惠东","龙门"];
    cityArray1[11]=["梅州","市辖区","梅县","大埔","丰顺","五华","平远","蕉岭","兴宁"];
    cityArray1[12]=["汕尾","市辖区","陆河","陆丰"];
    cityArray1[13]=["河源","市辖区","紫金","龙川","连平","和平","东源"];
    cityArray1[14]=["阳江","市辖区","阳西","阳东","阳春"];
    cityArray1[15]=["清远","市辖区","佛冈","阳山","连山","连南","清新","英德","连州"];
    cityArray1[16]=["东莞","市辖区"];
    cityArray1[17]=["中山","市辖区"];
    cityArray1[18]=["潮州","市辖区","潮安","饶平"];
    cityArray1[19]=["揭阳","市辖区","揭东","揭西"];
    cityArray1[20]=["云浮","市辖区","新兴","豫南","云安","罗定"];
    var cityArray2=[];
    cityArray2[0]=["南京","玄武区","白下区","秦淮区","建邺区","鼓楼区","下关区","浦口区","栖霞区","雨花台区","江宁区","六合区","高淳"];
    cityArray2[1]=["无锡","市辖区","江阴","宜兴"];
    cityArray2[2]=["徐州","市辖区","丰县","沛县","邳州"];
    cityArray2[3]=["常州","市辖区","溧阳","金坛"];
    cityArray2[4]=["苏州","市辖区","常熟","张家港","昆山","吴江","太仓"];
    cityArray2[5]=["南通","市辖区","海安","如东","启东","海门"];
    cityArray2[6]=["连云港","市辖区","东海","灌云","灌南"];
    cityArray2[7]=["淮安","市辖区","涟水","洪泽","金湖"];
    cityArray2[8]=["盐城","市辖区","响水","滨海","射阳","建湖","东台","大丰"];
    cityArray2[9]=["扬州","市辖区","宝应","仪征","高邮"];
    cityArray2[10]=["镇江","市辖区","丹阳","扬中","句容"];
    cityArray2[11]=["泰州","市辖区","兴化","靖江","泰兴","姜堰"];
    cityArray2[12]=["宿迁","市辖区","泗阳","泗洪","沭阳"];
    var cityArray3=[];
    cityArray3[0]=["杭州","上城区","下城区","江干区","拱墅区","西湖区","滨江区","萧山区","余杭区","桐庐","淳安","建德","富阳","临安"];
    cityArray3[1]=["宁波","海曙区","江东区","江北区","北仑区","镇海区","象山","宁海","余姚","慈溪","奉化"];
    cityArray3[2]=["温州","市辖区","洞头","永嘉","平阳","苍南","文成","泰顺","瑞安","乐清"];
    cityArray3[3]=["嘉兴","市辖区","嘉善","海盐","海宁","平湖","桐乡"];
    cityArray3[4]=["湖州","市辖区","德清","长兴","安吉"];
    cityArray3[5]=["绍兴","市辖区","绍兴县","新昌","上虞"];
    cityArray3[6]=["金华","市辖区","武义","浦江","磐安","兰溪","义乌","东阳","永康"];
    cityArray3[7]=["衡州","市辖区","常山","开化","龙游","江山"];
    cityArray3[8]=["舟山","市辖区","岱山","嵊泗"];
    cityArray3[9]=["台州","市辖区","玉环","三门","仙居","温岭","临海"];
    cityArray3[10]=["丽水","市辖区","青田","缙云","遂昌","松阳","云和","庆元","景宁","龙泉"];
    var cityArray4=[];
    cityArray4[0]=["成都","锦江区","青羊区","金牛区","武侯区","成华区","龙泉驿区","青白江区","新都区","温江区","金堂","双流","郫县","蒲江","新津","都江堰","彭州","崇州"];
    cityArray4[1]=["自贡","市辖区","荣县","富顺"];
    cityArray4[2]=["攀枝花","市辖区","米易","盐边"];
    cityArray4[3]=["泸州","市辖区","泸县","合江","叙永"];
    cityArray4[4]=["德阳","市辖区","中江","罗江","广汉","绵竹"];
    cityArray4[5]=["绵阳","市辖区","三台","盐亭","安县","北川","平武","江油"];
    cityArray4[6]=["广元","市辖区","旺苍","青川","剑阁","苍溪"];
    cityArray4[7]=["遂宁","市辖区","蓬溪","射洪","大英"];
    cityArray4[8]=["内江","市辖区","威远","资中","隆昌"];
    cityArray4[9]=["乐山","市辖区","井研","夹江","沐川","峨边","马边","峨眉山"];
    cityArray4[10]=["南充","市辖区","南部","营山","蓬安","仪陇","西充"];
    cityArray4[11]=["眉山","市辖区","仁寿","彭山","洪雅","丹棱","青神"];
    cityArray4[12]=["宜宾","市辖区","宜宾县","江安","长宁","高县","珙县","筠连","兴文","屏山"];
    cityArray4[13]=["广安","市辖区","岳池","武胜","邻水","华蓥"];
    cityArray4[14]=["达州","市辖区","达县","宣汉","开江","渠县","万源"];
    cityArray4[15]=["雅安","市辖区","名山","汉源","石棉","天全","芦山","宝兴"];
    cityArray4[16]=["巴中","市辖区","通江","南江","平昌"];
    cityArray4[17]=["资阳","市辖区","安岳","乐至","简阳"];
    cityArray4[18]=["阿坝","汶川","理县","茂县","松潘","九寨沟","金川","小金","黑水","马尔康","壤唐","阿坝县","诺尔盖","红原"];
    cityArray4[19]=["甘枚","康定","泸定","丹巴","九龙","雅江","道孚","炉霍","甘枚县","新龙","德格","白玉","石渠","色达","理塘","巴塘","乡城","稻城","德荣"];
    var cityArray5=[];
    cityArray5[0]=["福州","鼓楼区","台江区","苍山区","马尾区","晋安区","闽侯","连江","罗源","闽清","永秦","平潭","福清","长乐"];
    cityArray5[1]=["厦门","思明区","海沧区","湖里区","集美区","同安区","翔安区"];
    cityArray5[2]=["莆田","市辖区","仙游"];
    cityArray5[3]=["三明","市辖区","明溪","清流","宁化","大田","尤溪","沙县","将乐","泰宁","建宁","永安"];
    cityArray5[4]=["泉州","市辖区","惠安","安溪","永春","德化","金门","石狮","晋江","南安"];
    cityArray5[5]=["漳州","市辖区","云霄","漳浦","诏安","长泰","东山","南靖","平和","华安","龙海"];
    cityArray5[6]=["南平","市辖区","顺昌","浦城","光泽","松溪","政和","邵武","武夷山","建瓯","建阳"];
    cityArray5[7]=["龙岩","市辖区","长汀","永定","上杭","武平","连城","漳平"];
    cityArray5[8]=["宁德","市辖区","霞浦","古田","屏南","寿宁","周宁","福安","福鼎"];
    var cityArray6=[];
    cityArray6[0]=["济南","历下区","市中区","槐荫区","天桥区","历城区","长清区","平阴","济阳","商河","章丘"];
    cityArray6[1]=["青岛","市南区","市北区","四方区","黄岛区","崂山区","李沧区","城阳区","胶州","即墨","平度","胶南","莱西"];
    cityArray6[2]=["淄博","恒台","高青"];
    cityArray6[3]=["枣庄","市辖区","滕州"];
    cityArray6[4]=["东营","市辖区","垦利","利津","广饶"];
    cityArray6[5]=["烟台","市辖区","长岛","龙口","莱阳","莱州","蓬莱","招远","栖霞","海阳"];
    cityArray6[6]=["潍坊","市辖区","昌乐","青州","诸城","寿光","安丘","高密"];
    cityArray6[7]=["济宁","市辖区","微山","鱼台","金乡","嘉祥","汶上","泗水","梁山","曲阜"];
    cityArray6[8]=["秦安","市辖区","宁阳","东平","新泰","肥城"];
    cityArray6[9]=["威海","市辖区","文登","荣成","乳山"];
    cityArray6[10]=["日照","市辖区","五莲"];
    cityArray6[11]=["莱芜","市辖区"];
    cityArray6[12]=["德州","市辖区","陵县","宁津","庆云","齐河","平原","夏津","武城","乐陵","禹城"];
    cityArray6[13]=["聊城","市辖区","阳谷","莘县","东阿","冠县","高唐","临清"];
    cityArray6[14]=["滨州","市辖区","惠民","阳信","沾化","博兴","邹平"];
    cityArray6[15]=["菏泽","市辖区","曹县","单县","成武","巨野","定陶","东明"];
    var cityArray7=[];
    cityArray7[0]=["武汉","江汉区","硚口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄浦区","新洲区"];
    cityArray7[1]=["黄石","市南区","阳新","大冶"];
    cityArray7[2]=["十堰","市辖区","竹山","竹溪","房县","丹江口"];
    cityArray7[3]=["宜昌","市辖区","远安","兴山","秭归","长阳","五峰","宜都","当阳","枝江"];
    cityArray7[4]=["襄阳","市辖区","南漳","谷城","保康","老河口","枣阳","宜城"];
    cityArray7[5]=["鄂州","市辖区"];
    cityArray7[6]=["荆门","市辖区","京山","沙洋","钟祥"];
    cityArray7[7]=["孝感","市辖区","孝昌","大悟","云梦","应城","安陆","汉川"];
    cityArray7[8]=["荆州","市辖区","公安","监利","江陵","石首","洪湖","松滋"];
    cityArray7[9]=["黄冈","市辖区","团风","红安","罗田","英山","浠水","黄梅","麻城","武穴"];
    cityArray7[10]=["咸宁","市辖区","嘉鱼","通城","崇阳","通山","赤壁"];
    cityArray7[11]=["随州","随县","广水"];
    cityArray7[12]=["恩施","恩施市","利川","建始","巴东","宣恩","咸丰","来凤","鹤峰"];
    cityArray7[13]=["省直辖县级","仙桃","潜江","天门","神农架"];
    var cityArray8=[];
    cityArray8[0]=["石家庄","长安区","桥东区","桥西区","新华区","裕华区","正定","行唐","灵寿","高邑","深泽","赞皇","无极","平山","元氏","赵县","辛集","晋州","新乐","鹿泉"];
    cityArray8[1]=["唐山","市辖区","乐亭","迁西","玉田","唐海","遵化","迁安"];
    cityArray8[2]=["秦皇岛","市辖区","青龙","昌黎","抚宁","卢龙"];
    cityArray8[3]=["邯郸","市辖区","邯郸县","临漳","成安","大名","涉县","磁县","肥乡","永年","邱县","鸡泽","广平","馆陶","魏县","曲周","武安"];
    cityArray8[4]=["邢台","市辖区","邢台县","临城","内丘","任县","南和","宁晋","巨鹿","新河","广宗","平乡","魏县","清河","临西","南宫","沙河"];
    cityArray8[5]=["保定","市辖区","满城","清苑","涞水","徐水","定兴","唐县","高阳","容城","涞源","望都","安新","易县","曲阳","顺平","博野","雄县","涿州","定州","安国","高碑店"];
    cityArray8[6]=["张家口","市辖区","宣化","张北","康保","沽源","尚义","蔚县","阳原","怀安","万全","怀来","赤城","崇礼"];
    cityArray8[7]=["承德","市辖区","承德县","兴隆","平泉","隆化","丰宁","宽城","围场"];
    cityArray8[8]=["沧州","市辖区","沧县","青县","东光","海兴","盐山","肃宁","南皮","吴桥","献县","孟村","泊头","任丘","黄骅","河间"];
    cityArray8[9]=["廊坊","市辖区","固安","永清","香河","大城","文安","大厂","霸州","三河"];
    cityArray8[10]=["衡水","市辖区","枣强","武强","饶阳","安平","故城","景县","冀州","深州"];
    var cityArray9=[];
    cityArray9[0]=["太原","小店区","迎泽区","杏花岭区","尖草坪区","万柏林区","晋源区","清徐","阳曲","娄烦","古交"];
    cityArray9[1]=["大同","市辖区","平定","盂县"];
    cityArray9[2]=["长治","市辖区","长治县","屯留","平顺","黎城","壶关","长子","武乡","沁县","沁源","潞城"];
    cityArray9[3]=["晋城","市辖区","沁水","阳城","陵川","泽州","高平"];
    cityArray9[4]=["朔州","市辖区","山阴","右玉","怀仁"];
    cityArray9[5]=["晋中","市辖区","榆社","左权","和顺","昔阳","寿阳","太谷","祁阳","容城","涞源","望都","安新","易县","曲阳","顺平","博野","雄县","涿州","定州","安国","高碑店"];
    cityArray9[6]=["运城","市辖区","临猗","万荣","闻喜","夏县","平陆","永济","河津"];
    cityArray9[7]=["忻州","市辖区","五台","代县","宁武","静乐","神池","五寨","河曲","保德","偏关","原平"];
    cityArray9[8]=["临汾","市辖区","曲沃","翼城","洪洞","古县","安泽","浮山","吉县","乡宁","大宁","永和","蒲县","汾西","侯马","霍州"];
    cityArray9[9]=["吕梁","市辖区","文水","交城","兴县","临县","柳林","石楼","方山","中阳","交口","孝义","汾阳"];
    var cityArray10=[];
    cityArray10[0]=["呼和浩特","新城区","回民区","玉泉区","赛罕区","土默特左旗","托克托","和林格尔","清水河","武川"];
    cityArray10[1]=["包头","市辖区","土默特右旗","固阳","达尔罕茂明安联合旗"];
    cityArray10[2]=["乌海","市辖区"];
    cityArray10[3]=["赤峰","市辖区","阿鲁科尔泌旗","巴林左旗","林夕克什克腾旗","翁牛特旗","宁城","敖汉旗"];
    cityArray10[4]=["通辽","市辖区","科尔沁左翼中棋","科尔沁左翼后棋","开鲁库伦旗","奈曼旗","扎鲁特旗","霍林郭棋"];
    cityArray10[5]=["鄂尔多斯","市辖区","达拉特旗","准格尔旗","鄂托克前旗","鄂托克旗","杭锦旗","乌审旗","伊金霍洛旗"];
    cityArray10[6]=["呼伦贝尔","市辖区","阿荣旗","莫力达瓦达斡尔族自治旗","鄂伦春自治旗","鄂温克族自治旗","陈巴尔虎旗","新巴尔虎左旗","新巴尔虎右旗","满洲里","牙克石","扎兰屯","额尔古纳","根河"];
    cityArray10[7]=["巴彦淖尔","市辖区","五原","磴口","乌拉特前旗","乌拉特中旗","乌拉特后旗","杭锦后旗"];
    cityArray10[8]=["乌兰擦布","市辖区","卓资","化德","商都","兴和","凉城","察哈尔右翼前旗","察哈尔右翼中旗","察哈尔右翼后旗","四子王旗","丰旗"];
    cityArray10[9]=["兴安盟","乌兰浩特","阿尔山","科尔沁右翼前棋","科尔沁右翼中棋","突泉"];
    cityArray10[10]=["锡林郭勒盟","二连浩特","阿巴嘎旗","苏尼特左旗","苏尼特右旗","东乌珠穆沁旗","西乌珠穆沁旗","太仆侍旗","镶黄旗","正镶白旗","正蓝旗","多伦"];
    cityArray10[11]=["阿拉善盟","阿拉善左旗","阿拉善右旗","额济纳旗"];






/*==============================================common functions============================================*/


























})


