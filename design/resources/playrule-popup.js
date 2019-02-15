var PlayRuleAbonBlock=function(){};
PlayRuleAbonBlock.prototype.initialize=function(parent){var htmlName="abon-block";
var htmlClass="."+htmlName;
var htmlItem=parent.popup.find(htmlClass);
var parentHtmlName="playRulePopup";
var parentHtmlId="#"+parentHtmlName;
var parentHtmlClass="."+parentHtmlName;
this.htmlItem=htmlItem;
this.parent=parent;
this.moreItem=htmlItem.find(htmlClass+"__more");
this.addItem=htmlItem.find(htmlClass+"__add");
this.openItem=htmlItem.find(htmlClass+"__open");
this.addButton=htmlItem.find(htmlClass+"__add-button");
this.openButton=htmlItem.find(htmlClass+"__open-button");
this.dropdownList=htmlItem.find(htmlClass+"__dropdown_list");
this.contactTemplate=htmlItem.find(parentHtmlId+"-contactTemplate");
this.contactsList=htmlItem.find(parentHtmlId+"-contactsList");
this.contactsListOk=htmlItem.find(parentHtmlId+"-contactsListOk");
this.contactsListCancel=htmlItem.find(parentHtmlId+"-contactsListCancel");
this.contactAddName=htmlItem.find(parentHtmlId+"-contactAddName");
this.contactAddMsisdn=htmlItem.find(parentHtmlId+"-contactAddMsisdn");
this.contactAddError=htmlItem.find(parentHtmlId+"-contactAddError");
this.contactAddOk=htmlItem.find(parentHtmlId+"-contactAddOk");
this.contactAddCancel=htmlItem.find(parentHtmlId+"-contactAddCancel");
this.addOverlay=htmlItem.find("#playRuleAdd");
this.listOverlay=htmlItem.find("#playRuleList");
this.dropOpenName=htmlName+"__dropdown_open";
this.dropAdditionName=htmlName+"__dropdown_addition";
this.dropAdditionClass=htmlClass+"__dropdown_addition";
return this
};
PlayRuleAbonBlock.prototype.dropdown=function(){return this.dropdownList
};
PlayRuleAbonBlock.prototype.openContactsList=function(){var that=this;
that.dropdown().slideDown(100,function(){that.listOverlay.show();
that.contactsList.addClass(that.dropOpenName);
that.htmlItem.addClass("abon-block_opened");
initScrollbar(that.htmlItem.find(".abon-block__scroll"))
});
that.parent.backupContacts()
};
PlayRuleAbonBlock.prototype.closeContactsCancel=function(){var that=this;
that.dropdown().slideUp(100,function(){that.htmlItem.removeClass("abon-block_opened");
that.listOverlay.hide();
that.contactsList.removeClass(that.dropOpenName)
});
that.parent.restoreContacts();
that.parent.refreshContactsListLabel()
};
PlayRuleAbonBlock.prototype.closeContactsOk=function(){var that=this;
that.dropdown().slideUp(100,function(){that.htmlItem.removeClass("abon-block_opened");
that.listOverlay.hide();
that.contactsList.removeClass(that.dropOpenName)
});
that.parent.refreshContactsListLabel()
};
PlayRuleAbonBlock.prototype.addContactAction=function(){var that=this;
that.htmlItem.find(that.dropAdditionClass).slideDown(100,function(){that.closeContactsCancel();
that.htmlItem.addClass("abon-block_opened");
that.addOverlay.show();
that.contactsList.addClass(that.dropOpenName)
});
that.contactAddError.hide()
};
PlayRuleAbonBlock.prototype.addContactCancel=function(){var that=this;
if(that.parent.addNewContact(false)){that.htmlItem.find(that.dropAdditionClass).slideUp(100,function(){that.htmlItem.removeClass("abon-block_opened");
that.addOverlay.hide();
that.contactsList.removeClass(that.dropOpenName)
})
}};
PlayRuleAbonBlock.prototype.addContactOk=function(){var that=this;
var groups=playRulePopup.contacts;
var someGroup=RUtils.getList(groups);
var isExist=false;
var name=that.parent.abonsBlock().contactAddName.val();
var msisdn=that.parent.abonsBlock().contactAddMsisdn.val();
msisdn=msisdn.replace(/\D/g,"");
for(var i=0;
i<someGroup.length;
++i){if(someGroup[i].getName()==name||someGroup[i].getDto().number==msisdn){isExist=true
}}if(isExist){that.parent.abonsBlock().contactAddError.html("Контакт с таким именем или номером уже существует.");
that.parent.abonsBlock().contactAddError.show()
}else{if(that.parent.addNewContact(true)){that.htmlItem.find(that.dropAdditionClass).slideUp(100,function(){that.openButton.show();
that.htmlItem.removeClass("abon-block_opened");
that.addOverlay.hide();
that.contactsList.removeClass(that.dropOpenName)
})
}}};
PlayRuleAbonBlock.prototype.initContacts=function(){var that=this;
that.openButton.unbind("click").click(function(){if(that.htmlItem.hasClass("abon-block_opened")){that.htmlItem.removeClass("abon-block_opened");
that.addOverlay.hide();
that.listOverlay.hide()
}else{that.openContactsList()
}});
that.contactsListCancel.unbind("click").click(function(){that.closeContactsCancel()
});
that.contactsListOk.unbind("click").click(function(){that.closeContactsOk()
});
that.addButton.unbind("click").click(function(){that.addContactAction()
});
that.contactAddCancel.unbind("click").click(function(){that.addContactCancel()
});
that.contactAddOk.unbind("click").click(function(){that.addContactOk()
})
};
var PlayRulePopup=function(){};
PlayRulePopup.prototype.bindOnLoad=function(){this.initVariables();
this.initElements();
var popup=this.popup;
var that=this;
popup.click(function(e){e.stopPropagation()
});
popup.find(".rule-popup__close").click(function(){that.close();
return false
});
this.initSwitcher();
this.abonsBlock().initContacts()
};
PlayRulePopup.prototype.initVariables=function(){this.hasContacts=false;
this.hasTimePeriod=false;
this.hasDatePeriod=false;
this.hasDaysPeriod=false;
this.hasActiveRbt=false;
this.hasReverseRbt=false;
this.groupsChanged=false;
this.agreeAnyChange=false;
this.timePeriodChanged=false;
this.daysPeriodChanged=false;
this.datePeriodChanged=false;
this.allowEmptyGrp=false;
this.tabSemaphore=true;
this.contacts=[];
this.originalContacts=[];
this.originalRuleData={days:"0,0,0,0,0,0,0",date:"",time:"",grps:""};
this.songDto=null;
this.self=this;
this.ruleDto=null;
this.reverse=false;
this.backupData=null;
this.backupDataToSave=null;
this.backedUpContacts=[]
};
PlayRulePopup.prototype.htmlPopup=function(){return this.popup
};
PlayRulePopup.prototype.abonsBlock=function(){return this.abonBlock
};
PlayRulePopup.prototype.contactItems=function(){return this.abonBlock.contactsList.find("li")
};
PlayRulePopup.prototype.initElements=function(){var that=this;
this.overlay=$("#playRuleOverlay");
this.popup=$("#playRulePopup");
this.forRbt=this.popup.find("#playRulePopup-forRbt");
this.forRev=this.popup.find("#playRulePopup-forRev");
this.loader=this.popup.find("#playRulePopup-loading");
this.fields=this.popup.find("#playRulePopup-fields");
this.image=this.popup.find("#playRulePopup-image");
this.author=this.popup.find("#playRulePopup-author");
this.title=this.popup.find("#playRulePopup-title");
this.contactsLabel=this.popup.find("#playRulePopup-contactsLabel");
this.selectContacts=this.popup.find("#playRulePopup-selectContacts");
this.contactsData=this.popup.find("#playRulePopup-contactsData");
this.contactsClose=this.popup.find("#playRulePopup-contactsClose");
this.selectContacts.unbind("click").click(function(){that.showContacts();
return false
});
this.contactsClose.unbind("click").click(function(){that.hideContacts();
return false
});
this.templateContainer=this.popup.find("#playRulePopup-templateContainer");
this.abonBlock=new PlayRuleAbonBlock().initialize(this);
this.itemAbon=$("#abonBlock");
this.timePeriodLabel=this.popup.find("#playRulePopup-timePeriodLabel");
this.selectTimePeriod=this.popup.find("#playRulePopup-selectTimePeriod");
this.timePeriodData=this.popup.find("#playRulePopup-timePeriodData");
this.timePeriodClose=this.popup.find("#playRulePopup-timePeriodClose");
this.selectTimePeriod.unbind("click").click(function(){that.showTimes();
return false
});
this.timePeriodClose.unbind("click").click(function(){that.hideTimes();
return false
});
this.timePeriodData.unbind("change").bind("change",function(){that.timePeriodChanged=that.getRuleDataF(true).time!=that.originalRuleData.time;
that.agreeAnyChange=false
});
this.daysPeriodLabel=this.popup.find("#playRulePopup-daysPeriodLabel");
this.selectDaysPeriod=this.popup.find("#playRulePopup-selectDaysPeriod");
this.daysPeriodData=this.popup.find("#playRulePopup-daysPeriodData");
this.daysPeriodClose=this.popup.find("#playRulePopup-daysPeriodClose");
this.selectDaysPeriod.unbind("click").click(function(){that.showDays();
return false
});
this.daysPeriodClose.unbind("click").click(function(){that.hideDays();
return false
});
this.daysPeriodData.find(".days-block__checkbox").unbind("click").click(function(){that.daysPeriodChanged=that.getDays().toString()!=that.originalRuleData.days;
that.agreeAnyChange=false
});
this.datePeriodLabel=this.popup.find("#playRulePopup-datePeriodLabel");
this.selectDatePeriod=this.popup.find("#playRulePopup-selectDatePeriod");
this.datePeriodData=this.popup.find("#playRulePopup-datePeriodData");
this.datePeriodClose=this.popup.find("#playRulePopup-datePeriodClose");
this.selectDatePeriod.unbind("click").click(function(){that.showDates();
return false
});
this.datePeriodClose.unbind("click").click(function(){that.hideDates();
return false
});
this.errorField=this.popup.find("#playRulePopup-errorField");
this.assignButton=this.popup.find("#playRulePopup-assignButton");
this.removeButton=this.popup.find("#playRulePopup-removeButton");
this.assignButton.unbind("click").click(function(){that.assignRule(true)
});
this.removeButton.unbind("click").click(function(){that.removeRule()
})
};
PlayRulePopup.prototype.initSwitcher=function(){var that=this;
this.popup.find(".rule-popup__s-label").click(function(){$(this).next(".rule-popup__s-switcher").slideDown(100)
});
this.popup.find(".rule-popup__s-item").click(function(){if(!$(this).hasClass("rule-popup__s-item_checked")&&!$(this).hasClass("disabled")){var $txt=$(this).html();
that.popup.find(".rule-popup__s-item_checked").removeClass("rule-popup__s-item_checked");
$(this).addClass("rule-popup__s-item_checked");
$(this).closest(".rule-popup__selector").find(".rule-popup__s-label").html($txt);
that.changeTab()
}that.popup.find(".rule-popup__s-switcher").slideUp(100)
});
this.popup.find(".rule-popup__selector").click(function(e){e.stopPropagation()
});
this.popup.click(function(e){that.popup.find(".rule-popup__s-switcher").slideUp(100)
});
this.popup.find(".rule-popup__s-switcher").slideUp(100)
};
PlayRulePopup.prototype.show=function(opener){this.popup.find(".rule-popup__s-switcher").slideUp(100);
openOverlay(this.overlay);
var anchor=$(opener).closest(".js-popup-anchor");
this.openPlayRulePopup(anchor);
return false
};
PlayRulePopup.prototype.hide=function(){closeOverlay(this.overlay);
this.popup.hide()
};
PlayRulePopup.prototype.unhide=function(){openOverlay(this.overlay);
this.popup.show()
};
PlayRulePopup.prototype.close=function(){var that=this;
if(this.isRulesChanged()){that.hide();
infoPopup.showInfoOkNo("Сохранить изменения?","Для создания правила нужно сохранить изменения",function(){that.unhide();
that.assignRule(true)
},function(){that.unhide();
that.noSaveClose()
})
}else{this.noSaveClose()
}};
PlayRulePopup.prototype.noSaveClose=function(){closeOverlay(this.overlay);
this.backupDataToSave=null;
this.popup.removeClass("rule-popup_open").attr("style","")
};
PlayRulePopup.prototype.openPlayRulePopup=function(anchor){this.positionPlayRulePopup(anchor);
var that=this;
$(window).resize(function(){that.positionPlayRulePopup(anchor)
});
function openPopup(){that.popup.addClass("rule-popup_open")
}setTimeout(openPopup,100)
};
PlayRulePopup.prototype.positionPlayRulePopup=function(anchor){var $top=anchor.offset().top,$ofBottom=$(window).scrollTop()+$("body").outerHeight()-$top-anchor.outerHeight(),$bottom=$(".body-wrapper").outerHeight()-$top-anchor.outerHeight(),$right=$("body").outerWidth()-anchor.offset().left-anchor.outerWidth(),$hp={right:$right+"px"},$vp,$vo,$transformOrigin;
if(this.popup.is(":visible")){if(($bottom+anchor.outerHeight()<478)||($ofBottom<$("body").outerHeight()/4)){$vp={bottom:$bottom+"px"};
$vo="bottom"
}else{$vp={top:$top+"px"};
$vo="top"
}$transformOrigin={"-webkit-transform-origin":"right "+$vo,"-moz-transform-origin":"right "+$vo,"-o-transform-origin":"right "+$vo,"-ms-transform-origin":"right "+$vo,"transform-origin":"right "+$vo};
this.popup.attr("style","");
this.popup.css($vp).css($hp).css($transformOrigin)
}};
PlayRulePopup.prototype.showPlayRulePopup=function(imgSrc,author,title,melodyId,mmpId,melodyType,platform,canUseRevers,opener){this.showPlayRulePopupCb(imgSrc,author,title,melodyId,mmpId,melodyType,platform,false,function(popup){},canUseRevers,opener)
};
PlayRulePopup.prototype.showPlayRulePopupCb=function(imgSrc,author,title,melodyId,mmpId,melodyType,platform,allowEmptyGrp,callback,canUseRevers,opener){var that=this;
this.tabSemaphore=true;
this.errorField.text("");
function defineInitTab(reverseTab){that.reverse=reverseTab;
that.setSwitcher(reverseTab)
}function getGroupsData(){that.originalRuleData={days:"0,0,0,0,0,0,0",date:"",time:"",grps:""};
ajaxer.getGroupsData(melodyId,that.reverse,function(groups){that.prepareData(allowEmptyGrp,imgSrc,author,title,melodyId,mmpId,melodyType,platform);
var hasActive=false;
var hasAnyContact=false;
for(var i=0;
i<groups.length;
++i){var group=groups[i];
if(that.addNewGroupContacts(group,true)){hasActive=true
}hasAnyContact|=group.contacts.length>0
}if(hasAnyContact&&hasActive){that.abonsBlock().openButton.show();
that.originalRuleData.grps=that.abonsBlock().contactsList.find(".abon-block__label").text();
that.selectContacts.click()
}else{if(!hasAnyContact){that.abonsBlock().openButton.hide()
}that.originalRuleData.grps="";
that.contactsClose.click()
}that.refreshContactsListLabel();
that.groupsChanged=false;
callback(that);
ajaxer.ruleInfo(melodyId,"RULES",that.reverse,function(data){that.updateRuleDto(data);
that.show(opener)
})
})
}function reloadPage(){window.location.reload(true)
}function addMelodyToPlayList(){ajaxer.addToPlaylist(melodyId,function(){reloadPage()
},function(data){reloadPage()
},false,true)
}function doAfterSubscribe(){ajaxer.isServiceActive(false,function(){addMelodyToPlayList()
},function(){})
}function showSubscribePopup(){actionSubscribePopup.setPacketId(that.id);
actionSubscribePopup.show(function(){doAfterSubscribe()
},false,"rule")
}function disableRevTab(){that.forRev.addClass("disabled")
}this.forRev.removeClass("disabled");
if(!canUseRevers||mmpId=="27130"||author=="Статус"){this.popup.find(".rule-popup__selector").hide()
}else{if(canUseRevers){this.popup.find(".rule-popup__selector").show()
}}defineInitTab(false);
getGroupsData()
};
PlayRulePopup.prototype.prepareData=function(allowEmpty,imgSrc,author,title,newMelodyId,mmpId,melodyType,platform){this.allowEmptyGrp=allowEmpty;
this.image.attr("src",imgSrc);
this.author.text(author);
this.title.text(title);
this.songDto={id:newMelodyId,melodyType:melodyType,idFromMp:mmpId,author:author};
this.clearContacts();
this.contactsClose.click();
this.timePeriodClose.click();
this.datePeriodClose.click();
this.daysPeriodClose.click()
};
PlayRulePopup.prototype.refreshContactsListLabel=function(){var checkedCount=0;
var firstContactName=null;
this.contactItems().each(function(){var contact=$(this);
if(contact.find("input").prop("checked")){checkedCount++;
if(firstContactName===null){firstContactName=contact.find(".abon-block__label").text()
}}});
var fnCell=this.contactsData.find(".abon-block__cell-inner");
var moreCell=this.contactsData.find(".abon-block__more");
fnCell.text("Выберите контакты");
moreCell.text("");
if(checkedCount>0){this.groupsChanged=true;
this.itemAbon.removeClass("abon-block_empty");
fnCell.text(firstContactName);
if(checkedCount>1){moreCell.show();
moreCell.text("и еще "+(checkedCount-1))
}}else{this.itemAbon.addClass("abon-block_empty");
moreCell.hide()
}};
PlayRulePopup.prototype.backupContacts=function(){var that=this;
this.backedUpContacts=[];
this.contactItems().each(function(){var contact=$(this);
if(contact.find("input").prop("checked")){that.backedUpContacts[that.backedUpContacts.length]=contact
}})
};
PlayRulePopup.prototype.restoreContacts=function(){this.contactItems().each(function(){var contact=$(this);
contact.find("input").prop("checked",false)
});
for(var a=0;
a<this.backedUpContacts.length;
a++){var contact=this.backedUpContacts[a];
contact.find("input").prop("checked",true)
}this.refreshContactsListLabel()
};
PlayRulePopup.prototype.addNewContact=function(doAdd){var that=this;
var result=true;
if(doAdd){var name=that.abonsBlock().contactAddName.val();
var msisdn=that.abonsBlock().contactAddMsisdn.val();
msisdn=msisdn.replace(/\-|\(|\)| /g,"");
var contactDto={name:name,number:msisdn.substr(1),groupId:"0"},errors=validateContactDto(contactDto);
if(errors.length===0){if($.trim(contactDto.name)===""){contactDto.name=contactDto.number
}function addContact(){var contact=new Contact(contactDto,that.abonsBlock().contactTemplate);
contact.setActive(false);
that.abonsBlock().contactsList.prepend(contact.innerItem());
that.contacts[contact.getId()]=contact;
that.originalContacts[contact.getId()]=cloneObj(contact)
}ajaxer.addContactToGroup(contactDto,function(data){contactDto.id=data.id;
addContact()
},function(data){var errorMessage=RUtils.makeGroupErrorMessage(data.errorCode);
that.abonsBlock().contactAddError.html(errorMessage);
that.abonsBlock().contactAddError.show();
result=false
})
}else{this.abonsBlock().contactAddError.html(errors[0]);
this.abonsBlock().contactAddError.show();
result=false
}}if(!result){return false
}this.abonsBlock().contactAddName.val("");
this.abonsBlock().contactAddMsisdn.val("");
return true
};
PlayRulePopup.prototype.cleanContacts=function(){this.contacts=[];
this.abonsBlock().contactsList.find("li.contactItem").remove()
};
PlayRulePopup.prototype.clearContacts=function(){this.originalContacts=[];
this.cleanContacts()
};
PlayRulePopup.prototype.hideContacts=function(){this.contactsLabel.show();
this.contactsData.hide();
this.contactsClose.hide();
this.hasContacts=false
};
PlayRulePopup.prototype.showContacts=function(){this.contactsLabel.hide();
this.contactsData.show();
this.contactsClose.show();
this.hasContacts=true
};
PlayRulePopup.prototype.showTimes=function(){this.timePeriodLabel.hide();
this.timePeriodData.show();
this.timePeriodClose.show();
this.hasTimePeriod=true;
this.timePeriodChanged=this.getRuleDataF(true).time!=this.originalRuleData.time;
this.agreeAnyChange=false
};
PlayRulePopup.prototype.hideTimes=function(){this.timePeriodLabel.show();
this.timePeriodData.hide();
this.timePeriodClose.hide();
this.hasTimePeriod=false;
this.timePeriodChanged=this.originalRuleData.time!=="";
this.agreeAnyChange=false
};
PlayRulePopup.prototype.showDates=function(){this.datePeriodLabel.hide();
this.datePeriodData.show();
this.datePeriodClose.show();
this.hasDatePeriod=true;
this.datePeriodChanged=this.getRuleDataF(true).date!=this.originalRuleData.date;
this.agreeAnyChange=false
};
PlayRulePopup.prototype.hideDates=function(){this.datePeriodLabel.show();
this.datePeriodData.hide();
this.datePeriodClose.hide();
this.hasDatePeriod=false;
this.datePeriodChanged=this.originalRuleData.date!=="";
this.agreeAnyChange=false
};
PlayRulePopup.prototype.showDays=function(){this.daysPeriodLabel.hide();
this.daysPeriodData.show();
this.daysPeriodClose.show();
this.hasDaysPeriod=true;
this.daysPeriodChanged=this.getRuleDataF(true).days!=this.originalRuleData.days;
this.agreeAnyChange=false
};
PlayRulePopup.prototype.hideDays=function(){this.daysPeriodLabel.show();
this.daysPeriodData.hide();
this.daysPeriodClose.hide();
this.hasDaysPeriod=false;
this.daysPeriodChanged=this.originalRuleData.days!=="0,0,0,0,0,0,0";
this.agreeAnyChange=false
};
PlayRulePopup.prototype.getRuleData=function(){return this.getRuleDataF(false)
};
PlayRulePopup.prototype.getRuleDataF=function(force){return{days:force||this.daysPeriodChanged?this.getDays().toString():this.originalRuleData.days,date:force||this.datePeriodChanged?this.datePeriodData.find(".from-period").val()+":"+this.datePeriodData.find(".to-period").val():this.originalRuleData.date,time:force||this.timePeriodChanged?this.timePeriodData.find(".from-selector").val()+"-"+this.timePeriodData.find(".to-selector").val():this.originalRuleData.time,grps:force||this.groupsChanged?$("#addPlayRuleForm-groupContainer").find(".addPlayRuleForm-groupName").text():this.originalRuleData.grps,}
};
PlayRulePopup.prototype.setSwitcher=function(isReverse){this.popup.find(".rule-popup__s-item_checked").removeClass("rule-popup__s-item_checked");
var elem=this.forRbt;
if(isReverse){elem=this.forRev
}var txt=elem.html();
elem.addClass("rule-popup__s-item_checked");
elem.closest(".rule-popup__selector").find(".rule-popup__s-label").html(txt)
};
PlayRulePopup.prototype.addNewGroupContacts=function(groupDto,isCreate){var contacts=groupDto.contacts||{},len=contacts.length;
var hasActiveContacts=false;
for(var i=0;
i<len;
i++){if(contacts[i]){if(contacts[i].active===true){hasActiveContacts=true
}}}for(var i=0;
i<len;
i++){if(contacts[i]){var contact=new Contact(contacts[i],this.abonsBlock().contactTemplate);
if(contact.isActive()||(!hasActiveContacts&&groupDto.active===true)){contact.setChecked()
}var liItem=contact.innerItem();
this.abonsBlock().contactsList.prepend(liItem);
this.contacts[contact.getId()]=contact;
if(isCreate){this.originalContacts[contact.getId()]=cloneObj(contact)
}}}return hasActiveContacts
};
PlayRulePopup.prototype.getDays=function(){var days=[];
for(var i=1;
i<=7;
i++){if(this.popup.find("#weekday"+i).prop("checked")){days[i-1]=1
}else{days[i-1]=0
}}return days
};
PlayRulePopup.prototype.showLoader=function(){this.fields.hide();
this.loader.show()
};
PlayRulePopup.prototype.hideLoader=function(){this.fields.show();
this.loader.hide()
};
PlayRulePopup.prototype.updateBookmark=function(){var that=this;
this.showLoader();
this.cleanDays();
this.cleanPeriodsChanged(false);
this.cleanContacts();
function getGroupsData(){that.originalRuleData={days:"0,0,0,0,0,0,0",date:"",time:"",grps:""};
ajaxer.getGroupsData(that.songDto.id,that.reverse,function(groups){var hasActive=false;
var hasAnyContact=false;
for(var i=0;
i<groups.length;
++i){var group=groups[i];
if(that.addNewGroupContacts(group,true)){hasActive=true
}hasAnyContact|=group.contacts.length>0
}if(hasAnyContact&&hasActive){that.abonsBlock().openButton.show();
that.originalRuleData.grps=that.abonsBlock().contactsList.find(".abon-block__label").text();
that.selectContacts.click()
}else{if(!hasAnyContact){that.abonsBlock().openButton.hide()
}that.originalRuleData.grps="";
that.contactsClose.click()
}that.refreshContactsListLabel();
that.groupsChanged=false;
ajaxer.ruleInfo(that.songDto.id,"RULES",that.reverse,function(data){that.updateRuleDto(data);
that.hideLoader()
})
})
}getGroupsData()
};
PlayRulePopup.prototype.updateRuleDto=function(data){this.errorField.text("");
var params=data.params;
this.selectOrClosePeriods(params)
};
PlayRulePopup.prototype.selectOrClosePeriods=function(params){var hasParams=typeof(params)!="undefined";
this.ruleDto={ruleId:hasParams?params.ruleId:0};
if(hasParams&&params.days){var days=params.days,count=this.fillDays(days);
this.ruleDto.hasDays=count>0;
this.originalRuleData.days=this.ruleDto.hasDays?this.getDays().toString():"0,0,0,0,0,0,0";
if(count>0){this.selectDaysPeriod.click()
}else{this.daysPeriodClose.click()
}}else{this.cleanDays()
}if(hasParams&&(params.hasDate||params.dateRange)){var dateRange={formattedFrom:typeof params.dateFrom!="undefined"?params.dateFrom:params.dateRange.from,formattedTo:typeof params.dateTo!="undefined"?params.dateTo:params.dateRange.to};
this.datePeriodData.find(".from-period").val(dateRange.formattedFrom);
this.datePeriodData.find(".to-period").val(dateRange.formattedTo);
this.ruleDto.hasDate=true;
this.originalRuleData.date=this.datePeriodData.find(".from-period").val()+":"+this.datePeriodData.find(".to-period").val();
this.selectDatePeriod.click()
}else{this.datePeriodData.find(".from-period").datepicker("setDate","0");
this.datePeriodData.find(".to-period").datepicker("setDate","0");
this.ruleDto.hasDate=false;
this.originalRuleData.date="";
this.datePeriodClose.click()
}if(hasParams&&params.timeFrom>=0&&params.timeTo>0){this.timePeriodData.find(".from-selector").selectBox("value",params.timeFrom);
this.timePeriodData.find(".to-selector").selectBox("value",params.timeTo);
this.ruleDto.hasTime=true;
this.originalRuleData.time=this.timePeriodData.find(".from-selector").val()+"-"+this.timePeriodData.find(".to-selector").val();
this.selectTimePeriod.click()
}else{this.timePeriodData.find(".from-selector").selectBox("value",1);
this.timePeriodData.find(".to-selector").selectBox("value",2);
this.ruleDto.hasTime=false;
this.originalRuleData.time="";
this.timePeriodClose.click()
}this.removeButton.hide()
};
PlayRulePopup.prototype.cleanDays=function(){this.ruleDto.hasDays=false;
for(var i=0;
i<7;
i++){this.popup.find("#weekday"+(i+1)).prop("checked",false)
}this.daysPeriodClose.click()
};
PlayRulePopup.prototype.fillDays=function(days){var count=0;
for(var i=0;
i<days.length;
i++){if(days[i]>0){this.popup.find("#weekday"+(i+1)).prop("checked",true);
count++
}else{this.popup.find("#weekday"+(i+1)).prop("checked",false)
}}return count
};
PlayRulePopup.prototype.cleanPeriodsChanged=function(agree){this.groupsChanged=false;
this.timePeriodChanged=false;
this.datePeriodChanged=false;
this.daysPeriodChanged=false;
this.agreeAnyChange=agree
};
PlayRulePopup.prototype.checkRuleChanged=function(){if(this.timePeriodChanged||this.datePeriodChanged||this.daysPeriodChanged||this.groupsChanged){return true
}var ruleData=this.getRuleData();
return ruleData.days!=this.originalRuleData.days||ruleData.date!=this.originalRuleData.date||ruleData.time!=this.originalRuleData.time||ruleData.grps!=this.originalRuleData.grps
};
PlayRulePopup.prototype.isRulesChanged=function(){var isChanged=!this.agreeAnyChange&&this.checkRuleChanged();
this.cleanPeriodsChanged(true);
return isChanged
};
PlayRulePopup.prototype.markDatePeriodChanged=function(){this.datePeriodChanged=this.getRuleDataF(true).date!=this.originalRuleData.date;
this.agreeAnyChange=false
};
PlayRulePopup.prototype.changeTab=function(){var that=this;
var reverseTab=that.forRev.hasClass("rule-popup__s-item_checked");
if((that.songDto.idFromMp=="27130"||that.songDto.author=="Статус")&&reverseTab){return
}that.tabSemaphore=!that.tabSemaphore;
function switchReverse(){that.reverse=reverseTab;
that.updateBookmark()
}function clickAction(){if(that.isRulesChanged()){infoPopup.showInfoOkNo("Сохранить изменения?","Сохранить изменения?",function(){that.assignRule(false);
switchReverse()
},function(){switchReverse()
})
}else{switchReverse()
}}function reloadPage(){window.location.reload(true)
}function addMelodyToPlayList(){ajaxer.addToPlaylist(that.songDto.idFromMp,function(){reloadPage()
},function(data){reloadPage()
},reverseTab,true)
}function doAfterSubscribe(){ajaxer.isServiceActive(reverseTab,function(){addMelodyToPlayList()
},function(){})
}function showSubscribePopup(){var actionSubscribePopup=new ActionSubscribePopup(reverseTab,"rule");
actionSubscribePopup.bindOnLoad(function(){doAfterSubscribe()
});
actionSubscribePopup.showActionSubscribePopup()
}ajaxer.isServiceActive(reverseTab,function(){clickAction()
},function(){that.noSaveClose();
showSubscribePopup()
})
};
PlayRulePopup.prototype.extractData=function(){var that=this;
var assigment=function(){return{type:"RULES",dates:{},dateRange:{from:that.datePeriodData.find(".from-period").val(),to:that.datePeriodData.find(".to-period").val()},timeFrom:"0",timeTo:"1",times:{},timeRange:{from:that.timePeriodData.find(".from-selector").val(),to:that.timePeriodData.find(".to-selector").val()}}
}(),checkDay=function(dayElement){return dayElement.is(":checked")?1:0
};
var genGroups=function(){result=[];
for(var a in that.contacts){if(that.contacts.hasOwnProperty(a)){var contact=that.contacts[a];
if(contact.isChecked()){contact.setActive(true);
contact.mixGroupId();
result[result.length]=contact.getDto()
}}}return[{groupId:0,contacts:result,ruleId:that.ruleId}]
};
var getDays=checkDay(this.daysPeriodData.find("#weekday1"))+","+checkDay(this.daysPeriodData.find("#weekday2"))+","+checkDay(this.daysPeriodData.find("#weekday3"))+","+checkDay(this.daysPeriodData.find("#weekday4"))+","+checkDay(this.daysPeriodData.find("#weekday5"))+","+checkDay(this.daysPeriodData.find("#weekday6"))+","+checkDay(this.daysPeriodData.find("#weekday7"));
var isDaysEmpty=getDays!=="0,0,0,0,0,0,0"?false:true;
var isContactsEmpty=RUtils.getList(genGroups())[0].contacts.length>0?false:true;
if(isDaysEmpty){this.hideDays()
}if(isContactsEmpty){this.groups=[];
this.hideContacts()
}assigment.song=this.songDto;
assigment.reverse=this.reverse;
assigment.groupType="RULES";
assigment.groups=this.hasContacts?RUtils.getList(genGroups()):[];
assigment.hasUsers=this.hasContacts;
assigment.hasTime=this.hasTimePeriod;
assigment.hasDate=this.hasDatePeriod;
assigment.hasDays=this.hasDaysPeriod;
assigment.ruleId=this.ruleDto.ruleId;
if(this.hasDaysPeriod){assigment.days=[checkDay(this.daysPeriodData.find("#weekday1")),checkDay(this.daysPeriodData.find("#weekday2")),checkDay(this.daysPeriodData.find("#weekday3")),checkDay(this.daysPeriodData.find("#weekday4")),checkDay(this.daysPeriodData.find("#weekday5")),checkDay(this.daysPeriodData.find("#weekday6")),checkDay(this.daysPeriodData.find("#weekday7"))]
}else{assigment.days=[]
}return assigment
};
PlayRulePopup.prototype.assignRule=function(closeAfter){var that=this;
var assigment=that.extractData();
assignFunction=ajaxer.editRule;
if(this.hasTimePeriod&&(assigment.timeRange.to.length<=assigment.timeRange.from.length)){if(assigment.timeRange.from==assigment.timeRange.to){this.errorField.text(messages.selectBox.illegalEqualTimes);
return
}}var showIcon=that.songDto.idFromMp=="27130"?this.hasTimePeriod:(this.hasContacts||this.hasDaysPeriod||this.hasDatePeriod||this.hasTimePeriod);
assignFunction.apply(ajaxer,[assigment,function(data){that.cleanPeriodsChanged(true);
if(closeAfter){that.noSaveClose()
}that.updateIcon(that.songDto.id,showIcon)
},function(data){that.errorField.text(RUtils.makeGroupErrorMessage(data.errorCode))
}]);
this.backupDataToSave=null
};
PlayRulePopup.prototype.someFunction=function(){result=[];
for(var a in this.contacts){if(this.contacts.hasOwnProperty(a)){var contact=this.contacts[a];
if(contact.isChecked()){contact.setActive(true);
contact.mixGroupId();
result[result.length]=contact.getDto()
}}}return[{groupId:0,contacts:result,ruleId:this.ruleId}]
};
PlayRulePopup.prototype._removeIcons=function(invoker){invoker.addClass("lk-row__rules_active");
invoker.removeClass("lk-row__rules_active")
};
PlayRulePopup.prototype._updateIcon=function(invoker){invoker.removeClass("lk-row__rules_active");
invoker.addClass("lk-row__rules_active")
};
PlayRulePopup.prototype.updateIcon=function(id,showIcon){var invoker=$("#rulePlay"+id);
this._removeIcons(invoker);
if(showIcon){this._updateIcon(invoker)
}};
PlayRulePopup.prototype.removeRule=function(){var that=this;
that.hide();
infoPopup.showInfoOkNo("Удалить правило?","Это действие очистит правило проигрывания у выбранной мелодии",function(){var assigment=function(){return{type:"RULES",dates:{},dateRange:{from:"22-11-12",to:"22-11-12"},timeFrom:"0",timeTo:"1",times:{},timeRange:{from:0,to:1},song:that.songDto,reverse:that.reverse,groups:[],hasUsers:false,hasTime:false,hasDate:false,hasDays:false,ruleId:that.ruleDto.ruleId}
}(),assignFunction=ajaxer.editRule;
assignFunction.apply(ajaxer,[assigment,function(data){that.cleanPeriodsChanged(true);
that.unhide();
that.close();
that.updateIcon(that.songDto.id,false)
},function(data){that.unhide()
}])
},function(){that.unhide()
})
};
var playRulePopup=new PlayRulePopup();
$(document).ready(function(){playRulePopup.bindOnLoad()
});
var Contact=function(contactDto,contactTemplate){var innerHtml=contactTemplate.clone();
this.contactDto=contactDto;
if($.browser.msie&&$.browser.version=="7.0"){innerHtml.attr("id","")
}else{innerHtml.removeAttr("id")
}innerHtml.attr("id","c"+contactDto.id);
innerHtml.attr("title",phoneF("+"+contactDto.number));
innerHtml.find(".abon-block__label").text(contactDto.name);
this.getId=function(){return this.contactDto.id
};
this.getName=function(){return this.contactDto.name
};
this.getRuleId=function(){return this.contactDto.ruleId
};
this.getGroupId=function(){return this.contactDto.groupId
};
this.mixGroupId=function(){this.contactDto.groupId=this.getId()
};
this.mixContactId=function(){this.contactDto.contactId=this.getId()
};
this.innerItem=function(){return innerHtml
};
this.isActive=function(){if(this.contactDto.active===true){return true
}else{return false
}};
this.setActive=function(newActive){this.contactDto.active=newActive
};
if(this.contactDto.active===true){this.setActive(this.contactDto.active)
}this.setChecked=function(){innerHtml.find("input").prop("checked",true)
};
this.isChecked=function(){return innerHtml.find("input").prop("checked")
};
this.find=function(query){return innerHtml.find(query)
};
this.getDto=function(){return this.contactDto
};
var that=this;
this.deleteContact=function(){that.mixContactId();
that.mixGroupId();
ajaxer.deleteIndividualContact(that.contactDto,function(){$("#c"+that.getId()).detach();
delete playRulePopup.contacts[that.getId()];
if(playRulePopup.contactItems().size()<1){var abonsBlock=playRulePopup.abonsBlock();
abonsBlock.closeContactsCancel();
abonsBlock.openButton.hide()
}})
};
innerHtml.find("a").click(that.deleteContact);
return this
};
var PlayRulePopupOld=function(){addPlayRuleForm.find(".selector").selectBox();
initDatepicker($("#addPlayRuleForm-datePeriodData .period"));
var date0=dateToYMD(new Date());
stdDatePeriod=date0+":"+date0;
var deleteGroup=addPlayRuleForm.find("#addPlayRuleForm-deleteGroup"),deleteContact=addPlayRuleForm.find("#addPlayRuleForm-deleteContact"),deleteTimePeriod=addPlayRuleForm.find("#addPlayRuleForm-deleteTime"),deleteDatePeriod=addPlayRuleForm.find("#addPlayRuleForm-deleteDate"),deleteDaysPeriod=addPlayRuleForm.find("#addPlayRuleForm-deleteDays"),deletePlayRule=addPlayRuleForm.find("#addPlayRuleForm-deletePlayRule"),updatePlayRule=addPlayRuleForm.find("#addPlayRuleForm-updatePlayRule"),closeButton=addPlayRuleForm.find("#addPlayRuleForm-closeButton"),assignButton=addPlayRuleForm.find("#addPlayRuleForm-assignButton"),assignContacts=addPlayRuleForm.find("#addPlayRuleForm-assignContacts");
self.openEditUsersDialog=function(){closePopup(addPlayRuleForm);
newGroups=cloneArrObj(originalGroups);
for(var grp in groups){if(newGroups[grp]){newGroups[grp].active=groups[grp].active
}}showAddToGroupsPopupCallBack("none","none",songDto.id,songDto.melodyType,"TELE2_RUS_BERCUT",function(a,b){addToGroupForm=$("#addToGroupForm");
closePopup(addToGroupForm);
var editedGroups=groupPopup.getActive();
playRulePopupOld.cleanGroups();
editedLength=editedGroups.length;
if(editedLength===0){allGroup={groupId:-1,name:"Для всех",playRuleId:0,active:true,reverse:reverse};
playRulePopupOld.addNewGroupItem(allGroup,false)
}else{for(var i=0;
i<editedLength;
i++){playRulePopupOld.addNewGroupItem(editedGroups[i],false)
}}if($("#addPlayRuleForm-groupContainer>li").size()>1){$("#addPlayRuleForm-contactList>i").hide();
self.showContacts()
}else{self.hideContacts()
}agreeAnyChange=false;
groupsChanged=$("#addPlayRuleForm-groupContainer").find(".addPlayRuleForm-groupName").text()!=originalRuleData.grps;
playRulePopupOld.show()
},newGroups)
};
var calculateIconState=function(assigment,songId,reverseTab){ajaxer.getGroupsData(songId,!reverseTab,function(groups){var iconActive=false;
for(var i=0;
i<groups.length;
++i){var group=groups[i];
if(group.active){iconActive=true;
break
}}updateIcon(assigment,songId,iconActive)
})
};
assignContacts.unbind("click").click(self.openEditUsersDialog);
selectContacts.unbind("click").click(self.openEditUsersDialog);
var assignButton=addPlayRuleForm.find("#addPlayRuleForm-assignButton"),removeButton=addPlayRuleForm.find("#addPlayRuleForm-removeButton"),_removeIcons=function(invoker,ruleIcon){invoker.addClass("current");
invoker.removeClass("current")
},_updateIcon=function(invoker,ruleIcon,type){invoker.removeClass("current");
invoker.addClass("current")
},updateIcon=function(assigment,id,showIcon){var invoker=$("#rulePlay"+id),ruleIcon=$("#ruleIcon"+id);
_removeIcons(invoker,ruleIcon);
if(showIcon){_updateIcon(invoker,ruleIcon,assigment.type)
}},oldRuleType=new OldRule("ALWAYS");
removeButton.unbind("click").click(function(){showSavePopupCallback("Удалить правило?","Это действие очистит правило проигрывания у выбранной мелодии","Удалить правило",true,false,function(){var assigment=function(){return{type:"RULES",dates:{},dateRange:{from:"22-11-12",to:"22-11-12"},timeFrom:"0",timeTo:"1",times:{},timeRange:{from:0,to:1},song:songDto,reverse:reverse,groups:[],hasUsers:false,hasTime:false,hasDate:false,hasDays:false,ruleId:ruleDto.ruleId}
}(),assignFunction=ajaxer.editRule;
assignFunction.apply(ajaxer,[assigment,function(data){cleanPeriodsChanged(true);
closePopup(addPlayRuleForm);
calculateIconState(assigment,songDto.id,reverse)
},function(data){$("#errorField").text(RUtils.makeGroupErrorMessage(data.errorCode))
}])
},function(){},function(){})
});
restoreGroupsList=function(){var originGroups=self.getOriginals();
playRulePopupOld.cleanGroups();
for(var i=0;
i<originGroups.length;
i++){playRulePopupOld.addNewGroupItem(originGroups[i],false)
}};
cleanGroupContacts=function(groups,withDelete){for(var i=0;
i<groups.length;
i++){var group=groups[i];
if(group&&group.contacts){group.contacts=RUtils.cleanArray(group.contacts)
}if(withDelete){delete group.originalContacts
}}};
var Group=function(groupDto,isGroup){var group=isGroup?groupTemplate.clone():numberTemplate.clone();
if($.browser.msie&&$.browser.version=="7.0"){group.attr("id","")
}else{group.removeAttr("id")
}group.find(".addPlayRuleForm-groupName").text(groupDto.name);
group.changeName=function(newGroupName){groupDto.name=newGroupName;
ajaxer.updateGroup(groupDto,function(){group.find(".addPlayRuleForm-groupName").text(groupDto.name);
editGroupDetails.hide()
},function(data){$("#addPlayRuleError").empty();
var errorMessage=RUtils.makeGroupErrorMessage(data.errorCode);
$("#addPlayRuleError").append(createErrorMessage(errorMessage))
})
};
group.getId=function(){return groupDto.groupId
};
group.getRuleId=function(){return groupDto.ruleId
};
group.isActive=function(){if(groupDto.active===true){return true
}else{return false
}};
group.setActive=function(newActive){groupDto.active=newActive
};
if(groupDto.active===true){group.setActive(groupDto.active)
}return group
};
self.getActive=function(){return RUtils.getActive(groups,originalGroups)
};
self.getChanged=function(){return RUtils.getChanged(groups,originalGroups)
};
self.getOriginals=function(){return RUtils.getAll(originalGroups)
};
self.getAll=function(){return RUtils.getAll(groups)
};
self.getActiveObj=function(){return RUtils.getActiveObj(groups,groupObjs)
};
self.getAllObj=function(){return RUtils.getAll(groupObjs)
};
return self
};
var dates,datePicker,dateToYMD=function(date){var d=date.getDate();
var m=date.getMonth()+1;
var y=date.getFullYear();
return""+(d<=9?"0"+d:d)+"."+(m<=9?"0"+m:m)+"."+y
},initDatepicker=function(perionPanel){dates=perionPanel.find(".from-period, .to-period").datepicker({defaultDate:"0",changeMonth:true,numberOfMonths:1,dateFormat:"dd.mm.yy",onSelect:function(selectedDate){var $this=$(this),option=$this.hasClass("from-period")?"minDate":"maxDate",date=parseDate($this.data("datepicker").settings,selectedDate);
dates.not(this).datepicker("option",option,date);
playRulePopupOld.markDatePeriodChanged()
}});
dates.datepicker("option","minDate",0)
},parseDate=function(settings,selectedDate){return $.datepicker.parseDate("dd.mm.yy",selectedDate,settings)
},stdDatePeriod,stdTimePeriod="1-2",stdDaysPeriod="0,0,0,0,0,0,0";
$(document).ready(function(){$("#playRulePopup").click(function(e){if($(e.target).closest("#playRulePopup-contactsData").length==0){$("#playRulePopup-contactsData").css("display","none");
$("#playRulePopup-contactsLabel").css("display","block")
}});
$("#playRulePopup-contactAddName").keyfilter(/[a-zA-Zа-яА-Я0-9ёЁ]/)
});