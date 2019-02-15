var AjaxRequestSender=function(){this._rootPath="/"
};
AjaxRequestSender.prototype.setRootPath=function(newRoot){this._rootPath=newRoot
};
AjaxRequestSender.prototype._sendGeneral=function(generalRequest){this._sendGeneralCheckInfo(generalRequest,false,false)
};
AjaxRequestSender.prototype._sendGeneralInfo=function(generalRequest){this._sendGeneralCheckInfo(generalRequest,true,false)
};
AjaxRequestSender.prototype._sendGeneralInfoRet=function(generalRequest){this._sendGeneralCheckInfo(generalRequest,true,true)
};
function checkStrStartWith(string,start){return string.substring(0,start.length)==start
}function checkStrStartWithHttp(string){return checkStrStartWith(string,"http://")
}AjaxRequestSender.prototype._sendGeneralCheckInfo=function(generalRequest,hasInfo,hasRet){var fullPath=generalRequest.fullPath||false;
var path=(fullPath?"":this._rootPath)+generalRequest.path,type=generalRequest.type||"GET",preparedData=generalRequest.preparedData||{},info=generalRequest.info||"",callback=generalRequest.callback||function(){},callret=generalRequest.callret||function(){},failureCallback=generalRequest.failureCallback||function(){},successHandler=generalRequest.successHandler||function(json){var jSuccess=json.success;
if(jSuccess){if(hasInfo){if(hasRet){callback(json,info,callret)
}else{callback(json,info)
}}else{callback(json)
}}else{if(hasInfo){if(hasRet){failureCallback(json,info,callret)
}else{failureCallback(json,info)
}}else{failureCallback(json)
}}},failureHandler=generalRequest.failureHandler||function(json){if(hasInfo){if(hasRet){failureCallback(json,info,callret)
}else{failureCallback(json,info)
}}else{failureCallback(json)
}};
var ajaxParam={type:type,headers:{Accept:"application/json"},data:preparedData,url:path,success:successHandler,error:failureHandler};
if(generalRequest.complex){ajaxParam.dataType="json";
ajaxParam.contentType="application/json"
}$.ajax(ajaxParam)
};
AjaxRequestSender.prototype.sendRequestAssumingSuccess=function(params){var filtered=filterNulls(params.data||{});
this._sendGeneral({type:params.type,path:params.path,preparedData:$.param(filtered),failureCallback:params.failureCallback,successHandler:function(json){params.callback(json)
}})
};
AjaxRequestSender.prototype.sendRequestAssumingInfo=function(params){var filtered=filterNulls(params.data||{});
this._sendGeneralInfo({type:params.type,path:params.path,info:params.info||"",preparedData:$.param(filtered),failureCallback:params.failureCallback,successHandler:function(json,info){params.callback(json,info)
},failureHandler:function(json,info){params.failureCallback(json,info)
}})
};
AjaxRequestSender.prototype.sendRequest=function(param){var filtered=filterNulls(param.data||{});
this._sendGeneral({type:param.type,path:param.path,fullPath:param.fullPath,preparedData:$.param(filtered),callback:param.callback,failureCallback:param.failureCallback})
};
AjaxRequestSender.prototype.sendRequestInfo=function(param){var filtered=filterNulls(param.data||{});
this._sendGeneralInfo({type:param.type,path:param.path,info:param.info||"",preparedData:$.param(filtered),callback:param.callback,failureCallback:param.failureCallback})
};
AjaxRequestSender.prototype.sendRequestInfoRet=function(param){var filtered=filterNulls(param.data||{});
this._sendGeneralInfoRet({type:param.type,path:param.path,info:param.info||"",preparedData:$.param(filtered),callback:param.callback,callret:param.callret||function(){},failureCallback:param.failureCallback})
};
AjaxRequestSender.prototype.sendRequestComplex=function(param){var filtered=filterNulls(param.data||{});
this._sendGeneral({type:param.type,path:param.path,preparedData:JSON.stringify(filtered),callback:callback=param.callback,failureCallback:param.failureCallback,complex:true})
};
AjaxRequestSender.prototype.sendRequestComplexRet=function(param){var filtered=filterNulls(param.data||{});
this._sendGeneralInfoRet({type:param.type,path:param.path,info:param.info||"",preparedData:filtered,callback:param.callback,callret:param.callret||function(){},failureCallback:param.failureCallback})
};
var Ajaxer=function(requestSender){this._sender=requestSender
};
Ajaxer.prototype.setRootPath=function(newRoot){this._sender.setRootPath(newRoot)
};
Ajaxer.prototype.giftMelodyTo=function(toneId,msisdn,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"melody/gift",data:{toneId:toneId,receiver:msisdn},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.giftAndAssign=function(toneId,msisdn,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"melody/gift-assign",data:{toneId:toneId,receiver:msisdn},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.buyMelody=function(rbtCode,melodyId,idFromMp,rbtCheck,revCheck,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"melody/buy",data:{rbtCode:rbtCode,melodyId:melodyId,idFromMp:idFromMp,rbtCheck:rbtCheck,revCheck:revCheck},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.buyMelodyInfo=function(rbtCode,melodyId,idFromMp,callback,failureCallback){this._sender.sendRequestInfo({type:"POST",path:"melody/buy",data:{rbtCode:rbtCode,melodyId:melodyId,idFromMp:idFromMp,rbtCheck:true,revCheck:false},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.buyMelodyInfoRet=function(rbtCode,melodyId,idFromMp,callback,failureCallback){this._sender.sendRequestInfoRet({type:"POST",path:"melody/buy",data:{rbtCode:rbtCode,melodyId:melodyId,idFromMp:idFromMp,rbtCheck:true,revCheck:false},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.registerPlaying=function(rbtCode,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"melody/registerplaying",data:{rbtCode:rbtCode},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.buyPacket=function(packetId,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"packets/buy",data:{packetId:packetId},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getPacketContents=function(packetId,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"packets/info",data:{packetId:packetId},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getCanonicalSongDto=function(melodyId,melodyType,callback,failureCallback){this._sender.sendRequest({path:"private/melodies/songDto",data:{melodyType:melodyType,toneCode:melodyId,id:melodyId},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getCanonicalSongData=function(source,songData,callback,failureCallback){this._sender.sendRequest({path:"private/melodies/"+source,data:{melodyType:songData.melodyType,price:songData.price,toneCode:songData.toneId,id:songData.melodyId,idFromMp:songData.idFromMp},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getCanonicalSongPath=function(songId,callback,failureCallback){this._sender.sendRequest({path:"private/melodyPath",data:{songId:songId},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.subscribe=function(msisdn,captcha,reverse,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"actions/subscribe",data:{msisdn:msisdn,reverse:reverse,captchaText:captcha},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.unsubscribe=function(msisdn,captcha,reverse,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"actions/unsubscribe",data:{msisdn:msisdn,reverse:reverse,captchaText:captcha},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.chooseRegion=function(region,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"actions/region",data:{region:region},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.remindPassword=function(msisdn,captcha,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"actions/lostpassword",data:{msisdn:msisdn,captchaText:captcha},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.changePassword=function(newPassword,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"actions/setpassword",data:{newPassword:newPassword},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getGroupsData=function(melodyId,reverse,callback,failureCallback){this._sender.sendRequestAssumingSuccess({path:"private/groups/melodies/"+melodyId,data:{reverse:reverse},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getGroupsList=function(kind,melodyId,callback,failureCallback){this._sender.sendRequestAssumingSuccess({path:"private/groups/list/"+kind+"/"+melodyId,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.deleteGroup=function(groupDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/delete",data:groupDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.updateGroup=function(groupDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/update",data:groupDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addGroup=function(groupDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/add",data:groupDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.updateContactInGroup=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/contacts/update",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.deleteContactFromGroup=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/contacts/delete",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addContactToGroup=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/groups/contacts/add",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.assignMelodyToGroups=function(songDto,groups,callback,failureCallback){var complex={song:songDto,groups:groups};
this._sender.sendRequestComplex({type:"POST",path:"private/groups/assign",data:complex,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.getContactsData=function(melodyId,callback,failureCallback){this._sender.sendRequestAssumingSuccess({path:"private/indGroups/melodies/"+melodyId,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.deleteIndividualContact=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/indGroups/delete",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addIndividualContact=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/indGroups/add",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.updateIndividualContact=function(contactDto,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"private/indGroups/update",data:contactDto,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.assignRule=function(assigment,callback,failureCallback){this._sender.sendRequestComplex({type:"POST",path:"private/assign",data:assigment,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.editRule=function(assigment,callback,failureCallback){this._sender.sendRequestComplex({type:"POST",path:"private/edit",data:assigment,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.ruleInfo=function(melodyId,groupType,reverse,callback,failureCallback){this._sender.sendRequestAssumingSuccess({path:"private/info",data:{melodyId:melodyId,groupType:groupType,reverse:reverse},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.assignMelodyToIndividualContacts=function(song,contacts,callback,failureCallback){var complex={song:song,groups:contacts};
this._sender.sendRequestComplex({type:"POST",path:"private/indGroups/assign",data:complex,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.assignDateRule=function(song,groups,dateRange,callback,failureCallback){var complex={song:song,groups:groups,dateRange:dateRange};
this._sender.sendRequestComplex({type:"POST",path:"private/date/assign",data:complex,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.assignTimeRule=function(song,groups,timeRange,callback,failureCallback){var complex={song:song,groups:groups,timeRange:timeRange};
this._sender.sendRequest({type:"POST",path:"private/time/assign",data:complex,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.cypheredCode=function(callback,failureCallback){this._sender.sendRequest({path:"private/msisdncypher",callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.deleteMelody=function(melodyId,callback,failureCallback){this._sender.sendRequest({type:"DELETE",path:"private/delete/"+melodyId,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.removeFromPlaylist=function(melodyId,callback,failureCallback,reverse){this._sender.sendRequest({type:"DELETE",path:"private/playlist/"+melodyId+"/"+reverse,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addPacketToPlaylist=function(packetId,callback,failureCallback,reverse,clean){this._sender.sendRequest({type:"PUT",path:"private/playlist-packet/"+packetId+"/"+reverse+"/"+clean,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addGudokDayToPlaylist=function(callback,failureCallback,reverse,clean){this._sender.sendRequest({type:"PUT",path:"private/playlist-gudokday/"+reverse+"/"+clean,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.addToPlaylist=function(melodyId,callback,failureCallback,reverse,clean){this._sender.sendRequest({type:"PUT",path:"private/playlist/"+melodyId+"/"+reverse+"/"+clean,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.social=function(socialDao,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"social/post",data:socialDao,callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.like=function(melodyId,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"social/like",data:{melodyId:melodyId},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.dislike=function(melodyId,callback,failureCallback){this.like(melodyId,callback,failureCallback)
};
Ajaxer.prototype.subscribeToToneOfTheDay=function(callback,failureCallback){this._sender.sendRequest({type:"POST",path:"toneoftheday/subscribe",callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.subscribeGudokOfTheDay=function(cId,rbtCheck,revCheck,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"gudokday/subscribe",data:{cId:cId,rbtCheck:rbtCheck,revCheck:revCheck},callback:callback,failureCallback:failureCallback})
};
Ajaxer.prototype.subscribeGudokOfTheDayRev=function(cId,callback,failureCallback){this._sender.sendRequest({type:"POST",path:"gudokday/subscribeRev",data:{cId:cId},callback:callback,failureCallback:failureCallback})
};
var ajaxer=new Ajaxer(new AjaxRequestSender());
function BusyIndicatorDecorator(ajaxer,busy){var decorateCallback=function(callback){return function(){callback();
busy.hide()
}
},isFunc=function(possibleFunc){return typeof possibleFunc=="function"
},decorateFunction=function(original){var args=arguments,i,len=arg.length;
for(i=0;
i<len;
i+=1){if(isFunc(args[i])){args[i]=decorateCallback(args[i])
}}busy.show();
return original.apply(this,args)
};
for(var param in ajaxer){if(isFunc(param)){this[param]=decorateFunction(ajaxer[param])
}}}Ajaxer.prototype.notifyView=function(callPath,callback){this._sender.sendRequest({type:"GET",path:callPath,callback:callback})
};
Ajaxer.prototype.retrieveFavouritesMelodies=function(callPath,callback,callInfo,callret){this._sender.sendRequestInfoRet({type:"GET",path:callPath,info:callInfo,callret:callret,failureCallback:callback})
};
Ajaxer.prototype.retrieveFavouritesMelodies=function(callPath,callback,callInfo,callret,data){this._sender.sendRequestComplexRet({type:"GET",data:data,path:callPath,info:callInfo,callret:callret,failureCallback:callback})
};
Ajaxer.prototype.saveSubsriberMailing=function(){this._sender.sendRequest({type:"GET",path:"private/switch-mailing"})
};
Ajaxer.prototype.sendUssdSubsGudokDayRequest=function(msisdn,captcha,categoryId,isReverse,buycallback,failCallback){var that=this;
var kind=isReverse?"107":"106";
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind="+kind+"&msisdn="+msisdn+"&toneId="+categoryId,fullPath:true});
buycallback()
};
this._sender.sendRequest({type:"POST",path:"melody/subs-gudok-day-ussd",data:{msisdn:msisdn,categoryId:categoryId,isReverse:isReverse,captchaText:captcha},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdBuyPacketRequest=function(msisdn,captcha,packetId,buycallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind=105&msisdn="+msisdn+"&toneId="+packetId,fullPath:true});
buycallback()
};
this._sender.sendRequest({type:"POST",path:"melody/buy-packet-ussd",data:{msisdn:msisdn,packetId:packetId,captchaText:captcha},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdBuyRequest=function(msisdn,captcha,toneId,buycallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind=101&msisdn="+msisdn+"&toneId="+toneId,fullPath:true});
buycallback()
};
this._sender.sendRequest({type:"POST",path:"melody/buy-ussd",data:{msisdn:msisdn,toneId:toneId,captchaText:captcha},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdBuyRequestSpecifyCallback=function(msisdn,captcha,toneId,buycallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"melody/buy-ussd",data:{msisdn:msisdn,toneId:toneId,captchaText:captcha},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdGiftRequest=function(msisdn1,msisdn2,captcha,toneId,giftcallback,failCallback){var that=this;
msisdn1=msisdn1.substring(0,1)=="+"?msisdn1.substring(1):msisdn1;
msisdn2=msisdn2.substring(0,1)=="+"?msisdn2.substring(1):msisdn2;
msisdn1=msisdn1.replace(/\-|\(|\)| /g,"");
msisdn2=msisdn2.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind=102&msisdn="+msisdn1+"&toSend="+msisdn2+"&toneId="+toneId,fullPath:true});
giftcallback()
};
this._sender.sendRequest({type:"POST",path:"melody/gift-ussd",data:{msisdn:msisdn1,toSend:msisdn2,toneId:toneId,captchaText:captcha},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdLoginRequest=function(msisdn,ussdCallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind=103&msisdn="+msisdn+"&toneId=-1",fullPath:true});
ussdCallback()
};
this._sender.sendRequest({type:"POST",path:"authorization-ussd",data:{msisdn:msisdn},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdLoginSms=function(msisdn,isAuth,isReply,ussdCallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){ussdCallback()
};
this._sender.sendRequest({type:"POST",path:"auth-sms-send",data:{msisdn:msisdn,isAuth:isAuth,isReply:isReply},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendUssdSubscribeRequest=function(msisdn,ussdCallback,failCallback){var that=this;
msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var callback=function(){that._sender.sendRequest({type:"GET",path:"http://gudok.tele2.ru/ivr/?ussd=130&key=25&kind=104&msisdn="+msisdn+"&toneId=-2",fullPath:true});
ussdCallback()
};
this._sender.sendRequest({type:"POST",path:"subscribe-ussd",data:{msisdn:msisdn},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdLogin=function(msisdn,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"authorization-ussd-check",data:{msisdn:msisdn},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdSms=function(msisdn,smsCode,isAuth,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"auth-sms-check",data:{msisdn:msisdn,smsCode:smsCode,isAuth:isAuth},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdSubscribe=function(msisdn,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"subscribe-ussd-check",data:{msisdn:msisdn},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendSessionData=function(data,callback,failCallback){var that=this;
this._sender.sendRequest({type:"POST",path:"save-2-session",data:{jsonData:JSON.stringify(data)},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdSubsGudokDay=function(msisdn,categoryId,isReverse,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"subs-gudok-day-ussd-check",data:{msisdn:msisdn,categoryId:categoryId,isReverse:isReverse},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdBuyPacket=function(msisdn,packetId,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"buy-packet-ussd-check",data:{msisdn:msisdn,packetId:packetId},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdBuy=function(msisdn,toneId,callback,failCallback){msisdn=msisdn.substring(0,1)=="+"?msisdn.substring(1):msisdn;
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"buy-ussd-check",data:{msisdn:msisdn,toneId:toneId},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.checkUssdGift=function(msisdn1,msisdn2,toneId,callback,failCallback){msisdn1=msisdn1.substring(0,1)=="+"?msisdn1.substring(1):msisdn1;
msisdn2=msisdn2.substring(0,1)=="+"?msisdn2.substring(1):msisdn2;
msisdn1=msisdn1.replace(/\-|\(|\)| /g,"");
msisdn2=msisdn2.replace(/\-|\(|\)| /g,"");
this._sender.sendRequest({type:"POST",path:"gift-ussd-check",data:{msisdn1:msisdn1,msisdn2:msisdn2,toneId:toneId},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.sendSessionData=function(data,callback,failCallback){var that=this;
this._sender.sendRequest({type:"POST",path:"save-2-session",data:{jsonData:JSON.stringify(data)},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.isServiceActive=function(reverse,callback,failCallback){this._sender.sendRequestInfoRet({type:"POST",path:"actions/isserviceactive",data:{reverse:reverse},callback:callback,failureCallback:failCallback})
};
Ajaxer.prototype.search=function(searchStr,callback,failCallback){this._sender.sendRequestInfoRet({type:"GET",path:"livesearch",data:{searchString:searchStr},callback:callback,failureCallback:failCallback})
};