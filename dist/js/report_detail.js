var ReportDetail=function(e){var t=function(e){return new t.fn.init(e)};return t.fn=t.prototype={constructor:t,init:function(e){this.saleName=e.saleName||"",this.propertyName=e.propertyName||"",this.phoneNum=e.phoneNum||"",this.customerName=e.customerName||"",this.shuttle=e.shuttle||"",this.carTime=e.carTime||"",this.houseValuation=e.houseValuation||"",this.bbTime=e.bbTime||"",this.lookHomeDate=e.lookHomeDate||"",this.config={propertyName:document.querySelector("#propertyName"),saleName:document.querySelector("#saleName"),phoneNum:document.querySelector("#phoneNum"),bbTime:document.querySelector("#bbTime"),lookHomeDate:document.querySelector("#lookHomeDate"),customerName:document.querySelector("#customerName"),shuttle:document.querySelector("#shuttle"),carTime:document.querySelector("#carTime"),houseValuation:document.querySelector("#houseValuation")},this.bindDom_init=function(){this.bindDom()},this.shuttleFn_init=function(){this.shuttleFn()}},bindDom:function(){this.config.propertyName.innerHTML=this.propertyName,this.config.saleName.innerHTML=this.saleName,this.config.phoneNum.innerHTML=this.phoneNum,this.config.bbTime.innerHTML=this.bbTime,this.config.lookHomeDate.innerHTML=this.lookHomeDate,this.config.customerName.innerHTML=this.customerName,this.config.shuttle.innerHTML=this.shuttle,this.config.carTime.innerHTML=this.carTime,this.config.houseValuation.innerHTML=this.houseValuation},shuttleFn:function(){switch(this.shuttle){case"自驾":$(".main>.row:last-child").prev(".row").css("display","none"),$(".main>.row:last-child").css("display","none")}}},t.fn.init.prototype=t.fn,t}();$(function(){window.$my={messageInfo:$(".messageInfo"),propertyid:sessionStorage.getItem("propertyID")},$.ajaxSetup({type:"POST",dataType:"json",error:function(){$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow")}});var e=window.location.href;!function(){if(-1==e.indexOf("customerid"))return $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var t=window.location.search;t=t.split("=")[1],$my.customerID=t}(),function(){null==$my.propertyid||"null"==$my.propertyid?$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"):""===$my.customerID?$my.messageInfo.html("用户参数丢失").fadeIn("fast").delay("1000").fadeOut("slow"):$.ajax({url:getRoothPath+"/overview/DetailedreportApp.json",data:{propertyID:$my.propertyid,customerID:$my.customerID},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;var t=e.data;$my.option={saleName:t.saleName,houseValuation:t.houseValuation,lookHomeDate:t.lookHomeDate,propertyName:t.propertyName,carTime:t.carTime,shuttle:t.shuttle,phoneNum:t.customerTel,customerName:t.customerName,bbTime:t.bbTime}},complete:function(){var e=ReportDetail($my.option);e.bindDom_init(),e.shuttleFn_init()}})}($my.propertyid,$my.customerID)});