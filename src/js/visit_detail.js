var ReportDetail = (function(window) {
	var ReportDetail = function() {
		return new ReportDetail.fn.init();
	}

	ReportDetail.fn = ReportDetail.prototype = {
		constructor: ReportDetail,
		init: function() {
			this.customerName = ""; //客户姓名
			this.customerTel = ""; //客户电话
			this.lookTime = ""; //	来访时间
			this.paleceName = ""; //联动姓名
			this.agencyName = ""; //公司名
			this.memberName = ""; //经纪人姓名
			this.memberTel = ""; //经济人电话
			this.saleName = ""; //案场名
			this.tooltip = ""; //bootstrap工具提示
			this.loglist = []; //来访信息
			this.khyx = ""; //客户意向

			Object.defineProperty(this,"purchaseWay",{ //购房方式暂不可更改
			    value : "-- ",
			    writable: false
			});

			this.config = {
				customerName: document.querySelector("#customerName"),
				customerTel: document.querySelector("#customerTel"),
				lookTime: document.querySelector("#lookTime"),
				paleceName: document.querySelector("#paleceName"),
				agencyName: document.querySelector("#agencyName"),
				memberName: document.querySelector("#memberName"),
				memberTel: document.querySelector("#memberTel"),
				saleName: document.querySelector("#saleName"),
				tooltip: document.querySelector("#tooltip")
			};

			this.bindDom = function() {
				this.bindDom_init();
			};
			this.getDetailed = function(window){
				this.getDetailed_init(window);
			};
			this.getData = function(id,propertyID){
				this.getData_init(id,propertyID);
			};
			this.renderlogList = function(){
				this.renderlogList_init();
			}
		},
		bindDom_init: function(){ //绑定DOM
			this.config.customerName.innerHTML = this.customerName;
			this.config.customerTel.innerHTML = this.customerTel;
			this.config.lookTime.innerHTML = this.lookTime;
			this.config.paleceName.innerHTML = this.paleceName;
			this.config.agencyName.innerHTML = this.agencyName;
			this.config.memberName.innerHTML = this.memberName;
			this.config.memberTel.innerHTML = this.memberTel;
			this.config.saleName.innerHTML = this.saleName;
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
		getData_init: function(id,propertyID){
			if (id != null && id != "null") {
				$.ajax({
				    url: getRoothPath+'/overview/lookDetailedApp.json',
				    data: { 
				    	"id": id,
				    	"propertyID": propertyID
				    },
				    // async: false, //同步
				    success:function(data){
				    	if (JSON.stringify(data) !== "{}") 
				    	{
				    		console.log(data)
				    		reportDetail.loglist = data.loglist;
				    		var json = data.data;
				    		if (JSON.stringify(json) !== "{}") 
				    		{
				    			reportDetail.customerName = json.customerName; 
				    			reportDetail.customerTel = json.customerTel; 
				    			reportDetail.lookTime = (json.lookTime).substr(5); 
				    			reportDetail.paleceName = json.paleceName; 
				    			reportDetail.agencyName = json.agencyName; 
				    			reportDetail.memberName = json.memberName; 
				    			reportDetail.memberTel = json.memberTel; 
				    			reportDetail.saleName = json.saleName; 
				    			reportDetail.tooltip = json.customerName+json.customerTel; 				    			
				    			reportDetail.khyx = json.houseName.toString().trim();

				    			reportDetail.bindDom();
				    		} else
				    		{
				    			$my.messageInfo.html("数据为空").stop().fadeIn("fast").delay("1000").fadeOut("slow");
				    			return;
				    		};
				    		reportDetail.renderlogList();
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
		renderlogList_init: function(){
			if (this.loglist) {
				var str = "";
				var appendWrap = document.querySelector(".append");

				for (var i = this.loglist.length-1; i >= 0; i--) {
					var n = this.loglist[i].times;
					var lfnum = "";

					switch(n){
						case 1:
							lfnum = "一访";
							break;
						case 2:
							lfnum = "二访";
							break;
						case 3:
							lfnum = "三访";
							break;
						case 4:
							lfnum = "四访";
							break;
						case 5:
							lfnum = "五访";
							break;
						case 6:
							lfnum = "六访";
							break;
						case 7:
							lfnum = "七访";
							break;
						case 8:
							lfnum = "八访";
							break;
						case 9:
							lfnum = "九访";
							break;
						case 10:
							lfnum = "十访";
							break;
						default:
							lfnum = "超过十访...";
							break;
					}

					str += '<div class="main no_line special_main"><div class="row in_title">';
					str += '<div class="col-sm-4 col-xs-4 col-md-4">'+lfnum+'</div>';
					str += '<div class="col-sm-8 col-xs-8 col-md-8 text-right colorGreen">客户意向:<span>'+this.khyx+'</span></div>';
					str += '</div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">来访时间</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].lfTime+'</span>';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">客户一</div><div class="col-sm-8 col-xs-8 col-md-8 nowrap">';
					str += '<span>'+this.loglist[i].cusName+'</span>&nbsp;&nbsp;<span></span>';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">来访人数</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].number+'</span>人';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">落座</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].isSeat+'</span>';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">落位</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].houseNameArr+'</span>';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">价格预算</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].givenPrice+'</span>元';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">下次来访</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].nextTime+'</span>';
					str += '</div></div><div class="row"><div class="col-sm-4 col-xs-4 col-md-4">备注</div><div class="col-sm-8 col-xs-8 col-md-8">';
					str += '<span>'+this.loglist[i].remark+'</span>';
					str += '</div></div></div>';
				};

				appendWrap.innerHTML = str;
			} else{
				$my.messageInfo.html("暂无来访信息").fadeIn("fast").delay("1000").fadeOut("slow");
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
		messageInfo: $(".messageInfo"),
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

	reportDetail.getDetailed(window); //获取saleid

	reportDetail.getData($my.detailed,$my.propertyid); //获取默认数据
});