

function CalItem(y, m, d, lun, lunarData) {
	this.solarYear = 0;
	this.solarMonth = 0;
	this.solarDay = 0;
	this.lunarYear = 0;
	this.lunarMonth = 0;
	this.lunarDay = 0;
	this.isLunar = lun;
	this.lunarData = lunarData;
	this.getLunarMonthName = function() {
		return CalendarUtil.getLunarMonthName(this.lunarMonth);
	};
	this.getMainName = function() {
		if (this.isLunar) {
			return CalendarUtil.getLunarDayName(this.lunarDay);
		} else {
			return this.solarDay;
		}
	};
	this.getSubName = function() {
		if (this.isLunar) {
			if (this.solarDay == 1) {
				return "<b>" + this.solarMonth + "月" + "</b>";
			}
			return this.solarDay;
		} else {
			if (this.lunarDay == 1)	{
				if (this.lunarMonth > 12) {
					return "<b>" + this.getLunarMonthName() + "</b>";
				} else {
					return "<b>" + this.getLunarMonthName() + "月" + "</b>";
				}
			}
			return CalendarUtil.getLunarDayName(this.lunarDay);
		}
	};
	if (lun) {
		this.lunarYear = y;
		this.lunarMonth = m;
		this.lunarDay = d;
		var date = CalendarConverter.lunarToSolar(y, m, d, lunarData[1]);
		this.solarYear = date[0];
		this.solarMonth = date[1];
		this.solarDay = date[2];
	} else {
		this.solarYear = y;
		this.solarMonth = m;
		this.solarDay = d;
		var date = CalendarConverter.solarToLunar(y, m, d, lunarData);
		this.lunarYear = date[0];
		this.lunarMonth = date[1];
		this.lunarDay = date[2];
	}
}

//添加事件侦听，兼容多种浏览器
function addEvent(el, evname, func) {
	if (el.attachEvent) { // IE
		el.attachEvent("on" + evname, func);
	} else if (el.addEventListener) { //GECKO / W3C
		el.addEventListener(evname, func, true);
	} else { // Opera (or old browsers)
		el["on" + evname] = func;
	}
}

//移除事件侦听
function removeEvent(el, evname, func) {
	if (el.detachEvent) { // IE
		el.detachEvent("on" + evname, func);
	} else if (el.removeEventListener) { // GECKO / W3C
		el.removeEventListener(evname, func, true);
	} else { // Opera (or old browsers)
		el["on" + evname] = null;
	}
}

var calItems;
var IS_LUNAR = false;
var SELECT_INDEX;
var CONTROLLER;

function getTips(cal) {
	var sname = cal.solarYear + "年" + cal.solarMonth + "月" + cal.solarDay + "日";
	var lname = cal.getLunarMonthName() + "月" + CalendarUtil.getLunarDayName(cal.lunarDay);
	if (cal.isLunar) {
		return lname + "\n" + sname;
	} else {
		return sname + "\n" + lname;
	}
}

function setCalItems(y, m, lunar, lunarData) {
	calItems = new Array();
	var monthDays, startWeekday;
	if (lunar) {
		monthDays = CalendarConverter.getLunarMonthDays(m, lunarData[1]);
		startWeekday = CalendarUtil.getLunarWeekday(y, m, 1, lunarData[1]);
	} else {
		monthDays = CalendarConverter.getSolarMonthDays(y, m);
		startWeekday = CalendarUtil.getSolarWeekday(y, m, 1);
	}
	SELECT_INDEX += startWeekday;
	var length = Math.ceil((monthDays + startWeekday) / 7) * 7;
	var i = 0;
	for (var j = 0; j < startWeekday; j++, i++) {
		calItems[i] = 0;
	}
	for (var j = 1; j <= monthDays; j++, i++) {
		calItems[i] = new CalItem(y, m, j, lunar, lunarData);
	}
	for (; i < length; i++) {
		calItems[i] = 0;
	}
}

