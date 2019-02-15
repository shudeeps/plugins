var checkMsIe=function(){var ua=window.navigator.userAgent;
var msie=ua.indexOf("MSIE ");
return msie>0
};
var doTapClick=function($this,parent){if(!parent.hasClass("playing")){if(!parent.hasClass("has_media")){$this.jPlayer("setMedia",{mp3:$this.attr("mp3path")});
parent.addClass("has_media")
}$this.jPlayer("play")
}else{$this.jPlayer("pause")
}};
var makeJPlayer=function(player){if((player).hasClass("jplayer_loaded")){return
}(player).addClass("jplayer_loaded");
var parent=player.parent(),wrapper=player.closest(".knob"),slider=wrapper.find(".knob__input"),path=player.attr("mp3path");
player.jPlayer("destroy");
parent.removeClass("has_media");
player.jPlayer({ready:function(){slider.knob({readOnly:true,displayInput:false,thickness:0.25,width:44,fgColor:"transparent",lineCap:"round",bgColor:"transparent"})
},play:function(){player.jPlayer("pauseOthers");
slider.trigger("configure",{fgColor:"#26b899"});
wrapper.addClass("playing")
},ended:function(event){player.jPlayer("stop");
wrapper.removeClass("playing")
},pause:function(event){wrapper.removeClass("playing")
},timeupdate:function(event){slider.val(event.jPlayer.status.currentPercentAbsolute).trigger("change")
},supplied:"mp3",solution:"html",preload:"none"});
wrapper.on("click",function(){doTapClick(player,parent)
})
};
var initializeJPlayers=function(){$(".knob__media").each(function(){makeJPlayer($(this))
})
};