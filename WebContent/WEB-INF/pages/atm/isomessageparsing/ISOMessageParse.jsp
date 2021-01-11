<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>

<script type="text/javascript">
	$.struts2_jquery.require("ISOMessageParse.js", null, jQuery.contextPath+ "/path/js/atm/isomessageparsing/");
	
	/**
	 * On Complete request main grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#requestIsoMessageGridTbl_Id_"+_pageRef).subscribe('loadSubGridValues', function(event, data) 
	{
		//removing green color
		$('td').removeClass("path-subgrd-hdr");
	});
	
	/**
	 * On Complete response main grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#responseIsoMessageGridTbl_Id_"+_pageRef).subscribe('loadSubGridValues', function(event, data) 
	{
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
		ISOMessageParse_loadMessageValuesForInnerFields();
	});
		
	/**
	 * On click of main response grid row to load the sub grid
	 * @param event
	 * @param data
	 * @returns
	 */
	$("#responseIsoMessageGridTbl_Id_"+_pageRef).subscribe('afterSubGridLoad', function(event, data) 
	{
		ISOMessageParse_loadMessageValuesForInnerFields();
	});
</script>

<ps:form id="iso_msg_dialog_${_pageRef}" applyChangeTrack="true" useHiddenProps="true" namespace="/path/atmInterface" >
	<table>	
		<tr>
			<tr>
				<td nowrap="nowrap">
					<ps:label
						id="lbl_interface_${_pageRef}"
						key="interface_key" for="lookuptxt_atm_interface_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<psj:livesearch
						actionName="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupAction_constructLookup"
						id="atm_interface_${_pageRef}"
						name="isomessagesdefinitionCO.gtw_ATM_ISO_MSG_DEF.INTERFACE_CODE"
						paramList="compCode:companyCode_hdn_${_pageRef}" mode="number"
						size="5" maxlength="16" maxValue="9999999999999999"
						parameter="atmInterfaceSC.interfaceId:lookuptxt_atm_interface_${_pageRef}"
						dependency="lookuptxt_atm_interface_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.INTERFACE_CODE,
						interfaceDescription_${_pageRef}:atmInterfaceCO.iso_INTERFACESVO.DESCRIPTION, lookuptxt_mti_${_pageRef}:'',mtiDescription_${_pageRef}:''"
						dependencySrc="${pageContext.request.contextPath}/path/atmInterfaces/ATMInterfacesLookupDependancyAction_returnATMInterfaceDetails"
						resultList="iso_INTERFACESVO.INTERFACE_CODE:lookuptxt_atm_interface_${_pageRef},iso_INTERFACESVO.DESCRIPTION:interfaceDescription_${_pageRef}"
						searchElement="iso_INTERFACESVO.DESCRIPTION"
						required="true"
						>
					</psj:livesearch>
				</td>
				<td class="fldDataEdit center"  width="80%" >
					<ps:textfield
						id="interfaceDescription_${_pageRef}" name="isomessagesdefinitionCO.atmInterfaceDescription"
						readonly="true" tabindex="-1" cssStyle="height:20px" />
				</td>
			</tr>
	</table>
	
	<table>
		<tr> </tr>
		<tr>
			<td>
				<psj:a id="parseRequestISOMessage_${_pageRef}" cssStyle=" width:100%" button="true" onclick="ISOMessageParse_parseAndRunISOMessage(false)">
					<ps:text name='parse_request_iso_msg_key' />
				</psj:a>
			</td>
			<td>
				<psj:a id="runRequestISOMessage_${_pageRef}"  cssStyle=" width:100%" button="true" onclick="ISOMessageParse_parseAndRunISOMessage(true)">
					<ps:text   name='run_request_iso_msg_key' />
				</psj:a>
			</td>
		</tr>
	</table>
	
	<br /> 
	<table >
		<tr>
			<td width="50%" style="vertical-align: top;">
						<ps:textarea id="requestIsoMessage_${_pageRef}" cols="110" rows="15" name="ISO_MSG" cssClass="jqte-dialogDynamicEditor"></ps:textarea>
			</td>
			<td width="50%" style="vertical-align: top;">
						<psjg:grid id		="requestIsoMessageGridTbl_Id_${_pageRef}" 
					      	altRows       	="true"
					 	  	editinline 		="true"
					 	  	editurl			=" "
					 	  	href			=" "
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
					      	onCompleteTopics="loadSubGridValues"
					      	onSelectRowTopics="afterSubGridLoad"
					      	pagerButtons	="true"
					      	height			="150">
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
		<tr>
			<td width="50%" style="vertical-align: top;" >
						<ps:textarea id="responseIsoMessage_${_pageRef}" readonly="true" cols="110" rows="15" name="ISO_MSG" cssClass="jqte-dialogDynamicEditor"></ps:textarea>
			</td>
			<td  width="50%" style="vertical-align: top;" >
						<psjg:grid 
							id		="responseIsoMessageGridTbl_Id_${_pageRef}" 
					      	altRows       	="true"
					 	  	editinline 		="true"
					 	  	editurl			=" "
					 	  	href			=" "
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
					      	onCompleteTopics="loadSubGridValues"
					      	onSelectRowTopics="afterSubGridLoad"
					      	pagerButtons	="true"
					      	height			="150"
					      	autowidth		="true"
					      	>
							    <psjg:grid
									id               ="responseIsoMessageSubGridTbl_Id_${_pageRef}"
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