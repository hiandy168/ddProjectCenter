function Addperformance(){
	this.reserveSaleTotal = ""; //大定金额
	this.reserveHouse = ""; //大定套数
	this.saleHouseTotal = ""; //签约金额
	this.SaleHouse = ""; //签约套数
	this.paymentHouseTotal = ""; //回款金额
	this.paymentHouse = "--"; //回款套数
	this.commissionTotal = ""; //发佣金额
	this.commissionHouse = ""; //发佣套数
	this.backReserveMoney = ""; //退定金额
	this.backReserveHouse = ""; //退定套数
	this.backMoney = ""; //退房金额
	this.backHouse = ""; //退房套数
	this.reportCustomer = ""; //报备数
	this.lfScale = "--"; //来访比
	this.lfSut = ""; //来访套数
	this.addAgency = ""; //新增渠道
	this.newIncreased = "--"; //新增踩盘

	this.customerLook = ""; //自访数
	this.agencyCustomerLook = ""; //渠道来访数

	this.totalSum = ""; //总金额
	this.totalSut = ""; //总套数

    Object.defineProperty(this,"paymentHouse",{ //回款套数暂不可更改
        value : "-- ",
        writable: false
    });

    Object.defineProperty(this,"newIncreased",{ //新增踩盘暂不可更改
        value : "-- ",
        writable: false
    });

    Object.defineProperty(this,"lfScale",{ //来访比
        get: function(){
        	var lfSum = this.customerLook + this.agencyCustomerLook; //来访数=自访数+渠道来访数
        	var reg = /^[0-9]*$/;
            if (reg.test(this.reportCustomer) 
            	&& reg.test(lfSum) 
            	&& lfSum !== "0" 
            	&& lfSum != ""
            	&& this.reportCustomer != "") 
            {
            	return lfScale = (this.reportCustomer / lfSum).toFixed(2) + ":1";
            } else
            {
            	return lfScale = "--";
            };
        },
        set: function(value){
        	lfScale = value;
        }
    });

	this.config = {
		reserveSaleTotal: document.querySelector("#reserveSaleTotal"),  
		reserveHouse: document.querySelector("#reserveHouse"),  
		saleHouseTotal: document.querySelector("#saleHouseTotal"),  
		SaleHouse: document.querySelector("#SaleHouse"),  
		paymentHouseTotal: document.querySelector("#paymentHouseTotal"),  
		paymentHouse: document.querySelector("#paymentHouse"),  
		commissionTotal: document.querySelector("#commissionTotal"),  
		commissionHouse: document.querySelector("#commissionHouse"),  
		backReserveMoney: document.querySelector("#backReserveMoney"),  
		backReserveHouse: document.querySelector("#backReserveHouse"),  
		backMoney: document.querySelector("#backMoney"),  
		backHouse: document.querySelector("#backHouse"),  
		reportCustomer: document.querySelector("#reportCustomer"),  
		lfScale: document.querySelector("#lfScale"),  
		lfSut: document.querySelector("#lfSut"),  
		addAgency: document.querySelector("#addAgency"),  
		newIncreased: document.querySelector("#newIncreased"),
		totalSum: document.querySelector("#totalSum"),
		totalSut: document.querySelector("#totalSut") 
	}  
}

