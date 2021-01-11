<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>

<script type="text/javascript">

	$(document).ready(function() {	
		$(".isoMessageDialogCollapsble").collapsiblePanel();	
	});
	
	/**
	 * On Complete request main grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#requestIsoMessageGridTbl_Id_"+_pageRef).subscribe('requestLoadSubGridValues', function(event, data) 
	{
		var gridId = data.id;
		
		//remove subgrid button
		ATMEngineControlMaint_removeSubGrid(gridId);
		
		//removing green color
		$('td').removeClass("path-subgrd-hdr");
		
	});
	
	/**
	 * On Complete response main grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#responseIsoMessageGridTbl_Id_"+_pageRef).subscribe('responseLoadSubGridValues', function(event, data) 
	{
		var gridId = data.id;
		
		//remove subgrid button
		ATMEngineControlMaint_removeSubGrid(gridId);
		
		//removing green color
		$('td').removeClass("path-subgrd-hdr");
	});
	
	/**
	 * On click of main request grid row to load the sub grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#requestIsoMessageGridTbl_Id_"+_pageRef).subscribe('afterSubGridLoad', function(event, data) 
	{
		ATMEngineControlMaint_loadISOSubFields("request");
	});
		
	/**
	 * On click of main response grid row to load the sub grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#responseIsoMessageGridTbl_Id_"+_pageRef).subscribe('afterSubGridLoad', function(event, data) 
	{
		ATMEngineControlMaint_loadISOSubFields("response");
	});
</script>

<ps:url id="urlRequestISOMessageData" escapeAmp="false" action="ATMEngineControlListAction_returnISOMessageData" 
	namespace="/path/atmenginecontrol/">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.requestMap"    value="atmEngineControlCO.incoming_Req_DetailVO.REQUEST_MAP"></ps:param>
   <ps:param name="criteria.interfaceid"   value="atmEngineControlCO.incoming_ReqVO.INTERFACE_ID"></ps:param>
</ps:url>


<ps:form id="iso_msg_dialog_${_pageRef}" applyChangeTrack="true" useHiddenProps="true" namespace="/path/atmInterface" >
	<div id="so_message_request_div_${_pageRef}" class="isoMessageDialogCollapsble" title="<ps:text name="iso_message_request_key"/>"
		style="margin-bottom: 5px;" > 
		<table >
			<tr>
				<td width="30%" style="vertical-align: top;">
					<ps:textarea id="requestIsoMessage_${_pageRef}" readonly="true" cols="80" rows="12" name="atmEngineControlCO.incoming_ReqVO.MESSAGE_REQUEST" cssClass="jqte-dialogDynamicEditor"></ps:textarea>
				</td>
				<td  style="vertical-align: top;">
							<psjg:grid id		="requestIsoMessageGridTbl_Id_${_pageRef}" 
						      	altRows       	="true"
						 	  	editinline 		="false"
						 	  	editurl			=" "
						 	  	href			="%{urlRequestISOMessageData}"
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
						      	subGridOptions	="{reloadOnExpand:false,selectOnExpand:true}"
						      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
						      	shrinkToFit		="true"
						      	onCompleteTopics="requestLoadSubGridValues"
						      	onGridCompleteTopics="requestLoadSubGridValues"
						      	onSelectRowTopics="afterSubGridLoad"
						      	pagerButtons	="true"
						      	height			="110">
							    <psjg:grid
									id               ="subFieldsValuesGridTbl_Id_${_pageRef}"
								    subGridUrl       =" "
								    dataType         ="json"
									pager            ="false"
									sortable         ="true"
									filter           ="false"
									gridModel        ="gridModel"
									rowNum           ="5"
									rowList          ="5,10,15,20"
								    viewrecords      ="false"
								    navigator        ="true"
								    editinline		 ="true"
								    editurl			 =" "
								    navigatorDelete  ="false"
								    navigatorEdit    ="false"
								    navigatorRefresh ="false"
								    navigatorAdd     ="false"
								    navigatorSearch  ="false"
								    disableEditableFocus="true"
								    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
								    altRows          ="true"
								    shrinkToFit      ="true" >
								        
								    <psjg:gridColumn id="fieldCode" colType="number" index="fieldCode" name="fieldCode" key="true"
										title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="20" />
															
									<psjg:gridColumn id="fieldName" colType="text" index="fieldName" name="fieldName"
										title="%{getText('field_name_key')}" editable="false" sortable="true" search="true" width="40" />
															
									<psjg:gridColumn id="fieldValue" colType="text" index="fieldValue" name="fieldValue" 
										title="%{getText('value_key')}" editable="false" sortable="true" search="true" width="30" />
									</psjg:grid>
							
								<psjg:gridColumn id="fieldCode" colType="number" index="fieldCode" name="fieldCode" key="true"
									title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="20" />
													
								<psjg:gridColumn id="fieldName" name="fieldName" index="fieldName" colType="text" 
									title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="40" />
												
								<psjg:gridColumn id="fieldValue" colType="text" index="fieldValue" name="fieldValue"
									title="%{getText('Value')}" width="30"/>
									
								<psjg:gridColumn id="subGridData" colType="text" hidden="true" index="subGridData" name="subGridData"
									title="%{getText('value_key')}" width="20"/>
							</psjg:grid>
				</td>
			</tr>
	 </table>
</div>

<ps:url id="urlResponseISOMessageData" escapeAmp="false" action="ATMEngineControlListAction_returnISOMessageData" 
	namespace="/path/atmenginecontrol/">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
    <ps:param name="criteria.responseMap"   value="atmEngineControlCO.outgoing_RespVO.RESPONSE_MAP"></ps:param>
   <ps:param name="criteria.interfaceid" value="atmEngineControlCO.incoming_ReqVO.INTERFACE_ID"></ps:param>
</ps:url>

<div id="so_message_response_div_${_pageRef}" class="isoMessageDialogCollapsble" title="<ps:text name="iso_message_response_key"/>"
		style="margin-bottom: 5px;" > 
 	<table>
		<tr>
			<td width="30%" style="vertical-align: top;" >
						<ps:textarea id="responseIsoMessage_${_pageRef}" readonly="true" cols="80" rows="12" name="atmEngineControlCO.outgoing_RespVO.ISO_RESPONSE" cssClass="jqte-dialogDynamicEditor"></ps:textarea>
			</td>
			<td style="vertical-align: top;">
						<psjg:grid id		="responseIsoMessageGridTbl_Id_${_pageRef}" 
					      	altRows       	="true"
					 	  	editinline 		="false"
					 	  	editurl			=""
					 	  	href			="%{urlResponseISOMessageData}"
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
					      	subGridOptions	="{reloadOnExpand:false,selectOnExpand:true}"
					      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					      	shrinkToFit		="true"
					      	onCompleteTopics="responseLoadSubGridValues"
					      	onSelectRowTopics="afterSubGridLoad"
					      	onGridCompleteTopics="responseLoadSubGridValues"
					      	pagerButtons	="true"
					      	height			="110">
						    <psjg:grid
								id               ="responseSubFieldsValuesGridTbl_Id_${_pageRef}"
							    subGridUrl       =" "
							    dataType         ="json"
								pager            ="false"
								sortable         ="true"
								filter           ="false"
								gridModel        ="gridModel"
								rowNum           ="5"
								rowList          ="5,10,15,20"
							    viewrecords      ="false"
							    navigator        ="true"
							    editinline		 ="true"
							    editurl			 =" "
							    navigatorDelete  ="false"
							    navigatorEdit    ="false"
							    navigatorRefresh ="false"
							    navigatorAdd     ="false"
							    navigatorSearch  ="false"
							    disableEditableFocus="true"
							    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
							    altRows          ="true"
							    shrinkToFit      ="true" >
							        
							    <psjg:gridColumn id="fieldCode" colType="number" index="fieldCode" name="fieldCode" key="true"
									title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="20" />
														
								<psjg:gridColumn id="fieldName" colType="text" index="fieldName" name="fieldName"
									title="%{getText('field_name_key')}" editable="false" sortable="true" search="true" width="40" />
														
								<psjg:gridColumn id="fieldValue" colType="text" index="fieldValue" name="fieldValue" 
									title="%{getText('value_key')}" editable="false" sortable="true" search="true" width="30" />
								</psjg:grid>
						
							<psjg:gridColumn id="fieldCode" colType="number" index="fieldCode" name="fieldCode" key="true"
								title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="20" />
												
							<psjg:gridColumn id="fieldName" name="fieldName" index="fieldName" colType="text" 
								title="%{getText('field_name_key')}" sortable="false" search="true" editable="false" width="40" />
											
							<psjg:gridColumn id="fieldValue" colType="text" index="fieldValue" name="fieldValue"
								title="%{getText('Value')}" width="30"/>
								
							<psjg:gridColumn id="subGridData" colType="text" hidden="true" index="subGridData" name="subGridData"
								title="%{getText('value_key')}" width="20"/>
						</psjg:grid>
					</td>
			</tr>
		</table>
		<ps:hidden name="messageRowId" id="messageRowId_${_pageRef}"></ps:hidden>
</ps:form>