function getCalItems() {
		var daySel = document.getElementById("daySel");
	daySel.length = 0;
	var rows = calItems.length / 7;
	var ctnt = "";
	for (var i = 0; i < rows; i++) {
		ctnt += "<tr>";
		for (var j = 0; j < 7; j ++) {
			var id = 7 * i + j;
			if (calItems[id] == 0) {
				ctnt += "<td nowrap=\"nowrap\"></td>";
			} else {
				var face =calItems[id].isLunar ? "华文琥珀" : "Arial Black";
				var bg = "";
				if (id == SELECT_INDEX) {
					bg = " bgColor=\"#b2e5f6\" ";
				}
				daySel.options[daySel.length] = new Option(calItems[id].getMainName(), id);
				if (id == SELECT_INDEX) {
					daySel.selectedIndex=id;
				}
				ctnt += "<td id=\"TD" + id + "\"nowrap=\"nowrap\" align=\"center\" class=\"cal_item\"" + bg + " onclick=\"selectDate(this)\" title=\"" + getTips(calItems[id]) + "\">" +
						"<font id=\"SD" + id + "\" size=\"2\"  face=\"" + face + "\">" + 
						calItems[id].getMainName() + "</font><br/>" +
						"<font id=\"LD" + id + "\" style=\"font-size:7pt\" color=\"#667330\">" + calItems[id].getSubName() + "</font></td>";
			}
		}
		ctnt += "</tr>";
	}
	return ctnt;
}

function setYearOptions(endYear, selectedYear) {
	var yearSel = document.getElementById("yearSel");
	yearSel.length = 0;
	var startYear = endYear - 150;
	for (var i = startYear; i <= endYear; i++) {
		yearSel.options[yearSel.length] = new Option(i, i);
	}
	yearSel.selectedIndex = selectedYear - startYear;
}

function setMonthOptions(y,m, lunar, lunarData) {
	
	
	var monthSel = document.getElementById("monthSel");
	monthSel.length = 0;
	if (lunar) {
		var leapMonth = CalendarConverter.getLunarLeapMonth(lunarData[1]);
		var index = CalendarConverter.getLunarMonthIndex(m, lunarData[1]);
		
		if (leapMonth > 0) {
			for (var i = 1; i <= leapMonth; i++) {
				if(y==nowYearToLunar){
					
				if(i<=nowMonthToLunar){
				 monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
				}else{
				  break;
				}
				}else{
				monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
				}
				
			}
	if(y==nowYearToLunar){
					
				if(leapMonth<=nowMonthToLunar){
			monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(leapMonth + 12), leapMonth + 12);
				}
	}else{
	monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(leapMonth + 12), leapMonth + 12);
	}
				
			for (var i = leapMonth + 1; i <= 12; i++) {
				if(y==nowYearToLunar){
					if(i<=nowMonthToLunar){
					   monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
					}else{
					   break;
					}
				}else{
				monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
				}
				
			}
		} else {
			for (var i = 1; i <= 12; i++) {
				if(y==nowYearToLunar){
				if(i<=nowMonthToLunar){
				monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
				}else{
				   break;
				}
				}else{
				monthSel.options[monthSel.length] = new Option(CalendarUtil.getLunarMonthName(i), i);
				}
			}
		}
		monthSel.selectedIndex = index;
	} else {
		for (var i = 1; i <= 12; i++) {
			if(y==nowYear){
			if(i<=nowMonth){
			monthSel.options[monthSel.length] = new Option(i, i);
			}else{
			break;
			}
			}else{
			monthSel.options[monthSel.length] = new Option(i, i);
			}
			
		}
		
		monthSel.selectedIndex = m - 1;
	}
}
function setDayOptions(y, m, lunar, lunarData) {
	var daySel = document.getElementById("daySel");
	daySel.length = 0;
	calItems = new Array();
	var monthDays;
	var mon=0;
	var myear=0;
	var mday=0;
	if (lunar) {
		myear=nowYearToLunar;
		mon=nowMonthToLunar;
		mday=nowDayToLunar;
		monthDays = CalendarConverter.getLunarMonthDays(m, lunarData[1]);
		
	} else {
		myear=nowYear;
		mon=nowMonth;
		mday=nowDay;
		monthDays = CalendarConverter.getSolarMonthDays(y, m);
		
	}
	
	var i = 0;

	
	for (var j = 1; j <= monthDays; j++, i++) {
		calItems[i] = new CalItem(y, m, j, lunar, lunarData);
		
		if(y==myear&&mon==m){
			if(j<=mday){
				daySel.options[daySel.length] = new Option(calItems[i].getMainName(), i);
			}else{
			break;
			}
			
			
			
		
		}else{
		daySel.options[daySel.length] = new Option(calItems[i].getMainName(), i);
		}
		
		if (i == SELECT_INDEX) {
					daySel.selectedIndex=i;
				}
	}
	
}

