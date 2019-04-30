if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

(function () {
    var basej = function (ops) {
        var ops = Object.assign(this, ops);
    }
    basej.prototype = {
        obj: {
            cHr: function (ops,txt) {
                var obj = document.createElement('div');
                var line = document.createElement('div');
                var span = document.createElement('span');
                $(line).css({ display: 'inline-block', border: 'solid 1px red',width: '80%' });
                var ops = Object.assign({ position: 'absolute', width: '80%', display: 'inline-block'}, ops);
                span.innerText = txt;
                $(obj).css(ops);
                $(obj).append(line, span);
                return obj
            },
            cDiv: function (ops,fn) {
                var obj = document.createElement('div');
                var ops = Object.assign({}, ops);
                $(obj).attr(ops);
                if (fn) {
                    $(obj).on(fn);
                }
                return obj
            },
            cTxt: function (ops, fn) {
                var obj = document.createElement('input');
                var ops = Object.assign({ type: 'text' }, ops);
                $(obj).attr(ops);
                if (fn) {
                    $(obj).on(fn);
                }
                return obj
            },
            cBtn: function (ops, fn) {
                var obj = document.createElement('input');
                var ops = Object.assign({ type: 'button' }, ops);
                $(obj).attr(ops);
                if (fn) {
                    $(obj).on(fn);
                }
                return obj
            },
            cSpan: function (text) {
                var obj = document.createElement('span');
                if (text != undefined) {
                    $(obj).text(text);
                }
                return obj
            },
            cTh: function (ops, txt) {
                var obj = document.createElement('th');
                var ops = Object.assign({}, ops);
                $(obj).attr(ops);
                if (txt) {
                    $(obj).text(txt);
                }
                return obj
            },
            cTd: function (ops, txt) {
                var obj = document.createElement('td');
                var ops = Object.assign({}, ops);
                $(obj).attr(ops);
                if (txt) {
                    $(obj).text(txt);
                }
                return obj
            },
            cCheckBox: function (ops, fn) {
                var obj = document.createElement('input');
                var ops = Object.assign({ type: 'checkbox' }, ops);
                $(obj).attr(ops);
                if (fn) {
                    $(obj).on(fn);
                }
                return obj
            },
            cTableCaption: function (text) {
                var obj = document.createElement('caption');
                if (text != undefined) {
                    $(obj).text(text);
                }
                return obj
            },
            cRadio: function (ops, fn) {
                var div = this.cDiv();
                var span
                var obj = document.createElement('input');
                var ops = Object.assign({ type: 'radio' }, ops);
                $(obj).attr(ops);
                if (ops.text) {
                    span = this.cSpan(ops.text);
                }
                if (fn) {
                    $(obj).on(fn);
                }
                if (span) {
                    $(div).append(obj, span);
                    return div
                } else {
                    return obj
                }
                
            },
            cFile: function (ops, fn) {
                var obj = document.createElement('input');
                var ops = Object.assign({ type: 'file' }, ops);
                $(obj).attr(ops);
                if (fn) {
                    $(obj).on(fn);
                }
                return obj
            }
        },
        fn: {
            /**
             * 功能说明：创建遮罩,zindex=1000
             * @param {any} j
             */
            cMask: function (j) {
                var cObj = basej.prototype.obj;
                var mask = cObj.cDiv({ class: 'mask' });
                mask.style.top = mask.style.left = 0 + 'px';
                mask.style.width = 100 + '%';
                mask.style.backgroundColor= 'rgba(255, 255, 255, 0.5)';
                mask.style.position = 'relative';
                mask.style.zIndex = 1000;
                mask.style.height =  document.body.scrollHeight + 'px';
                mask.ondblclick = function () {
                    document.body.removeChild(this);
                }
                document.body.appendChild(mask);
            },
            /**
             * fn:自动隐藏
             * @param {any} obj：隐藏对象
             */
            autoHide: function (obj,fn) {
                var ofn = function () {
                    $(obj).fadeOut(1000, function () {
                        if (fn) {
                            fn()
                        } else {
                            $(obj).remove()
                        }
                    });
                };
                var removefn = function () {
                    obj.timer = setTimeout(ofn, 1000);
                }
                var holdfn = function () {
                    clearTimeout(obj.timer);
                }
                clearTimeout(obj.timer);
                obj.timer = setTimeout(ofn, 1500);
                $(obj).on({
                    mouseover: holdfn,
                    mouseout: removefn,
                    focus: function () {
                        clearTimeout(obj.timer);
                        $(obj).unbind('mouseout');
                    },
                    blur: removefn
                });
            }

        },
        assistFn:{
            isJsonSring:function(str){
                try {
                    if (typeof JSON.parse(str) == "object") {
                        return true;
                    }
                } catch(e) {
                }
                return false;
            },
            ajax: function (datajson, fn) {
                var aFn = basej.prototype.assistFn;
                $.ajax({
                    url: window.location.pathname,
                    cache: false,
                    type: 'POST', //GET
                    async: true,    //或false,是否异步
                    dataType: 'text',
                    data: datajson,
                    beforeSend: function (xhr) {
                        //alert('远程调用开始...');
                        aFn.consoleShow({ content: 'ajax loading...' });
                    },
                    success: function (json) {
                        if (fn) {
                            if (aFn.isJsonSring(json)) {
                                var j = JSON.parse(json);
                                aFn.consoleShow({ showType: 'echo[ajax]', content: j });
                                fn(j);
                            } else {
                                aFn.consoleShow({ showType: 'echo[ajax]', content: json });
                                fn(json)
                            }
                        }
                    },
                    complete: function (xhr, textStatus) {
                        //aFn.consoleShow({ showType: '远程调用成功，状态文本值:', content: textStatus });
                        //aFn.consoleShow({ showType: '远程调用成功，状态文本值:', content: XMLHttpRequest });
                        aFn.consoleShow({ content: 'ajax load finish:' + textStatus });
                    },
                    error: function (xhr, status, err) {
                        aFn.consoleShow({ mode: true, groupName: 'ajaxErr', content: err });
                    }
                })
            },
            consoleShow: function (json) {
                if ('mode' in json && json['mode'] == true) {
                    var gName = 'show'
                    if ('groupName' in json) {
                        gName = json['groupName'];
                    }
                    console.group(gName)
                    console.log(json['content'])
                    console.groupEnd(gName)
                } else {
                    if ('showType' in json) {
                        console.log(json['showType'],json['content'])
                    } else {
                        console.log(json['content'])
                    }
                    
                }
            }
        }
    }
    window.basej = basej;
}())