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
			this.RewardActual = ""; //佣金
			this.cashPrice = ""; //奖励
			this.commission = ""; //折佣
			this.isInvoice = ""; //提供发票
			this.rewardTotal = ""; //应发佣金
			this.tooltip = "";
			this.logList = []; //发放进展

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
				RewardActual: document.querySelector("#RewardActual"),
				cashPrice: document.querySelector("#cashPrice"),
				commission: document.querySelector("#commission"),
				isInvoice: document.querySelector("#isInvoice"),
				rewardTotal: document.querySelector("#rewardTotal"),
				tooltip: document.querySelector("#tooltip"),
				tbody: document.querySelector("#tbody")
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
			this.config.RewardActual.innerHTML = this.RewardActual;
			this.config.cashPrice.innerHTML = this.cashPrice;
			this.config.commission.innerHTML = this.commission;
			this.config.isInvoice.innerHTML = this.isInvoice;
			this.config.rewardTotal.innerHTML = this.rewardTotal;
			this.config.tooltip.setAttribute("title", this.tooltip);
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
				    url: getRoothPath+'/overview/commsionDetailedApp.json',
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
				    			reportDetail.RewardActual = json.RewardActual; 
				    			reportDetail.cashPrice = json.cashPrice; 
				    			reportDetail.commission = json.commission; 
				    			reportDetail.isInvoice = json.isInvoice; 
				    			reportDetail.rewardTotal = json.rewardTotal; 
				    			reportDetail.tooltip = json.customerName+json.customerPhone;
				    			reportDetail.logList = data.logList;

				    			reportDetail.bindDom();
				    			reportDetail.rederLogList_init();
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
		rederLogList_init: function(){
			if (this.logList.length) {
				var str = "";

				for (var i = 0,len = this.logList.length; i < len; i++) {
					str += '<tr class="pass"><td>';
					str += '<i class="circle"></i>　<span class="progress_info">'+this.logList[i].auditingTime+'　<b>'+this.logList[i].type+'</b></span>';
					str += '</td></tr>';   
				};

				this.config.tbody.innerHTML = str;
			} else{
				$my.messageInfo.html("暂无佣金发放信息").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			};
		}
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