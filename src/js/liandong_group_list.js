function Bar(){
	this.categories = [];
	this.data_dk = [];
	this.data_cj = [];
	this.eleid = "";
}

Bar.prototype = {
	constructor: Bar,
	barChart: function(){
		Highcharts.chart(this.eleid, {
		    chart: {
		        type: 'bar',
		        backgroundColor: '#49484e',  //设置背景颜色  
		        marginTop:35
		    },
		    title: {
		        text: null
		    },
		    subtitle: {
		        text: null
		    },
		    credits: {
		        enabled:false //隐藏右下角信息
		    },
		    exporting: {
		    	enabled:false //去掉右上角信息
		    },
		    xAxis: {
		    	tickWidth: 0,
		    	gridLineWidth:0,
		    	lineColor:"#49484e", //基线颜色
		        categories: this.categories,
		        title: {
		            text: null
		        },
		        labels: {
	                style: {
	                    color: '#A4A4A7',//颜色
	                    fontSize:'12px',  //字体
	                    fontWeight: "normal"
	                }
	            }
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: '',
		            align: 'high'
		        },
		        labels: {
		            enabled: false
		        },
		        gridLineWidth:0
		    },
		    tooltip: {
		        enabled : false,
		        backgroundColor: '#FCFFC5',   // 背景颜色
				borderColor: 'black',         // 边框颜色
				borderRadius: 10,             // 边框圆角
				borderWidth: 3,               // 边框宽度
				shadow: true,                 // 是否显示阴影
				animation: true,              // 是否启用动画效果
		        // 文字内容相关样式
		        style: { 
	                color: "#666",
	                fontSize: "12px",
	                fontWeight: "normal",
	                fontFamily: "Courir new"
	            }
		    },
		    plotOptions: {
		        bar: {
		            dataLabels: {
		                enabled: true,
		                style:{
		                	color:"#3BAFC1",
		                	fontWeight:"normal"
		                }
		            }
		        },
		        series:{
		        	borderWidth:0,
		        	pointWidth: 6,//条形图高度设置（粗细）
		        	borderRadius: 4,
		        	//相应柱状图点击事件
		        	// events:{
		        	// 	click:function(event){
		        	// 		var xInfo = event.point.category;
		        	// 	}
		        	// }
		        }
		    },
		    legend: {
		        enabled : true,
                align: 'top',
                verticalAlign: 'top',
                y: 0,
                padding: 0,
                margin: 100,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                floating: true,
                symbolWidth: 20,
                itemStyle:{ "color": "#fff", "cursor": "pointer", "fontSize": "14px", "fontWeight": "normal" }
		    },
		    credits: {
		        enabled: false
		    },
		    series: [{
		        name: '带看',
		        color:"#3BAFC1",
		        data: this.data_dk
		    },{
		        name: '成交',
		        color:"#fff",
		        data: this.data_cj
		    }]
		});

		var outline = $("tspan.highcharts-text-outline");
		outline.css({"fill":"none","stroke":"rgb(53,52,59)"});
	}
}

var dkcjBar = new Bar(); //实例化bar1

