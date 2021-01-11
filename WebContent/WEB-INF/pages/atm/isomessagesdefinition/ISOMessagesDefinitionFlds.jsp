<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
	/**
		Add Expression link in grid
	**/
	function ISOMsgDefFlds_openDialog(cellvalue, options, rowObject)
	{
		var columnName = options.colModel.name;
		var gridId =  options.gid;
		return '<a href="#" onclick="iSOMessagesDefinitionFlds_openExpressionDialog(\''+false+'\',\''+gridId+'\',\''+options.rowId+'\',\''+columnName+'\')">'+expression_details_key+'</a>';
	}
	
	/**
		On Grid Complete topics event
	**/
	$("#requestIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).subscribe("selectAllRequestFields",	function(rowObj) {
		
		 /**
		 * Select save field Rows
		 */
		 iSOMessagesDefinitionFlds_selectSavedFields("request");
		
		/**
			Set ISO Fields Bit Map
		**/
		iSOMessagesDefinitionFlds_setBitMap("request");
	});
	
	/**
		On Select Row  For Request
	**/
	$("#requestIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).subscribe("requestSelectRow",	function(rowObj) {
		/**
			Set ISO Fields Bit Map
		**/
		iSOMessagesDefinitionFlds_setBitMap("request");
		
		//set flag=1 after fields change for form change
		$("#isFormChanged_" + _pageRef).val("1");
	});
	
	
	/**
		On Grid Complete topics event
	**/
	$("#responseIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).subscribe("selectAllResponseFields",	function(rowObj) {
		
		 /**
		 * Select save field Rows
		 */
		 iSOMessagesDefinitionFlds_selectSavedFields("response");
		 
		/**
			Set ISO Fields Bit Map
		**/
		iSOMessagesDefinitionFlds_setBitMap("response");
	});
	
	
	/**
		On Select Row  For Request
	**/
	$("#responseIsoMsgDefFieldsListGridTbl_Id_" + _pageRef).subscribe("responseSelectRow",	function(rowObj) {
		/**
			Set ISO Fields Bit Map
		**/
		iSOMessagesDefinitionFlds_setBitMap("response");
		
		//set flag=1 after fields change for form change
		$("#isFormChanged_" + _pageRef).val("1");
	});

</script>


	<ps:hidden id="requestPrimaryBitMap_${_pageRef}" 		name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.REQUEST_PRI_BITMAP" />
	<ps:hidden id="requestSecondaryBitMap_${_pageRef}" 		name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.REQUEST_SEC_BITMAP" />
	<ps:hidden id="responsePrimaryBitMap_${_pageRef}" 		name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.RESPONSE_PRI_BITMAP" />
	<ps:hidden id="responseSecondaryBitMap_${_pageRef}" 	name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.RESPONSE_SEC_BITMAP" />


	<!-- Expression Hidden Fields -->
	<ps:hidden name="updates" id="updateMachineIdParameter_${_pageRef}"></ps:hidden>
	<ps:hidden type="hidden" id="dialogOpenFrom_${_pageRef}" name="dialogOpenFrom"/>
	<ps:hidden type="hidden" id="dialogOpenFromGrid_${_pageRef}" name="dialogOpenFromGrid"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowId_${_pageRef}" name="dialogOpenFromGridRowId"/>
	<ps:hidden type="hidden" id="dialogOpenFromGridRowColumn_${_pageRef}" name="dialogOpenFromGridRowColumn"/>

<ps:url id="urlIsoMsgDefFieldsListGrid" escapeAmp="false" action="ISOMessagesDefinitionListAction_loadFieldsByInterfaceCodeAndMTICode" 
		namespace="/path/iSOMessagesDefinition">
   <ps:param 	name="iv_crud"  								value="ivcrud_${_pageRef}"></ps:param>
   <ps:param 	name="_pageRef" 								value="_pageRef"></ps:param>
   <ps:param 	name="criteria.interfaceId" 					value="lookuptxt_atm_interface_${_pageRef}"></ps:param>
   <ps:param 	name="criteria.messageId" 						value="lookuptxt_mti_${_pageRef}"></ps:param>
   <ps:param 	name="criteria.isIsoReqAndResponseFields" 		value="true"></ps:param>
</ps:url>

