<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<div id="buttonCustomizationGridCopyDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width:99%;">

	<ps:url id="buttonCustomizationGridCopyURL" action="ButtonCustomizationGrid_loadButtonCustomizationGrid" namespace="/path/buttoncustomization" escapeAmp="false">
		<ps:param name="criteria.progRef" value="%{_pageRef}"/>
		<ps:param name="criteria.currAppName" value="%{#session.sesVO.currentAppName}"/>
		<ps:param name="criteria.buttonsByParentRef" value="1"/>
	</ps:url>
	
	<psjg:grid id="buttonCustomizationGridCopy_Id_${_pageRef}"
		dataType="json"
		href="%{buttonCustomizationGridCopyURL}" 
		pager="true"
		filter="true" 
		sortable="true"
		gridModel="gridModel" 
		rowNum="5" 
		rowList="5,10,15,20"
		viewrecords="true" 
		navigator="true" 
		navigatorAdd     ="false"
        navigatorDelete  ="false"
        navigatorEdit    ="false"
        navigatorRefresh ="false"
        navigatorSearch  ="false"
		height="110"
		altRows="true"
		>
		
		<psjg:gridColumn name="sysParamBtnCustVO.BTN_ID" title="%{getText('Button_id_key')}" index="BTN_ID" colType="number"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVOCopy_BTN_ID" />	
		<psjg:gridColumn name="sysParamBtnCustVO.PROG_REF" title="%{getText('progRef')}" index="PROG_REF" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVOCopy_PROG_REF" />	
		<psjg:gridColumn name="sysParamBtnCustVO.DESCRIPTION" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVOCopy_DESCRIPTION" />		
		<psjg:gridColumn name="translatedLabelKey" title="%{getText('label_key')}" index="translatedLabelKey" colType="text"
			search="false" editable="false" sortable="false" id="sysParamBtnCustVOCopy_translatedLabelKey" />
		<psjg:gridColumn name="sysParamBtnCustVO.LABEL_KEY" title="%{getText('label_key')}" index="LABEL_KEY" colType="text"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVOCopy_LABEL_KEY" hidden="true"/>		
		<psjg:gridColumn name="sysParamBtnCustVO.BTN_ORDER" title="%{getText('reporting.order')}" index="BTN_ORDER" colType="number"
			search="true" editable="false" sortable="true" id="sysParamBtnCustVOCopy_BTN_ORDER" />	
			
	</psjg:grid>

</div>
