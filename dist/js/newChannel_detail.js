function NewChannel(){this.placeUserName="",this.agencyName="",this.memberCount="人",this.linkName="",this.telephone="",this.propertyJoin="",this.cpNum="",this.customerReport="",this.lookCustomer="",this.lfScale="",this.saleHouseCount="",this.cjScale="",this.saleHouseAmount="",this.shouldCommission="",this.commission="",Object.defineProperty(this,"cpNum",{value:"-- ",writable:!1}),Object.defineProperty(this,"lfScale",{get:function(){var e=/^[0-9]*$/;return e.test(this.customerReport)&&e.test(this.lookCustomer)&&"0"!==this.lookCustomer&&""!=this.lookCustomer&&""!=this.customerReport?lfScale=(this.customerReport/this.lookCustomer).toFixed(2)+":1":lfScale="--"},set:function(e){lfScale=e}}),Object.defineProperty(this,"cjScale",{get:function(){var e=/^[0-9]*$/;return e.test(this.lookCustomer)&&e.test(this.saleHouseCount)&&"0"!==this.saleHouseCount&&""!=this.saleHouseCount&&""!=this.lookCustomer?cjScale=(this.lookCustomer/this.saleHouseCount).toFixed(2)+":1":cjScale="--"},set:function(e){cjScale=e}}),this.config={placeUserName:document.querySelector("#placeUserName"),agencyName:document.querySelector("#agencyName"),memberCount:document.querySelector("#memberCount"),linkName:document.querySelector("#linkName"),telephone:document.querySelector("#telephone"),propertyJoin:document.querySelector("#propertyJoin"),cpNum:document.querySelector("#cpNum"),customerReport:document.querySelector("#customerReport"),lookCustomer:document.querySelector("#lookCustomer"),lfScale:document.querySelector("#lfScale"),saleHouseCount:document.querySelector("#saleHouseCount"),cjScale:document.querySelector("#cjScale"),saleHouseAmount:document.querySelector("#saleHouseAmount"),shouldCommission:document.querySelector("#shouldCommission"),commission:document.querySelector("#commission")}}NewChannel.prototype={constructor:NewChannel,throttle:function(e,t){clearTimeout(e.tId),e.tId=setTimeout(function(){e.call(t)},200)},getAgencyID:function(){if(-1===window.location.href.indexOf("agencyid"))return $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var e=window.location.search;e=e.split("=")[1],$my.agencyID=e},bindDom:function(){this.config.placeUserName.innerHTML=this.placeUserName,this.config.agencyName.innerHTML=this.agencyName,this.config.memberCount.innerHTML=this.memberCount,this.config.linkName.innerHTML=this.linkName,this.config.telephone.innerHTML=this.telephone,this.config.propertyJoin.innerHTML=this.propertyJoin,this.config.cpNum.innerHTML=this.cpNum,this.config.customerReport.innerHTML=this.customerReport,this.config.lookCustomer.innerHTML=this.lookCustomer,this.config.lfScale.innerHTML=this.lfScale,this.config.saleHouseCount.innerHTML=this.saleHouseCount,this.config.cjScale.innerHTML=this.cjScale,this.config.saleHouseAmount.innerHTML=this.saleHouseAmount,this.config.shouldCommission.innerHTML=this.shouldCommission,this.config.commission.innerHTML=this.commission},getData:function(e,t,o){if(null==e||"null"==e)return $my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/agencycompanycontroller/agencyPerformanceApp.json",data:{propertyId:e,agencyID:t,countType:o},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var t=e.data;if("{}"===JSON.stringify(t))return $my.messageInfo.html("信息为空").fadeIn("fast").delay("1000").fadeOut("slow"),!1;newChannel.placeUserName=t.PlaceUserName,newChannel.agencyName=t.AgencyName,newChannel.memberCount=t.MemberCount+"人",newChannel.linkName=t.LinkName,newChannel.telephone=t.Telephone,newChannel.propertyJoin=t.PropertyJoin,newChannel.customerReport=t.CustomerReport,newChannel.lookCustomer=t.LookCustomer,newChannel.saleHouseCount=t.SaleHouseCount,newChannel.saleHouseAmount=(t.SaleHouseAmount/1e4).toFixed(4),newChannel.shouldCommission=(t.ShouldCommission/1e4).toFixed(4),newChannel.commission=(t.Commission/1e4).toFixed(4),newChannel.bindDom()}})},buffer:function(){var e=this.dataset.index;if("0"===e||"6"===e)return $my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow"),!1;newChannel.getData($my.propertyid,$my.agencyID,e)}};var newChannel=new NewChannel;$(function(){window.$my={messageInfo:$(".messageInfo"),propertyid:sessionStorage.getItem("propertyID")},newChannel.getAgencyID(),newChannel.getData($my.propertyid,$my.agencyID,1);var e=document.querySelector("#countType"),t=e.querySelectorAll("li");[].forEach.call(t,function(e){e.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),e.classList.add("optionListActive");for(var o=Array.prototype.filter.call(e.parentNode.children,function(t){return t!==e}),n=0;n<o.length;n++)o[n].classList.remove("optionListActive");newChannel.throttle(newChannel.buffer,this)},!1)})});