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
	this.placeReserveSum = ""; //预约总数
	this.dkSum = ""; //带看总数
	this.totalSaleSum =""; //成交总金额
	this.totalHouseSum = ""; //成交总套数
	this.paymentBackSum = ""; //回款金额总数
	this.paymentHouseSum = "--"; //回款总套数
	this.breakHouseMoneySum = ""; //退定总金额
	this.breakHouseSum = ""; //退定总套数
	this.tfHouseSum = "--"; //退房总套数
	this.tfHouseMoneySum = "--"; //退房总金额
	this.lfScale = ""; //来访比
	this.cjScale = ""; //成交比

	Object.defineProperty(this,"paymentHouseSum",{ //回款总套数暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"tfHouseSum",{ //退房总套数暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"tfHouseMoneySum",{ //退房总金额暂不可更改
	    value : "-- ",
	    writable: false
	});

	Object.defineProperty(this,"lfScale",{ //来访比
	    get: function(){
	    	var reg = /^[0-9]*$/;
	    	if (reg.test(this.placeReserveSum) 
	    		&& reg.test(this.dkSum)
	    		&& this.placeReserveSum != ""
	    		&& this.dkSum != ""
	    		&& this.dkSum !== "0") 
	    	{
	    		return lfScale = (this.placeReserveSum / this.dkSum).toFixed(2) + ":1";
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
	    	if (reg.test(this.dkSum) 
	    		&& reg.test(this.totalHouseSum)
	    		&& this.dkSum != ""
	    		&& this.totalHouseSum != ""
	    		&& this.totalHouseSum !== "0") 
	    	{
	    		return cjScale = (this.dkSum / this.totalHouseSum).toFixed(2) + ":1";
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
		placeReserveSum: document.querySelector("#placeReserveSum"),
		dkSum: document.querySelector("#dkSum"),
		totalSaleSum: document.querySelector("#totalSaleSum"),
		totalHouseSum: document.querySelector("#totalHouseSum"),
		paymentBackSum: document.querySelector("#paymentBackSum"),
		paymentHouseSum: document.querySelector("#paymentHouseSum"),
		breakHouseMoneySum: document.querySelector("#breakHouseMoneySum"),
		breakHouseSum: document.querySelector("#breakHouseSum"),
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
		var salesUserLeaderList = data.SalesUserLeaderList; //组ID
		var salesUserLeaderNameList = data.SalesUserLeaderNameList; //组名

		if (salesUserLeaderList === "" || salesUserLeaderNameList === "") 
		{
			$my.messageInfo.html("暂无组别").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		} else
		{
			salesUserLeaderList = salesUserLeaderList.split(",");
			salesUserLeaderNameList = salesUserLeaderNameList.split(",");

			str += '<li id="saleuserList_all" class="text-center activeSelect" data-info="all">全部</li>';
			for (var i = 0; i < salesUserLeaderList.length; i++) {				
				str += '<li class="text-center" data-info='+salesUserLeaderList[i]+'>'+salesUserLeaderNameList[i]+'组</li>';
			};
			// sessionStorage.setItem("salesUserLeaderList",str);
			// saleuserList_all.insertAdjacentHTML('afterEnd', str);
			$my.saleuserList.innerHTML = str;
		};
	},
	getSaleUserList: function(propertyID,timeselete){ //获取案场组别
		if (propertyID != null && propertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/saleusercontroller/saleUserListApp.json',
			    data: { 
			    	"propertyID": propertyID,
			    	"timeselete":timeselete
			    },
			    async: false, //同步
			    success:function(data){
			    	sessionStorage.setItem("anchangSaleUserList",JSON.stringify(data));
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
		this.config.placeReserveSum.innerHTML = this.placeReserveSum;
		this.config.dkSum.innerHTML = this.dkSum;
		this.config.totalSaleSum.innerHTML = this.totalSaleSum;
		this.config.totalHouseSum.innerHTML = this.totalHouseSum;
		this.config.paymentBackSum.innerHTML = this.paymentBackSum;
		this.config.paymentHouseSum.innerHTML = this.paymentHouseSum;
		this.config.breakHouseMoneySum.innerHTML = this.breakHouseMoneySum;
		this.config.breakHouseSum.innerHTML = this.breakHouseSum;
		this.config.tfHouseSum.innerHTML = this.tfHouseSum;
		this.config.tfHouseMoneySum.innerHTML = this.tfHouseMoneySum;
		this.config.lfScale.innerHTML = this.lfScale;
		this.config.cjScale.innerHTML = this.cjScale;
	},
	renderData: function(data){ //渲染DOM
		var str = "";
		var reg = /^[0-9]*$/;
		var lfScale = "";
		var cjScale = "";
		var tbody = document.querySelector("#tbody");
		var saleuserNameArr = [];
		var dkArr = [];
		var cjArr = [];

		if (data.length) 
		{
			for (var i = 0; i < data.length; i++) {

				if (reg.test(data[i].PlaceReserve) // 来访比
					&& reg.test(data[i].LookCustomer)
					&& data[i].PlaceReserve != ""
					&& data[i].LookCustomer != ""
					&& data[i].LookCustomer !== "0") 
				{
					lfScale = (data[i].PlaceReserve / data[i].LookCustomer).toFixed(2) + ":1";
				} else
				{
					lfScale = "--";
				};

				if (reg.test(data[i].LookCustomer) // 成交比
					&& reg.test(data[i].TotalHouse)
					&& data[i].LookCustomer != ""
					&& data[i].TotalHouse != ""
					&& data[i].TotalHouse !== "0") 
				{
					cjScale = (data[i].LookCustomer / data[i].TotalHouse).toFixed(2) + ":1";
				} else
				{

					cjScale = "--";
				};

				if (data[i].saleName) {
					str += "<tr data-saleid="+data[i].saleID+">";
					str += "<td>"+data[i].saleName+"</td>";
					str += "<td>"+data[i].PlaceReserve+"</td>";
					str += "<td>"+data[i].LookCustomer+"</td>";
					str += "<td>"+lfScale+"</td>";
					str += "<td>"+data[i].TotalHouse+"</td>";
					str += "<td>"+cjScale+"</td>";
					str += "<td>"+(data[i].TotalSale/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].ReservatMoney/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].PaymentBack/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].BreakHouseMoney/10000).toFixed(0)+"</td>";
					str += "<td>--</td>";
					str += "</tr>";

					saleuserNameArr.push(data[i].saleName);
					dkArr.push(data[i].LookCustomer);
					cjArr.push(data[i].TotalHouse);
				} else{
					str += "<tr data-salesuserleaderid="+data[i].SalesUserLeaderid+">";
					str += "<td>"+data[i].SalesUserLeaderName+"组</td>";
					str += "<td>"+data[i].PlaceReserve+"</td>";
					str += "<td>"+data[i].LookCustomer+"</td>";
					str += "<td>"+lfScale+"</td>";
					str += "<td>"+data[i].TotalHouse+"</td>";
					str += "<td>"+cjScale+"</td>";
					str += "<td>"+(data[i].TotalSale/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].ReservatMoney/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].PaymentBack/10000).toFixed(0)+"</td>";
					str += "<td>"+(data[i].BreakHouseMoney/10000).toFixed(0)+"</td>";
					str += "<td>--</td>";
					str += "</tr>";

					saleuserNameArr.push(data[i].SalesUserLeaderName+"组");
					dkArr.push(data[i].LookCustomer);
					cjArr.push(data[i].TotalHouse);
				};						
			};

			tbody.innerHTML = str;
			saleuser.renderBar(saleuserNameArr,dkArr,cjArr);

			// 释放内存
			str = null;
			lfScale = null;
			cjScale = null;
			saleuserNameArr = null;
			dkArr = null;
			cjArr = null;
		} else
		{
			$my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");
			return false;
		};
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
	getData: function(propertyID,countType,saleuserList,urlStr){
		if (propertyID != null && propertyID != "null") 
		{
			$.ajax({
			    url: getRoothPath+'/saleusercontroller/'+urlStr+'.json',
			    data: { 
			    	"propertyID": propertyID,
			    	"timeselete":countType,
			    	"SalesUserLeader":saleuserList
			    },
			    // async: false, //同步
			    success:function(data){
			    	sessionStorage.setItem("anchangGroupData",JSON.stringify(data));
			    	if (JSON.stringify(data) !== "{}") 
			    	{
			    		console.log(data);
			    		saleuser.placeReserveSum = data.placeReserveSum;
			    		saleuser.dkSum = data.dkSum; 
			    		saleuser.totalSaleSum = (data.totalSaleSum / 10000).toFixed(0); 
			    		saleuser.totalHouseSum = data.totalHouseSum; 
			    		saleuser.paymentBackSum = (data.paymentBackSum/ 10000).toFixed(0); 
			    		// saleuser.paymentHouseSum = "--"; 
			    		saleuser.breakHouseMoneySum = (data.breakHouseMoneySum / 10000).toFixed(0);
			    		saleuser.breakHouseSum = data.breakHouseSum;
			    		// saleuser.tfHouseSum = "--";
			    		// saleuser.tfHouseMoneySum = "--";
			    		saleuser.bindDom();
			    		// if (saleuserList) 
			    		// {	
			    		// 	saleuser.renderGmData(data.resultList);
			    		// } else
			    		// {
			    		// 	saleuser.renderAllData(data.resultList);
			    		// };
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
		var index = $my.countType.querySelector(".optionListActive").dataset["index"];
		sessionStorage.setItem("globaltimeSelect",JSON.stringify(index)); //时间维度值存入sessionStorage

		if (index === "0" || index === "5") 
		{
			$my.messageInfo.html("今日/自定暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
			return;
		} else
		{
			var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"];
			sessionStorage.setItem("saleuserListIDActive",JSON.stringify(info)); //组ID存入sessionStorage
			if(info === "all"){
				saleuser.getData($my.propertyid,index,"","saleLeaderListApp"); //组别“全部”数据加载
			}else{
				saleuser.getData($my.propertyid,index,info,"saleListApp"); //组员业绩加载
			}
		};	
	},
	bindmoduleEvents: function(){ //模块点击
		var index = $(this).index();
		var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"];
		
		if (info === "all") {
			switch(index){
				case 0:
					window.location.href = "yuyue_list.html";
					break;
				case 1:
					window.location.href = "visit_list.html";
					break;
				case 2:
					window.location.href = "chengjiao_list.html";
					break;
				case 3:
					window.location.href = "huiKuan_list.html";
					break;
				case 4:
					window.location.href = "tuiDing_list.html";
					break;
				case 5:
					window.location.href = "tuiFang_list.html";
					break;
				default:
					break;
			};
		} else{
			switch(index){
				case 0:
					window.location.href = "yuyue_groupMember_list.html?SalesUserLeader="+info;
					break;
				case 1:
					window.location.href = "visit_groupMember_list.html?SalesUserLeader="+info;
					break;
				case 2:
					window.location.href = "chengjiao_groupMember_list.html?SalesUserLeader="+info;
					break;
				case 3:
					window.location.href = "huiKuan_groupMember_list.html?SalesUserLeader="+info;
					break;
				case 4:
					window.location.href = "tuiDing_groupMember_list.html?SalesUserLeader="+info;
					break;
				case 5:
					$my.messageInfo.html("暂停查询").fadeIn("fast").delay("1000").fadeOut("slow");
					// window.location.href = "tuiFang_groupMember_list.html?SalesUserLeader="+info;
					break;
				default:
					break;
			};
		};
	},
	bindtableEvents: function(){ //表格点击
		var index = $(this).index();
		var info = $my.saleuserList.querySelector(".activeSelect").dataset["info"];
		var salesuserleaderid = this.parentNode.dataset["salesuserleaderid"]; //组id
		var saleid = this.parentNode.dataset["saleid"]; //组员id

		if (info === "all") {
			switch(index){
				case 0:
					var allLi = $my.saleuserList.querySelectorAll("li[data-info]");
					Array.prototype.forEach.call(allLi,function(item){

						if (item.dataset["info"] === salesuserleaderid) {
							$(item).trigger('click');
						};
					});
					break;
				case 1:
					window.location.href = "yuyue_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 2:
					window.location.href = "visit_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 3:
					break;
				case 4:
					window.location.href = "chengjiao_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 5:
					break;
				case 6:
					window.location.href = "chengjiao_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 7:
					window.location.href = "sign_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 8:
					window.location.href = "huiKuan_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 9:
					window.location.href = "tuiDing_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				case 10:
					window.location.href = "tuiFang_list.html?salesuserleaderid="+salesuserleaderid;
					break;
				default:
					break;
			}
		} else{
			sessionStorage.removeItem("globalPeopleID");
			switch(index){
				case 0:
					window.location.href = "anchang_groupMembers_detail.html?saleid="+saleid;
					break;
				case 1:
					window.location.href = "yuyue_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 2:
					window.location.href = "visit_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 3:
					break;
				case 4:
					window.location.href = "chengjiao_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 5:
					break;
				case 6:
					window.location.href = "chengjiao_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 7:
					window.location.href = "sign_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 8:
					window.location.href = "huiKuan_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
					break;
				case 9:
					window.location.href = "tuiDing_groupMember_list.html?SalesUserLeader="+info+"&saleid="+saleid;
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
	var anchangSaleUserList = sessionStorage.getItem("anchangSaleUserList");
	var saleuserListIDActive = sessionStorage.getItem("saleuserListIDActive");	
	if (anchangSaleUserList != null && anchangSaleUserList != "null") {
		if (anchangSaleUserList !== "{}") 
		{		
			anchangSaleUserList = JSON.parse(anchangSaleUserList);
			saleuser.rederSaleuser(anchangSaleUserList);

			if (saleuserListIDActive != null && saleuserListIDActive != "null" && saleuserListIDActive !=="{}") {
				saleuserListIDActive = JSON.parse(saleuserListIDActive);

				var saleuserAll = $my.saleuserList.querySelectorAll("li[data-info]");
				saleuserAll = Array.prototype.slice.call(saleuserAll);

				for (var i = 0; i < saleuserAll.length; i++) {
					if (saleuserAll[i].dataset["info"] === saleuserListIDActive) {
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
	var anchangGroupData = sessionStorage.getItem("anchangGroupData");
	var acGroupActive = sessionStorage.getItem("globaltimeSelect");
	if (anchangGroupData != null && anchangGroupData != "null") {
		if (anchangGroupData !== "{}") 
		{
			if (acGroupActive != null && acGroupActive != "null" && acGroupActive !=="{}") {
				acGroupActive = JSON.parse(acGroupActive);
				var countTypeList = $my.countType.querySelectorAll("li[data-index]");
				countTypeList = Array.prototype.slice.call(countTypeList);
				
				for (var i = 0; i < countTypeList.length; i++) {
					if (countTypeList[i].dataset["index"] == acGroupActive) {
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
				anchangGroupData = JSON.parse(anchangGroupData);
				saleuser.placeReserveSum = anchangGroupData.placeReserveSum;
				saleuser.dkSum = anchangGroupData.dkSum; 
				saleuser.totalSaleSum = (anchangGroupData.totalSaleSum / 10000).toFixed(0); 
				saleuser.totalHouseSum = anchangGroupData.totalHouseSum; 
				saleuser.paymentBackSum = (anchangGroupData.paymentBackSum/ 10000).toFixed(0); 
				saleuser.breakHouseMoneySum = (anchangGroupData.breakHouseMoneySum / 10000).toFixed(0);
				saleuser.breakHouseSum = anchangGroupData.breakHouseSum;
				saleuser.bindDom();
				saleuser.renderData(anchangGroupData.resultList);
			};
		} else
		{
			$my.messageInfo.html("暂无数据").stop().fadeIn("fast").delay("1000").fadeOut("slow");
		};
	} else{
		if (acGroupActive != null && acGroupActive != "null" && acGroupActive !=="{}") {
			acGroupActive = JSON.parse(acGroupActive);
			var countTypeList = $my.countType.querySelectorAll("li[data-index]");
			countTypeList = Array.prototype.slice.call(countTypeList);
			
			for (var i = 0; i < countTypeList.length; i++) {
				if (countTypeList[i].dataset["index"] == acGroupActive) {
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
			saleuser.getData($my.propertyid,1,'','saleLeaderListApp');
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