(function($){if($.browser===undefined){$.browser=(function(){var ua_match=function(ua){ua=ua.toLowerCase();
var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];
return{browser:match[1]||"",version:match[2]||"0"}
},matched=ua_match(navigator.userAgent),browser={};
if(matched.browser){browser[matched.browser]=true;
browser.version=matched.version
}if(browser.chrome){browser.webkit=true
}else{if(browser.webkit){browser.safari=true
}}return browser
})()
}var defaultMasks={pint:/[\d]/,"int":/[\d\-]/,pnum:/[\d\.]/,money:/[\d\.\s,]/,num:/[\d\-\.]/,hex:/[0-9a-f]/i,email:/[a-z0-9_\.\-@]/i,alpha:/[a-z_]/i,alphanum:/[a-z0-9_]/i};
var Keys={TAB:9,RETURN:13,ESC:27,BACKSPACE:8,DELETE:46};
var SafariKeys={63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35};
var isNavKeyPress=function(e){var k=e.keyCode;
k=$.browser.safari?(SafariKeys[k]||k):k;
return(k>=33&&k<=40)||k==Keys.RETURN||k==Keys.TAB||k==Keys.ESC
};
var isSpecialKey=function(e){var k=e.keyCode;
var c=e.charCode;
return k==9||k==13||k==27||k==16||k==17||(k>=18&&k<=20)||($.browser.opera&&!e.shiftKey&&(k==8||(k>=33&&k<=35)||(k>=36&&k<=39)||(k>=44&&k<=45)))
};
var getKey=function(e){var k=e.keyCode||e.charCode;
return $.browser.safari?(SafariKeys[k]||k):k
};
var getCharCode=function(e){return e.charCode||e.keyCode||e.which
};
$.fn.keyfilter=function(re){return this.keypress(function(e){if(e.ctrlKey||e.altKey){return
}var k=getKey(e);
if($.browser.mozilla&&(isNavKeyPress(e)||k==Keys.BACKSPACE||(k==Keys.DELETE&&e.charCode==0))){return
}var c=getCharCode(e),cc=String.fromCharCode(c),ok=true;
if(!$.browser.mozilla&&(isSpecialKey(e)||!cc)){return
}if($.isFunction(re)){ok=re.call(this,cc)
}else{ok=re.test(cc)
}if(!ok){e.preventDefault()
}})
};
$.extend($.fn.keyfilter,{defaults:{masks:defaultMasks},version:1.7});
$(document).ready(function(){var tags=$("input[class*=mask],textarea[class*=mask]");
for(var key in $.fn.keyfilter.defaults.masks){tags.filter(".mask-"+key).keyfilter($.fn.keyfilter.defaults.masks[key])
}})
})(jQuery);