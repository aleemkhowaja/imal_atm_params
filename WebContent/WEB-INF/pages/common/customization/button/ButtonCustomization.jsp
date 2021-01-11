<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


<script type="text/javascript">
	var currentPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
	$.struts2_jquery.require("ButtonCustomization.js" ,null,jQuery.contextPath+"/common/js/customization/button/");
</script>

<ps:hidden id="buttonCustomization_appName_${_pageRef}" value="${sysParamBtnCustVO.APP_NAME}"></ps:hidden>
<ps:hidden id="buttonCustomization_progRef_${_pageRef}" value="${_pageRef}"></ps:hidden>
<ps:hidden id="buttonCustomization_toolBarId_${_pageRef}" value="${sysParamBtnCustVO.TOOLBAR_ID}"></ps:hidden>
<ps:hidden id="buttonCustomization_globalOperationMode_${_pageRef}" value="${buttonCustomizationCO.globalOperationMode}"></ps:hidden>



<div id="buttonCustomizationGridDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">

	<ps:url id="buttonCustomizationGridURL" action="ButtonCustomizationGrid_loadButtonCustomizationGrid" namespace="/path/buttoncustomization" escapeAmp="false">
		<ps:param name="criteria.progRef" value="%{_pageRef}"/>
		<ps:param name="criteria.currAppName" value="%{sysParamBtnCustVO.APP_NAME}"/>
		<ps:param name="criteria.toolBarId" value="%{sysParamBtnCustVO.TOOLBAR_ID}"/>
	</ps:url>
	
	<psjg:grid id="buttonCustomizationGrid_Id_${_pageRef}"
		dataType="json"
		href="%{buttonCustomizationGridURL}" 
		pager="true"
		filter="true" 
		sortable="true"
		gridModel="gridModel" 
		rowNum="5" 
		rowList="5,10,15,20"
		viewrecords="true" 
		navigator="true" 
		navigatorAdd     ="true"
        navigatorDelete  ="true"
        navigatorEdit    ="false"
        navigatorRefresh ="false"
        navigatorSearch  ="false"
		height="110"
		altRows="true"
		addfunc="buttonCustomization_onAddClicked"
		delfunc="buttonCustomization_onDeleteClicked" 
		ondblclick="buttonCustomization_onDbClicked()"
		onGridCompleteTopics="buttonCustomization_afterGridLoad">
		
		<psjg:gridColumn name="sysParamBtnCustVO.BTN_ID" title='%{!"true".equals(buttonCustomizationCO.globalOperationMode) ? getText("Button_id_key") : getText("activity_id_key")}' index="BTN_ID" colType="number"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVO_BTN_ID" />	
		<psjg:gridColumn name="sysParamBtnCustVO.PROG_REF" title="%{getText('progRef')}" index="PROG_REF" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVO_PROG_REF" />	
		<psjg:gridColumn name="sysParamBtnCustVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVO_DESCRIPTION" />		
		<psjg:gridColumn name="translatedLabelKey" title="%{getText('label_key')}" index="translatedLabelKey" colType="text"
			search="false" editable="false" sortable="false" id="sysParamBtnCustVO_translatedLabelKey" hidden="${buttonCustomizationCO.globalOperationMode}"/>
		<psjg:gridColumn name="sysParamBtnCustVO.LABEL_KEY" title="%{getText('label_key')}" index="LABEL_KEY" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVO_LABEL_KEY" hidden="true"/>		
		<psjg:gridColumn name="sysParamBtnCustVO.BTN_ORDER" title="%{getText('reporting.order')}" index="BTN_ORDER" colType="number"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVO_BTN_ORDER" hidden="${buttonCustomizationCO.globalOperationMode}"/>	
			
	</psjg:grid>
</div>


<br/>
		
<div id="buttonCustomizationDetailsDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">
	
</div>


<ps:set name="btn_cust_action_det_trns" value="%{getEscText('Action_details_key')}"/>
<ps:set name="btn_cust_cond_det_trns" value="%{getEscText('Condition_details_key')}"/>
<ps:set name="btn_cust_copy_trns" value="%{getEscText('Copy_key')}"/>
<script type="text/javascript">
	var btn_cust_action_det_trns = '<ps:property value="btn_cust_action_det_trns" escapeHtml="false"  escapeJavaScript="true"/>';
	var btn_cust_cond_det_trns   = '<ps:property value="btn_cust_cond_det_trns" escapeHtml="false"  escapeJavaScript="true"/>';
	var btn_cust_copy_trns = '<ps:property value="btn_cust_copy_trns" escapeJavaScript="true"/>';
	$("#buttonCustomizationGrid_Id_"+_pageRef).subscribe("buttonCustomization_afterGridLoad",function(){
		buttonCustomization_afterGridLoad();
	})
</script>
