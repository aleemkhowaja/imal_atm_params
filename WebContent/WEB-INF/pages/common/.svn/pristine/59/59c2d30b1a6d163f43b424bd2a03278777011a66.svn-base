<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>
<ps:form useHiddenProps="true" id="linkDynScreenMaintFormId_${_pageRef}"  namespace="/path/dynamicScreen">
<ps:set name="actionType_${_pageRef}"        value="actionType"/>
<ps:set name="choose_parent_key" value="%{getEscText('choose_parent_key')}"/>
<ps:hidden id="linkDynScreen_sbmtMethodName_${_pageRef}" name="actionType"/>
<table border="0" cellpadding="1" cellspacing="0" >
	<tr>
		<td>
		   <ps:label key="screen_parent_name_key" for="screen_parent_name_${_pageRef}"/>
		</td>
		<td>
		   <table border="0" cellpadding="1" cellspacing="0">
		      <tr>
				<td>
				    <ps:textfield size="50" id="screen_parent_name_${_pageRef}" name="linkDynamicScreenCO.screenParentName" readonly="true"/>
				    <ps:hidden id="linkDynScreen_parentRef_${_pageRef}" name="linkDynamicScreenCO.parentRef"></ps:hidden>
				</td>
				<td>
				   <ps:if test='%{#actionType_${_pageRef}!="delete"}'>
						<psj:a button="true" tabindex="50" href="#" id="linkDynScreen_chooseParentRefBtnId_${_pageRef}"
							onclick="linkDynScreen_openMenuTree()">
							<ps:label key="open_key"/>
						</psj:a>
				   </ps:if>	
				</td>
		      </tr>
		   </table>
		</td>
	</tr>
	<tr>
		<td><ps:label key="Reference_key" for="linkDynScreen_screen_ref_${_pageRef}"/></td>
		<td><ps:textfield id="linkDynScreen_screen_ref_${_pageRef}" 
		                  name="linkDynamicScreenCO.PROG_REF"
		                  required="true" 
		                  maxlength="15" 
		                  size="20"/></td>
	</tr>
	<tr>
		<td><ps:label key="reference_desc_key" for="linkDynScreen_screen_name_${_pageRef}"/></td>
		<td><ps:textfield maxlength="100" size="50" id="linkDynScreen_screen_name_${_pageRef}" name="linkDynamicScreenCO.MENU_TITLE" required="true"/></td>
	</tr>
	<tr>
	     <td>
	        <ps:label id="lbl_btnScreenId" for="lookuptxt_linkDynScreen_ScreenId" key="screenId_key"></ps:label>
	     </td>
	     <td>
	       <table border="0" cellpadding="1" cellspacing="0">
	         <tr>
	            <td style="width: 20%">
			       <psj:livesearch id="linkDynScreen_ScreenId"
						required="true" relatedDescElt="linkDynScreen_screenDesc"
						name="linkDynamicScreenCO.DYN_SCREEN_ID" mode="number"
						paramList="lookuptxt_linkDynScreen_ScreenId:screenId"
						actionName="${pageContext.request.contextPath}/path/dynamicScreen/dynScreenLookupAction_drawingDynScreensGrid"
						resultList="sysDynScreenDefVO.DYN_SCREEN_ID:lookuptxt_linkDynScreen_ScreenId"
						searchElement="DYN_SCREEN_ID" autoSearch="false" maxlength="4"
						dependencySrc="${pageContext.request.contextPath}/path/dynamicScreen/dynDependencyAction_dependencyByScreenId"
						parameter="criteria.screenId:lookuptxt_linkDynScreen_ScreenId"
						dependency="lookuptxt_linkDynScreen_ScreenId:sysDynScreenDefVO.DYN_SCREEN_ID,linkDynScreen_screenDesc:sysDynScreenDefVO.DYN_SCREEN_DESC"
						/>
	            </td>
	            <td>
                   <ps:textfield id="linkDynScreen_screenDesc" size="50" name="linkDynamicScreenCO.SCREEN_DESC" readonly="true" />	            
	            </td>
	         </tr>
	       </table>
	     </td>
	</tr>
	
	<tr>
	     <td>
	        <ps:label id="lbl_btnCategId" for="lookuptxt_linkDynScreen_CategId" key="category_key"></ps:label>
	     </td>
	     <td>
	       <table border="0" cellpadding="1" cellspacing="0">
	         <tr>
	            <td style="width: 20%">
			       <psj:livesearch id="linkDynScreen_CategId"
						relatedDescElt="linkDynScreen_categDesc"
						name="linkDynamicScreenCO.categId" mode="number"
						actionName="${pageContext.request.contextPath}/path/optCategory/categoryLookupAction_constructCategLookup"
						resultList="CATEG_ID:lookuptxt_linkDynScreen_CategId,CATEG_DESC_ENG:linkDynScreen_categDesc"
						searchElement="categId" autoSearch="false" maxlength="10"
						dependencySrc="${pageContext.request.contextPath}/path/optCategory/categoryDependencyAction_dependencyByCategory"
						parameter="categorySC.categId:lookuptxt_linkDynScreen_CategId"
						dependency="lookuptxt_linkDynScreen_CategId:categorySC.categId,linkDynScreen_categDesc:categorySC.categDesc"
						/>
	            </td>
	            <td>
                   <ps:textfield id="linkDynScreen_categDesc" size="50" name="linkDynamicScreenCO.categDesc" readonly="true" />	            
	            </td>
	         </tr>
	       </table>
	     </td>
	</tr>
	
</table>
<ptt:toolBar id="linkDynScreenToolBar_${_pageRef}" hideInAlert="true">
   <ps:if test='%{#actionType_${_pageRef}=="delete"}'>
	 <psj:submit id="linkDynScreen_delete_${_pageRef}" button="true" freezeOnSubmit="true" onclick="linkDynScreen_setMethodName('delete')">
		<ps:label key="Delete_key" for="linkDynScreen_delete_${_pageRef}"/>
	 </psj:submit>
   </ps:if>
   <ps:if test='%{#actionType_${_pageRef}!="delete"}'>
	<psj:submit id="linkDynScreen_save_${_pageRef}" button="true" freezeOnSubmit="true" onclick="linkDynScreen_setMethodName('saveNew')">
		<ps:label key="Save_key" for="linkDynScreen_save_${_pageRef}"/>
	</psj:submit>
   </ps:if> 	   
</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	var choose_parent_key = '<ps:property value="choose_parent_key" escapeHtml="false" escapeJavaScript="true"/>';
	$("#linkDynScreenMaintFormId_"+_pageRef).processAfterValid("linkDynScreen_submitProcess",{});
</script>