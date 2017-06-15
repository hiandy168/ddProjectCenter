var ReportDetail = (function(window) {
	var ReportDetail = function() {
		return new ReportDetail.fn.init();
	}

	ReportDetail.fn = ReportDetail.prototype = {
		constructor: ReportDetail,
		init: function() {
			this.PlaceReserve = ""; //预约数
			this.LookCustomer = ""; //带看数
			this.TotalSale = ""; //大定金额
			this.TotalHouse = ""; //大定套数
			this.ReservatMoney = ""; //签约金额
			this.ReservatHouse = ""; //签约套数
			this.cjScale = ""; //成交比
			this.PaymentBack = ""; //回款金额
			this.PaymentHouse = ""; //回款套数
			this.BreakHouseMoney = ""; //退定金额
			this.BreakHouse = ""; //退定套数
			this.tfSum = ""; //退房金额
			this.tfSut = ""; //退房套数

			Object.defineProperty(this,"cjScale",{ //成交比
			    get: function(){
			    	var reg = /^[0-9]*$/;
			    	if (reg.test(this.LookCustomer) 
			    		&& reg.test(this.TotalHouse)
			    		&& this.LookCustomer != ""
			    		&& this.TotalHouse != ""
			    		&& this.TotalHouse !== 0) 
			    	{
			    		return cjScale = (this.LookCustomer / this.TotalHouse).toFixed(2) + ":1";
			    	} else
			    	{
			    		return cjScale = "--";
			    	};	        
			    },
			    set: function(value){
			    	cjScale = value;
			    }
			});

			Object.defineProperty(this,"PaymentHouse",{ //回款套数暂不可更改
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
				PlaceReserve: document.querySelector("#PlaceReserve"),
				LookCustomer: document.querySelector("#LookCustomer"),
				TotalSale: document.querySelector("#TotalSale"),
				TotalHouse: document.querySelector("#TotalHouse"),
				ReservatMoney: document.querySelector("#ReservatMoney"),
				ReservatHouse: document.querySelector("#ReservatHouse"),
				cjScale: document.querySelector("#cjScale"),
				PaymentBack: document.querySelector("#PaymentBack"),
				PaymentHouse: document.querySelector("#PaymentHouse"),
				BreakHouseMoney: document.querySelector("#BreakHouseMoney"),
				BreakHouse: document.querySelector("#BreakHouse"),
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
			this.config.PlaceReserve.innerHTML = this.PlaceReserve;
			this.config.LookCustomer.innerHTML = this.LookCustomer;
			this.config.TotalSale.innerHTML = this.TotalSale;
			this.config.TotalHouse.innerHTML = this.TotalHouse;
			this.config.ReservatMoney.innerHTML = this.ReservatMoney;
			this.config.ReservatHouse.innerHTML = this.ReservatHouse;
			this.config.cjScale.innerHTML = this.cjScale;
			this.config.PaymentBack.innerHTML = this.PaymentBack;
			this.config.PaymentHouse.innerHTML = this.PaymentHouse;
			this.config.BreakHouseMoney.innerHTML = this.BreakHouseMoney;
			this.config.BreakHouse.innerHTML = this.BreakHouse;
			this.config.tfSum.innerHTML = this.tfSum;
			this.config.tfSut.innerHTML = this.tfSut;
		},
		getSaleid_init: function(window){ //获取saleid
			var url = window.location.href;
			if (url.indexOf("saleid") != -1) 
			{
				var saleid = window.location.search;
				saleid = saleid.split("=")[1];
				$my.saleid = saleid;			
			} else
			{
				$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
				return false;
			};
		},
		getData_init: function(propertyID,countType,saleUserID){
			if (propertyID != null && propertyID != "null") {
				$.ajax({
				    url: getRoothPath+'/saleusercontroller/saleApp.json',
				    data: { 
				    	"propertyID": propertyID,
				    	"countType":countType,
				    	"saleUserID":saleUserID
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
				    			reportDetail.PlaceReserve = json.PlaceReserve;
				    			reportDetail.LookCustomer = json.LookCustomer; 
				    			reportDetail.TotalSale = (json.TotalSale/10000).toFixed(4);
				    			reportDetail.TotalHouse = json.TotalHouse;
				    			reportDetail.ReservatMoney = (json.ReservatMoney/10000).toFixed(4);
				    			reportDetail.ReservatHouse = json.ReservatHouse;
				    			// reportDetail.cjScale = json.cjScale; 
				    			reportDetail.PaymentBack = (json.PaymentBack/10000).toFixed(4);
				    			// reportDetail.PaymentHouse = json.PaymentHouse;
				    			reportDetail.BreakHouseMoney = (json.BreakHouseMoney/10000).toFixed(4);
				    			reportDetail.BreakHouse = json.BreakHouse;
				    			// reportDetail.tfSum = json.tfSum;
				    			// reportDetail.tfSut = json.tfSut;
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
    			reportDetail.getData($my.propertyid,index,$my.saleid); 
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

	reportDetail.getData($my.propertyid,1,$my.saleid); //获取默认数据

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