<div id="requestResponseFldsListInner_${_pageRef}" class="isoMessagesDefinitionCollapsableDiv collapsibleContainer" title="<ps:text name="request_response_fields_key" />"
		style="display: none;">
	<table>
		<tr>
			<td width="50%" style="vertical-align: top;">
				<div id="requestFldsListInner_${_pageRef}" class="isoMessagesDefinitionCollapsableDiv collapsibleContainer" title="<ps:text name="request_fields_key" />">
					<psjg:grid id		="requestIsoMsgDefFieldsListGridTbl_Id_${_pageRef}" 
				      	altRows       	="true"
				 	  	editinline 		="true"
				 	  	editurl			=" "
				 	  	href			="%{abc}"
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
				      	multiselect		="true"
				      	autowidth		="false"
				      	width="500"
				      	rownumbers="true"
				      	onSelectRowTopics="requestSelectRow"
				      	onGridCompleteTopics="selectAllRequestFields">
				      	
				      	<psjg:gridColumn id="net_MSG_FLDSVO.NET_MSG_FLD_ID" colType="number" index="net_MSG_FLDSVO.NET_MSG_FLD_ID" name="net_MSG_FLDSVO.NET_MSG_FLD_ID"
							title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" hidden="true" />
				      	
						<psjg:gridColumn id="net_MSG_FLDSVO.FIELD_CODE" colType="number" index="net_MSG_FLDSVO.FIELD_CODE" name="net_MSG_FLDSVO.FIELD_CODE"
							title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" key="true" />
							
	
						<psjg:gridColumn id="fieldName" name="fieldName" index="fieldName" colType="text" 
							title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="20" />
							
						<psjg:gridColumn id="EXPRESSION_DIALOG_${_pageRef}" name="REQUEST" index="EXPRESSION_DIALOG" width="8" colType="text"
					    	formatter="ISOMsgDefFlds_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
					    	editable="false" tabindex = "2" align="center" />
	    	
						<psjg:gridColumn id="net_MSG_FLDSVO.EXPRESSION" colType="text" index="EXPRESSION" name="net_MSG_FLDSVO.EXPRESSION"
							title="%{getText('Expression')}" hidden="true" />
							
					</psjg:grid>
				</div>
			</td>
			
			<td width="50%" style="vertical-align: top;">
				<div id="responseFldsListInner_${_pageRef}" class="isoMessagesDefinitionCollapsableDiv collapsibleContainer" title="<ps:text name="response_fields_key" />">
					<psjg:grid id		="responseIsoMsgDefFieldsListGridTbl_Id_${_pageRef}" 
				      	altRows       	="true"
				 	  	editinline 		="true"
				 	  	editurl			=" "
				 	  	href			="%{abc}"
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
				      	multiselect		="true"
				      	autowidth		="false"
				      	width="500"
				      	rownumbers="true"
				      	onSelectRowTopics="responseSelectRow"
				      	onGridCompleteTopics="selectAllResponseFields">
				      	
						<psjg:gridColumn id="net_MSG_FLDSVO.NET_MSG_FLD_ID" colType="number" index="net_MSG_FLDSVO.NET_MSG_FLD_ID" name="net_MSG_FLDSVO.NET_MSG_FLD_ID"
							title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" hidden="true" />
				      	
						<psjg:gridColumn id="net_MSG_FLDSVO.FIELD_CODE" colType="number" index="net_MSG_FLDSVO.FIELD_CODE" name="net_MSG_FLDSVO.FIELD_CODE"
							title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" key="true" />
							
	
						<psjg:gridColumn id="fieldName" name="fieldName" index="fieldName" colType="text" 
							title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="20" />
							
						<psjg:gridColumn id="EXPRESSION_DIALOG_${_pageRef}" name="RESPONSE" index="EXPRESSION_DIALOG" width="8" colType="text"
					    	formatter="ISOMsgDefFlds_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
					    	editable="false" tabindex = "2" align="center" />
	    	
						<psjg:gridColumn id="net_MSG_FLDSVO.EXPRESSION" colType="text" index="EXPRESSION" name="net_MSG_FLDSVO.EXPRESSION"
							title="%{getText('Expression')}" hidden="true" />

					</psjg:grid>
				</div>
			</td>
		</tr>
	</table>
</div>