function encode(e){return e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/([\\\.\*\[\]\(\)\$\^])/g,"\\$1")}function decode(e){return e.replace(/\\([\\\.\*\[\]\(\)\$\^])/g,"$1").replace(/>/g,">").replace(/</g,"<").replace(/&/g,"&")}function highlight(e){if(0==e.length)return!1;e=encode(e);var n=document.getElementById("qdCompanyList"),t=n.innerHTML.replace(/<span\s+class=.?highlight.?>([^<>]*)<\/span>/gi,"$1");n.innerHTML=t;loopSearch(e,n);t=n.innerHTML;t=t.replace(/{searchHL}(({(?!\/searchHL})|[^{])*){\/searchHL}/g,"<span class='highlight'}>$1</span>"),n.innerHTML=t}function loopSearch(e,n){var t=0;if(3==n.nodeType)return t=replace(e,n);for(var a,r=0;a=n.childNodes[r];r++)a.className&&"highlight"==a.className||(t+=loopSearch(e,a));return t}function replace(e,n){var t=new RegExp(e,"g"),a=null,r=n.nodeValue,o=0;return(a=r.match(t))&&(o=a.length,r=r.replace(t,"{searchHL}"+decode(e)+"{/searchHL}"),n.nodeValue=r),o}function SearchList(){}SearchList.prototype={renderEle:function(e){for(var n="",t=0;t<e.length;t++)n+="<li class='list-group-item' data-id="+e[t].ID+">"+e[t].AgencyName+"</li>";$my.qdCompanyList.innerHTML=n,$my.searchBtnHidden.trigger("click")},throttle:function(e,n,t){var a=null,r=new Date;return function(){var o=this,c=arguments,i=new Date;clearTimeout(a),i-r>=t?(e.apply(o,c),r=i):a=setTimeout(function(){e.apply(o,c)},n)}},bindEvent:function(){var e=this.value,n=document.querySelector(".noCompany");if(null==$my.propertyid||"null"==$my.propertyid)return $my.messageInfo.html("楼盘参数丢失").stop().fadeIn("fast").delay("1000").fadeOut("slow"),!1;$.ajax({url:getRoothPath+"/agencycompanycontroller/getAgencyName.json",data:{agencyName:e,propertyID:$my.propertyid},success:function(e){if("{}"!=JSON.stringify(e)){var t=e.data;0!=t.length?(n.style.display="none",searchList.renderEle(t)):($my.qdCompanyList.innerHTML="",n.style.display="block")}else n.style.display="block"}})},inputClear:function(){document.querySelector(".cancelFont").addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),s.value=""},!1)},cancelEvent:function(){document.querySelector("#cancelBtn").addEventListener("touchend",function(e){e.preventDefault(),e.stopPropagation(),window.history.go(-1)},!1)},agencyCompany:function(){$($my.qdCompanyList).on("click","li",function(e){e.preventDefault(),e.stopPropagation();var n=this.dataset.id;window.location.href="newChannel_detail.html?agencyid="+n})}};var searchList=new SearchList;$(function(){var e=document.querySelector("#s");window.$my={messageInfo:$(".messageInfo"),qdCompanyList:document.querySelector("#qdCompanyList"),searchBtnHidden:$(".searchBtnHidden"),propertyid:sessionStorage.getItem("propertyID")},$.ajaxSetup({type:"POST",dataType:"json",error:function(){$my.messageInfo.html("服务错误").fadeIn("fast").delay("1000").fadeOut("slow")}}),e.addEventListener("input",searchList.throttle(searchList.bindEvent,500,1e3),!1),searchList.inputClear(),searchList.cancelEvent(),searchList.agencyCompany()});