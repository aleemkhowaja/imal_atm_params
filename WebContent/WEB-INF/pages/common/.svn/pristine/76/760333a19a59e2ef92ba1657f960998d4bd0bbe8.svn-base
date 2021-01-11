<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign ptt=JspTaglibs["/WEB-INF/tld/path-toolbar-tags.tld"]>
<#attempt>
<#if (useActiveX && !pathCtrlAXLoaded??)>
<object name="PathCtrl" style='display:none' id='PathCtrl' classid='${twainCLSID}' codebase='${base}/login/PathTWAINCtrl.cab#version=${scanAxVersion}'></object>
</#if>
<script type="text/javascript">
$(document).ready(function(){ 
	$.struts2_jquery.require("/common/js/smart/Smart.js","",'${base}');
	$.struts2_jquery.require("/common/js/scan/Scan.js","",'${base}');
 });
 </script>
 <#if (smartCOList?? && smartCOList?size>0) >
<#assign index=0/>
<input type='text' size='1' style='position:relative;top:-1000px;height:0px;'></input>
<@ps.hidden id="smart_auditObj_${_pageRef}" name="_smartAuditJsonStr"/>
<@ps.hidden id="auditActionDate_${_pageRef}" name="auditActionDate"/>
<@ps.hidden id="_parentPageRef_${_pageRef}" name="_parentPageRef"/>
<@ps.hidden id="scanExVersion" name="scanExVersion"/>
<@ps.hidden id="smartSubmitMethodName_${_pageRef}" name="smartSubmitMethodName"/>
<@ps.hidden id="smartScreenParams_${_pageRef}" name="smartScreenParams"/>
<@ps.hidden id="smart_addScreenParams_${_pageRef}" name="smart_addScreenParams"/>
<table width="100%" border="0">
<@s.iterator value="smartCOList">
<#if (sAdditionsDetailsVO.s_ADD_TYPE_CODE??)>
<#assign id=sAdditionsDetailsVO.s_ADD_TYPE_CODE/>
<@ps.hidden id='sAdditionsTypeSAddOptionCode_${id}_${_pageRef}' name='smartCOList[${id}].sAdditionsTypeVO.s_ADD_OPTION_CODE' ></@ps.hidden>
<@ps.hidden id='sAdditionsDetailsSAddTypeCode_${id}_${_pageRef}' name='smartCOList[${id}].sAdditionsDetailsVO.s_ADD_TYPE_CODE' ></@ps.hidden>
<@ps.hidden id='sAdditionsTypeMandatory_${id}_${_pageRef}' name='smartCOList[${id}].sAdditionsTypeVO.MANDATORY' ></@ps.hidden>
<@ps.hidden id='sAdditionsTypeMandExp_${id}_${_pageRef}' name='smartCOList[${id}].sAdditionsTypeVO.MANDATORY_EXPRESSION' ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsOptionsVO.OPTION_TYPE' ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsOptionsVO.FILE_EXTENSION' ></@ps.hidden> 
<@ps.hidden name='smartCOList[${id}].sAdditionsOptionsVO.MAX_FILE_SIZE' ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsOptionsVO.FIXED_LOCATION' id="smartCOList_${id}_filePhysicalLoc" ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsOptionsVO.SAVE_FILE_IN' id="smartCOList_${id}_fileStorageMedia" ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.PROG_REFERENCE' ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.APP_NAME' ></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.TRX_NBR' ></@ps.hidden>
<@ps.hidden name="smartCOList[${id}].smartFileEncodedBytes" id="smartCOList_${id}_smartFileEncodedBytes"></@ps.hidden>
<@ps.hidden name="smartCOList[${id}].smartFileEncodedFileName" id="smartCOList_${id}_smartFileEncodedFileName"></@ps.hidden>
<@ps.hidden name='smartCOList[${id}].sAdditionsTypeVO.BRIEF_NAME_ENG' ></@ps.hidden>
<tr>
	<#if sAdditionsOptionsVO.OPTION_TYPE==0>
	<td width="20%" valign="middle">
		<@ps.label id='lbl_sAdditionsDetailsSAddOptionCode_${id}_${_pageRef}' for='lookuptxt_sAdditionsDetailsSAddOptionCode_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
	<td width="9%" valign="middle">
		<@psj.livesearch id="sAdditionsDetailsSAddOptionCode_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.s_ADD_OPTION_CODE" 
   			resultList="BRIEF_NAME_ENG:sAddOptionsBriefName_${id}_${_pageRef}"	
   			paramList ="optionCode:sAdditionsTypeSAddOptionCode_${id}_${_pageRef}"
   			actionName="${base}/pathdesktop/SmartAddOptions_constructLookup"  
   			searchElement="OPTION_SERIAL" maxlength="6"
   			dependencySrc="${base}/pathdesktop/SmartAddOptionsDependencyAction_dependencyByOptionCode"
   			dependency="lookuptxt_sAdditionsDetailsSAddOptionCode_${id}_${_pageRef}:sadditionsOptionsVO.OPTION_SERIAL,sAddOptionsBriefName_${id}_${_pageRef}:sadditionsOptionsVO.BRIEF_NAME_ENG"
   			parameter="smartAddOptionsSC.optionSerial:lookuptxt_sAdditionsDetailsSAddOptionCode_${id}_${_pageRef},smartAddOptionsSC.optionCode:sAdditionsTypeSAddOptionCode_${id}_${_pageRef}" 
   			afterDepEvent="validateSmartMandExpr()">
		</@psj.livesearch>
	</td>
	<td width="1%"></td>
    <td width="30%">  	
		<@ps.textfield id='sAddOptionsBriefName_${id}_${_pageRef}' name="smartCOList[${id}].saddOptionsBriefNameEng" readonly="true"></@ps.textfield>
   	</td>
	<#elseif sAdditionsOptionsVO.OPTION_TYPE==1>
	<td width="20%" valign="middle">
		<@ps.label id='lbl_Scan_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
  	  	<#if soptionDesc?? && soptionDesc == 'true'>
			<script  type="text/javascript">
				setLabelReq('lbl_Scan_${id}_${_pageRef}', '${soptionDesc}');
			</script>
  		</#if>
  		<#if sAdditionsDetailsVO.ADDITION_NUMBER??>	
			<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.ADDITION_NUMBER' ></@ps.hidden>
			<@ps.hidden id="addText1_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_TEXT" ></@ps.hidden>
		</#if>	
	<td width="40%" nowrap="nowrap" colspan="3">
		<@ps.hidden id='scanExternalFilescan__${id}_${_pageRef}' name='smartCOList[${id}].ExternalFileFileName' ></@ps.hidden>
		<span class="collapsibleIcon"> 
  			<@psj.submit button="true" type="button"  buttonIcon="ui-icon-image" id="preview_${id}_${_pageRef}" onclick="smartPrevScannedImg(${_pageRef}, 'scan__${id}','/path/smart/Smart_showPreviewImage.action', 'sAdditionsDetailsSAddTypeCode_${id}_${_pageRef}')">
				<@ps.label key="Preview_image_key"></@ps.label>
			</@psj.submit>
		</span>
		<span class="collapsibleIcon"> 
  			<@psj.submit button="true" type="button"  buttonIcon="ui-icon-copy" id="scan_${id}_${_pageRef}" onclick="smartScanToServer('scan__${id}', '${smartLanguage}')">
				<@ps.label key="Scan_key"></@ps.label>
			</@psj.submit>
		</span>
		<span class="collapsibleIcon"> 
  			<@psj.submit button="true" type="button"  buttonIcon="ui-icon-play" id="run_${id}_${_pageRef}" onclick="smartRunScannedImg(${_pageRef}, 'scan__${id}','/path/smart/Smart_showPreviewImage.action', 'sAdditionsDetailsSAddTypeCode_${id}_${_pageRef}')">
				<@ps.label key="Run_key"></@ps.label>
			</@psj.submit>
		</span>
	</td>
	<#elseif sAdditionsOptionsVO.OPTION_TYPE==2 >
	<td width="20%" valign="middle">
		<@ps.label id='lbl_addText_${id}_${_pageRef}' for='addText_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
		<#if sAdditionsOptionsVO.OPTION_LENGTH?? && (sAdditionsOptionsVO.OPTION_LENGTH &gt; 0) && (sAdditionsOptionsVO.OPTION_LENGTH &lt; 4000) >
			<#assign fieldLength= sAdditionsOptionsVO.OPTION_LENGTH/>
		<#else>
			<#assign fieldLength= 999/>
		</#if>
	<td width="40%" colspan="3">
   		<@ps.textfield id="addText_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_TEXT" maxlength="${fieldLength}" 
   		onchange="validateSmartMandExpr()">
   		</@ps.textfield>	
   	</td>
  	<#elseif sAdditionsOptionsVO.OPTION_TYPE==3>
  	<td width="20%" valign="middle">
		<@ps.label id='lbl_addDate_${id}_${_pageRef}' for='addDate_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
	<td width="40%" colspan="3">
		<@psj.datepicker id="addDate_${id}_${_pageRef}"  buttonImageOnly="true" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_DATE" 
   		onchange="validateSmartMandExpr()"></@psj.datepicker>
	</td>
  	<#elseif sAdditionsOptionsVO.OPTION_TYPE==4>
  	<td width="20%" valign="middle">
		<@ps.label id='lbl_addNumber_${id}_${_pageRef}' for='addNumber_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
  		<#if sAdditionsOptionsVO.OPTION_MASK??>	
			<#assign sAdditionsOptionsOptionMask=sAdditionsOptionsVO.OPTION_MASK/>
		</#if>
		<#if sAdditionsOptionsVO.OPTION_LENGTH?? && (sAdditionsOptionsVO.OPTION_LENGTH &gt; 0) && (sAdditionsOptionsVO.OPTION_LENGTH &lt; 18) >
			<#assign fieldLength= sAdditionsOptionsVO.OPTION_LENGTH/>
		<#else>
			<#assign fieldLength= 18/>
		</#if>
	<td width="40%" colspan="3">
   		<@ps.textfield id="addNumber_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_NUMBER" maxlength="${fieldLength}" mode="number" nbFormat="${sAdditionsOptionsOptionMask}"
   		onchange="validateSmartMandExpr()"></@ps.textfield>
	</td>
	<#elseif sAdditionsOptionsVO.OPTION_TYPE==5>
	<td width="20%" valign="middle">
		<#if sAdditionsDetailsVO.ADDITION_NUMBER??>	
			<@ps.label id='lbl_addText1_${id}_${_pageRef}' for='addText1_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
		<#if soptionDesc?? && soptionDesc == 'true'>
			<script  type="text/javascript">
				setLabelReq('lbl_addText1_${id}_${_pageRef}', '${soptionDesc}');
			</script>
  		</#if>
		<#else>
			<@ps.label id='lbl_browse_${id}_${_pageRef}' for='browse_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
		<#if soptionDesc?? && soptionDesc == 'true'>
			<script  type="text/javascript">
				setLabelReq('lbl_browse_${id}_${_pageRef}', '${soptionDesc}');
			</script>
  		</#if>
		</#if>
  	</td>
	<td width="40%" colspan="3">
		<#if sAdditionsDetailsVO.ADDITION_NUMBER??>	
		<div id="externalProgmDiv_${id}_${_pageRef}" >
			<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.ADDITION_NUMBER' ></@ps.hidden>
			<@ps.textfield id="addText1_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_TEXT" readonly="true" ></@ps.textfield>
			<span class="collapsibleIcon">
					<@psj.submit button="true" type="button"  buttonIcon="ui-icon-play" id="run_${id}_${_pageRef}" onclick="downloadExternalFile(${id})">
						<@ps.text name="Download_key"></@ps.text>
					</@psj.submit>
			</span>
			<span class="collapsibleIcon">
				<@psj.submit button="true" type="button"  buttonIcon="ui-icon-trash" id="detach_${id}_${_pageRef}" onclick="detachExternalFile(${id})">
					<@ps.text name="Detach_key"></@ps.text>
				</@psj.submit>
			</span>
		<#else>
			<@ps.file id='browse_${id}_${_pageRef}' name='smartCOList[${id}].externalFile' ></@ps.file>
			<span class="collapsibleIcon">
				<@psj.submit button="true" type="button"  buttonIcon="icon-copy" id="clearExternalFile_${id}_${_pageRef}" onclick="clearExternalFile(${id})">
					<@ps.text name="btn.clear"></@ps.text>
				</@psj.submit>
			</span>
		</div>
		</#if>
   	</td>
	<#elseif sAdditionsOptionsVO.OPTION_TYPE==6>
	<#assign fieldLength= 2000/>
	<td width="20%" valign="middle">
		<@ps.label id='lbl_hypLink_${id}_${_pageRef}' for='hypLink_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
  	</td>
	<td width="40%" align="center" colspan="3">
		<table width="100%">
			<tr>
				<td>
					<@ps.textfield id="hypLink_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_TEXT" maxlength="${fieldLength}" onkeyup="$('#hypLink_desc_${id}_${_pageRef}').val($('#hypLink_${id}_${_pageRef}').val())" ></@ps.textfield>
				</td>
			</tr>
			<tr>
				<td width="20%">
			  		<span class="collapsibleIcon"> 
			  			<@ps.textfield id="hypLink_desc_${id}_${_pageRef}" name="smartCOList[${id}].soptionDesc" readonly="true"></@ps.textfield>
					</span>
			  		<span class="collapsibleIcon"> 
			  			<@psj.submit button="true" type="button"  buttonIcon="ui-icon-play" id="run_${id}_${_pageRef}" onclick="openHyperlinkWindow(${id})">
							<@ps.text name="Run_key"></@ps.text>
						</@psj.submit>
					</span>
				</td>
			</tr>
		</table>		
	</td>
	<#elseif sAdditionsOptionsVO.OPTION_TYPE==7>
	<td width="20%" valign="middle">
		<#if sAdditionsDetailsVO.ADDITION_NUMBER??>	
			<@ps.label id='lbl_addText1_${id}_${_pageRef}' for='addText1_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
			<#if soptionDesc?? && soptionDesc == 'true'>
				<script  type="text/javascript">
					setLabelReq('lbl_addText1_${id}_${_pageRef}', '${soptionDesc}');
				</script>
	  		</#if>
		<#else>
			<@ps.label id='lbl_browse_${id}_${_pageRef}' for='browse_${id}_${_pageRef}' key='${sAdditionsTypeVO.BRIEF_NAME_ENG}' value='${sAdditionsTypeVO.BRIEF_NAME_ENG}'></@ps.label>
			<#if soptionDesc?? && soptionDesc == 'true'>
				<script  type="text/javascript">
			
			
					setLabelReq('lbl_browse_${id}_${_pageRef}', '${soptionDesc}');
				</script>
	  		</#if>
		</#if>
  	</td>
	<td width="40%" colspan="3">
		<#if sAdditionsDetailsVO.ADDITION_NUMBER?? || sAdditionsDetailsVO.ADDITION_TEXT??>	
		<div id="externalProgmDiv_${id}_${_pageRef}" >
			<@ps.hidden name='smartCOList[${id}].sAdditionsDetailsVO.ADDITION_NUMBER' ></@ps.hidden>
			<@ps.textfield id="addText1_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.ADDITION_TEXT" readonly="true" ></@ps.textfield>
			<span class="collapsibleIcon">
					<@psj.submit button="true" type="button"  buttonIcon="ui-icon-play" id="run_${id}_${_pageRef}" onclick="downloadExternalFile(${id})">
						<@ps.text name="Download_key"></@ps.text>
					</@psj.submit>
			</span>
			<span class="collapsibleIcon">
				<@psj.submit button="true" type="button"  buttonIcon="ui-icon-trash" id="detach_${id}_${_pageRef}" onclick="detachExternalFile(${id})">
					<@ps.text name="Detach_key"></@ps.text>
				</@psj.submit>
			</span>
		<#else>
			<@ps.file id='browse_${id}_${_pageRef}' name='smartCOList[${id}].externalFile' ></@ps.file>
			<span class="collapsibleIcon">
				<@psj.submit button="true" type="button"  buttonIcon="icon-copy" id="clearExternalFile_${id}_${_pageRef}" onclick="clearExternalFile(${id})">
					<@ps.text name="btn.clear"></@ps.text>
				</@psj.submit>
			</span>
		</div>
		</#if>
   	</td>
	</#if>
	<td width="40%" valign="middle">
		<@ps.textfield id="manualRef_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.MANUAL_REFERENCE" maxlength="50" ></@ps.textfield>
			<#if sAdditionsDetailsVO.ADDITION_TEXT?? 
			&& sAdditionsOptionsVO.DYNAMIC_LOCATION_THIRD_PARTY == "1" 
			&& sAdditionsOptionsVO.SAVE_FILE_IN == "F">
				<@ps.label id='lbl_fileStorageMedia_${id}_${_pageRef}' for='THIRD_PARTY_LOCATION_${id}_${_pageRef}' key='Web Service Repository and File Name' value='Web Service Repository and File Name'></@ps.label>
				<@ps.textfield id="THIRD_PARTY_LOCATION_${id}_${_pageRef}" name="smartCOList[${id}].sAdditionsDetailsVO.THIRD_PARTY_LOCATION" readonly="true" ></@ps.textfield>
			</#if>
	</td>
</tr>
</#if>
<#assign index=index+1 />
</@s.iterator>
</table>
	<@ptt.toolBar id="smartToolbar">
		<#if _smartWindowNewMode?default(false)==false>
			<@psj.submit button="true"  freezeOnSubmit="true" class="excludeCommonStyle" buttonIcon="ui-icon-disk" id="smartDetailSave_${_pageRef}" onClick="smart_setMethodName('save')">
				<@ps.text name="Save_key"></@ps.text>
			</@psj.submit>
			<@psj.a button="true" onclick="closeSmartWindow()"class="excludeCommonStyle" >
				<@ps.text name="Cancel_key"></@ps.text>
			</@psj.a>
		<#else>
			<@psj.submit button="true"  freezeOnSubmit="true" class="excludeCommonStyle" buttonIcon="ui-icon-disk" id="smartDetailNoSave_${_pageRef}" onClick="smart_setMethodName('ok')">
				<@ps.text name="Ok_key"></@ps.text>
			</@psj.submit>
		</#if>
	</@ptt.toolBar>
</#if>
<script  type="text/javascript">
	$(document).ready(function(){ 
		$("#smartWindow_"+ _pageRef).processAfterValid("submitSmartDetails",[]);
	});
</script>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>