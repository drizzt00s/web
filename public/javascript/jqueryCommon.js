/*
* jquery common function for dumex 1.0
* Copyright (c) 2011 Irving
* Date 2011-06-10 14:00
* 
*/
var d = document, w = window, ST = setTimeout, SI = setInterval;
w.errorMsg = null;
//阻止AJAX死循环调用

var recurrenceFlag = false;

//异常记录
var exceptionLog = function (str) {
    if (recurrenceFlag) {
        recurrenceFlag = false;
        return;
    } else {
        recurrenceFlag = true;
        $.ajaxPostText("/Ajax/log/Controller.aspx/LogExceptonMessage", str);
    };
};

jQuery.extend({
    AjaxTimeout: 3000,
    UNDF: 'undefined',
    dmxMsgType: { Alert: 0, FloatWindow: 1, TextElement: 2 },
    loadingShow: function (loadingBar) {
        loadingBar = loadingBar || $("#loading");
        if (loadingBar) {
            if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                $('<iframe class="floatIframe"></iframe>').appendTo(loadingBar);
            };
            loadingBar.css({
                "top": (((window.screen.availHeight || window.screen.height || 640) - loadingBar.height()) / 2 - 90 + (document.documentElement.scrollTop || 0)) + "px",
                "left": (((window.screen.availWidth || window.screen.width || 1366) - loadingBar.width()) / 2 + 80 + (document.documentElement.scrollLeft || 0)) + "px"
            }).show();
        }
    },
    loadingHide: function (loadingBar) {
        (loadingBar || $("#loading")).hide();
    },
    ajaxGetJson: function (sUrl, sData, func, async, loadingBar) {
        $.ajax({
            url: sUrl,
            data: sData,
            type: 'get',
            async: (async | false) == 0 ? false : true,
            beforeSend: function () {
                $.loadingShow(loadingBar);
            },
            complete: function () {
                $.loadingHide(loadingBar);
            },
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            //timeout: 3000,
            success: function (data) {
                $.ajaxSuccess(data, func)
            },
            error: function (x, e, s) {
                exceptionLog("Ajax get error : " + x + "---" + e + "---" + s);
            }
        })
    },
    ajaxPostJson: function (sUrl, jData, func, async, loadingBar) {
        $.ajax({
            url: sUrl,
            data: jData,
            type: "post",
            async: (async | false) == 0 ? false : true,
            beforeSend: function () {
                $.loadingShow(loadingBar);
            },
            complete: function () {
                $.loadingHide(loadingBar);
            },
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            //timeout: 3000,
            success: function (data) {
                //alert(data);
                //alert(JSON.stringify(data));
                //var jsonDetail = data.d;
                //alert(jsonDetail);

                $.ajaxSuccess(data, func)
            },
            error: function (x, e, s) {
                exceptionLog("Ajax post error : " + x + "---" + e + "---" + s)
            }
        })
    },
    ajaxSuccess: function (data, func) {
        if (data.Error) {
            w.errorMsg = data.Error;
            $.handleError()
        } else {
            func != undefined && func(data);
        }
    },
    ajaxPostText: function (sUrl, jData, func, loadingBar) {
        $.ajax({
            url: sUrl,
            data: jData,
            type: "post",
            dataType: 'text',
            beforeSend: function () {
                $.loadingShow(loadingBar);
            },
            complete: function () {
                $.loadingHide(loadingBar);
            },
            contentType: "text;charset=utf-8",
            success: function (data) {
                $.ajaxSuccess(data, func)
            },
            error: function (x, e, s) {
                exceptionLog("Ajax post error : " + x + "---" + e + "---" + s)
            }
        })
    },
    string2xml: function (string) {
        var browserName = navigator.appName;
        var doc;
        if (browserName == 'Microsoft Internet Explorer') {
            doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.async = 'false';
            doc.loadXML(string)
        } else {
            doc = (new DOMParser()).parseFromString(string, 'text/xml')
        }
        return doc
    },
    dateDiff: function (cInterval, dt1, dt2) {
        var objInterval = {
            'D': 1000 * 60 * 60 * 24,
            'H': 1000 * 60 * 60,
            'M': 1000 * 60,
            'S': 1000,
            'T': 1
        };
        cInterval = cInterval.toUpperCase();
        try {
            return Math.abs((((dt2 - dt1) / objInterval[cInterval])))
        } catch (e) {
            return 999999
        }
    },
    getCookie: function (name) {
        var ck = document.cookie;
        var key = name + "=";
        if (ck && ck.indexOf(key) > -1) {
            return unescape(ck.substring(ck.indexOf(key) + key.length).split(';')[0])
        } else return null
    },
    removeCookie: function (name) {
        var dt = new Date();
        document.cookie = name + "=0;expires=" + dt.setFullYear(dt.getFullYear - 1) + ";"
    },
    setCookie: function (name, value) {
        document.cookie = name + '=' + escape(value)
    },
    /*
    方法名称:$.showMsg();
    引用路径: /Scripts/global/jquery.common.js

    参数jsn: type json
    jsn.msgType:        必填, 枚举类型$.dmxMsgType,   消息类型
    jsn.msgText:        必填, string ,                消息内容
    jsn.redirectUrl:    可空, string ,                显示消息后跳转url
    jsn.focusElement:   可空, jQuery Element,         显示消息后获焦元素

    jsn.msgCode:        可空, 消息代码,               用以记录到数据库
    */
    showMsg: function (jsn) {
        var t = this.dmxMsgType;
        switch (jsn.msgType) {
            case t.Alert:
            case t.FloatWindow:
            case t.TextElement:
            default: alert(jsn.msgText); break;
        };
        if (jsn.redirectUrl) window.location.href = jsn.redirectUrl;
        jsn.focusElement && jsn.focusElement.length && jsn.focusElement.focus();
    },
    /* refactoring jQuery.validate.js method showErrors */
    showError: function (_this, errors, c) {
        $.extend(this.errorMap, errors);
        this.errorList = [];
        for (var name in errors) {
            this.errorList.push({
                message: errors[name],
                element: this.findByName(name)[0]
            });
        }
        // remove items from success list
        this.successList = $.grep(this.successList, function (element) {
            return !(element.name in errors);
        });
        var errorText = "";
        $.each(errors, function (i, v) {
            errorText += v.message + "\n";
        });
        errorText && $.showMsg({ msgType: $.dmxMsgType.Alert, msgText: errorText, focusElement: $(errors[0].element) });
    },
    handleError: function () {

    }
});
