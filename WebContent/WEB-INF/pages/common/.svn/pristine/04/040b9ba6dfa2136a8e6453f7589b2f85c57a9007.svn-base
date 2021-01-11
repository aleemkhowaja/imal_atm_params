<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>
<ps:form useHiddenProps="true" id="linkDynScrTabMaintFormId_${_pageRef}"  namespace="/path/dynamicScreen">
<ps:set name="actionType_${_pageRef}"        value="actionType"/>
<ps:hidden id="linkDynScrTab_sbmtMethodName_${_pageRef}" name="actionType"/>
<ps:hidden id="linkDynScrTab_objectCode_${_pageRef}"   name="linkDynScrTabCO.OBJECT_CODE"/>
<ps:hidden id="linkDynScrTab_objectType_${_pageRef}"   name="linkDynScrTabCO.OBJECT_TYPE"/>
<ps:hidden id="linkDynScrTab_subObjectId_${_pageRef}"  name="linkDynScrTabCO.SUB_OBJECT_ID"/>
<ps:hidden id="linkDynScrTab_tabKeyDescId_${_pageRef}" name="linkDynScrTabCO.SUB_OBJECT_DESC"/>
<table border="0" cellpadding="1" cellspacing="0" >
	<tr>
		<td>
			<ps:label id="lbl_smartLabel" key="new_tab_title_key" for="lookuptxt_labelEdit"/>
		</td>
		<td align="left">
			<psj:livesearch id="labelEdit"
				 name="linkDynScrTabCO.tabDesc"
				 actionName="${pageContext.request.contextPath}/pathdesktop/TranslationLookup_labelKeyLookup"
				 resultList="sysParamKeyLabelVO.KEY_LABEL_CODE:linkDynScrTab_tabKeyDescId_${_pageRef},sysParamKeyLabelVO.KEY_LABEL_DESC:lookuptxt_labelEdit"
				 paramList="translationSC.selectedApp:3"
				 searchElement="KEY_LABEL_CODE" autoSearch="true" maxlength="100"
				 required="true"/>	  
		</td>
		
	</tr>
	<tr>
	     <td>
	        <ps:label id="lbl_btnScreenId" for="lookuptxt_linkDynScreenTab_ScreenId" key="screenId_key"></ps:label>
	     </td>
	     <td>
	       <table border="0" cellpadding="1" cellspacing="0">
	         <tr>
	            <td style="width: 20%">
			       <psj:livesearch id="linkDynScrTab_screenId"
						required="true" relatedDescElt="linkDynScreenTab_screenDesc"
						name="linkDynScrTabCO.DYN_SCREEN_ID" mode="number"
						paramList="lookuptxt_linkDynScrTab_screenId:screenId"
						actionName="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreensGrid"
						resultList="sysDynScreenDefVO.DYN_SCREEN_ID:lookuptxt_linkDynScrTab_screenId"
						searchElement="DYN_SCREEN_ID" autoSearch="false" maxlength="4"
						dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenId"
						parameter="criteria.screenId:lookuptxt_linkDynScrTab_screenId"
						dependency="lookuptxt_linkDynScrTab_screenId:sysDynScreenDefVO.DYN_SCREEN_ID,linkDynScrTab_screenDesc:sysDynScreenDefVO.DYN_SCREEN_DESC"
						/>
	            </td>
	            <td>
                   <ps:textfield id="linkDynScrTab_screenDesc" size="50" name="linkDynScrTabCO.SCREEN_DESC" readonly="true" />	            
	            </td>
	         </tr>
	       </table>
	     </td>
	</tr>
</table>
<ptt:toolBar id="linkDynScreenTabToolBar_${_pageRef}" hideInAlert="true">
   <ps:if test='%{#actionType_${_pageRef}=="delete"}'>
	 <psj:submit id="linkDynScreenTab_delete_${_pageRef}" button="true" freezeOnSubmit="true" onclick="linkDynScrTab_setMethodName('delete')">
		<ps:label key="Delete_key" for="linkDynScreenTab_delete_${_pageRef}"/>
	 </psj:submit>
   </ps:if>
   <ps:if test='%{#actionType_${_pageRef}!="delete"}'>
	<psj:submit id="linkDynScreenTab_save_${_pageRef}" button="true" freezeOnSubmit="true" onclick="linkDynScrTab_setMethodName('saveNew')">
		<ps:label key="Save_key" for="linkDynScreenTab_save_${_pageRef}"/>
	</psj:submit>
   </ps:if> 	   
</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$("#linkDynScrTabMaintFormId_"+_pageRef).processAfterValid("linkDynScrTab_submitProcess",{});
</script>