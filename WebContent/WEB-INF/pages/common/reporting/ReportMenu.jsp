<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.ConstantsCommon"%>

<ps:set name="notExistTxtFormula_var"  		value="%{getEscText('reporting.notExistTxtFormula')}"/>

<script type="text/javascript">

//var menu = "${r_r}";
//var c_c =  "${c_c}";
//var c_d =  "${c_d}";
//var c_a_d =  "${c_a_d}";
//var b_c =  "${b_c}";
//var u_i =  "${u_i}";
//var l =  "${l}";
//var r_d =  "${r_d}";
//var b_c_c =  "${b_c_c}";
//var b_c_d =  "${b_c_d}";
//var r_r = "${r_r}";
//var c_t =   "${c_t}";
//var f_y =   "${f_y}";
//var b_c_n =  "${b_c_n}";
//var e_c_c = "${e_c_c}";
//var e_c_n  = "${e_c_n}";
//var a = "${a}";
//var d_p = "${d_p}";
//var a_p = "${a_p}";
//var r_i = "${r_i}";

//var r_a_p = "${r_a_p}";
//var htmlPageRef = "${htmlPageRef}";

var requestStr = '<%=(String)request.getQueryString()%>';
var reloadData = '<ps:text name="preview.reloadData"/>';	
var reloadTitle = '<ps:text name="preview.reloadTitle"/>';	
var resetAlert = '<ps:text name="preview.resetAlert"/>';	
var resetTitle = '<ps:text name="preview.reset"/>';	
var grpExist = '<ps:text name="group.grpExist"/>';
var pagesRangeMsg = '<ps:text name="report.pagesRangeAlert"/>';	
var repMenuNoHeadAndFoot = '<ps:text name="reporting.noHeadAndFoot"/>';
var repMenuNoHeaders = '<ps:text name="reporting.noHeaders"/>';
//_pageRef = r_r;
var htmlPageRef = '${htmlPageRef}';
var updateMode				= "<%=ConstantsCommon.UPDATE_MODE%>";
var insertMode				= "<%=ConstantsCommon.CREATE_MODE%>";

var notExistTxtFormula 		= '<ps:property value="notExistTxtFormula_var"  escapeHtml="false" escapeJavaScript="true"/>'

$(document).ready(function() 
{

	$.struts2_jquery.require("ReportMenu.js", null,jQuery.contextPath + "/common/js/reporting/");
	if("${d_p}" == 1)
	{
		_showProgressBar(true);
		var srcURL=jQuery.contextPath + "/path/repCommon/commonDynamicParams_loadDynParam.action?r_r=${r_r}&r_a_p=${r_a_p}&r_i=${r_i}&a=${a}&htmlPageRef=${htmlPageRef}&_pageRef=${_pageRef}";
		var params={};
		$('#paramsDiv_${htmlPageRef}').load(srcURL, params, function()
		 {
				refreshRepMenuData('${htmlPageRef}',1); //execute the report without data
				
				
				$("#iframId_${htmlPageRef}").load(function() 
				{
					_showProgressBar(false);
				   	$("#iframId_${htmlPageRef}").show();
				});
		 });
	
	
	}
	else
	{
		generate()
	}
	
});

</script>

<div class="clearfix">
	<ps:url id="orderPrevRepUrl"  namespace="/path/repCommon" action="commonReporting_openPrevOrder">
		<ps:param name="_pageRef" value="r_r"> </ps:param>
	</ps:url>
	<psj:dialog
		id="orderPrevRepDlg_${htmlPageRef}" 
		href="%{orderPrevRepUrl}"
	    autoOpen="false"
	    dataType="html"
	    title="%{getText('preview.sort')}"
	    modal="true" 
	    width="700"
	    height="250"
	/>    
</div>

<div class="clearfix">
	<ps:url id="filterPrevRepUrl"  namespace="/path/repCommon" action="commonReporting_openPrevFilter">
		<ps:param name="_pageRef" value="r_r"> </ps:param>
	</ps:url>
	<psj:dialog
		id="filterPrevRepDlg_${htmlPageRef}" 
		href="%{filterPrevRepUrl}"
	    autoOpen="false"
	    dataType="html"
	    modal="true" 
	    title="%{getText('reporting.filter')}"
	    width="800"
	    height="320"
	/>    
</div>

<div class="clearfix">
	<ps:url id="grpPrevRepUrl"  namespace="/path/repCommon" action="commonReporting_openPrevGrp">
		<ps:param name="_pageRef" value="r_r"> </ps:param>
	</ps:url>
	<psj:dialog
		id="grpPrevRepDlg_${htmlPageRef}" 
		href="%{grpPrevRepUrl}"
	    autoOpen="false"
	    dataType="html"
	    modal="true" 
	    width="800"
	    title="%{getText('preview.group')}"
	    height="400"
	/>    
</div>

<div class="clearfix">
	<ps:url id="argsFiltersUrl"  namespace="/path/repCommon" action="commonReporting_openArgsFilters">
		<ps:param name="_pageRef" value="r_r"> </ps:param>
	</ps:url>
	<psj:dialog
		id="argsFilterDlg_${htmlPageRef}" 
		href="%{argsFiltersUrl}"
	    autoOpen="false"
	    dataType="html"
	    modal="true" 
	    title="%{getText('reporting.filters')}"
	    width="600"
	    height="500"
	    buttons="{\"Save\":{text:\"%{getText(\"reporting.save\")}\",id:\"save_btn_%{htmlPageRef}\",click: function(){if(rep_filters_saveLoadFilter(1,\"%{r_r}\")){$( this ).dialog( 'close' );}}},\"Cancel\":{text:\"%{getText(\"reporting.cancel\")}\",id:\"cancel_btn_%{_pageRef}\",click: function(){rep_filters_refillIdIfAny();$( this ).dialog( 'close' );}}}"
	    
	/>    
