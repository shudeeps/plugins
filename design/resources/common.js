var absolute=function(path){var absolutePath;
if(path.substr(0,4)=="http"){return path
}if(rootPath==="/"&&path[0]==="/"){absolutePath=path
}else{if(rootPath[rootPath.length-1]==="/"&&path[0]==="/"){absolutePath=rootPath+path.substr(1)
}else{absolutePath=rootPath+path
}}return absolutePath.replace("//","/")
};
if(typeof console=="undefined"){console={};
console.log=function(){}
}var filterNulls=function(obj){var res={};
for(var key in obj){if(obj.hasOwnProperty(key)&&obj[key]!==null){res[key]=obj[key]
}}return res
};
var openModalOverlay=function(overlayElem){overlayElem.addClass("modal-overlay_open");
var $bodyHeight=$("body").outerHeight(),$bodyScrollTop=$(window).scrollTop();
if(overlayElem.is(":visible")){$(".body-wrapper").css({overflow:"hidden",marginTop:-$bodyScrollTop+"px",height:$bodyHeight+$bodyScrollTop+"px"})
}};
var closeModalOverlay=function(overlayElem){if(overlayElem.is(":visible")){overlayElem.removeClass("modal-overlay_open");
$(".body-wrapper").attr("style","");
console.log(window.location.href);
if(window.location.href.toLowerCase().indexOf("anchor_switcher")>=0){$("body,html").animate({scrollTop:553},200)
}else{var $bodyScrollTop=-parseInt($(".body-wrapper").css("margin-top"));
$("html").scrollTop($bodyScrollTop)
}}};
var openOverlay=function(overlayElem){overlayElem.addClass("overlay_open")
};
var closeOverlay=function(overlayElem){if(typeof(overlayElem)=="undefined"){$(".overlay").each(function(){closeOverlay($(this))
})
}else{overlayElem.removeClass("overlay_open")
}};
var closePopup=function(popup){if(typeof(popup)!="undefined"&&typeof(popup.close)=="function"){popup.close()
}};
var loginCallback=null;
var openLoginPopup=function(){openLoginPopupR(false)
};
var openLoginSubsPopup=function(redirectUrl){openOverlay($(".login-overlay"));
$(".login-popup").addClass("login-popup_open");
positionLoginPopup();
if(redirectUrl){loginCallback=function(){document.location.href=absolute(redirectUrl)
}
}else{loginCallback=null
}};
var openLoginPopupR=function(redirectUrl){openLoginSubsPopup(redirectUrl);
authAndSubsFormPopup.showNewAuth()
};
var openSubscribePopup=function(){openSubscribePopupR(false)
};
var openSubscribePopupR=function(redirectUrl){openLoginSubsPopup(redirectUrl);
authAndSubsFormPopup.showNewSubs()
};
var closeLoginPopup=function(){$(".login-popup").removeClass("login-popup_open");
authAndSubsFormPopup.closeAll();
closeOverlay($(".login-overlay"))
};
var positionLoginPopup=function(){if($(".login-popup").is(":visible")){$(".login-popup").css({left:"50%",marginLeft:-150-$(".login-popup").outerWidth()/2+"px",marginTop:-77+$(".login-popup").outerHeight()/2+"px"});
if(!$(".swiper-container").length||$(".swiper-container").length){$(".login-popup").css({position:"fixed",top:"50%"})
}else{$(".login-popup").css({position:"absolute",top:"330px"})
}}};
var openUGCPopup=function(){openModalOverlay($(".ugc-overlay"));
$(".ugc-popup").addClass("ugc-popup_open");
positionUGCPopup()
};
var closeUGCPopup=function(){$(".ugc-popup").removeClass("ugc-popup_open");
$(".ugc-popup__audio-container").jPlayer("stop");
closeModalOverlay($(".ugc-overlay"));
document.location.href=absolute("tone-upload")
};
var positionUGCPopup=function(){if($(".ugc-popup").is(":visible")){$(".ugc-popup").css({left:"50%",marginLeft:-$(".ugc-popup").outerWidth()/2+"px",marginTop:-$(".ugc-popup").outerHeight()/2+"px",top:"50%"})
}};
var cloneObj=function(obj){var res={};
for(var key in obj){if(obj.hasOwnProperty(key)){res[key]=obj[key]
}}return res
},cloneArr=function(arr){var res=[];
for(var key in arr){if(arr.hasOwnProperty(key)){res[key]=arr[key]
}}return res
},cloneArrObj=function(arr){var res=[];
for(var key in arr){if(arr.hasOwnProperty(key)){res[key]=cloneObj(arr[key])
}}return res
};