Addperformance.prototype = {
	constructor: Addperformance,
	throttle:function(method,context){ //节流函数
        clearTimeout(method.tId);
        method.tId=setTimeout(function(){
            method.call(context);
        },500);
    },
    nullData:function(){
    	addperformance.reserveSaleTotal = "";
    	addperformance.reserveHouse = "";
    	addperformance.saleHouseTotal = "";
    	addperformance.SaleHouse = "";
    	addperformance.paymentHouseTotal = "";
    	// addperformance.paymentHouse = json.PaymentHouse;
    	addperformance.commissionTotal = "";
    	addperformance.commissionHouse = "";
    	addperformance.backReserveMoney = "";
    	addperformance.backReserveHouse = "";
    	addperformance.backMoney = "";
    	addperformance.backHouse = "";
    	addperformance.reportCustomer = "";
    	// addperformance.lfScale = json.lfScale;
    	// addperformance.lfSut = json.lfSut;
    	addperformance.addAgency = "";
    	addperformance.newIncreased = "";
    	addperformance.customerLook = "";
    	addperformance.agencyCustomerLook = "";
    },
	totalPerfor: function(){
		this.config.totalSum.innerHTML = this.totalSum,
		this.config.totalSut.innerHTML = this.totalSut
	},
	bindDom: function(){
		this.config.reserveSaleTotal.innerHTML = this.reserveSaleTotal;
		this.config.reserveHouse.innerHTML = this.reserveHouse;
		this.config.saleHouseTotal.innerHTML = this.saleHouseTotal;
		this.config.SaleHouse.innerHTML = this.SaleHouse;
		this.config.paymentHouseTotal.innerHTML = this.paymentHouseTotal;
		this.config.paymentHouse.innerHTML = this.paymentHouse;
		this.config.commissionTotal.innerHTML = this.commissionTotal;
		this.config.commissionHouse.innerHTML = this.commissionHouse;
		this.config.backReserveMoney.innerHTML = this.backReserveMoney;
		this.config.backMoney.innerHTML = this.backMoney;
		this.config.backHouse.innerHTML = this.backHouse;
		this.config.reportCustomer.innerHTML = this.reportCustomer;
		this.config.lfScale.innerHTML = this.lfScale;
		this.config.lfSut.innerHTML = this.lfSut;
		this.config.addAgency.innerHTML = this.addAgency;
		this.config.newIncreased.innerHTML = this.newIncreased;	
	},
	getData: function(PropertyID,timeselete,firsttime,endtime,total){
		if (PropertyID != null && PropertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/overview/addperformanceApp.json',
			    data: { 
			    	"PropertyID": PropertyID,
			    	"timeselete":timeselete,
			    	"firsttime":firsttime,
			    	"endtime":endtime
			    },
			    // async: false, //同步
			    success:function(data){

			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		var len = data.Addperformance;
			    		console.log(data)
			    		
			    		if (len.length !== 0) 
			    		{
			    			var json = data.Addperformance[0];

			    			if (typeof total === "undefined") 
			    			{
			    				addperformance.reserveSaleTotal = (json.ReserveSaleTotal / 10000).toFixed(4);
			    				addperformance.reserveHouse = json.ReserveHouse;
			    				addperformance.saleHouseTotal = (json.SaleHouseTotal / 10000).toFixed(4);
			    				addperformance.SaleHouse = json.SaleHouse;
			    				addperformance.paymentHouseTotal = (json.PaymentHouseTotal / 10000).toFixed(4);
			    				// addperformance.paymentHouse = json.PaymentHouse;
			    				addperformance.commissionTotal = (json.CommissionTotal / 10000).toFixed(4);
			    				addperformance.commissionHouse = json.CommissionHouse;
			    				addperformance.backReserveMoney = (json.BackReserveMoney / 10000).toFixed(4);
			    				addperformance.backReserveHouse = json.BackReserveHouse;
			    				addperformance.backMoney = (json.BackMoney / 10000).toFixed(4);
			    				addperformance.backHouse = json.BackHouse;
			    				addperformance.reportCustomer = json.ReportCustomer;
			    				// addperformance.lfScale = json.lfScale;
			    				addperformance.lfSut = json.CustomerLook + json.AgencyCustomerLook;
			    				addperformance.addAgency = json.AddAgency;
			    				addperformance.newIncreased = json.newIncreased;

			    				addperformance.customerLook = json.CustomerLook;
			    				addperformance.agencyCustomerLook = json.AgencyCustomerLook;

			    				addperformance.bindDom(); //调用bindDom方法
			    			} else
			    			{
			    				addperformance.totalSum = parseFloat(json.ReserveSaleTotal.toFixed(0)).toLocaleString();
			    				addperformance.totalSut = json.ReserveHouse;
			    				addperformance.totalPerfor(); //调用totalPerfor方法
			    			};
			    		} else
			    		{
			    			addperformance.nullData();
			    			addperformance.bindDom(); //调用bindDom方法
			    			addperformance.totalPerfor(); //调用totalPerfor方法

			    			$my.messageInfo.html("数据为空").fadeIn("fast").delay("1000").fadeOut("slow");
			    			return false;
			    		};
			    	} else
			    	{
			    		addperformance.nullData();
			    		addperformance.bindDom(); //调用bindDom方法
			    		addperformance.totalPerfor(); //调用totalPerfor方法

			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return;
			    	};
			    }
			})
		} else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	sdtSub:function(){ //自定时间提交事件
		var dataScreenFirsttime = document.querySelector("#dataScreenFirsttime");
		var dataScreenEndtime = document.querySelector("#dataScreenEndtime");

		var datePreVal = dataScreenFirsttime.value;
		var dateLastVal = dataScreenEndtime.value;

		datePreVal = datePreVal.split("/").join("");
		dateLastVal = dateLastVal.split("/").join("");

		if (datePreVal == "" && dateLastVal == "") {
		    $my.messageInfo.html("日期选择不能为空").fadeIn("fast").delay("1000").fadeOut("slow");
		    return false;

		} else if (datePreVal == "") {
		    $my.messageInfo.html("开始日期不能为空").fadeIn("fast").delay("1000").fadeOut("slow");
		    return false;

		} else if (dateLastVal == "") {
		    $my.messageInfo.html("结束日期不能为空").fadeIn("fast").delay("1000").fadeOut("slow");
		    return false;

		} else if (dateLastVal < datePreVal) {
		    $my.messageInfo.html("结束日期不能小于开始日期").fadeIn("fast").delay("1000").fadeOut("slow");
		    return false;
		} else {
			addperformance.getData($my.propertyid,5,datePreVal,dateLastVal);
			$("#myModal").modal('hide');
		}
	},
	buffer: function(){
		var index = $my.timeList.querySelector(".optionListActive").dataset["index"]; //获取时间索引值
		sessionStorage.setItem("globaltimeSelect",JSON.stringify(index)); //时间维度值存入session

		if (index !== "0" && index !== "5") 
		{
			addperformance.getData($my.propertyid,index,1,1);
		} else if(index === "0" && index !== "5")
		{
			$my.messageInfo.html("今日暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		}else if(index === "5" && index !== "0"){
			var confirmBtnID = document.getElementById("confirmBtnID");

			$("#myModal").modal('show');
			//自定时间选择控件
			var now = new Date(),
				min = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()),
			    max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate()),
			    dataInput = $('.data');
			   
			dataInput.mobiscroll().date({
			    theme: 'ios',
			    lang: 'zh',
			    display: 'bottom',
			    min: min,
			    max: max
			});

			confirmBtnID.addEventListener("touchend", function(event){
				event.preventDefault();
				event.stopPropagation();

				addperformance.throttle(addperformance.sdtSub, this);
			}, false);
		};
	},
	baobeiSearch: function(){ //报备查询
		var searchBox = document.querySelector("#searchBox");
		var lastNum = searchBox.value;
		var reg = /^[0-9]{4}$/;

		if(reg.test(lastNum) == true){
		    window.location.href = "report_search_list.html?lastName="+lastNum;
		}else{
		    $my.messageInfo.html("号码为四位非负整数").fadeIn("fast").delay("1000").fadeOut("slow");
		    return;
		};
	}
}

