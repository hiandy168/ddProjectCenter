"use strict";function Login(){}Login.prototype={constructor:Login,_throttle:function(e,t){clearTimeout(e.tId),e.tId=setTimeout(function(){e.call(t)},500)},_getPropertyIDarr:function(){if(-1!=window.location.href.indexOf("propertyIDarr")){var e=window.location.search;return e=e.split("=")[1],sessionStorage.setItem("propertyIDarr",e),e}return!1},getAllProperty:function(){var e=login._getPropertyIDarr();if(!1===e)return $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/overview/getAllProperty.json",data:{PropertyIDarr:e},async:!1,success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var t=e.AllProperty;if(0===t.length)return $my.messageInfo.html("楼盘数据为空").fadeIn("fast").delay("1000").fadeOut("slow"),!1;for(var o="",r=0,s=t.length;r<s;r++)o+="<li class='list-group-item' data-id="+t[r].ID+">"+t[r].PropertyName+"</li>";housesList.innerHTML=o}})},selectProperty:function(){var e=document.querySelector("#myModal"),t=housesList.querySelectorAll("li[data-id]");Array.prototype.forEach.call(t,function(t){t.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation();var o=this.innerHTML,r=this.dataset.id;$(this).addClass("activeSelect").siblings("li").removeClass("activeSelect"),setTimeout(function(){$(e).modal("hide")},500),property.value=o,property.dataset.propertyid=r,sessionStorage.setItem("propertyID",r)},!1)})},enter:function(){var e=function(){if(!property.value)return $my.messageInfo.html("请选择楼盘").fadeIn("fast").delay("1000").fadeOut("slow"),!1;property.value="",window.location.href="src/html/index_xzyj.html"};document.querySelector("#submit").addEventListener("touchend",function(t){t.preventDefault(),t.stopPropagation(),login._throttle(e,this)},!1)},init:function(){this.getAllProperty(),this.selectProperty(),this.enter()}};var login=new Login;$(function(){window.$my={messageInfo:$(".messageInfo")};document.querySelector("#housesList"),document.getElementById("property");!function(){sessionStorage.removeItem("anchangSaleUserList"),sessionStorage.removeItem("saleuserListIDActive"),sessionStorage.removeItem("anchangGroupData"),sessionStorage.removeItem("acGroupActive"),sessionStorage.removeItem("liandongSaleUserList"),sessionStorage.removeItem("saleuserListID_ld_Active"),sessionStorage.removeItem("liandongGroupData"),sessionStorage.removeItem("ldGroupActive"),sessionStorage.removeItem("globaltimeSelect"),sessionStorage.removeItem("globalPeopleID")}(),$.ajaxSetup({type:"POST",dataType:"json",error:function(){$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow")}}),login.init()});