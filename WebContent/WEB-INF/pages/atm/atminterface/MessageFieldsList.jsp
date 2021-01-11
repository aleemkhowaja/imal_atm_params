<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<div id="isoFieldsList_${_pageRef}" class="connectedSortable ui-helper-reset" >
<div id="isoFieldsListInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="fields_lst_key" />">
<table>
	<tr>
		<td width="45%" style="vertical-align: top;">
			<div id="requestFieldsList_${_pageRef}" class="connectedSortable ui-helper-reset" >
			<div id="requestFieldsListInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="request_fields_key" />">
				<psjg:grid id		="isoFieldsListGridTbl_Id_${_pageRef}" 
			      	altRows       	="true"
			 	  	editinline 		="true"
			 	  	editurl			="null"
			      	dataType   		="json"
			   	  	pager      		="false"
			   	  	sortable   		="true"
				  	filter         	="false"
			   	  	gridModel   	="gridModel"
			   	  	rowNum    		="10"
			   	  	rowList        	="5,10,15,20"
			      	viewrecords 	="true"
			      	navigator    	="true"
			      	navigatorAdd    ="false"
			      	navigatorRefresh="false"
			      	navigatorEdit	="false"
			      	navigatorDelete	="false"
			      	navigatorSearch	="false"
			      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
			      	shrinkToFit		="true"
			      	pagerButtons	="true"
			      	height			="253"
			      	onGridCompleteTopics="disableMultiCheck"
			      	multiselect		="true"
			      	onSelectRowTopics="fieldSelected"
			      	onSelectAllTopics="allFieldsSelected"
			      	autowidth		="false"
			      	width="270"
			      	rownumbers="true"
				>
					<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_CODE" hidden="true" colType="number" index="iso_INT_FLDSVO.FIELD_CODE" name="iso_INT_FLDSVO.FIELD_CODE"
						title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" key="true" />

					<psjg:gridColumn id="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" colType="number" index="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" name="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE"
						title="%{getText('field_id_key')}" editable="false" sortable="true" search="true" width="5" hidden="true" />
																
					<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_NAME" name="iso_INT_FLDSVO.FIELD_NAME" index="iso_INT_FLDSVO.FIELD_NAME" colType="text" 
						title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="20" />
						
					<psjg:gridColumn id="iso_INT_FLDSVO.FIXED_LENGTH" name="iso_INT_FLDSVO.FIXED_LENGTH" index="iso_INT_FLDSVO.FIXED_LENGTH" colType="number" 
						title="%{getText('Fixed Length')}" sortable="false" search="true" hidden="true" />
						
					<psjg:gridColumn id="iso_INT_FLDSVO.DYNAMIC_LENGTH" colType="number" index="iso_INT_FLDSVO.DYNAMIC_LENGTH" name="iso_INT_FLDSVO.DYNAMIC_LENGTH" 
						title="%{getText('Dynamic Length')}" hidden="true" />
						
				    <psjg:gridColumn id="iso_INT_FLDSVO.PARTIAL_MASK" name="iso_INT_FLDSVO.PARTIAL_MASK" index="iso_INT_FLDSVO.PARTIAL_MASK" colType="text" 
						title="%{getText('Partial Mask')}" hidden="true" />
						
					<psjg:gridColumn id="iso_INT_FLDSVO.TOTAL_MASK_YN" name="iso_INT_FLDSVO.TOTAL_MASK_YN" index="iso_INT_FLDSVO.TOTAL_MASK_YN" 
						colType="text" title="%{getText('Total Mask')}" hidden="true"/>
													
					<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_TYPE" name="iso_INT_FLDSVO.FIELD_TYPE" index="iso_INT_FLDSVO.FIELD_TYPE" colType="text" 
						title="%{getText('Type')}" hidden="true" />
						
					<psjg:gridColumn id="iso_INT_FLDSVO.EXPRESSION" colType="iso_INT_FLDSVO.EXPRESSION" index="EXPRESSION" name="iso_INT_FLDSVO.EXPRESSION"
						title="%{getText('FORMAT')}" hidden="true" />
						
					<psjg:gridColumn id="iso_INT_FLDSVO.IS_DECIMAL_YN" name="iso_INT_FLDSVO.IS_DECIMAL_YN" index="iso_INT_FLDSVO.IS_DECIMAL_YN" 
						colType="text" title="%{getText('Decimal')}" hidden="true" />
					</psjg:grid>
				</div>
			</div>
		</td>
		<ps:if test='%{(#ivcrud_${_pageRef}=="R" && (#statusId_${_pageRef}=="A" || #statusId_${_pageRef}==null)) || #ivcrud_${_pageRef}=="UP"}'>
			<td width="10%">
				<psj:a id="moveRequestFieldsToResponseGrid_${_pageRef}" button="true" onclick="MsgStng_moveRequestFieldsToResponse()">
					<ps:text name='>>' />
				</psj:a>
			</td>
		</ps:if>
		<td width="45%" style="vertical-align: top;">
			<div id="responseFieldsList_${_pageRef}" class="connectedSortable ui-helper-reset" >
				<div id="responseFieldsListInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="response_fields_key" />">
					<psjg:grid id		="isoResponseFieldsListGridTbl_Id_${_pageRef}" 
				      	altRows       	="true"
				 	  	editinline 		="true"
				 	  	editurl			="null"
				      	dataType   		="json"
				   	  	pager      		="false"
				   	  	sortable   		="true"
					  	filter         	="false"
				   	  	gridModel   	="gridModel"
				   	  	rowNum    		="10"
				   	  	rowList        	="5,10,15,20"
				      	viewrecords 	="true"
				      	navigator    	="true"
				      	navigatorAdd    ="false"
				      	navigatorRefresh="false"
				      	navigatorEdit	="false"
				      	navigatorDelete	="false"
				      	navigatorSearch	="false"
				      	subGridOptions	="{reloadOnExpand:false}"
				      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
				      	shrinkToFit		="true"
				      	pagerButtons	="true"
				      	height			="253"
				      	rownumbers="true"
				      	onGridCompleteTopics="disableMultiCheck"
				      	multiselect		="true"
				      	onSelectRowTopics="responseFieldSelected"
				      	onSelectAllTopics="allResponseFieldsSelected"
				      	autowidth		="false"
				      	width="270"
					>
						<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_CODE" hidden="true" colType="number" index="iso_INT_FLDSVO.FIELD_CODE" name="iso_INT_FLDSVO.FIELD_CODE"
							title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" key="true" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" colType="number" index="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE" name="iso_INT_FLDSVO.ATM_ISO_FLDS_CODE"
							title="%{getText('field_id_key')}" editable="false" sortable="true" search="true" width="5" hidden="true" />
											
						<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_NAME" name="iso_INT_FLDSVO.FIELD_NAME" index="iso_INT_FLDSVO.FIELD_NAME" colType="text" 
							title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="20" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.FIXED_LENGTH" name="iso_INT_FLDSVO.FIXED_LENGTH" index="iso_INT_FLDSVO.FIXED_LENGTH" colType="number" 
							title="%{getText('Fixed Length')}" sortable="false" search="true" hidden="true" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.DYNAMIC_LENGTH" colType="number" index="iso_INT_FLDSVO.DYNAMIC_LENGTH" name="iso_INT_FLDSVO.DYNAMIC_LENGTH" 
							title="%{getText('Dynamic Length')}" hidden="true" />
							
					    <psjg:gridColumn id="iso_INT_FLDSVO.PARTIAL_MASK" name="iso_INT_FLDSVO.PARTIAL_MASK" index="iso_INT_FLDSVO.PARTIAL_MASK" colType="text" 
							title="%{getText('Partial Mask')}" hidden="true" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.TOTAL_MASK_YN" name="iso_INT_FLDSVO.TOTAL_MASK" index="iso_INT_FLDSVO.TOTAL_MASK" 
							colType="text" title="%{getText('Total Mask')}" hidden="true"/>
														
						<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_TYPE" name="iso_INT_FLDSVO.FIELD_TYPE" index="iso_INT_FLDSVO.FIELD_TYPE" colType="text" 
							title="%{getText('Type')}" hidden="true" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.EXPRESSION" colType="iso_INT_FLDSVO.EXPRESSION" index="EXPRESSION" name="iso_INT_FLDSVO.EXPRESSION"
							title="%{getText('FORMAT')}" hidden="true" />
							
						<psjg:gridColumn id="iso_INT_FLDSVO.IS_DECIMAL_YN" name="iso_INT_FLDSVO.IS_DECIMAL_YN" index="iso_INT_FLDSVO.IS_DECIMAL_YN" 
							colType="text" title="%{getText('Decimal')}" hidden="true" />
					</psjg:grid>
				</div>
			</div>
		</td>
	</tr>
</table>
</div>
</div>

<script type="text/javascript">
$.subscribe('disableMultiCheck', function(event, data)
{
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$('div#isoFieldsListInner_'+_pageRef+' input[type=checkbox]').attr('disabled','true');
	}
});
</script>