<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>

<table>
  <tr>
     <td width="10%">
        <ps:label id="lbl_sourceType" for="selButtonSrcType" key="source_key" required="true"></ps:label>       
     </td>
     <td width="50%">
        <ps:select id="selButtonSrcType" 
                   name="dynButtonSourceCO.sourceType"
                   list="btnSourceList" 
                   listKey="code" 
                   listValue="descValue"
                   parameter="dynButtonSourceCO.sourceType:selButtonSrcType"
                   dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/screenGeneratorDepAction_dependencyBySourceType?"
                   dependency="lookuptxt_btnSourceScreenId:dynButtonSourceCO.sourceScreenId,btnSource_screenDesc:dynButtonSourceCO.sourceScreenDesc,btnSource_activityIdDesc:dynButtonSourceCO.sourceScreenDesc"
                   afterDepEvent="screenGeneratorProp_buttonSrcTypeAfterDep"></ps:select>
     </td>
     <td></td>
  </tr>
  <tr>
     <td width="10%">
        <ps:label id="lbl_btnScreenId" for="lookuptxt_btnSourceScreenId" key="screenId_key"></ps:label>
     </td>
     <td width="50%">
       <psj:livesearch id="btnSourceScreenId"
			required="true" relatedDescElt="btnSource_screenDesc"
			name="dynButtonSourceCO.sourceScreenId"
			paramList="lookuptxt_btnSourceScreenId:screenId"
			actionName="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreensGrid"
			resultList="sysDynScreenDefVO.DYN_SCREEN_ID:lookuptxt_btnSourceScreenId"
			searchElement="DYN_SCREEN_ID" autoSearch="false" maxlength="4"
			dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenId"
			parameter="criteria.screenId:lookuptxt_btnSourceScreenId"
			dependency="lookuptxt_btnSourceScreenId:sysDynScreenDefVO.DYN_SCREEN_ID,btnSource_screenDesc:sysDynScreenDefVO.DYN_SCREEN_DESC"
			afterDepEvent="screenGeneratorProp_reloadDynScreenMapGrid"/>
     </td>
     <td>
       <ps:textfield id="btnSource_screenDesc" size="50" name="dynButtonSourceCO.sourceScreenDesc" readonly="true" />
     </td>
  </tr>
  <tr>
     <td width="10%">
        <ps:label id="lbl_scriptId" for="btnSource_scriptId" key="scriptId_key"></ps:label>
     </td>
     <td colspan="2">
	   <ps:textarea id="btnSource_scriptId" name="dynButtonSourceCO.sourceScriptData"
					maxlength="1000" cols="85" rows="15"></ps:textarea> 
     </td>
     <td></td>
  </tr>
  <tr>
	<td nowrap="nowrap">
		<ps:label key="activity_id_key"
			id="lbl_activity_id_key"
			for="lookuptxt_btnSourceActivityId">
		</ps:label>
	</td>
	<td>
		<psj:livesearch id="btnSourceActivityId" mode="number"
		 	name="dynButtonSourceCO.sourceGlobalActivityId" reConstruct="false"
		 	paramList="criteria.actionType: 2"
		 	actionName="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructButtonActivityLookup"
		 	resultList="sysParamBtnCustVO.BTN_ID:lookuptxt_btnSourceActivityId"
		 	searchElement="ACTIVITY_ID" autoSearch="false" 
		 	relatedDescElt="btnSource_activityIdDesc"
		 	dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyByButtonActivityId"
			parameter="customActionParamCO.operationId:lookuptxt_btnSourceActivityId,customActionParamCO.operationType: 2"
			dependency="lookuptxt_btnSourceActivityId:buttonCustomizationCO.customActionParamCO.operationId,btnSource_activityIdDesc:buttonCustomizationCO.operationDesc"
			afterDepEvent="screenGeneratorProp_reloadDynScreenMapGrid"
			/>
	</td>
	<td>
	   <ps:textfield id="btnSource_activityIdDesc" size="50" name="dynButtonSourceCO.sourceScreenDesc" readonly="true"/>
	</td>
</tr>
  <tr>
  	<td colspan="3"><div id="btnSourceScreenParamMapDiv"></div></td>
  </tr>
</table>
<script>
 if($("#btnSource_scriptId").length > 0)
 {
	var btnScriptExpTags = screenGeneratorProp_returnAllElementsIds(true,true); 
  	apply_auto_complete("btnSource_scriptId",btnScriptExpTags);
 }
  
 var btnSourceType = '<ps:property value="dynButtonSourceCO.sourceType" escapeHtml="false" escapeJavaScript="true"/>';
 var sourceScreenId = '<ps:property value="dynButtonSourceCO.sourceScreenId" escapeHtml="false" escapeJavaScript="true"/>';
 var sourceScreenWidth = '<ps:property value="dynButtonSourceCO.sourceScreenWidth" escapeHtml="false" escapeJavaScript="true"/>';
 var sourceScreenHeight = '<ps:property value="dynButtonSourceCO.sourceScreenHeight" escapeHtml="false" escapeJavaScript="true"/>';
 var sourceScreenTitle = '<ps:property value="dynButtonSourceCO.sourceScreenTitle" escapeHtml="false" escapeJavaScript="true"/>';
 var sourceGlobalActivityId = '<ps:property value="dynButtonSourceCO.sourceGlobalActivityId" escapeHtml="false" escapeJavaScript="true"/>';
 
 if(btnSourceType == '1' && sourceScreenId != '')
 {
  	var data = {};
  	data.sysDynScreenDefVO = {};
	data.sysDynScreenDefVO.DYN_SCREEN_ID = Number(sourceScreenId);
	data.sysDynScreenDefVO.SCREEN_WIDTH = Number(sourceScreenWidth);
	data.sysDynScreenDefVO.SCREEN_HEIGHT = Number(sourceScreenHeight);
	data.sysDynScreenDefVO.SCREEN_TITLE = sourceScreenTitle;
  	screenGeneratorProp_reloadDynScreenMapGrid(data);
 }
 else if(btnSourceType == '3' && sourceGlobalActivityId != '')
 { 
	var data = {};
  	data.buttonCustomizationCO = {};
  	data.buttonCustomizationCO.customActionParamCO = {};
	data.buttonCustomizationCO.customActionParamCO.operationId = parseInt(sourceGlobalActivityId);
  	screenGeneratorProp_reloadDynScreenMapGrid(data);
 }
</script>	