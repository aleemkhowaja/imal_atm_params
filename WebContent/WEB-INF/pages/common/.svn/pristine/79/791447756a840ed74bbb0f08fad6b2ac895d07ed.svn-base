<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#attempt>
<title><@ps.text name='dashboard_title_key'/></title><#t/>
<#assign json_data=dashboardVO.json_data />
<#assign minimize=dashboardVO.minimize />
<#assign maximize=dashboardVO.maximize/>
<#assign del=dashboardVO.del/>
<#assign resize_key_trans=dashboardVO.resize_key_trans/>
<#assign assign_key_trans=dashboardVO.assign_key_trans/>
<#assign customize_key_trans=dashboardVO.customize_key_trans/>
<#assign refresh=dashboardVO.refresh/>
<#assign wdgtDeleteDisplay=dashboardVO.wdgtDeleteDisplay/>
<#assign appVersion=dashboardVO.appVersion?default('')/>
<#assign index=0/>
<#assign chooseDashLayoutKey=chooseDashLayoutKey/>
<script type="text/javascript"><#t/>
chooseDashLayoutKey = "${chooseDashLayoutKey}";<#t/>
<@s.iterator value="widgetList">
<#assign id=widgetList.get(index).portletTypeVO.PORTLET_CODE />
<#assign title=widgetList.get(index).title />
<#assign wrkspceCustDisplay=widgetList.get(index).wrkspceCustDisplay/>
<#assign wdgtAssignDisplay=widgetList.get(index).wdgtAssignDisplay/>
<#assign titlekey=widgetList.get(index).portletTypeVO.TITLE_KEY />
<#assign url=widgetList.get(index).portletTypeVO.PORTLET_URL/>
<#assign userDefinedType=widgetList.get(index).portletTypeVO.USR_DEFINED_PORTLET_YN/>
options_${id}_prop = {<#t/>
id:"${id}"<#t/>
,title:"${title}"<#t/>
,url:"${url}"<#t/>
,titleKey:"${titlekey}"<#t/>
,minimize:"${minimize}"<#t/>
,maximize:"${maximize}"<#t/>
,del:"${del}"<#t/>
,resize_key_trans:"${resize_key_trans}"<#t/>
,assign_key_trans:"${assign_key_trans}"<#t/>
,customize_key_trans:"${customize_key_trans}"<#t/>
,refresh:"${refresh}"<#t/>
,userDefinedType:"${userDefinedType}"<#t/>
,wdgtDeleteDisplay:"${wdgtDeleteDisplay}"<#t/>
,wrkspceCustDisplay:"${wrkspceCustDisplay}"<#t/>
,wdgtAssignDisplay:"${wdgtAssignDisplay}"<#t/>
};<#t/>
<#assign index=index+1 />
</@s.iterator>	
</script><#t/>
<#assign index=0/>
<script type="text/javascript" src="${base}/common/dashboard/js/jquery-ui-1.8.16.custom.min.js?_=${appVersion}"></script><#t/>
<script type="text/javascript" src="${base}/common/dashboard/js/jquery.dashboard.js?_=${appVersion}"></script><#t/>
<script type="text/javascript" src="${base}/common/dashboard/js/DashboardPortal.js?_=${appVersion}"></script><#t/>
<script type="text/javascript" src="${base}/common/js/jQuery-collapsiblePanel.js?_=${appVersion}"></script><#t/>
<script type="text/javascript" src="${base}/common/jquery/js/plugins/jquery.nicescroll.js?_=${appVersion}"></script><#t/>
<link rel="stylesheet" type="text/css" href="${base}/common/dashboard/themes/css/dashboardui.css" /><#t/>
<link rel="stylesheet" type="text/css" href="${base}/common/dashboard/themes/css/widgetPageCommon.css" /><#t/>
<#if "${isRTL}" == 'rtl'>
	<link rel="stylesheet" type="text/css" href="${base}/common/dashboard/themes/css/dashboardui-rtl.css" /><#t/>
</#if>
 <script type="text/javascript"><#t/>
$(document).ready(appNiceScrl);<#t/>
bndDshBrdResize();<#t/>
var contextPath = "${base}";<#t/>
var dashboard;<#t/>
var json_data = "${json_data}";<#t/>
<#if cifFetch?if_exists == '1'>
  globalOpenCifChoice();<#rt/>
</#if>
 </script> <#t/>    