var nowYear=0;
var nowMonth=0;
var nowDay=0;
var nowYearToLunar=0;
var nowMonthToLunar=0;
var nowDayToLunar=0;

function setCalendar(y, m, d) {
	
	var lunarData = 0;
	var now = new Date();
	var thisYear = now.getFullYear();
	var thisMonth = now.getMonth() + 1;
	var today = now.getDate();
	if(nowYear==0){
	  nowYear=thisYear;
	nowMonth=thisMonth;
	 nowDay=today;
	}

	if (IS_LUNAR) {
		lunarData = getLunarYearData(thisYear);
		var date = CalendarConverter.solarToLunar(thisYear, thisMonth, today, lunarData);
		thisYear = date[0];
		thisMonth = date[1];
		today = date[2];
		
		if(nowYearToLunar==0){
	    nowYearToLunar=thisYear;
	    nowMonthToLunar=thisMonth;
	    nowDayToLunar=today;
	}
	}
	y = parseInt(y);
	m = parseInt(m);
	if (m <= 0 || d <= 0) {
		y = thisYear;
		m = thisMonth;
		d = today;
	}
	lunarData = getLunarYearData(y);
	if (IS_LUNAR) {
		if (m > 12 && CalendarConverter.getLunarLeapMonth(lunarData[1]) != m - 12) {
			m -= 12;
		}
		var md = CalendarConverter.getLunarMonthDays(m, lunarData[1]);
		if (d > md)	{
			d = md;
		}
	} else {
		var md = CalendarConverter.getSolarMonthDays(y, m);
		if (d > md)	{
			d = md;
		}
	}
	var day=d;
	SELECT_INDEX = d - 1;
//setCalItems(y, m, IS_LUNAR, lunarData);

//	getCalItems();

	setYearOptions(Math.max(thisYear, y), y);
	setMonthOptions(y,m, IS_LUNAR, lunarData);
	setDayOptions(y, m, IS_LUNAR, lunarData);
	 done();
}

function changeDate() {
	var yearSel = document.getElementById("yearSel");
	var monthSel = document.getElementById("monthSel");
	var day = calItems[SELECT_INDEX].solarDay;
	if (IS_LUNAR) {
		day = calItems[SELECT_INDEX].lunarDay;
	}
	
	//alert("day:"+day);

	setCalendar(yearSel.value, monthSel.value, day);
	
}

function changeType() {
	var type = document.getElementsByName("isLunar");
	var y = parseInt(document.getElementById("yearSel").value);
	var m = parseInt(document.getElementById("monthSel").value);
	var d = calItems[SELECT_INDEX].solarDay;
	if (IS_LUNAR) {
		d = calItems[SELECT_INDEX].lunarDay;
		
	}
	var lunarData = getLunarYearData(y);
	if (type[0].checked) {
		if (!IS_LUNAR) {
			return;
		}
		IS_LUNAR = false;
		var date = CalendarConverter.lunarToSolar(y, m, d, lunarData[1]);
		y = date[0];
		m = date[1];
		d = date[2];
		setCalendar(y, m, d);
	} else {
		if (IS_LUNAR) {
			return;
		}
		IS_LUNAR = true;
		var date = CalendarConverter.solarToLunar(y, m, d, lunarData);
		y = date[0];
		m = date[1];
		d = date[2];
		setCalendar(y, m, d);
	}
}

