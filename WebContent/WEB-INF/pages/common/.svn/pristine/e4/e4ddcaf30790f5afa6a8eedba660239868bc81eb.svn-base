<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign ptt=JspTaglibs["/WEB-INF/tld/path-toolbar-tags.tld"]>

<script type="text/javascript">
	$.struts2_jquery.require("/common/js/additionalfields/AdditionalFieldsByType.js","",'${base}');
</script> 

	<#if (additionalFieldsByTypeCOList?? && additionalFieldsByTypeCOList?size>0) >
		<#assign index=1/>   <#assign trCounter=1/> <#assign trOpen=0/> 
		<input type='text' size='1' style='position:relative;top:-1000px;height:0px;'></input>
		<@ps.iterator value="additionalFieldsByTypeCOList" var="additionalFieldsByType" status="addFieldStatus">
			<#if additionalFieldsByTypeCOList[addFieldStatus.index].cifDataAddFieldsVO.ENTITY?? && additionalFieldsByTypeCOList[addFieldStatus.index].cifDataAddFieldsVO.ENTITY =="CIF">	
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].cifDataAddFieldsVO.CIF_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].cifDataAddFieldsVO.COL_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].cifDataAddFieldsVO.COMP_CODE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].cifDataAddFieldsVO.ENTITY' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].cifDataAddFieldsVO.ENTITY_TYPE' ></@ps.hidden>
			<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].amfDataAddFieldsVO.ENTITY?? && additionalFieldsByTypeCOList[addFieldStatus.index].amfDataAddFieldsVO.ENTITY =="AMF">	
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.ACC_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.BRANCH_CODE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.COL_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.COMP_CODE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.ENTITY' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].amfDataAddFieldsVO.ENTITY_TYPE' ></@ps.hidden>
			<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].ctstrsDataAddFieldsVO.ENTITY?? && additionalFieldsByTypeCOList[addFieldStatus.index].ctstrsDataAddFieldsVO.ENTITY =="CTSTRS">	
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.BRANCH_CODE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.COL_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.COMP_CODE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.ENTITY' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.ENTITY_TYPE' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctstrsDataAddFieldsVO.TRS_NO' ></@ps.hidden>
				<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctsAddFieldVO.UNIQUE_YN' ></@ps.hidden>
			</#if>	
			<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].SHOW' ></@ps.hidden>
			<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].FIELD_LABEL' ></@ps.hidden>
			<@ps.hidden name='additionalFieldsByTypeCOList[${addFieldStatus.index}].MANDATORY' ></@ps.hidden>
			<@ps.hidden id='additionalFieldsByTypeFieldType_${index}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].FIELD_TYPE' ></@ps.hidden>
			<@ps.hidden id='additionalFieldsByTypeFieldSeq_${index}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].FIELD_SEQ' ></@ps.hidden>
			
			<#if addFieldStatus.first==true>
				
				<#if additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="L">
				
					<div class="ui-state-focus ui-corner-top">&nbsp;&nbsp;<@ps.label> ${additionalFieldsByType.FIELD_LABEL} </@ps.label></div>
					
				</#if>	
				<table width="100%" border="0" style="padding:0 10px;" class="ui-widget-content">
					<tr>
						<td width="15%"></td>
						<td width="12%"></td>
						<td width="23%"></td>
						<td width="15%"></td>
						<td width="12%"></td>
						<td width="23%"></td>
					</tr>	
			<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="L">
				</table>
				<#if trOpen==1>
				</tr>
				<#assign trOpen=0 />
				<#if (trCounter>1 && trCounter%2==0)>
				<#assign trCounter=trCounter+1 />
				
				</#if>	
				</#if>	
				<div class="ui-state-focus ui-corner-top">&nbsp;&nbsp;<@ps.label> ${additionalFieldsByType.FIELD_LABEL} </@ps.label></div>
				<#if  addFieldStatus.last!=true>
					
					<table width="100%" border="0" style="padding:0 10px;" class="ui-widget-content">
						<tr>
							<td width="15%"></td>
							<td width="12%"></td>
							<td width="23%"></td>
							<td width="15%"></td>
							<td width="12%"></td>
							<td width="23%"></td>
						</tr>
				</#if>	
				
			</#if>
			
			<#if additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE!="L">
			
				<#if trCounter==1 ||(trCounter>1 && trCounter%2!=0)>
					<tr>
					<#assign trOpen=1 />
				</#if>
				<td class="fldLabelView">
					<#if additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="N" && additionalFieldsByTypeCOList[addFieldStatus.index].LOOKUP_TYPE =="S" >
						<@ps.label id='lbl_addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' for='lookuptxt_addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' key='${additionalFieldsByType.FIELD_LABEL}' value='${additionalFieldsByType.FIELD_LABEL}'></@ps.label>
					<#else>
						<@ps.label id='lbl_addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' for='addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' key='${additionalFieldsByType.FIELD_LABEL}' value='${additionalFieldsByType.FIELD_LABEL}'></@ps.label>
					</#if>
					
				</td>
				<#if additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="V">
					<td colspan="2">
					<@ps.textfield id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_VC" maxlength="${additionalFieldsByType.FIELD_LENGHT}" minlength="${additionalFieldsByType.MIN_FIELD_LENGTH}" />
					</td>
				<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="D">
					<td colspan="2">
						<#if additionalFieldsByType.DATE_VALIDATION_OPERATOR?? && additionalFieldsByType.DATE_VALIDATION_OPERATOR!="N">	
							
							<@ps.hidden id='additionalFieldsByTypeDateValidationOperator_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].DATE_VALIDATION_OPERATOR' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeDateValidation_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].DATE_VALIDATION' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddDateCompareTo_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addDateCompareTo' ></@ps.hidden>
							<#if additionalFieldsByType.DATE_VALIDATION ?? && ( additionalFieldsByType.DATE_VALIDATION =="F" || additionalFieldsByType.DATE_VALIDATION =="C" || additionalFieldsByType.DATE_VALIDATION =="X" || additionalFieldsByType.DATE_VALIDATION =="A")>
								<@ps.hidden id='additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].CODE' ></@ps.hidden>
								<@ps.hidden id='additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COLUMN_NUMBER' ></@ps.hidden>
								<@ps.hidden id='additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COMP_CODE' ></@ps.hidden>
								<@ps.hidden id='additionalFieldsByTypeAddDateCompareToElemId_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addDateCompareToElemId' ></@ps.hidden>
								<@ps.hidden id='additionalFieldsByTypeAddDateCompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addDateCompareToElemLabel' ></@ps.hidden>
							</#if>
							
						</#if>
						<@psj.datepicker id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_DT" buttonImageOnly="true"
							dependencySrc="${base}/path/additionalFields/additionalFieldsByType_validateAdditionalFieldDate" 
							dependency="${additionalFieldsByType.dependency}" parameter="${additionalFieldsByType.additionalParam}" />
					</td>
				<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE=="N">
					<#if additionalFieldsByType.PARAM1_LINK?? >
						<#if additionalFieldsByType.PARAM_VALUE1 ?? && (additionalFieldsByType.PARAM_VALUE1 =="X1" ||
							additionalFieldsByType.PARAM_VALUE1 =="C1" || additionalFieldsByType.PARAM_VALUE1 =="A1" ||
							additionalFieldsByType.PARAM_VALUE1 =="F1" )>
							<@ps.hidden id='additionalFieldsByTypeAddParam1CompareToElemId_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addField1CompareToElemId' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddParam1CompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' ></@ps.hidden>
						</#if>
					</#if>
				
					<#if additionalFieldsByType.PARAM2_LINK?? >
						<#if additionalFieldsByType.PARAM_VALUE2 ?? && (additionalFieldsByType.PARAM_VALUE2 =="X1" ||
							additionalFieldsByType.PARAM_VALUE2 =="C1" || additionalFieldsByType.PARAM_VALUE2 =="A1" ||
							additionalFieldsByType.PARAM_VALUE2 =="F1" )>
							<@ps.hidden id='additionalFieldsByTypeAddParam2CompareToElemId_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addField2CompareToElemId' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddParam2CompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' ></@ps.hidden>
						</#if>
					</#if>
					
					<#if additionalFieldsByType.PARAM3_LINK?? >
						<#if additionalFieldsByType.PARAM_VALUE3 ?? && (additionalFieldsByType.PARAM_VALUE3 =="X1" ||
							additionalFieldsByType.PARAM_VALUE3 =="C1" || additionalFieldsByType.PARAM_VALUE3 =="A1" ||
							additionalFieldsByType.PARAM_VALUE3 =="F1" )>
							<@ps.hidden id='additionalFieldsByTypeAddParam3CompareToElemId_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addField3CompareToElemId' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddParam3CompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' ></@ps.hidden>
						</#if>
					</#if>
					
					<#if additionalFieldsByType.PARAM4_LINK?? >
						<#if additionalFieldsByType.PARAM_VALUE4 ?? && (additionalFieldsByType.PARAM_VALUE4 =="X1" ||
							additionalFieldsByType.PARAM_VALUE4 =="C1" || additionalFieldsByType.PARAM_VALUE4 =="A1" ||
							additionalFieldsByType.PARAM_VALUE4 =="F1" )>
							<@ps.hidden id='additionalFieldsByTypeAddParam4CompareToElemId_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addField4CompareToElemId' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddParam4CompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' ></@ps.hidden>
						</#if>
					</#if>
					
					<#if additionalFieldsByType.PARAM5_LINK?? >
						<#if additionalFieldsByType.PARAM_VALUE5 ?? && (additionalFieldsByType.PARAM_VALUE5 =="X1" ||
							additionalFieldsByType.PARAM_VALUE5 =="C1" || additionalFieldsByType.PARAM_VALUE5 =="A1" ||
							additionalFieldsByType.PARAM_VALUE5 =="F1" )>
							<@ps.hidden id='additionalFieldsByTypeAddParam5CompareToElemId_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].addField5CompareToElemId' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeAddParam5CompareToElemLabel_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' ></@ps.hidden>
						</#if>
					</#if>
						
						<#if additionalFieldsByTypeCOList[addFieldStatus.index].LOOKUP_TYPE =="N">
							<#if additionalFieldsByType.DESC_OUTPUT?? >
								<td valign="middle">
							<#else>
								<td valign="middle" colspan="2">
							</#if>
								<#if additionalFieldsByTypeCOList[addFieldStatus.index].numberDependency?default(false)==true>
									<@ps.hidden id='additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].CODE' ></@ps.hidden>
									<@ps.hidden id='additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COLUMN_NUMBER' ></@ps.hidden>
									<@ps.hidden id='additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COMP_CODE' ></@ps.hidden>
									<@ps.hidden id='additionalFieldsByTypeNumberDependency_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].numberDependency' ></@ps.hidden>
									<@ps.textfield id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM" mode="number" 
										dependencySrc="${base}/pathdesktop/AdditionalFieldsByTypeDependencyAction_dependencyByCode"
										dependency="${additionalFieldsByType.dependency}"
										parameter="numberDependency:additionalFieldsByTypeNumberDependency_${additionalFieldsByType.FIELD_SEQ},dependencyCode:addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},CTS_ADD_FIELDSVO_CODE:additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},COLUMN_NUMBER:additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},compCode:additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}${additionalFieldsByType.additionalParam}" />
								<#else>
									<@ps.textfield id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM" mode="number" maxlength="18" nbFormat="##0.000" maxValue="99999999999999.999" />
								</#if>
								
							</td>
							<#if additionalFieldsByType.DESC_OUTPUT?? >
								<@ps.hidden id='additionalFieldsByTypeLookupDesc_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].lookupDesc' ></@ps.hidden>
						    <td >  	
								<@ps.textfield id='addFieldsByType_data_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM_DESC" readonly="true"></@ps.textfield>
						   	</td>
						   	</#if>
						<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].LOOKUP_TYPE =="S" >
							<@ps.hidden id='additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].CODE' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COLUMN_NUMBER' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COMP_CODE' ></@ps.hidden>
							<@ps.hidden id='additionalFieldsByTypeLookupDesc_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].lookupDesc' ></@ps.hidden>
							<#if additionalFieldsByType.DESC_OUTPUT?? >
							<td valign="middle">
							<#else>
							<td valign="middle" colspan="2">
							</#if>
								<@psj.livesearch id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM" 
						   			mode="number"	
						   			paramList ="CTS_ADD_FIELDSVO_CODE:additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},COLUMN_NUMBER:additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},compCode:additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}${additionalFieldsByType.additionalParam}"
						   			actionName="${base}/pathdesktop/AddFieldsByTypeOptions_constructLookup"  
						   			searchElement='${additionalFieldsByType.DATA_ENTRY}' 
						   			dependencySrc="${base}/pathdesktop/AdditionalFieldsByTypeDependencyAction_dependencyByCode"
						   			dependency="${additionalFieldsByType.dependency}"
						   			relatedDescElt="addFieldsByType_data_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}"
						   			parameter="dependencyCode:lookuptxt_addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},CTS_ADD_FIELDSVO_CODE:additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},COLUMN_NUMBER:additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},compCode:additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}${additionalFieldsByType.additionalParam}" >
								</@psj.livesearch>
							</td>
							<#if additionalFieldsByType.DESC_OUTPUT?? >
						    <td >  	
								<@ps.textfield id='addFieldsByType_data_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM_DESC" readonly="true"></@ps.textfield>
						   	</td>
						   	</#if>
						<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].LOOKUP_TYPE =="H">
							<td valign="middle">
								<@psj.livesearch id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}" name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM" 
						   			mode="number"	
						   			paramList =""
						   			actionName=""  
						   			searchElement="" 
						   			dependencySrc=""
						   			dependency=""
						   			parameter=""
						   			relatedDescElt="addFieldsByType_data_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}"
						   			readOnlyMode="true" >
								</@psj.livesearch>
							</td>
						    <td >  	
								<@ps.textfield id='addFieldsByType_data_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_NUM_DESC" readonly="true"></@ps.textfield>
						   	</td>
						</#if>
						
						<#elseif additionalFieldsByTypeCOList[addFieldStatus.index].FIELD_TYPE =="R">
						  <@ps.hidden id='additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].CODE' ></@ps.hidden>
						  <@ps.hidden id='additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].COLUMN_NUMBER' ></@ps.hidden>
						  <@ps.hidden id='additionalFieldsByTypeLIST_CODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}' name='additionalFieldsByTypeCOList[${addFieldStatus.index}].ctsAddFieldDrpDwnDefVOList[${addFieldStatus.index}].LIST_CODE' ></@ps.hidden>	
							<td colspan="2">
								<@ps.select 
									list="ctsAddFieldDrpDwnDefVOList" 
			  		                name="additionalFieldsByTypeCOList[${addFieldStatus.index}].ADD_DR" 
			  		                id="addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef}"
			  		                listKey="LINE_NO"
			  		                emptyOption="true"
			  		                listValue="FIELD_LABEL"
			  		                dependencySrc="${base}/pathdesktop/AdditionalFieldsByTypeDependencyAction_dependencyByCode?_pageRef=${_pageRef}"
						   			dependency="${additionalFieldsByType.dependency}"
						   			parameter="listCode:additionalFieldsByTypeLIST_CODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},dependencyCode:addFieldsByType_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},CTS_ADD_FIELDSVO_CODE:additionalFieldsByTypeCODE_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},COLUMN_NUMBER:additionalFieldsByTypeCOLUMN_NUMBER_${additionalFieldsByType.FIELD_SEQ}_${_pageRef},compCode:additionalFieldsByTypeCOMP_CODE_${additionalFieldsByType.FIELD_SEQ}${additionalFieldsByType.additionalParam}"/>
							</td>
				</#if>
				
				<#if  addFieldStatus.last==true>
					</tr>
					</table>
				<#elseif (trCounter>1 && trCounter%2==0)>
					<#assign trOpen=0 />
					</tr>
				</#if>
				<#assign trCounter=trCounter+1 />
			</#if>	
			<#assign index=index+1 />
		</@ps.iterator>
		<@ps.hidden id='additionalFieldsByTypeRowCount_${_pageRef}' value='${index}' ></@ps.hidden>
	<#elseif errorMessage?? >
		${errorMessage}
	</#if>
	
<script type="text/javascript">

$(document).ready(function() 
{ 
	initAddFields();
});
</script>