function NewChannel(){
	this.placeUserName = ""; //联动渠道专员
	this.agencyName = ""; //渠道公司名
	this.memberCount = "人"; //人数
	this.linkName = ""; //老板名
	this.telephone = ""; //电话
	this.propertyJoin = ""; //合作时间
	this.cpNum = ""; //踩盘人数
	this.customerReport = ""; //报备数
	this.lookCustomer = ""; //来访数
	this.lfScale = ""; //来访比
	this.saleHouseCount = ""; //成交数
	this.cjScale = ""; //成交比
	this.saleHouseAmount = ""; //销售业绩
	this.shouldCommission = ""; //应发佣金
	this.commission = ""; //已发佣金

	Object.defineProperty(this,"cpNum",{ //踩盘人数暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"lfScale",{ //来访比
	    get: function(){
	    	var reg = /^[0-9]*$/;
	        if (reg.test(this.customerReport) 
	        	&& reg.test(this.lookCustomer) 
	        	&& this.lookCustomer !== "0" 
	        	&& this.lookCustomer != ""
	        	&& this.customerReport != "") 
	        {
	        	return lfScale = (this.customerReport / this.lookCustomer).toFixed(2) + ":1";
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
	        if (reg.test(this.lookCustomer) 
	        	&& reg.test(this.saleHouseCount) 
	        	&& this.saleHouseCount !== "0" 
	        	&& this.saleHouseCount != ""
	        	&& this.lookCustomer != "") 
	        {
	        	return cjScale = (this.lookCustomer / this.saleHouseCount).toFixed(2) + ":1";
	        } else
	        {
	        	return cjScale = "--";
	        };
	    },
	    set: function(value){
	    	cjScale = value;
	    }
	});

	this.config = {
		placeUserName: document.querySelector("#placeUserName"),
		agencyName: document.querySelector("#agencyName"),
		memberCount: document.querySelector("#memberCount"),
		linkName: document.querySelector("#linkName"),
		telephone: document.querySelector("#telephone"),
		propertyJoin: document.querySelector("#propertyJoin"),
		cpNum: document.querySelector("#cpNum"),
		customerReport: document.querySelector("#customerReport"),
		lookCustomer: document.querySelector("#lookCustomer"),
		lfScale: document.querySelector("#lfScale"),
		saleHouseCount: document.querySelector("#saleHouseCount"),
		cjScale: document.querySelector("#cjScale"),
		saleHouseAmount: document.querySelector("#saleHouseAmount"),		
		shouldCommission: document.querySelector("#shouldCommission"),
		commission: document.querySelector("#commission")
	};
}

NewChannel.prototype = {
	constructor: NewChannel,
	throttle: function(method, context) { //点击节流
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
		}, 200);
	},
	getAgencyID: function(){
		var url = window.location.href;

		if (url.indexOf("agencyid") !== -1) 
		{
			var agencyID = window.location.search;
			agencyID = agencyID.split("=")[1];
			$my.agencyID = agencyID;
		} else
		{
			$my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	bindDom: function(){
		this.config.placeUserName.innerHTML = this.placeUserName;
		this.config.agencyName.innerHTML = this.agencyName;
		this.config.memberCount.innerHTML = this.memberCount;
		this.config.linkName.innerHTML = this.linkName;
		this.config.telephone.innerHTML = this.telephone;
		this.config.propertyJoin.innerHTML = this.propertyJoin;
		this.config.cpNum.innerHTML = this.cpNum;
		this.config.customerReport.innerHTML = this.customerReport;
		this.config.lookCustomer.innerHTML = this.lookCustomer;
		this.config.lfScale.innerHTML = this.lfScale;
		this.config.saleHouseCount.innerHTML = this.saleHouseCount;
		this.config.cjScale.innerHTML = this.cjScale;
		this.config.saleHouseAmount.innerHTML = this.saleHouseAmount;
		this.config.shouldCommission.innerHTML = this.shouldCommission;
		this.config.commission.innerHTML = this.commission;
	},
	getData: function(propertyId,agencyID,countType){
		if (propertyId != null && propertyId != "null")
		{
			$.ajax({
			    url: getRoothPath+'/agencycompanycontroller/agencyPerformanceApp.json',
			    data: { 
			        "propertyId": propertyId, //楼盘ID
			        "agencyID": agencyID,//排序参数
			        "countType": countType//排序方式 asc升序 desc倒序
			    },
			    success:function(data){
			        if (JSON.stringify(data) !== "{}") 
			        {
			        	var json = data.data;
			        	if (JSON.stringify(json) !== "{}") 
			        	{
			        		newChannel.placeUserName = json.PlaceUserName;
			        		newChannel.agencyName = json.AgencyName;
			        		newChannel.memberCount = json.MemberCount+"人";
			        		newChannel.linkName = json.LinkName;
			        		newChannel.telephone = json.Telephone;
			        		newChannel.propertyJoin = json.PropertyJoin;
			        		// newChannel.cpNum = json.cpNum;
			        		newChannel.customerReport = json.CustomerReport; 
			        		newChannel.lookCustomer = json.LookCustomer; 
			        		// newChannel.lfScale = json.PlaceUserName; 
			        		newChannel.saleHouseCount = json.SaleHouseCount; 
			        		// newChannel.cjScale = json.PlaceUserName; 
			        		newChannel.saleHouseAmount = (json.SaleHouseAmount/10000).toFixed(4); 
			        		newChannel.shouldCommission = (json.ShouldCommission/10000).toFixed(4); 
			        		newChannel.commission = (json.Commission/10000).toFixed(4); 

			        		newChannel.bindDom();
			        	} else
			        	{
			        		$my.messageInfo.html("信息为空").fadeIn("fast").delay("1000").fadeOut("slow");
			        		return false;
			        	};
			        } else
			        {
			        	$my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");
			        	return false;
			        };
			    }
			})
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}		
	},
	buffer: function(){
		var index = this.dataset["index"];

		if (index === "0" || index === "6") {
			$my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		} else{
			newChannel.getData($my.propertyid,$my.agencyID,index);
		};
	}
}

var newChannel = new NewChannel();

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID")
	}

	newChannel.getAgencyID();

	newChannel.getData($my.propertyid,$my.agencyID,1); //默认数据加载

	// 时间维度点击事件
	var countType = document.querySelector("#countType");
	var countTypeList = countType.querySelectorAll("li");
	[].forEach.call(countTypeList,function(item){
		item.addEventListener("click", function(event){
			event.preventDefault();
			event.stopPropagation();

			item.classList.add("optionListActive");

			//兄弟节点
			var siblings = Array.prototype.filter.call(item.parentNode.children, function(child){
			  return child !== item;
			});
			for (var i = 0; i < siblings.length; i++) {
				siblings[i].classList.remove("optionListActive");
			};

			newChannel.throttle(newChannel.buffer, this);
		}, false);
	});

	// //自定时间选择控件
	// var now = new Date(),
	// 	min = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate()),
	//     max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate()),
	//     dataInput = $('.data');

	// dataInput.mobiscroll().date({
	//     theme: 'ios',
	//     lang: 'zh',
	//     display: 'bottom',
	//     min: min,
	//     max: max
	// });
});