</div>

<div style="overflow:hidden">
<div style="overflow: auto">
<table width="100%" id="mainTbl_${htmlPageRef}">
<tr><td>
		<ps:hidden id="auditTrxNbr_${_pageRef}" name="auditTrxNbr" value="${_pageRef}"/>
		<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

		<ps:collapsgroup id="repMenuSort_${htmlPageRef}">
			<ps:collapspanel id="paramsDivCollapsible_${htmlPageRef}"  key="reporting.paramsLbl">			
			<div id="paramsDiv_${htmlPageRef}">
			</div>
			</ps:collapspanel>
		</ps:collapsgroup>
</td></tr>
</table>
<table width="100%">
<tr><td>	
	<table width="100%" cellpadding="10">
		<tr id="operDiv">	
			<td width="5%">
				<psj:submit button="true" type="button" onclick="return openSortRep('${htmlPageRef}');">
		  				<ps:text name="preview.sort"/>
		 		</psj:submit>
			</td>
			<td width="5%">
				<psj:submit button="true" type="button" onclick="return openFilterRep('${htmlPageRef}');">
		  				<ps:text name="preview.filter"/>
		 		</psj:submit>
			</td>
			<td width="5%">
				<psj:submit button="true" type="button" onclick="return openGrpRep('${htmlPageRef}');">
		  				<ps:text name="preview.group"/>
		 		</psj:submit>
			</td>
			<td width="70%" align="center">
				<table>
					<tr>
						<td>
							<ps:text name="fromPage"></ps:text>
						</td>
						<td>
							<ps:textfield id="fromPage_${htmlPageRef}" name="fromPage" size="4" maxlength="4" mode="number" minValue="0"></ps:textfield>
						</td>
						<td>
							<ps:text name="toPage"></ps:text>
						</td>
						<td>
							<ps:textfield id="toPage_${htmlPageRef}" name="toPage" size="4" maxlength="4" mode="number" minValue="0"></ps:textfield>
						</td>
						<td>
							<psj:submit button="true" type="button" allowCust="true" id="retrieveBtn_${htmlPageRef}" onclick="return refreshRepMenuData('${htmlPageRef}');">
		  						<ps:label key="retrieve_key"/>
		 					</psj:submit>
						</td>
						<td>
							<psj:submit button="true" type="button" onclick="return resetReportMenuData('${htmlPageRef}','${a}');">
			  					<ps:text name="%{getText('preview.reset')}"/>
			 				</psj:submit>
						</td>
						<td>	
			 				<psj:submit button="true" type="button" cssStyle="width:100%" onclick="$('#argsFilterDlg_' + htmlPageRef).dialog('open');">
			  				 	<ps:text name="reporting.argFilters"/>
			 				</psj:submit>
						</td>
					</tr>
		 		</table>
			</td>
			<td  width="5%" align="right">
				<psj:submit button="true" type="button" allowCust="true" id="exportBtn_${htmlPageRef}" onclick="rep_checkSnapshotExist('${r_r}','${htmlPageRef}');">
		  				<ps:label key="export_key"/>
		 		</psj:submit>				
			</td>
			<td width="5%">
				<psj:submit progRef="<%=ConstantsCommon.OPT_VERIFY_BTN%>" button="true" type="button" onclick="verifyReport()"  id="verifyBtn_${htmlPageRef}" >
				   <ps:text name="reporting.verify"></ps:text>
				</psj:submit>
			</td>
			<td width="5%" align="right" id="tdPrint_${htmlPageRef}" style="display: none">
				<psj:submit button="true" type="button" onclick="printIframeContents('${htmlPageRef}');">
					<ps:text name="print_key" />
				</psj:submit>
			</td>
		</tr>
		</table>
	</td></tr>
</table>	
</div>
<div>
<table width="100%">
	<tr>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
		<td colspan="1" width="10%"></td>
	</tr>
	<tr>
		<td colspan="10"></td>
		<td colspan="1" style="display: none">
			<ps:textfield id="paginationCount_${htmlPageRef}"  readonly="true" style="display: none" name="PaginationCount" mode="number" size="1" minValue="0"></ps:textfield>
		</td> 
		<td colspan="1" style="display: none">
			<ps:textfield id="currentPage_${htmlPageRef}"  readonly="true" style="display: none" name="CurrentPage" mode="number" size="1" minValue="0"></ps:textfield>
		</td>
		<td colspan="1" id="tdPaginationPrevious_${htmlPageRef}"style="display: none">
			<psj:submit id="btnPrevious_${htmlPageRef}" button="true" type="button" onclick="rep_paginationPreviousNext('${htmlPageRef}','P');">
				<ps:text name="Previous_key" />
			</psj:submit>
		</td>
		<td colspan="1" id="tdPaginationNext_${htmlPageRef}"style="display: none">
			<psj:submit id="btnNext_${htmlPageRef}"  button="true" type="button" onclick="rep_paginationPreviousNext('${htmlPageRef}','N');">
				<ps:text name="next_key" />
			</psj:submit>
		</td>
	</tr>
</table>
</div>
<ps:hidden id="iframeLoaded_${htmlPageRef}"> </ps:hidden>
<iframe id="iframId_${htmlPageRef}" style="display:none;"  name="reportPrevIframe_${htmlPageRef}" onLoad="fillIframeLoadedInput('${htmlPageRef}')" frameborder="0" width="100%" ></iframe>
	</div>