<table width="100%"  id="dashTable" border="0" cellpadding="0" cellspacing="0" ><#t/>
<tr id="widgetLstTr"><#t/>
<td id="widgetLstTd"><#t/>
	<div id='leftBarDiv' style="width:100%;overflow-x:auto;;overflow-y:hidden"> <#t/>
			<#if usrSideBarRight??>
			<div id='btndiv' onmouseover="showdiv()" ><#t/>
			<table height="100%" cellpadding="0" cellspacing="0"><#t/>
				<tr><#t/>
				<td><#t/>
					<img id='arrowImg' src="${base}/common/images/mini-right.gif"/><#t/>
				</td><#t/>
				</tr><#t/>
			</table><#t/>
			</div><#t/>
			<div id='widgetListDiv' class="ui-state-default" style="display:none;opacity:0.8" >	<#t/>
						<div id="origin"><#t/>
						<@s.iterator value="widgetList">
							<#assign id=widgetList.get(index).portletTypeVO.PORTLET_CODE />
							<#assign imgUrl=widgetList.get(index).portletTypeVO.IMG_URL />
							<#assign abvTitle=widgetList.get(index).portletTypeVO.ABV_DESC_KEY/>
							<#assign defaultImg=widgetList.get(index).defaultImg/>
							<#if imgUrl == defaultImg>
								<#assign imgUrl="${base}/common/dashboard/themes/default/${defaultImg}" />
							<#else> 
								<#assign imgUrl="${base}/${imgUrl}" />
							</#if> 
							<#if index == 0>
								<br/><#t/>
								<br/><#t/>
								<br/><#t/>
							</#if> 
								<li widgetId='${id}' class='${id}'><center><img id='${id}Img' src="${imgUrl}"  class="draggable" /><p style="margin-top:-2;text-align:center"><@ps.label key='${abvTitle}'/></p></center></li><#t/>
								<br/><#t/>
								<br/><#t/>
						<#assign index=index+1 />
						</@s.iterator>		
							<li widgetId='personalportlet' class='personalportlet'><center><img id='personalportletImg' src="${base}/common/dashboard/themes/default/personalize.png"  class="draggable" /><p style="margin-top:-2;text-align:center"><@ps.label key='personAbv_key'/></p></center></li><#t/>
							<br/><#t/>
							<br/><#t/>		      
						</div><#t/>
			</div><#t/>
			</#if>
	</div><#t/>
</td><#t/>
<td width="100%" id="dashboardTd" ><#t/>
  	<div id="dashboard" class="dashboard"  style="overflow:auto;width:100%; z-index=700; margin:0"  onmouseover="hidediv()">  <#t/>	
   	 	<div class="layout" ><#t/>
	      <div class="column first column-first" id='column-first' ></div><#t/>
	      <div class="column second column-second" id='column-second' ></div><#t/>
	      <div class="column third column-third" id='column-third' ></div><#t/>
    	</div><#t/>
	</div><#t/>
</td><#t/>
</tr><#t/>
</table><#t/>
<div style="display:none" ><#t/>
<form id='userPortalFrmId'><#t/>
<input type="hidden" id="userPortalUpdates" name="userPortalUpdates"/><#t/>
<input type="hidden" id="minimize" value="${minimize}"/><#t/>
<input type="hidden" id="maximize" value="${maximize}"/><#t/>
<input type="hidden" id="del" value="${del}"/><#t/>
<input type="hidden" id="resize_wdgt" value="${resize_key_trans}"/><#t/>
<input type="hidden" id="assign_wdgt" value="${assign_key_trans}"/><#t/>
<input type="hidden" id="customize_wdgt" value="${customize_key_trans}"/><#t/>
<input type="hidden" id="refresh" value="${refresh}"/><#t/>
<input type="hidden" id="wdgtDeleteDisplay" value="${wdgtDeleteDisplay}"/><#t/>
<input type="hidden" id="wkspceCustRight" value="${dashboardVO.wkspceCustRight}"/><#t/>
<input type="hidden" id="wdgtAssignRight" value="${dashboardVO.wdgtAssignRight}"/><#t/>
<@ps.hidden  id="loggedUserName" value="%{#session.sesVO.userName}"></@ps.hidden>
</form><#t/>
<div style="display:none" id="addCustomWidgetDiv"></div> <#t/> 
<div style="display:none" id="resizeDiv"></div><#t/>
<div style="display:none" id="customizeDiv"></div><#t/>
<div style="display:none" id="usrAllwdPortletsDiv"></div><#t/>
<iframe id="iframId" style="display:none;"  frameborder="0" width="100%" ></iframe><#t/>
</div><#t/>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>