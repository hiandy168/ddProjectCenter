var ReportDetail = (function(window) {
	var ReportDetail = function() {
		return new ReportDetail.fn.init();
	}

	ReportDetail.fn = ReportDetail.prototype = {
		constructor: ReportDetail,
		init: function() {
			this.AddAgency = ""; //新增渠道
			this.StepProperty = ""; //新增踩盘
			this.ReportCustomer = ""; //报备
			this.CustomerLook = ""; //来访
			this.lfScale = ""; //来访比
			this.TotalSales = ""; //大定金额
			this.TotalHouse = ""; //大定套数
			this.qySum = ""; //签约金额
			this.qySut = ""; //签约套数
			this.cjScale = ""; //成交比
			this.AgencyPayMoney = ""; //渠道发佣金额
			this.AgencyPay = ""; //渠道发佣套数
			this.tdSum = ""; //退定金额
			this.tdSut = ""; //退定套数
			this.tfSum = ""; //退房金额
			this.tfSut = ""; //退房套数

			Object.defineProperty(this,"lfScale",{ //来访比
			    get: function(){
			    	var reg = /^[0-9]*$/;
			    	if (reg.test(this.ReportCustomer) 
			    		&& reg.test(this.CustomerLook)
			    		&& this.ReportCustomer != ""
			    		&& this.CustomerLook != ""
			    		&& this.CustomerLook !== 0) 
			    	{
			    		return lfScale = (this.ReportCustomer / this.CustomerLook).toFixed(2) + ":1";
			    	} else
			    	{
			    		return lfScale = "--";
			    	};	        
			    },
			    set: function(value){
			    	lfScale = value;
			    }
			});

			Object.defineProperty(this,"cjScale",{ //成交比
			    get: function(){
			    	var reg = /^[0-9]*$/;
			    	if (reg.test(this.CustomerLook) 
			    		&& reg.test(this.TotalHouse)
			    		&& this.CustomerLook != ""
			    		&& this.TotalHouse != ""
			    		&& this.TotalHouse !== 0) 
			    	{
			    		return cjScale = (this.CustomerLook / this.TotalHouse).toFixed(2) + ":1";
			    	} else
			    	{
			    		return cjScale = "--";
			    	};	        
			    },
			    set: function(value){
			    	cjScale = value;
			    }
			});

			Object.defineProperty(this,"qySum",{ //签约金额不可更改
			    value : "-- ",
			    writable: false
			});

			Object.defineProperty(this,"qySut",{ //签约套数不可更改
			    value : "-- ",
			    writable: false
			});

			Object.defineProperty(this,"tdSum",{ //退定金额不可更改
			    value : "-- ",
			    writable: false
			});

			Object.defineProperty(this,"tdSut",{ //退定套数暂不可更改
			    value : "-- ",
			    writable: false
			});

			Object.defineProperty(this,"tfSum",{ //退房金额暂不可更改
			    value : "-- ",
			    writable: false
			});

			Object.defineProperty(this,"tfSut",{ //退房套数暂不可更改
			    value : "-- ",
			    writable: false
			});

			this.config = {
				AddAgency: document.querySelector("#AddAgency"),
				StepProperty: document.querySelector("#StepProperty"),
				ReportCustomer: document.querySelector("#ReportCustomer"),
				CustomerLook: document.querySelector("#CustomerLook"),
				lfScale: document.querySelector("#lfScale"),
				TotalSales: document.querySelector("#TotalSales"),
				TotalHouse: document.querySelector("#TotalHouse"),
				qySum: document.querySelector("#qySum"),
				qySut: document.querySelector("#qySut"),
				cjScale: document.querySelector("#cjScale"),
				AgencyPayMoney: document.querySelector("#AgencyPayMoney"),
				AgencyPay: document.querySelector("#AgencyPay"),
				tdSum: document.querySelector("#tdSum"),
				tdSut: document.querySelector("#tdSut"),
				tfSum: document.querySelector("#tfSum"),
				tfSut: document.querySelector("#tfSut")
			};

			this.bindDom = function() {
				this.bindDom_init();
			};
			this.getSaleid = function(window){
				this.getSaleid_init(window);
			};
			this.getData = function(propertyID,countType,saleUserID){
				this.getData_init(propertyID,countType,saleUserID);
			};
		},
		bindDom_init: function(){ //绑定DOM
			this.config.AddAgency.innerHTML = this.AddAgency;
			this.config.StepProperty.innerHTML = this.StepProperty;
			this.config.ReportCustomer.innerHTML = this.ReportCustomer;
			this.config.CustomerLook.innerHTML = this.CustomerLook;
			this.config.lfScale.innerHTML = this.lfScale;
			this.config.TotalSales.innerHTML = this.TotalSales;
			this.config.TotalHouse.innerHTML = this.TotalHouse;
			this.config.qySum.innerHTML = this.qySum;
			this.config.qySut.innerHTML = this.qySut;
			this.config.cjScale.innerHTML = this.cjScale;
			this.config.AgencyPayMoney.innerHTML = this.AgencyPayMoney;
			this.config.AgencyPay.innerHTML = this.AgencyPay;
			this.config.tdSum.innerHTML = this.tdSum;
			this.config.tdSut.innerHTML = this.tdSut;
			this.config.tfSum.innerHTML = this.tfSum;
			this.config.tfSut.innerHTML = this.tfSut;
		},
		getSaleid_init: function(window){ //获取saleid
			var url = window.location.href;
			if (url.indexOf("placeuserid") != -1) 
			{
				var placeuserid = window.location.search;
				placeuserid = placeuserid.split("=")[1];
				$my.placeuserid = placeuserid;			
			} else
			{
				$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			};
		},
		getData_init: function(propertyId,countType,placeUserID){
			if (propertyId != null && propertyId != "null") {
				$.ajax({
				    url: getRoothPath+'/placeusercontroller/placeApp.json',
				    data: { 
				    	"propertyId": propertyId,
				    	"countType":countType,
				    	"placeUserID":placeUserID
				    },
				    // async: false, //同步
				    success:function(data){
				    	if (JSON.stringify(data) !== "{}") 
				    	{
				    		console.log(data);
				    		var arr = data.resultList;
				    		if (arr.length) 
				    		{
				    			var json = arr[0];
				    			reportDetail.AddAgency = json.AddAgency; //新增渠道
				    			reportDetail.StepProperty = json.StepProperty; //新增踩盘
				    			reportDetail.ReportCustomer = json.ReportCustomer; //报备
				    			reportDetail.CustomerLook = json.CustomerLook; //来访
				    			reportDetail.TotalSales = (json.TotalSales/10000).toFixed(4); //大定金额
				    			reportDetail.TotalHouse = json.TotalHouse; //大定套数
				    			reportDetail.AgencyPayMoney = (json.AgencyPayMoney/10000).toFixed(4); //渠道发佣金额
				    			reportDetail.AgencyPay = json.AgencyPay; //渠道发佣套数
				    			
				    			reportDetail.bindDom();
				    		} else{
				    			$my.messageInfo.html("数据为空").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				    			return;
				    		};
				    	} else
				    	{
				    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				    		return;
				    	};
				    }
				})	
			}else{
				$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			}
		},
		throttle:function(method,context){ //节流函数
        	clearTimeout(method.tId);
        	method.tId=setTimeout(function(){
            	method.call(context);
        	},500);
    	},
    	buffer:function(){
    		var index = this.dataset["index"];
    		if (index === "0" || index === "6") {
    			$my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
    			return false;
    		} else{
    			reportDetail.getData($my.propertyid,index,$my.placeuserid); 
    		}
    	}
	}

	ReportDetail.fn.init.prototype = ReportDetail.fn;

	return ReportDetail;
})();

var reportDetail = ReportDetail();

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

	reportDetail.getSaleid(window); //获取saleid

	reportDetail.getData($my.propertyid,1,$my.placeuserid); //获取默认数据

	// 时间维度点击事件
	var countType = document.querySelector("#countType");
	var countTypeList = countType.querySelectorAll("li");
	Array.prototype.forEach.call(countTypeList,function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).addClass('optionListActive').siblings('li').removeClass('optionListActive');

			reportDetail.throttle(reportDetail.buffer, this);
		}, false);
	});
});