function Saleuser(){
	this.addAgencySum = ""; //新增渠道总数
	this.stepPropertySum = ""; //新增踩盘总数
	this.reportCustomerSum =""; //报备总数
	this.customerLookSum = ""; //来访总数
	this.totalHouseSum = ""; //成交总套数
	this.totalSalesSum = ""; //成交总金额
	this.agencyPaySum = ""; //渠道发佣总套数
	this.agencyPayMoneySum = ""; //渠道发佣总金额
	this.tdHouseSum = "--"; //退定总套数
	this.tdHouseMoneySum = "--"; //退定总金额
	this.tfHouseSum = "--"; //退房总套数
	this.tfHouseMoneySum = "--"; //退房总金额
	this.lfScale = ""; //来访比
	this.cjScale = ""; //成交比

	Object.defineProperty(this,"tdHouseSum",{ //退定总套数暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"tdHouseMoneySum",{ //退定总金额暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"tfHouseSum",{ //退房总套数暂不可更改
		value: "-- ",
		writable: false
	});

	Object.defineProperty(this,"tfHouseMoneySum",{ //退房总金额暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"lfScale",{ //来访比
	    get: function(){
	    	var reg = /^[0-9]*$/;
	    	if (reg.test(this.reportCustomerSum) 
	    		&& reg.test(this.customerLookSum)
	    		&& this.reportCustomerSum != ""
	    		&& this.customerLookSum != ""
	    		&& this.customerLookSum !== "0") 
	    	{
	    		return lfScale = (this.reportCustomerSum / this.customerLookSum).toFixed(2) + ":1";
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
	    	if (reg.test(this.customerLookSum) 
	    		&& reg.test(this.totalHouseSum)
	    		&& this.customerLookSum != ""
	    		&& this.totalHouseSum != ""
	    		&& this.totalHouseSum !== "0") 
	    	{
	    		return cjScale = (this.customerLookSum / this.totalHouseSum).toFixed(2) + ":1";
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
		addAgencySum: document.querySelector("#addAgencySum"),
		stepPropertySum: document.querySelector("#stepPropertySum"),
		reportCustomerSum: document.querySelector("#reportCustomerSum"),
		customerLookSum: document.querySelector("#customerLookSum"),
		totalHouseSum: document.querySelector("#totalHouseSum"),
		totalSalesSum: document.querySelector("#totalSalesSum"),
		agencyPaySum: document.querySelector("#agencyPaySum"),
		agencyPayMoneySum: document.querySelector("#agencyPayMoneySum"),
		tdHouseSum: document.querySelector("#tdHouseSum"),
		tdHouseMoneySum: document.querySelector("#tdHouseMoneySum"),
		tfHouseSum: document.querySelector("#tfHouseSum"),
		tfHouseMoneySum: document.querySelector("#tfHouseMoneySum"),
		lfScale: document.querySelector("#lfScale"),
		cjScale: document.querySelector("#cjScale")
	}
}

Saleuser.prototype = {
	constructor: Saleuser,
	throttle:function(method,context){ //节流函数
        clearTimeout(method.tId);
        method.tId=setTimeout(function(){
            method.call(context);
        },500);
    },
	rederSaleuser: function(data){ //组别渲染
		// var saleuserList_all = document.querySelector("#saleuserList_all");
		var str = "";
		var PlaceUserLeaderList = data.PlaceUserLeaderList; //组ID
		var PlaceUserLeaderNameList = data.PlaceUserLeaderNameList; //组名

		if (PlaceUserLeaderList === "" || PlaceUserLeaderNameList === "") 
		{
			$my.messageInfo.html("暂无组别").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		} else
		{
			PlaceUserLeaderList = PlaceUserLeaderList.split(",");
			PlaceUserLeaderNameList = PlaceUserLeaderNameList.split(",");

			str += '<li id="saleuserList_all" class="text-center activeSelect" data-info="all">全部</li>';
			for (var i = 0; i < PlaceUserLeaderList.length; i++) {
				str += '<li class="text-center" data-info='+PlaceUserLeaderList[i]+'>'+PlaceUserLeaderNameList[i]+'组</li>';
			};
			// sessionStorage.setItem("salesUserLeaderList",str);
			// saleuserList_all.insertAdjacentHTML('afterEnd', str);
			$my.saleuserList.innerHTML = str;
		};
	},
	getSaleUserList: function(propertyID,timeselete){ //获取联动组别
		if (propertyID != null && propertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/placeusercontroller/placeUserListApp.json',
			    data: { 
			    	"propertyId": propertyID,
			    	"timeselete":timeselete
			    },
			    async: false, //同步
			    success:function(data){
			    	sessionStorage.setItem("liandongSaleUserList",JSON.stringify(data));
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		saleuser.rederSaleuser(data);
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return;
			    	};
			    }
			})
		}else
		{
			$my.messageInfo.html("楼盘参数丢失").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		}
	},
	bindDom: function(){ //绑定DOM
		this.config.addAgencySum.innerHTML = this.addAgencySum;
		this.config.stepPropertySum.innerHTML = this.stepPropertySum;
		this.config.reportCustomerSum.innerHTML = this.reportCustomerSum;
		this.config.customerLookSum.innerHTML = this.customerLookSum;
		this.config.totalHouseSum.innerHTML = this.totalHouseSum;
		this.config.totalSalesSum.innerHTML = this.totalSalesSum;
		this.config.agencyPaySum.innerHTML = this.agencyPaySum;
		this.config.agencyPayMoneySum.innerHTML = this.agencyPayMoneySum;
		this.config.tdHouseSum.innerHTML = this.tdHouseSum;
		this.config.tdHouseMoneySum.innerHTML = this.tdHouseMoneySum;
		this.config.tfHouseSum.innerHTML = this.tfHouseSum;
		this.config.tfHouseMoneySum.innerHTML = this.tfHouseMoneySum;
		this.config.lfScale.innerHTML = this.lfScale;
		this.config.cjScale.innerHTML = this.cjScale;
	},
	renderBar: function(salesUserNameArr,dkArr,cjArr){ //条形图
		var dkcjContainer = document.getElementById("dkcjContainer");

		dkcjBar.categories = salesUserNameArr;
		dkcjBar.data_dk = dkArr;
		dkcjBar.data_cj = cjArr;
		dkcjBar.eleid = "dkcjContainer";
		dkcjContainer.style.height = 80 * dkcjBar.categories.length +"px";

		dkcjBar.barChart();
	},
	renderData: function(data){ //渲染DOM
		var str = "";
		var tbody = document.querySelector("#tbody");
		var saleuserNameArr = [];
		var dkArr = [];
		var cjArr = [];

		if (data.length) 
		{
			for (var i = 0; i < data.length; i++) {
				
				if (data[i].placeName) {
					str += "<tr data-placeUserID="+data[i].placeUserID+">";
					str += "<td>"+data[i].placeName+"</td>";
					str += "<td>"+data[i].ReportCustomer+"</td>";
					str += "<td>"+data[i].CustomerLook+"</td>";
					str += "<td>"+data[i].TotalHouse+"</td>";
					str += "<td>"+(data[i].TotalSales/10000).toFixed(0)+"</td>";
					str += "<td>"+data[i].AgencyPay+"</td>";
					str += "<td>"+(data[i].AgencyPayMoney/10000).toFixed(0)+"</td>";
					str += "<td>"+data[i].AddAgency+"</td>";
					str += "<td>"+data[i].StepProperty+"</td>";
					str += "<td>--</td>";
					str += "<td>--</td>";
					str += "</tr>";

					saleuserNameArr.push(data[i].placeName);
					dkArr.push(data[i].CustomerLook);
					cjArr.push(data[i].TotalHouse);

				}else{
					str += "<tr data-PlaceUserLeaderID="+data[i].PlaceUserLeaderID+">";
					str += "<td>"+data[i].PlaceUserLeaderName+"组</td>";
					str += "<td>"+data[i].ReportCustomer+"</td>";
					str += "<td>"+data[i].CustomerLook+"</td>";
					str += "<td>"+data[i].TotalHouse+"</td>";
					str += "<td>"+(data[i].TotalSales/10000).toFixed(0)+"</td>";
					str += "<td>"+data[i].AgencyPay+"</td>";
					str += "<td>"+(data[i].AgencyPayMoney/10000).toFixed(0)+"</td>";
					str += "<td>"+data[i].AddAgency+"</td>";
					str += "<td>"+data[i].StepProperty+"</td>";
					str += "<td>--</td>";
					str += "<td>--</td>";
					str += "</tr>";

					saleuserNameArr.push(data[i].PlaceUserLeaderName+"组");
					dkArr.push(data[i].CustomerLook);
					cjArr.push(data[i].TotalHouse);
				}										
			};

			tbody.innerHTML = str;
			saleuser.renderBar(saleuserNameArr,dkArr,cjArr);

			// 释放内存
			str = null;
			saleuserNameArr = null;
			dkArr = null;
			cjArr = null;
		} else
		{
			$my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
	},
	getData: function(propertyId,countType,PlaceUserLeader,urlStr){
		if (propertyId != null && propertyId != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/placeusercontroller/'+urlStr+'.json',
			    data: { 
			    	"propertyId": propertyId,
			    	"timeselete":countType,
			    	"PlaceUserLeader":PlaceUserLeader
			    },
			    // async: false, //同步
			    success:function(data){
			    	sessionStorage.setItem("liandongGroupData",JSON.stringify(data));
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		console.log(data);		    		
			    		saleuser.addAgencySum = data.addAgencySum; 
			    		saleuser.stepPropertySum = data.stepPropertySum;
			    		saleuser.reportCustomerSum =data.reportCustomerSum; 
			    		saleuser.customerLookSum = data.customerLookSum; 
			    		saleuser.totalHouseSum = data.totalHouseSum; 
			    		saleuser.totalSalesSum = (data.totalSalesSum/10000).toFixed(0); 
			    		saleuser.agencyPaySum = data.agencyPaySum; 
			    		saleuser.agencyPayMoneySum = (data.agencyPayMoneySum/10000).toFixed(0);

			    		saleuser.bindDom();
			    		saleuser.renderData(data.resultList);
			    	} else
			    	{
			    		$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			    		return;
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
		var index = $my.countType.querySelector(".optionListActive").dataset["index"]; //时间维度值
		sessionStorage.setItem("globaltimeSelect",JSON.stringify(index)); //时间维度值存入sessionStorage

		if (index === "0" || index === "5") 
		{
			$my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		} else
		{
			var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"]; //组id
			sessionStorage.setItem("saleuserListID_ld_Active",JSON.stringify(info)); //组ID存入sessionStorage

			if(info === "all"){
				saleuser.getData($my.propertyid,index,"","placeLeaderListApp"); //组别“全部”数据加载
			}else{
				saleuser.getData($my.propertyid,index,info,"placeListApp"); //组员业绩加载
			}
		};	
	},
	bindmoduleEvents: function(){ //模块点击
		var index = $(this).index();
		var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"]; //组id
		
		if (info === "all") {
			switch(index){
				case 0:
					window.location.href = "newChannel_list.html";
					break;
				case 1:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					// window.location.href = "newIncreased_list.html";
					break;
				case 2:
					window.location.href = "report_list.html";
					break;
				case 3:
					window.location.href = "visit_ld_list.html";
					break;
				case 4:
					window.location.href = "chengjiao_ld_list.html";
					break;
				case 5:
					window.location.href = "commission_list.html";
					break;
				case 6:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 7:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
			};
		} else{
			sessionStorage.removeItem("globalPeopleID");
			switch(index){
				case 0:
					window.location.href = "newChannel_groupMember_list.html?PlaceUserLeader="+info;
					break;
				case 1:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					// window.location.href = "newIncreased_list.html";
					break;
				case 2:
					window.location.href = "report_groupMember_list.html?PlaceUserLeader="+info;
					break;
				case 3:
					window.location.href = "visit_groupMember_ld_list.html?PlaceUserLeader="+info;
					break;
				case 4:
					window.location.href = "chengjiao_groupMember_ld_list.html?PlaceUserLeader="+info;
					break;
				case 5:
					window.location.href = "commission_groupMember_list.html?PlaceUserLeader="+info;
					break;
				case 6:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 7:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
			};
		};
	},
	bindtableEvents: function(){ //表格点击
		var index = $(this).index(); //td下标
		var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"];
		var PlaceUserLeader = this.parentNode.dataset["placeuserleaderid"]; //组id
		var placeuserid = this.parentNode.dataset["placeuserid"]; //组员id

		if (info === "all") {
			switch(index){
				case 0:
					var allLi = $my.saleuserList.querySelectorAll("li[data-info]");
					Array.prototype.forEach.call(allLi,function(item){

						if (item.dataset["info"] === PlaceUserLeader) {
							$(item).trigger('click');
						};
					});
					break;
				case 1:
					window.location.href = "report_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 2:
					window.location.href = "visit_ld_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 3:
					window.location.href = "chengjiao_ld_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 4:
					window.location.href = "chengjiao_ld_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 5:
					window.location.href = "commission_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 6:
					window.location.href = "commission_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 7:
					window.location.href = "newChannel_list.html?PlaceUserLeader="+PlaceUserLeader;
					break;
				case 8:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 9:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 10:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				default:
					break;
			}	
		} else{
			sessionStorage.removeItem("globalPeopleID");
			switch(index){
				case 0:
					window.location.href = "liandong_groupMembers_detail.html?placeuserid="+placeuserid;
					break;
				case 1:
					window.location.href = "report_groupMember_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 2:
					window.location.href = "visit_groupMember_ld_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 3:
					window.location.href = "chengjiao_groupMember_ld_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 4:
					window.location.href = "chengjiao_groupMember_ld_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 5:
					window.location.href = "commission_groupMember_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 6:
					window.location.href = "commission_groupMember_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 7:
					window.location.href = "newChannel_groupMember_list.html?PlaceUserLeader="+info+"&placeuserid="+placeuserid;
					break;
				case 8:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 9:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				case 10:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					break;
				default:
					break;
			}
		};
	}
}

var saleuser = new Saleuser()

$(function() {
	window.$my={
		messageInfo: $(".messageInfo"),
		propertyid: sessionStorage.getItem("propertyID"),
		countType: document.querySelector("#countType"),
		saleuserList: document.querySelector("#saleuserList")
	}

	//设置全局ajax
	$.ajaxSetup({
	    type : 'POST',
	    dataType : 'json',
	    error: function(){
	        $my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow");
	    }
	});

	//获取所有组别
	var liandongSaleUserList = sessionStorage.getItem("liandongSaleUserList");
	var saleuserListID_ld_Active = sessionStorage.getItem("saleuserListID_ld_Active");	
	if (liandongSaleUserList != null && liandongSaleUserList != "null") {
		if (liandongSaleUserList !== "{}") 
		{		
			liandongSaleUserList = JSON.parse(liandongSaleUserList);
			saleuser.rederSaleuser(liandongSaleUserList);

			if (saleuserListID_ld_Active != null && saleuserListID_ld_Active != "null" && saleuserListID_ld_Active !=="{}") {
				saleuserListID_ld_Active = JSON.parse(saleuserListID_ld_Active);

				var saleuserAll = $my.saleuserList.querySelectorAll("li[data-info]");
				saleuserAll = Array.prototype.slice.call(saleuserAll);

				for (var i = 0; i < saleuserAll.length; i++) {
					if (saleuserAll[i].dataset["info"] === saleuserListID_ld_Active) {
						$(saleuserAll[i]).addClass('activeSelect').siblings("li").removeClass('activeSelect');
					};
				};
			};
		} else
		{
			$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		};
	} else{
		saleuser.getSaleUserList($my.propertyid,6);
	};	

	//默认数据加载
	var liandongGroupData = sessionStorage.getItem("liandongGroupData");
	var ldGroupActive = sessionStorage.getItem("globaltimeSelect");
	if (liandongGroupData != null && liandongGroupData != "null") {
		if (liandongGroupData !== "{}") 
		{
			if (ldGroupActive != null && ldGroupActive != "null" && ldGroupActive !=="{}") {
				ldGroupActive = JSON.parse(ldGroupActive);
				var countTypeList = $my.countType.querySelectorAll("li[data-index]");
				countTypeList = Array.prototype.slice.call(countTypeList);

				for (var i = 0; i < countTypeList.length; i++) {
					if (countTypeList[i].dataset["index"] == ldGroupActive) {
						$(countTypeList[i]).addClass('optionListActive').siblings("li").removeClass('optionListActive');

						var item_offset_left = $(countTypeList[i]).offset().left;
						var saleuserListID_offset_left = $($my.countType).offset().left;

						$($my.countType).stop().animate({
							scrollLeft: item_offset_left - saleuserListID_offset_left - 8
						}, 500);//500ms滑动到指定位置
					};
				};
				saleuser.buffer();
			}else{
				liandongGroupData = JSON.parse(liandongGroupData);
				saleuser.addAgencySum = liandongGroupData.addAgencySum; 
				saleuser.stepPropertySum = liandongGroupData.stepPropertySum;
				saleuser.reportCustomerSum =liandongGroupData.reportCustomerSum; 
				saleuser.customerLookSum = liandongGroupData.customerLookSum; 
				saleuser.totalHouseSum = liandongGroupData.totalHouseSum; 
				saleuser.totalSalesSum = (liandongGroupData.totalSalesSum/10000).toFixed(0); 
				saleuser.agencyPaySum = liandongGroupData.agencyPaySum; 
				saleuser.agencyPayMoneySum = (liandongGroupData.agencyPayMoneySum/10000).toFixed(0);
				saleuser.bindDom();
				saleuser.renderData(liandongGroupData.resultList);
			};			
		} else
		{
			$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
		};
	} else{
		if (ldGroupActive != null && ldGroupActive != "null" && ldGroupActive !=="{}") {
			ldGroupActive = JSON.parse(ldGroupActive);
			var countTypeList = $my.countType.querySelectorAll("li[data-index]");
			countTypeList = Array.prototype.slice.call(countTypeList);

			for (var i = 0; i < countTypeList.length; i++) {
				if (countTypeList[i].dataset["index"] == ldGroupActive) {
					$(countTypeList[i]).addClass('optionListActive').siblings("li").removeClass('optionListActive');

					var item_offset_left = $(countTypeList[i]).offset().left;
					var saleuserListID_offset_left = $($my.countType).offset().left;

					$($my.countType).stop().animate({
						scrollLeft: item_offset_left - saleuserListID_offset_left - 8
					}, 500);//500ms滑动到指定位置
				};
			};
			saleuser.buffer();
		}else{
			saleuser.getData($my.propertyid,1,'','placeLeaderListApp');
		};
	};	


	//时间维度点击事件
	var countTypeList = $my.countType.querySelectorAll("li[data-index]");
	Array.prototype.forEach.call(countTypeList,function(item){
		item.addEventListener("click",function(event){
			event.preventDefault();
			event.stopPropagation();

			item.classList.add("optionListActive");
			// 兄弟节点
			var siblings = Array.prototype.filter.call(item.parentNode.children, function(child){
				return child !== item;
			});
			for (var i = 0; i < siblings.length; i++) {
				siblings[i].classList.remove("optionListActive");
			};

			saleuser.throttle(saleuser.buffer, this);
		},false)
	});

	// 组别点击
	$($my.saleuserList).on('click', 'li', function(event) {
		event.preventDefault();
		event.stopPropagation();

		$(this).addClass('activeSelect').siblings("li").removeClass('activeSelect');
		saleuser.throttle(saleuser.buffer, this);
	});

	// 各模块点击事件
	var moduleList = $(".module ul li");
	moduleList.on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();

		saleuser.throttle(saleuser.bindmoduleEvents, this);	
	});

	//表格点击
	var $hk_table = $(".hk_table");
	$hk_table.on('click', '.table>tbody>tr>td', function(event) {
		event.preventDefault();
		event.stopPropagation();

		saleuser.throttle(saleuser.bindtableEvents, this);	
	});

	//工具提示
	// $('[data-toggle="tooltip"]').tooltip();
});