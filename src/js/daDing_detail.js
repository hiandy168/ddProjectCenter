var ReportDetail = (function(window) {
	var ReportDetail = function() {
		return new ReportDetail.fn.init();
	}

	ReportDetail.fn = ReportDetail.prototype = {
		constructor: ReportDetail,
		init: function() {
			this.customerName = ""; //客户姓名
			this.customerPhone = ""; //客户电话
			this.houseName = ""; //房间号
			this.placeName = ""; //联动姓名
			this.agencyName = ""; //公司名
			this.memberName = ""; //经纪人姓名
			this.memberPhone = ""; //经济人电话
			this.saleName = ""; //案场名
			this.signTime = ""; //签约时间
			this.signMoney = ""; //签约总价
			this.dealArea = ""; //签约面积
			this.nextTime = ""; //约签时间
			this.salePrice = ""; //首付金额
			this.groupName = ""; //团购方案
			this.groupShouldpay = ""; //应收团购
			this.remark = ""; //备注信息
			this.rewardActual = ""; //佣金总计
			this.rewardTotal = ""; //应发佣金
			this.cashPrice = ""; //奖励
			this.commissiondiscount = ""; //折佣
			this.tooltip = "";

			Object.defineProperty(this,"purchaseWay",{ //购房方式暂不可更改
			    value : "-- ",
			    writable: false
			});

			this.config = {
				customerName: document.querySelector("#customerName"),
				customerPhone: document.querySelector("#customerPhone"),
				houseName: document.querySelector("#houseName"),
				placeName: document.querySelector("#placeName"),
				agencyName: document.querySelector("#agencyName"),
				memberName: document.querySelector("#memberName"),
				memberPhone: document.querySelector("#memberPhone"),
				saleName: document.querySelector("#saleName"),
				signTime: document.querySelector("#signTime"),
				signMoney: document.querySelector("#signMoney"),
				dealArea: document.querySelector("#dealArea"),
				nextTime: document.querySelector("#nextTime"),
				salePrice: document.querySelector("#salePrice"),
				groupName: document.querySelector("#groupName"),
				groupShouldpay: document.querySelector("#groupShouldpay"),
				remark: document.querySelector("#remark"),
				rewardActual: document.querySelector("#rewardActual"),
				rewardTotal: document.querySelector("#rewardTotal"),
				cashPrice: document.querySelector("#cashPrice"),
				commissiondiscount: document.querySelector("#commissiondiscount"),
				tooltip: document.querySelector("#tooltip")
			};

			this.bindDom = function() {
				this.bindDom_init();
			};
			this.getDetailed = function(window){
				this.getDetailed_init(window);
			};
			this.getData = function(id){
				this.getData_init(id);
			};
		},
		bindDom_init: function(){ //绑定DOM
			this.config.customerName.innerHTML = this.customerName;
			this.config.customerPhone.innerHTML = this.customerPhone;
			this.config.houseName.innerHTML = this.houseName;
			this.config.placeName.innerHTML = this.placeName;
			this.config.agencyName.innerHTML = this.agencyName;
			this.config.memberName.innerHTML = this.memberName;
			this.config.memberPhone.innerHTML = this.memberPhone;
			this.config.saleName.innerHTML = this.saleName;
			this.config.signTime.innerHTML = this.signTime;
			this.config.signMoney.innerHTML = this.signMoney;
			this.config.dealArea.innerHTML = this.dealArea;
			this.config.nextTime.innerHTML = this.nextTime;
			this.config.salePrice.innerHTML = this.salePrice;
			this.config.groupName.innerHTML = this.groupName;
			this.config.groupShouldpay.innerHTML = this.groupShouldpay;
			this.config.remark.innerHTML = this.remark;
			this.config.rewardActual.innerHTML = this.rewardActual;
			this.config.rewardTotal.innerHTML = this.rewardTotal;
			this.config.cashPrice.innerHTML = this.cashPrice;
			this.config.commissiondiscount.innerHTML = this.commissiondiscount;
			this.config.tooltip.setAttribute("title", this.tooltip);

			if (!this.agencyName) {
				var mainItem = document.querySelector(".mainItem");
				var section = mainItem.getElementsByTagName("section")[0];
				section.style.display = "none";
			};
		},
		getDetailed_init: function(window){ //获取saleid
			var url = window.location.href;
			if (url.indexOf("detailed") != -1) 
			{
				var detailed = window.location.search;
				detailed = detailed.split("=")[1];
				$my.detailed = detailed;			
			} else
			{
				$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
				throw new Error("url错误");
				return false;
			};
		},
		getData_init: function(id){
			if (id != null && id != "null") {
				$.ajax({
				    url: getRoothPath+'/overview/signDetailedApp.json',
				    data: { 
				    	"id": id
				    },
				    // async: false, //同步
				    success:function(data){
				    	if (JSON.stringify(data) !== "{}") 
				    	{
				    		console.log(data)
				    		var json = data.data;
				    		if (JSON.stringify(json) !== "{}") 
				    		{
				    			reportDetail.customerName = json.customerName; 
				    			reportDetail.customerPhone = json.customerPhone; 
				    			reportDetail.houseName = json.houseName; 
				    			reportDetail.placeName = json.placeName; 
				    			reportDetail.agencyName = json.agencyName; 
				    			reportDetail.memberName = json.memberName; 
				    			reportDetail.memberPhone = json.memberPhone; 
				    			reportDetail.saleName = json.saleName; 
				    			reportDetail.signTime = json.signTime; 
				    			reportDetail.signMoney = json.signMoney; 
				    			reportDetail.dealArea = json.dealArea;
				    			reportDetail.nextTime = json.nextTime;
				    			reportDetail.salePrice = json.salePrice; 
				    			reportDetail.groupName = json.groupName; 
				    			reportDetail.groupShouldpay = (json.groupShouldpay/10000).toFixed(0);
				    			reportDetail.remark = json.remark; 
				    			reportDetail.rewardActual = json.rewardActual; 
				    			reportDetail.rewardTotal = json.rewardTotal; 
				    			reportDetail.cashPrice = json.cashPrice; 
				    			reportDetail.commissiondiscount = json.commissiondiscount;
				    			reportDetail.tooltip = json.customerName+json.customerPhone

				    			reportDetail.bindDom();
				    		} else
				    		{
				    			$my.messageInfo.html("数据为空").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				    			return;
				    		};
				    	} else
				    	{
				    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				    		return;
				    	};
				    },
				    complete:function(){
				    	$('[data-toggle="tooltip"]').tooltip(); //bootstrap工具提示
				    }
				})	
			}else{
				$my.messageInfo.html("参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			}
		},
	}

	ReportDetail.fn.init.prototype = ReportDetail.fn;

	return ReportDetail;
})();

var reportDetail = ReportDetail();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo")
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});	

	reportDetail.getDetailed(window); //获取saleid

	reportDetail.getData($my.detailed); //获取默认数据
});