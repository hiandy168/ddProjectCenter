function AppointmentList(){this.pipeFn=function(){if(-1===window.location.href.indexOf("PlaceUserLeader"))return!1;var e=window.location.search;e=e.split("=")[1];var t=$my.saleuserListID.querySelectorAll("li");Array.prototype.forEach.call(t,function(t){t.dataset.info===e&&$(t).trigger("click")})}}AppointmentList.prototype={throttle:function(e,t){clearTimeout(e.tId),e.tId=setTimeout(function(){e.call(t)},200)},touchThrottle:function(e,t,a){var n=null,i=new Date;return function(){var s=this,o=arguments,l=new Date;clearTimeout(n),l-i>=a?(e.apply(s,o),i=l):n=setTimeout(function(){e.apply(s,o)},t)}},rederSaleuser:function(e){var t=document.querySelector("#saleuserList_all"),a="",n=e.PlaceUserLeaderList,i=e.PlaceUserLeaderNameList;if(""===n||""===i)return $my.messageInfo.html("暂无组别").fadeIn("fast").delay("1000").fadeOut("slow"),!1;n=n.split(","),i=i.split(",");for(var s=0;s<n.length;s++)a+='<li class="text-center" data-info='+n[s]+">"+i[s]+"组</li>";t.insertAdjacentHTML("afterEnd",a)},getSaleUserList:function(e,t){if(null==e||"null"==e)return $my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/placeusercontroller/placeUserListApp.json",data:{propertyId:e,timeselete:t},async:!1,success:function(e){if("{}"===JSON.stringify(e))return void $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");appointmentList.rederSaleuser(e)}})},renderEle:function(e){for(var t="",a=0;a<e.length;a++)t+="<div class='row' data-id="+e[a].id+"><div class='col-sm-8 col-xs-8 col-md-8'><div class='innerTop'>",t+="<p class='bigFont nowrap'><span>"+e[a].customerName+"</span>　<span>"+e[a].customerTel+"</span></p>",t+="</div><div class='innerBottom'>",t+="<p class='colorGray'>客户意向:<span>"+e[a].houseName+"</span>　　<span>"+e[a].num+"</span>访</p>",t+="</div></div><div class='col-sm-4 col-xs-4 col-md-4 text-right'><div class='innerTop'>",t+="<p class='colorGray'><span>"+e[a].lookTime+"</span></p>",t+="</div><div class='innerBottom'>",t+="<kbd class='bgcGray'><span>案</span>:<span>"+e[a].saleName+"</span></kbd>",t+="</div></div></div>";$($my.wrap).append(t),$my.flag=!1},getData:function(e,t,a,n){if(null==e||"null"==e)return $my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/placeusercontroller/lookListApp.json",data:{propertyID:e,timeselete:t,PlaceUserLeader:a,pageNum:n},async:!1,success:function(e){if("{}"===JSON.stringify(e))return $my.loader_inner.hide(),void $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");$my.pageSize=e.recordsTotal,$my.totalNum.innerHTML=e.recordsTotal;var t=e.data;if(!t.length)return $my.loader_inner.hide(),$my.messageInfo.html("暂无信息").stop().fadeIn("fast").delay("1000").fadeOut("slow"),!1;t.length<20&&($my.loader_inner.hide(),$my.lodingText.classList.add("lodingText_show")),appointmentList.renderEle(t)}})},scrollEvent:function(){var e=document.documentElement.clientHeight,t=$my.lodingText.parentNode,a=t.getBoundingClientRect(),n=$my.countType.querySelector(".optionListActive").dataset.index,i=$my.saleuserListID.querySelector(".activeSelect").dataset.info;if(!$my.flag){if(!(a.top<e&&a.bottom>=0))return;if($my.flag=!0,++$my.num>parseInt($my.pageSize/20)||$my.num==parseInt($my.pageSize/20)&&$my.pageSize%20==0)return $my.loader_inner.hide(),$my.lodingText.classList.add("lodingText_show"),!1;"all"===i?appointmentList.getData($my.propertyid,n,"",$my.num):appointmentList.getData($my.propertyid,n,i,$my.num)}},buffer:function(){$my.lodingText.classList.remove("lodingText_show");var e=$my.countType.querySelector(".optionListActive").dataset.index,t=$my.saleuserListID.querySelector(".activeSelect").dataset.info;if(sessionStorage.setItem("globaltimeSelect",JSON.stringify(e)),sessionStorage.setItem("saleuserListID_ld_Active",JSON.stringify(t)),"0"===e||"5"===e)return $my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow"),$my.totalNum.innerHTML="",$my.loader_inner.hide(),!1;$my.loader_inner.show(),"all"===t?appointmentList.getData($my.propertyid,e,"",0):appointmentList.getData($my.propertyid,e,t,0)},turnDetail:function(){var e=this.dataset.id;window.location.href="visit_detail.html?detailed="+e}};var appointmentList=new AppointmentList;$(function(){window.$my={messageInfo:$(".messageInfo"),propertyid:sessionStorage.getItem("propertyID"),num:0,wrap:document.querySelector("#wrap"),loader_inner:$(".loader-inner"),lodingText:document.querySelector(".lodingText"),countType:document.querySelector("#countType"),saleuserListID:document.querySelector("#saleuserListID"),totalNum:document.querySelector("#totalNum"),flag:!1},$.ajaxSetup({type:"POST",dataType:"json",error:function(){$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow")}}),appointmentList.getSaleUserList($my.propertyid,6);var e=sessionStorage.getItem("globaltimeSelect"),t=sessionStorage.getItem("saleuserListID_ld_Active");if(null!=e&&"null"!=e){e=JSON.parse(e);var a=$my.countType.querySelectorAll("li[data-index]");a=Array.prototype.slice.call(a);for(var n=0;n<a.length;n++)if(a[n].dataset.index===e){$(a[n]).addClass("optionListActive").siblings("li").removeClass("optionListActive");var i=$(a[n]).offset().left,s=$($my.countType).offset().left;$($my.countType).stop().animate({scrollLeft:i-s-8},500)}if(null!=t&&"null"!=t){t=JSON.parse(t);var o=$my.saleuserListID.querySelectorAll("li[data-info]");o=Array.prototype.slice.call(o);for(var n=0;n<o.length;n++)if(o[n].dataset.info===t){$(o[n]).addClass("activeSelect").siblings("li").removeClass("activeSelect");var i=$(o[n]).offset().left,s=$($my.saleuserListID).offset().left;$($my.saleuserListID).stop().animate({scrollLeft:i-s-8},500)}}appointmentList.buffer()}else appointmentList.getData($my.propertyid,1,"",0);var a=$my.countType.querySelectorAll("li");Array.prototype.forEach.call(a,function(e){e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),$(this).addClass("optionListActive").siblings("li").removeClass("optionListActive"),$my.num=0,$my.wrap.innerHTML="",appointmentList.throttle(appointmentList.buffer,this)},!1)}),$my.wrap.addEventListener("touchmove",appointmentList.touchThrottle(appointmentList.scrollEvent,500,1e3));var o=$my.saleuserListID.querySelectorAll("li");Array.prototype.forEach.call(o,function(e){e.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation(),$(this).addClass("activeSelect").siblings("li").removeClass("activeSelect"),$my.num=0,$my.wrap.innerHTML="",appointmentList.throttle(appointmentList.buffer,this)},!1)}),appointmentList.pipeFn(),$($my.wrap).on("click",".row",function(e){e.preventDefault(),e.stopPropagation(),appointmentList.throttle(appointmentList.turnDetail,this)})});