function selectDate(obj) {

		done();
		
        var i = obj.value;
		SELECT_INDEX = i;
	
	
}
var vy;
var vm;
var vd;
var vts;
function done() {
	
	
	var monthtype=0;
		var m = parseInt(document.getElementById("monthSel").value);
		var mo;
		if(m<12){
		  mo=m;
		}else{
		 mo=(m-12);
		}
			
		
   if (IS_LUNAR) {
		if(m>12){
			m=(m-12);
			monthtype=1;
		}
	}
		
		var y = parseInt(document.getElementById("yearSel").value);
			
	     var day= parseInt(document.getElementById("daySel").value)+1;
		 document.getElementById("birth").value=y+"-"+ mo+"-"+day;
		 document.getElementById("monthtype").value=monthtype;
	if (IS_LUNAR) {
		 document.getElementById("lunarType").value=1;
		
	}else{
	 document.getElementById("lunarType").value=0;
	}
	//CONTROLLER.value = value;
	//hideCalendar();
}

function initCalendar() {
	//document.writeln(CSS);
	//document.writeln(CTNT);
	//为非IE浏览器添加contains方法
	if (typeof(HTMLElement) != "undefined") {
      HTMLElement.prototype.contains = function(obj) {
          while (obj != null && typeof(obj.tagName) != "undefind") {
       		if (obj == this) {
       			return true;
			}
       		obj = obj.parentNode;
       }
       return false;
      };
	}
}
//显示日历
function showCalendar1() {

	var type = document.getElementsByName("isLunar");
	
		
		IS_LUNAR = false;
		type[0].checked = true;
		type[1].checked = false;
	

	setCalendar(0, 0,0);

}
//显示日历
function showCalendar(controller) {
	CONTROLLER = controller;
	controller.readOnly = true;
	var value = controller.value.split("-");
	var type = document.getElementsByName("isLunar");
	
	if (vts) {
		
		IS_LUNAR = true;
		type[0].checked = false;
		type[1].checked = true;
	} else {
		
		IS_LUNAR = false;
		type[0].checked = true;
		type[1].checked = false;
	}
	var year = vy;
	if (isNaN(year)) {
		year = 0;
		controller.value = "";
	}
	var month = vm;
	if (isNaN(month)) {
		month = 0;
		controller.value = "";
	}
	var day = vd;
	if (isNaN(day)) {
		day = 0;
		controller.value = "";
	}
//	window.cal_bg.style.display="";
	event.cancelBubble=true;
	var cTop = controller.offsetTop;
	var cBottom = controller.offsetHeight + cTop;
	var calHeight = window.cal_bg.style.pixelHeight;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
	var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	window.cal_bg.style.posLeft = event.clientX - event.offsetX + scrollLeft; 
	window.cal_bg.style.posTop = event.clientY - event.offsetY + cBottom + scrollTop;
	if (window.cal_bg.style.posLeft + window.cal_bg.clientWidth > document.body.clientWidth)
		window.cal_bg.style.posLeft += controller.offsetWidth - window.cal_bg.clientWidth;
	
	window.cal_bg.style.display="block";
	window.cal_bg.focus();
	setCalendar(year, month, day);
	addEvent(document, "keydown", hideCalendar);
	addEvent(document, "keypress", hideCalendar);
	addEvent(document, "mousedown", hideWhenClick);
}

//隐藏日历
function hideCalendar() {
	document.all.cal_bg.style.display = "none";
	removeEvent(document, "keydown", hideCalendar);
	removeEvent(document, "keypress", hideCalendar);
	removeEvent(document, "mousedown", hideWhenClick);
}

//在日历选择器外点击时隐藏日历
function hideWhenClick() {
	var e = arguments[0] || event;
	var obj = document.getElementById("cal_bg");
	if (!obj.contains(e.srcElement)) {
		hideCalendar();
	}
}

initCalendar();