<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
function dialogExpression_openMain(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openMessageDialog(\''+options.rowId+'\')">'+test_message_key+'</a>';
}

function returnSettingIcon(cellValue, options, rowObject){
	var link = '<a id="message_job_'+options.rowId+'" onclick="openJobProcessingDialog('+options.rowId+')" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">'+
		'<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">'+
	'</span></a>';
	return link;
}
</script>

<ps:url id="urlISOMessageListGrid" escapeAmp="false" action="ATMInterfaceListAction_loadISOMessageGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.interfaceId" value="atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE"></ps:param>
</ps:url>

<table width="100%">
	<tr>
		<td width="50%" style="vertical-align: top;">
			<div id="iso_message_grid_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px;">
				<div id="iso_messageInner_grid_${_pageRef}" class="collapsibleContainer" title="<ps:text name="Message_key" />">
					<psjg:grid id		="isoMessageListGridTbl_Id_${_pageRef}" 
				      	altRows       	="true"
				 	  	editinline 		="true"
				 	  	editurl			="%{urlISOMessageListGrid}"
				 	  	href			="%{urlISOMessageListGrid}"
				      	dataType   		="json"
				   	  	pager      		="false"
				   	  	rownumbers		="false"
				   	  	sortable   		="true"
					  	filter         	="true"
				   	  	gridModel   	="gridModel"
				   	  	rowNum    		="10"
				   	  	rowList        	="5,10,15,20"
				      	viewrecords 	="true"
				      	navigator    	="true"
				      	navigatorAdd    ="true"
				      	navigatorRefresh="false"
				      	navigatorEdit	="false"
				      	navigatorDelete	="true"
				      	navigatorSearch	="false"
				      	subGridOptions	="{reloadOnExpand:false}"
				      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
				      	addfunc			="ISOMsgLst_addMessage"
				      	delfunc			="ATMLst_deleteMessage"
				      	onSelectRowTopics="rowselect"
				      	onGridCompleteTopics="afterLoadMessages"
				      	shrinkToFit		="true"
				      	height			="255"
				      	width			="460"
				      	pagerButtons	="false"
				      	autowidth		="false"
					>			
						<psjg:gridColumn id="iso_INT_MSGSVO.ATM_ISO_MSGS_CODE" colType="text" leadZeros="4" index="iso_INT_MSGSVO.ATM_ISO_MSGS_CODE" 
							name="iso_INT_MSGSVO.ATM_ISO_MSGS_CODE" width="5" required="true" title="%{getText('request_mti_key')}"
							sortable="false" search="false" align="center" key="true" hidden="true" />	
							
						<psjg:gridColumn id="iso_INT_MSGSVO.REQUEST_MTI" colType="text" index="iso_INT_MSGSVO.REQUEST_MTI" 
							name="iso_INT_MSGSVO.REQUEST_MTI" width="5" required="true" title="%{getText('request_mti_key')}" editable="true" 
							sortable="false" search="false" align="center" 
							editoptions="{dataEvents: [{type: 'change', fn: function(e) { return atmIntLst_checkUniqueMTI(e);}},
													   {type: 'keyup', fn: function(e) { return atmIntLst_checkUniqueMTI(e);}} ], maxlength: '4'}" />		
									
						<psjg:gridColumn id="iso_INT_MSGSVO.REQUEST_DESCRIPTION" name="iso_INT_MSGSVO.REQUEST_DESCRIPTION" index="iso_INT_MSGSVO.REQUEST_DESCRIPTION" colType="text" 
							width="10" editoptions="{maxlength: '50'}"  hidden="true"
							title="%{getText('request_description_key')}" sortable="false" search="false" editable="true" tabindex = "6"  />
							
						<psjg:gridColumn id="iso_INT_MSGSVO.REQUEST_BITMAP1" name="iso_INT_MSGSVO.REQUEST_BITMAP1"  
							editable="true" width="20" hidden="true" sortable="true"
							index="iso_INT_MSGSVO.REQUEST_BITMAP1" colType="text" title="%{getText('Primary Bitmap')}"  />
							
						<psjg:gridColumn id="iso_INT_MSGSVO.REQUEST_BITMAP2" name="iso_INT_MSGSVO.REQUEST_BITMAP2" 
							index="iso_INT_MSGSVO.REQUEST_BITMAP2" colType="text"  hidden="true" sortable="true"
							editable="true" title="%{getText('Secondary Bitmap')}" width="20" />
							
						<%--  response Fields --%>
						<psjg:gridColumn id="iso_INT_MSGSVO.RESPONSE_MTI" colType="text" index="iso_INT_MSGSVO.RESPONSE_MTI" 
							name="iso_INT_MSGSVO.RESPONSE_MTI" width="5" required="true" title="%{getText('response_mti_key')}" editable="true" 
							sortable="false" search="false" align="center"
							editoptions="{dataEvents: [	{type: 'change', fn: function(e) { return atmIntLst_checkUniqueResponseMTI(e);} },
														{type: 'keyup', fn: function(e) { return atmIntLst_checkUniqueResponseMTI(e);} }], maxlength: '4'}" />		
							
						<psjg:gridColumn id="ISO_MSG_EXPRESSION_DETAILS" name="ISO_MSG_EXPRESSION_DETAILS" index="ISO_MSG_EXPRESSION_DETAILS" width="8" colType="text"
					    	formatter="ATMInterfaceMaint_openDialog" title="%{getText('response_expression_key')}" sortable="false" search="false" 
					    	editable="false" tabindex = "6" align="center" />
					    			
						<psjg:gridColumn id="iso_INT_MSGSVO.RESPONSE_DESCRIPTION" name="iso_INT_MSGSVO.RESPONSE_DESCRIPTION" index="iso_INT_MSGSVO.RESPONSE_DESCRIPTION" colType="text" 
							width="10" editoptions="{maxlength: '50'}"  hidden="true"
							title="%{getText('response_description_key')}" sortable="false" search="true" editable="true" tabindex = "6"  />
							
						<psjg:gridColumn id="iso_INT_MSGSVO.RESPONSE_BITMAP1" name="iso_INT_MSGSVO.RESPONSE_BITMAP1"  
							editable="true" width="20" hidden="true" sortable="true"
							index="iso_INT_MSGSVO.RESPONSE_BITMAP1" colType="text" title="%{getText('Primary Bitmap')}"  />
							
						<psjg:gridColumn id="iso_INT_MSGSVO.RESPONSE_BITMAP2" name="iso_INT_MSGSVO.RESPONSE_BITMAP2" 
							index="iso_INT_MSGSVO.RESPONSE_BITMAP2" colType="text"  hidden="true" sortable="true"
							editable="true" title="%{getText('Secondary Bitmap')}" width="20" />   
							
						<psjg:gridColumn id="iso_INT_MSGSVO.MESSAGE_CODE" colType="number" index="iso_INT_MSGSVO.MESSAGE_CODE" 
							name="iso_INT_MSGSVO.MESSAGE_CODE" hidden="true" title="%{getText('MSG_CODE')}"  />
							
						<psjg:gridColumn id="MESSAGE_JOB" colType="MESSAGE_JOB" editable="false" name="MESSAGE_JOB" index="MESSAGE_JOB"
								formatter="returnSettingIcon" title="%{getText('job_key')}" width="5" hidden="true" />
						
						 <ps:if test='%{#statusId_${_pageRef}!=null}'>
							<psjg:gridColumn id="TEST_MSG" name="TEST_MSG" index="TEST_MSG" sortable="false" search="false" colType="text"
								formatter="dialogExpression_openMain" title="%{getText('test_message_key')}" width="10" align="center" />
						</ps:if>
						
						 
					    	
					    <psjg:gridColumn id="iso_INT_MSGSVO.RESPONSE_EXPRESSION" colType="text" index="iso_INT_MSGSVO.RESPONSE_EXPRESSION" width="5" name="iso_INT_MSGSVO.RESPONSE_EXPRESSION" title="%{getText('response_expression_key')}" hidden="true"/>
					</psjg:grid> 
				</div>
			</div>
		</td>
		<td width="50%" style="vertical-align: top;" >
			<%@include file="MessageFieldsList.jsp" %>
		</td>
	</tr>
</table>