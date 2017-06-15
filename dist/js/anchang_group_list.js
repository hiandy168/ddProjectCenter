function Bar(){this.categories=[],this.data_dk=[],this.data_cj=[],this.eleid=""}function Saleuser(){this.placeReserveSum="",this.dkSum="",this.totalSaleSum="",this.totalHouseSum="",this.paymentBackSum="",this.paymentHouseSum="--",this.breakHouseMoneySum="",this.breakHouseSum="",this.tfHouseSum="--",this.tfHouseMoneySum="--",this.lfScale="",this.cjScale="",Object.defineProperty(this,"paymentHouseSum",{value:"-- ",writable:!1}),Object.defineProperty(this,"tfHouseSum",{value:"-- ",writable:!1}),Object.defineProperty(this,"tfHouseMoneySum",{value:"-- ",writable:!1}),Object.defineProperty(this,"lfScale",{get:function(){var e=/^[0-9]*$/;return e.test(this.placeReserveSum)&&e.test(this.dkSum)&&""!=this.placeReserveSum&&""!=this.dkSum&&"0"!==this.dkSum?lfScale=(this.placeReserveSum/this.dkSum).toFixed(2)+":1":lfScale="--"},set:function(e){lfScale=e}}),Object.defineProperty(this,"cjScale",{get:function(){var e=/^[0-9]*$/;return e.test(this.dkSum)&&e.test(this.totalHouseSum)&&""!=this.dkSum&&""!=this.totalHouseSum&&"0"!==this.totalHouseSum?cjScale=(this.dkSum/this.totalHouseSum).toFixed(2)+":1":cjScale="--"},set:function(e){cjScale=e}}),this.config={placeReserveSum:document.querySelector("#placeReserveSum"),dkSum:document.querySelector("#dkSum"),totalSaleSum:document.querySelector("#totalSaleSum"),totalHouseSum:document.querySelector("#totalHouseSum"),paymentBackSum:document.querySelector("#paymentBackSum"),paymentHouseSum:document.querySelector("#paymentHouseSum"),breakHouseMoneySum:document.querySelector("#breakHouseMoneySum"),breakHouseSum:document.querySelector("#breakHouseSum"),tfHouseSum:document.querySelector("#tfHouseSum"),tfHouseMoneySum:document.querySelector("#tfHouseMoneySum"),lfScale:document.querySelector("#lfScale"),cjScale:document.querySelector("#cjScale")}}Bar.prototype={constructor:Bar,barChart:function(){Highcharts.chart(this.eleid,{chart:{type:"bar",backgroundColor:"#49484e",marginTop:35},title:{text:null},subtitle:{text:null},credits:{enabled:!1},exporting:{enabled:!1},xAxis:{tickWidth:0,gridLineWidth:0,lineColor:"#49484e",categories:this.categories,title:{text:null},labels:{style:{color:"#A4A4A7",fontSize:"12px",fontWeight:"normal"}}},yAxis:{min:0,title:{text:"",align:"high"},labels:{enabled:!1},gridLineWidth:0},tooltip:{enabled:!1,backgroundColor:"#FCFFC5",borderColor:"black",borderRadius:10,borderWidth:3,shadow:!0,animation:!0,style:{color:"#666",fontSize:"12px",fontWeight:"normal",fontFamily:"Courir new"}},plotOptions:{bar:{dataLabels:{enabled:!0,style:{color:"#3BAFC1",fontWeight:"normal"}}},series:{borderWidth:0,pointWidth:6,borderRadius:4}},legend:{enabled:!0,align:"top",verticalAlign:"top",y:0,padding:0,margin:100,itemMarginTop:0,itemMarginBottom:0,floating:!0,symbolWidth:20,itemStyle:{color:"#fff",cursor:"pointer",fontSize:"14px",fontWeight:"normal"}},credits:{enabled:!1},series:[{name:"带看",color:"#3BAFC1",data:this.data_dk},{name:"成交",color:"#fff",data:this.data_cj}]}),$("tspan.highcharts-text-outline").css({fill:"none",stroke:"rgb(53,52,59)"})}};var dkcjBar=new Bar;Saleuser.prototype={constructor:Saleuser,throttle:function(e,t){clearTimeout(e.tId),e.tId=setTimeout(function(){e.call(t)},500)},rederSaleuser:function(e){var t="",a=e.SalesUserLeaderList,s=e.SalesUserLeaderNameList;if(""===a||""===s)return $my.messageInfo.html("暂无组别").fadeIn("fast").delay("1000").fadeOut("slow"),!1;a=a.split(","),s=s.split(","),t+='<li id="saleuserList_all" class="text-center activeSelect" data-info="all">全部</li>';for(var o=0;o<a.length;o++)t+='<li class="text-center" data-info='+a[o]+">"+s[o]+"组</li>";$my.saleuserList.innerHTML=t},getSaleUserList:function(e,t){if(null==e||"null"==e)return $my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/saleusercontroller/saleUserListApp.json",data:{propertyID:e,timeselete:t},async:!1,success:function(e){if(sessionStorage.setItem("anchangSaleUserList",JSON.stringify(e)),"{}"===JSON.stringify(e))return void $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");saleuser.rederSaleuser(e)}})},bindDom:function(){this.config.placeReserveSum.innerHTML=this.placeReserveSum,this.config.dkSum.innerHTML=this.dkSum,this.config.totalSaleSum.innerHTML=this.totalSaleSum,this.config.totalHouseSum.innerHTML=this.totalHouseSum,this.config.paymentBackSum.innerHTML=this.paymentBackSum,this.config.paymentHouseSum.innerHTML=this.paymentHouseSum,this.config.breakHouseMoneySum.innerHTML=this.breakHouseMoneySum,this.config.breakHouseSum.innerHTML=this.breakHouseSum,this.config.tfHouseSum.innerHTML=this.tfHouseSum,this.config.tfHouseMoneySum.innerHTML=this.tfHouseMoneySum,this.config.lfScale.innerHTML=this.lfScale,this.config.cjScale.innerHTML=this.cjScale},renderData:function(e){var t="",a=/^[0-9]*$/,s="",o="",l=document.querySelector("#tbody"),r=[],i=[],n=[];if(!e.length)return $my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow"),!1;for(var u=0;u<e.length;u++)s=a.test(e[u].PlaceReserve)&&a.test(e[u].LookCustomer)&&""!=e[u].PlaceReserve&&""!=e[u].LookCustomer&&"0"!==e[u].LookCustomer?(e[u].PlaceReserve/e[u].LookCustomer).toFixed(2)+":1":"--",o=a.test(e[u].LookCustomer)&&a.test(e[u].TotalHouse)&&""!=e[u].LookCustomer&&""!=e[u].TotalHouse&&"0"!==e[u].TotalHouse?(e[u].LookCustomer/e[u].TotalHouse).toFixed(2)+":1":"--",e[u].saleName?(t+="<tr data-saleid="+e[u].saleID+">",t+="<td>"+e[u].saleName+"</td>",t+="<td>"+e[u].PlaceReserve+"</td>",t+="<td>"+e[u].LookCustomer+"</td>",t+="<td>"+s+"</td>",t+="<td>"+e[u].TotalHouse+"</td>",t+="<td>"+o+"</td>",t+="<td>"+(e[u].TotalSale/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].ReservatMoney/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].PaymentBack/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].BreakHouseMoney/1e4).toFixed(0)+"</td>",t+="<td>--</td>",t+="</tr>",r.push(e[u].saleName),i.push(e[u].LookCustomer),n.push(e[u].TotalHouse)):(t+="<tr data-salesuserleaderid="+e[u].SalesUserLeaderid+">",t+="<td>"+e[u].SalesUserLeaderName+"组</td>",t+="<td>"+e[u].PlaceReserve+"</td>",t+="<td>"+e[u].LookCustomer+"</td>",t+="<td>"+s+"</td>",t+="<td>"+e[u].TotalHouse+"</td>",t+="<td>"+o+"</td>",t+="<td>"+(e[u].TotalSale/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].ReservatMoney/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].PaymentBack/1e4).toFixed(0)+"</td>",t+="<td>"+(e[u].BreakHouseMoney/1e4).toFixed(0)+"</td>",t+="<td>--</td>",t+="</tr>",r.push(e[u].SalesUserLeaderName+"组"),i.push(e[u].LookCustomer),n.push(e[u].TotalHouse));l.innerHTML=t,saleuser.renderBar(r,i,n),t=null,s=null,o=null,r=null,i=null,n=null},renderBar:function(e,t,a){var s=document.getElementById("dkcjContainer");dkcjBar.categories=e,dkcjBar.data_dk=t,dkcjBar.data_cj=a,dkcjBar.eleid="dkcjContainer",s.style.height=80*dkcjBar.categories.length+"px",dkcjBar.barChart()},getData:function(e,t,a,s){if(null==e||"null"==e)return $my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/saleusercontroller/"+s+".json",data:{propertyID:e,timeselete:t,SalesUserLeader:a},success:function(e){if(sessionStorage.setItem("anchangGroupData",JSON.stringify(e)),"{}"===JSON.stringify(e))return void $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");saleuser.placeReserveSum=e.placeReserveSum,saleuser.dkSum=e.dkSum,saleuser.totalSaleSum=(e.totalSaleSum/1e4).toFixed(0),saleuser.totalHouseSum=e.totalHouseSum,saleuser.paymentBackSum=(e.paymentBackSum/1e4).toFixed(0),saleuser.breakHouseMoneySum=(e.breakHouseMoneySum/1e4).toFixed(0),saleuser.breakHouseSum=e.breakHouseSum,saleuser.bindDom(),saleuser.renderData(e.resultList)}})},buffer:function(){var e=$my.countType.querySelector(".optionListActive").dataset.index;if(sessionStorage.setItem("globaltimeSelect",JSON.stringify(e)),"0"===e||"5"===e)return void $my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");var t=$my.saleuserList.querySelector(".activeSelect").dataset.info;sessionStorage.setItem("saleuserListIDActive",JSON.stringify(t)),"all"===t?saleuser.getData($my.propertyid,e,"","saleLeaderListApp"):saleuser.getData($my.propertyid,e,t,"saleListApp")},bindmoduleEvents:function(){var e=$(this).index(),t=$my.saleuserList.querySelector(".activeSelect").dataset.info;if("all"===t)switch(e){case 0:window.location.href="yuyue_list.html";break;case 1:window.location.href="visit_list.html";break;case 2:window.location.href="chengjiao_list.html";break;case 3:window.location.href="huiKuan_list.html";break;case 4:window.location.href="tuiDing_list.html";break;case 5:window.location.href="tuiFang_list.html"}else switch(e){case 0:window.location.href="yuyue_groupMember_list.html?SalesUserLeader="+t;break;case 1:window.location.href="visit_groupMember_list.html?SalesUserLeader="+t;break;case 2:window.location.href="chengjiao_groupMember_list.html?SalesUserLeader="+t;break;case 3:window.location.href="huiKuan_groupMember_list.html?SalesUserLeader="+t;break;case 4:window.location.href="tuiDing_groupMember_list.html?SalesUserLeader="+t;break;case 5:$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow")}},bindtableEvents:function(){var e=$(this).index(),t=$my.saleuserList.querySelector(".activeSelect").dataset.info,a=this.parentNode.dataset.salesuserleaderid,s=this.parentNode.dataset.saleid;if("all"===t)switch(e){case 0:var o=$my.saleuserList.querySelectorAll("li[data-info]");Array.prototype.forEach.call(o,function(e){e.dataset.info===a&&$(e).trigger("click")});break;case 1:window.location.href="yuyue_list.html?salesuserleaderid="+a;break;case 2:window.location.href="visit_list.html?salesuserleaderid="+a;break;case 3:break;case 4:window.location.href="chengjiao_list.html?salesuserleaderid="+a;break;case 5:break;case 6:window.location.href="chengjiao_list.html?salesuserleaderid="+a;break;case 7:window.location.href="sign_list.html?salesuserleaderid="+a;break;case 8:window.location.href="huiKuan_list.html?salesuserleaderid="+a;break;case 9:window.location.href="tuiDing_list.html?salesuserleaderid="+a;break;case 10:window.location.href="tuiFang_list.html?salesuserleaderid="+a}else switch(sessionStorage.removeItem("globalPeopleID"),e){case 0:window.location.href="anchang_groupMembers_detail.html?saleid="+s;break;case 1:window.location.href="yuyue_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 2:window.location.href="visit_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 3:break;case 4:window.location.href="chengjiao_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 5:break;case 6:window.location.href="chengjiao_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 7:window.location.href="sign_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 8:window.location.href="huiKuan_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 9:window.location.href="tuiDing_groupMember_list.html?SalesUserLeader="+t+"&saleid="+s;break;case 10:$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow")}}};var saleuser=new Saleuser;$(function(){window.$my={messageInfo:$(".messageInfo"),propertyid:sessionStorage.getItem("propertyID"),countType:document.querySelector("#countType"),saleuserList:document.querySelector("#saleuserList")},$.ajaxSetup({type:"POST",dataType:"json",error:function(){$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow")}});var e=sessionStorage.getItem("anchangSaleUserList"),t=sessionStorage.getItem("saleuserListIDActive");if(null!=e&&"null"!=e){if("{}"===e)return void $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");if(e=JSON.parse(e),saleuser.rederSaleuser(e),null!=t&&"null"!=t&&"{}"!==t){t=JSON.parse(t);var a=$my.saleuserList.querySelectorAll("li[data-info]");a=Array.prototype.slice.call(a);for(var s=0;s<a.length;s++)a[s].dataset.info===t&&$(a[s]).addClass("activeSelect").siblings("li").removeClass("activeSelect")}}else saleuser.getSaleUserList($my.propertyid,6);var o=sessionStorage.getItem("anchangGroupData"),l=sessionStorage.getItem("globaltimeSelect");if(null!=o&&"null"!=o)if("{}"!==o)if(null!=l&&"null"!=l&&"{}"!==l){l=JSON.parse(l);var r=$my.countType.querySelectorAll("li[data-index]");r=Array.prototype.slice.call(r);for(var s=0;s<r.length;s++)if(r[s].dataset.index==l){$(r[s]).addClass("optionListActive").siblings("li").removeClass("optionListActive");var i=$(r[s]).offset().left,n=$($my.countType).offset().left;$($my.countType).stop().animate({scrollLeft:i-n-8},500)}saleuser.buffer()}else o=JSON.parse(o),saleuser.placeReserveSum=o.placeReserveSum,saleuser.dkSum=o.dkSum,saleuser.totalSaleSum=(o.totalSaleSum/1e4).toFixed(0),saleuser.totalHouseSum=o.totalHouseSum,saleuser.paymentBackSum=(o.paymentBackSum/1e4).toFixed(0),saleuser.breakHouseMoneySum=(o.breakHouseMoneySum/1e4).toFixed(0),saleuser.breakHouseSum=o.breakHouseSum,saleuser.bindDom(),saleuser.renderData(o.resultList);else $my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");else if(null!=l&&"null"!=l&&"{}"!==l){l=JSON.parse(l);var r=$my.countType.querySelectorAll("li[data-index]");r=Array.prototype.slice.call(r);for(var s=0;s<r.length;s++)if(r[s].dataset.index==l){$(r[s]).addClass("optionListActive").siblings("li").removeClass("optionListActive");var i=$(r[s]).offset().left,n=$($my.countType).offset().left;$($my.countType).stop().animate({scrollLeft:i-n-8},500)}saleuser.buffer()}else saleuser.getData($my.propertyid,1,"","saleLeaderListApp");var r=$my.countType.querySelectorAll("li[data-index]");Array.prototype.forEach.call(r,function(e){e.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),e.classList.add("optionListActive");for(var a=Array.prototype.filter.call(e.parentNode.children,function(t){return t!==e}),s=0;s<a.length;s++)a[s].classList.remove("optionListActive");saleuser.throttle(saleuser.buffer,this)},!1)}),$($my.saleuserList).on("click","li",function(e){e.preventDefault(),e.stopPropagation(),$(this).addClass("activeSelect").siblings("li").removeClass("activeSelect"),saleuser.throttle(saleuser.buffer,this)}),$(".module ul li").on("click",function(e){e.preventDefault(),e.stopPropagation(),saleuser.throttle(saleuser.bindmoduleEvents,this)}),$(".hk_table").on("click",".table>tbody>tr>td",function(e){e.preventDefault(),e.stopPropagation(),saleuser.throttle(saleuser.bindtableEvents,this)})});