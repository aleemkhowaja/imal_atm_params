<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<ps:set name="actionType_${_pageRef}"   value="actionType"/>
<ps:hidden id="retrieval_cond_key_id" value="%{getText('retrieval_condition_key')}"/>
<ps:hidden id="query_key_id" value="%{getText('Query_key')}"/>
<script type="text/javascript">
var retrievalCondKey = document.getElementById("retrieval_cond_key_id").value;
var queryKey = document.getElementById("query_key_id").value;
</script>
<table width="100%" cellpadding="0" cellspacing="0">
     <tr>
       <td width="50%">
           <table cellpadding="1" cellspacing="1">
			   <tr>
			       <td>
			         <ps:hidden id="createFromId" name="dynScreenCreatorCO.createFrom"/>
			         <ps:if test='%{dynScreenCreatorCO.createFrom}'>
			             <ps:label key="createdFromScreenId_key" id="lbl_screenId" for="dynScreenId"/>
			         </ps:if>
			         <ps:else>
			             <ps:label key="screenId_key" id="lbl_screenId" for="dynScreenId"/>
			         </ps:else>
			       </td>
			       <td>
			          <ps:textfield id="dynScreenId" cssStyle="width:100px;" name="dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID" readonly="true" mode="number"/>
			       </td>
			       <td></td>
			       <td>
			          <table cellpadding="0" cellspacing="0">
			              <tr>
						       <td>
						            <ps:if test='%{actionType == "update"}'>
										<psj:submit id="dynScreen_previewBtn" type="button" button="true" buttonIcon="ui-icon-comment" onclick="screenGenerator_previewScreen()" cssStyle="width:100;">
											<ps:text name='preview_Screen_key' />
										</psj:submit>
									</ps:if>
						       </td>
						       <td>
						           <ps:hidden id="loadScriptHidData" name="dynScreenCreatorCO.sysDynScreenDefVO.ON_LOAD_SCRIPT"></ps:hidden>
								   <psj:submit id="dynScreen_onLoadBtn" type="button" button="true" buttonIcon="ui-icon-comment" onclick="screenGenerator_onLoadScriptScreen()" cssStyle="width:100;">
									    <ps:text name='on_load_script_key' />
								   </psj:submit>
						       </td>
						       <td>
								   <psj:submit id="dynScreen_tableCreationBtn" type="button" button="true" buttonIcon="ui-icon-comment" onclick="screenGenerator_defineScrTablesScreen()" cssStyle="width:100;">
									    <ps:text name='definetable_key' />
								   </psj:submit>       
						       </td>
			              </tr>
			          </table>			       
			       </td>
			   </tr>
			   <tr>
			       <td>
			         <ps:label key="screenDesc_key" id="lbl_screenDesc" for="dynScreenDesc"/> 
			       </td>
			       <td>
			           <ps:textfield id="dynScreenDesc" required="true" cssStyle="width:255px;" name="dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_DESC"/>
			       </td>
			       <td></td>
			       <td></td>
			   </tr>
			   <tr>
			       <td>
			         <ps:label key="screentables_key" id="lbl_screenTables" for="lookuptxt_screenTableId"/> 
			       </td>
			       <td>
			       	    <ps:hidden id="screenTableId" name="dynScreenCreatorCO.scrTableId"></ps:hidden>
 						<psj:livesearch id="dynScreenTableId" mode="number"
							 name="dynScreenCreatorCO.scrTableId"
							 relatedDescElt="screenTableDescId"
							 actionName="${pageContext.request.contextPath}/path/screenGenerator/generatorLookupAction_drawingScrTablesGrid"
							 resultList="TABLE_TECH_NAME:screenTableTechNameId,TABLE_ID:lookuptxt_dynScreenTableId,TABLE_DESC:screenTableDescId"
							 searchElement="KEY_LABEL_CODE" 
							 autoSearch="true" 
							 maxlength="5"
							 parameter="dynScreenCreatorCO.scrTableId:lookuptxt_dynScreenTableId"
							 dependency="lookuptxt_dynScreenTableId:dynScrTablesCO.TABLE_ID,screenTableId:dynScrTablesCO.TABLE_ID,screenTableDescId:dynScrTablesCO.TABLE_DESC,screenTableTechNameId:dynScrTablesCO.TABLE_TECH_NAME"
							 dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/screenGeneratorDepAction_dependencyByScreenTable"
						/>
			       </td>
			       <td>      
			       			 <ps:textfield id="screenTableTechNameId"
	                         name="dynScreenCreatorCO.scrTableTechName" 
	                         required="false" 
	                         readonly="true"
	                         cssStyle="width:255px;"/>
			       </td>
			       <td>
			      			 <ps:label key="tabledesc_key" id="lbl_tabledesc" for="screenTableDescId"/> 
				       		<ps:textfield id="screenTableDescId"
	                         name="dynScreenCreatorCO.scrTableDesc" 
	                         required="false" 
	                         readonly="true"
	                         cssStyle="width:255px;"/>        
				    </td>
			        <td>
			       </td>
			   </tr>
			   <tr>
			      <td>
			      <ps:label key="enable_grid_key" id="lbl_scrGridFlag" for="screenTableGridFlagId"/> 
			       </td>
			       <td>
			       <ps:checkbox name="dynScreenCreatorCO.scrGridFlag" id="screenTableGridFlagId" 
			       				style ="vertical-align: middle;" valOpt="1:0" disabled="${_scrGridFlagEnabled}" />
			       </td>
			       <td>
			       </td>
			       <td>
			       </td>
			   </tr>
			   <ps:if test='%{_omniChannelFlag}'>
			   <tr>
			      <td>
			      <ps:label key="omni_channel_key" id="lbl_omniChannelFlag" for="screenOmniFlagId"/> 
			       </td>
			       <td>
			       <ps:checkbox name="dynScreenCreatorCO.omniChannelScr" id="screenOmniFlagId" 
			       				style ="vertical-align: middle;" valOpt="1:0"/>
			       </td>
			       <td>
			       </td>
			       <td>
			       </td>
			   </tr>
			   </ps:if>
           </table>
       </td>
   </tr>
</table>
