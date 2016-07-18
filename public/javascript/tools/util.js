
var CalendarUtil = {
	WEEKDAYS : ["��", "һ", "��", "��", "��", "��", "��"],
	ANIMAL_SYMBOL : ["��","ţ","��","��", "��", "��", "��", "��", "��", "��", "��", "��"],
	STEMS : ["��", "��", "��", "��", "��", "��", "��", "��", "��", "��"],
	BRANCHES : ["��", "��", "��", "î", "��", "��", "��", "δ", "��", "��", "��", "��"],	
	XUN_NAMES : ["��", "ʮ", "إ"],	
	SPECIAL_DAY_NAMES : ["��ʮ", "��ʮ", "��ʮ"],	
	LUNAR_MONTH_NAMES : ["��", "��", "��", "��", "��", "��", "��", "��", "��", "ʮ", "��", "��"],	
	LUNAR_DAY_NAMES : ["һ", "��", "��", "��", "��", "��", "��", "��", "��", "ʮ"],
	TERMS : ["С��","��","����","��ˮ","����","����","����","����","����","С��","â��","����","С��","����","����","����","��¶","���","��¶","˪��","����","Сѩ","��ѩ","����"],	
	TERMS_INFO : [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758],	
	STAR_SYMBOLS : ["19Ħ����", "18ˮƿ��", "20˫����", "19������", "20��ţ��", "21˫����", "22��з��", "22ʨ����", "22��Ů��", "23�����", "22��Ы��", "21������"],
	getTermDay : function (year, n) {
		if (year == 2009 && n == 2) {
			this.TERMS_INFO[n] = 43467;
		} else if (n == 2) {
			this.TERMS_INFO[n] = 42467;
		}
		var offDate = new Date((31556925974.7 * (year - 1900) + this.TERMS_INFO[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
		return offDate.getUTCDate();
	},	
	getTerm : function (n) {
		return this.TERMS[n];
	},
	getLunarYear : function (solarYear, solarMonth, solarDay) {
		if (solarMonth > 2) {
			return solarYear;
		} else if (solarMonth < 2) {
			return solarYear - 1;
		} else {
			var liChun = this.getTermDay(solarYear, 2);
			if (solarDay < liChun) {
				return solarYear - 1;
			} else {
				return solarYear;
			}
		}
	},
	getAnimalSymbolIndex : function (solarYear, solarMonth, solarDay) {
		var lunarYear = this.getLunarYear(solarYear, solarMonth, solarDay);
		lunarYear -= 4;
		if (lunarYear < 0) {
			var n = Math.floor(lunarYear / 60);
			lunarYear += (-n + 1) * 60;
		}
		return lunarYear % 12;
	},
	getAnimalSymbol : function (solarYear, solarMonth, solarDay) {
		return this.ANIMAL_SYMBOL[this.getAnimalSymbolIndex(solarYear, solarMonth, solarDay)];
	},
	getLunarYearName : function (solarYear, solarMonth, solarDay) {
		var lunarYear = this.getLunarYear(solarYear, solarMonth, solarDay);
		lunarYear -= 4;
		if (lunarYear < 0) {
			var n = Math.floor(lunarYear / 60);
			lunarYear += (-n + 1) * 60;
		}
		return this.STEMS[lunarYear % this.STEMS.length] + this.BRANCHES[lunarYear % this.BRANCHES.length];
	},
	getLunarMonthName : function (lunarMonth) {
		if (lunarMonth > 12) {
			return "��" + this.LUNAR_MONTH_NAMES[lunarMonth - 12 - 1];
		} else if (lunarMonth >= 1 && lunarMonth <= 24) {
			return this.LUNAR_MONTH_NAMES[lunarMonth - 1];
		} else {
			return "";
		}
	},
	getLunarDayName : function (lunarDay) {
		if (lunarDay % 10 == 0) {
			return this.SPECIAL_DAY_NAMES[Math.floor(lunarDay / 10) - 1];
		} else if (lunarDay >= 1 && lunarDay <= 30) {
			return this.XUN_NAMES[Math.floor(lunarDay / 10)] + this.LUNAR_DAY_NAMES[(lunarDay % 10) - 1];
		} else {
			return "";
		}
	},
	getLunarHourName : function (hour) {
		return this.BRANCHES[((hour + 1) >> 1) % 12];
	},
	getSolarWeekday : function (y, m, d) {
		JD.h=12, JD.m=0, JD.s=0.1;
		JD.Y=y; JD.M=m; JD.D=d;
		var Bd0 = int2(JD.toJD()) + 1;
		return Bd0 % 7;
	},
	getLunarWeekday : function (y, m, d, lunarData) {
		var date = CalendarConverter.lunarToSolar(y, m, d, lunarData);
		return this.getSolarWeekday(date[0], date[1], date[2]);
	},
	getWeekdayNameBySolarDate : function (y, m, d) {
		return "����" + this.WEEKDAYS[this.getSolarWeekday(y, m, d)];
	},
	getWeekdayNameByLunarDate : function (y, m, d) {
		var date = CalendarConverter.lunarToSolar(y, m, d, getLunarYearData(y)[1]);
		return this.getWeekdayNameBySolarDate(date[0], date[1], date[2]);
	},
	getWeekdayName : function (weekday) {
		return "����" + this.WEEKDAYS[weekday];
	},
	getStarSymbolBySolarDate : function (month, day) {
		var ed = Math.floor(this.STAR_SYMBOLS[month - 1].substr(0, 2), 10);
		if (day <= ed) {
			return this.STAR_SYMBOLS[month - 1].substr(2);
		} else {
			return this.STAR_SYMBOLS[month % 12].substr(2);
		}
	},
	getStarSymbolByLunarDate : function (year, month, day) {
		var d = CalendarConverter.lunarToSolar(year, month, day, getLunarYearData(year)[1]);
		return this.getStarSymbolBySolarDate(d[1], d[2]);
	}
}
