var ReportDetail = (function(window) {
	var ReportDetail = function(option) {
		return new ReportDetail.fn.init(option);
	}

	ReportDetail.fn = ReportDetail.prototype = {
		constructor: ReportDetail,
		init: function(option) {
			this.saleName = option.saleName || ""; //指定案场
			this.propertyName = option.propertyName || ""; //楼盘名
			this.phoneNum = option.phoneNum || ""; //电话
			this.customerName = option.customerName || ""; //用户名
			this.shuttle = option.shuttle || ""; //来访方式
			this.carTime = option.carTime || ""; //上车时间
			this.houseValuation = option.houseValuation || ""; //上车地点
			this.bbTime = option.bbTime || ""; //报备时间
			this.lookHomeDate = option.lookHomeDate || ""; //预约时间

			this.config = {
				propertyName: document.querySelector("#propertyName"),
				saleName: document.querySelector("#saleName"),
				phoneNum: document.querySelector("#phoneNum"),
				bbTime: document.querySelector("#bbTime"),
				lookHomeDate: document.querySelector("#lookHomeDate"),
				customerName: document.querySelector("#customerName"),
				shuttle: document.querySelector("#shuttle"),
				carTime: document.querySelector("#carTime"),
				houseValuation: document.querySelector("#houseValuation")
			};

			this.bindDom_init = function() {
				this.bindDom();
			};

			this.shuttleFn_init = function(){
				this.shuttleFn();
			};
		},
		bindDom: function(){
			this.config.propertyName.innerHTML = this.propertyName;
			this.config.saleName.innerHTML = this.saleName;
			this.config.phoneNum.innerHTML = this.phoneNum;
			this.config.bbTime.innerHTML = this.bbTime;
			this.config.lookHomeDate.innerHTML = this.lookHomeDate;
			this.config.customerName.innerHTML = this.customerName;
			this.config.shuttle.innerHTML = this.shuttle;
			this.config.carTime.innerHTML = this.carTime;
			this.config.houseValuation.innerHTML = this.houseValuation;
		},
		shuttleFn: function(){
			switch(this.shuttle){
				case "自驾":
					$('.main>.row:last-child').prev(".row").css('display', 'none');
					$('.main>.row:last-child').css('display', 'none');
					break;
				case "班车":
					break;
				default: 
					break;
			}
		}
	}

	ReportDetail.fn.init.prototype = ReportDetail.fn;

	return ReportDetail;
})();


$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID")
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});
	
	// 获取customerid
	var url = window.location.href;
	(function(){
		if (url.indexOf("customerid") != -1) 
		{
			var customerid = window.location.search;
			customerid = customerid.split("=")[1];
			$my.customerID = customerid;			
		} else
		{
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	})(url);

	// 获取数据
	!function(){
		if ($my.propertyid != null && $my.propertyid != "null") 
		{
			if ($my.customerID !== "") 
			{
				$.ajax({
				    url: getRoothPath+'/overview/DetailedreportApp.json',
				    data: { 
				    	"propertyID": $my.propertyid,
				    	"customerID":$my.customerID
				    },
				    // async: false, //同步
				    success:function(data){
				    	console.log(data)
				    	if (JSON.stringify(data) !== "{}") 
				    	{
				    		var json = data.data;
				    		$my.option = {
				    			saleName: json.saleName,
				    			houseValuation: json.houseValuation,
				    			lookHomeDate: json.lookHomeDate,
				    			propertyName: json.propertyName,
				    			carTime: json.carTime,
				    			shuttle: json.shuttle,
				    			phoneNum: json.customerTel,
				    			customerName: json.customerName,
				    			bbTime: json.bbTime
				    		};				    		
				    	} else
				    	{
				    		$my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow");
				    		return false;
				    	};
				    },
				    complete:function(){
				    	var reportDetail = ReportDetail($my.option);

				    	reportDetail.bindDom_init();
				    	reportDetail.shuttleFn_init();
				    }
				})
			} else
			{
				$my.messageInfo.html("用户参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			};			
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}
	}($my.propertyid,$my.customerID);

});