var addperformance = new Addperformance();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		timeList: document.getElementById("timeList"),
		propertyid: sessionStorage.getItem("propertyID"),
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	addperformance.getData($my.propertyid,6,1,1,1); //总业绩数据加载

	//默认数据加载
	var currentTimeVal = sessionStorage.getItem("globaltimeSelect");
	if (currentTimeVal != null && currentTimeVal != "null") {
		currentTimeVal = JSON.parse(currentTimeVal);
		var countTypeList = $my.timeList.querySelectorAll("li[data-index]");
		countTypeList = Array.prototype.slice.call(countTypeList);

		for (var i = 0; i < countTypeList.length; i++) {
			if (countTypeList[i].dataset["index"] === currentTimeVal) {
				$(countTypeList[i]).addClass('optionListActive').siblings("li").removeClass('optionListActive');

				var item_offset_left = $(countTypeList[i]).offset().left;
				var saleuserListID_offset_left = $($my.timeList).offset().left;

				$($my.timeList).stop().animate({
					scrollLeft: item_offset_left - saleuserListID_offset_left - 8
				}, 500);//500ms滑动到指定位置
			};
		};
		addperformance.buffer(); 
	} else{
		addperformance.getData($my.propertyid,1,1,1); 
	};

	//时间选择点击事件
	var in_timeList = timeList.querySelectorAll("li");
	Array.prototype.forEach.call(in_timeList, function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).addClass('optionListActive').siblings('li').removeClass('optionListActive');
			
			addperformance.throttle(addperformance.buffer, this);			
		}, false);
	});

	//bindEvents
	var indexWrap = document.querySelector(".indexWrap");
	var rowList = indexWrap.querySelectorAll(".row");

	Array.prototype.forEach.call(rowList,function(item,index){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();
			
			switch(index){
				case 0:
					window.location.href = "chengjiao_list.html";
					break;
				case 1:
					window.location.href = "sign_list.html";
					break;
				case 2:
					window.location.href = "huiKuan_list.html";
					break;
				case 3:
					window.location.href = "commission_list.html";
					break;
				case 4:
					window.location.href = "tuiDing_list.html";
					break;
				case 5:
					window.location.href = "tuiFang_list.html";
					break;
				case 6:
					window.location.href = "report_list.html";
					break;
				case 7:
					window.location.href = "visit_list.html";
					break;
				case 8:
					window.location.href = "newChannel_list.html";
					break;
				case 9:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				default:
					break;
			}
		}, false);
	});

	//报备查询确定事件
	var baobeiConfirmID = document.querySelector("#baobeiConfirmID");
	baobeiConfirmID.addEventListener("touchend", function(event){
		event.preventDefault();
		event.stopPropagation();

		addperformance.throttle(addperformance.baobeiSearch, this);
	}, false);

	//案场组点击事件
	var anchang_group = $("#anchang_group")
	anchang_group.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		window.location.href = "anchang_group_list.html";
	});

	// 联动组点击事件
	var liandong_group = $("#liandong_group");
	liandong_group.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		window.location.href = "liandong_group_list.html";
	});
	
});