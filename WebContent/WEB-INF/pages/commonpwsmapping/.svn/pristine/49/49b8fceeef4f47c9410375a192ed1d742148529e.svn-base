<div id="loadPwsDialog_${_pageRef}">
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:form useHiddenProps="true" id="pwsFormId_${_pageRef}">
	<!--  Common Pws  -->
	<ps:hidden name="pwsDef.definitionVO.MAPPING_ID"   id="pwsMappingId_${_pageRef}" />
	<ps:hidden name="pwsDef.mappingVO.CREATED_BY"   id="pwsCreatedBy_${_pageRef}" />
	<ps:hidden name="pwsDef.mappingVO.CREATED_DATE"   id="pwsCreatedDate_${_pageRef}" />
	<ps:hidden name="pwsDef.mappingVO.API_CODE"   id="pwsAPICODE${_pageRef}" />
	<!--  Api creation date  -->
	
	<!--  Grid info -->
	<ps:hidden name="pwsDef.argGridUpdates" id="argGridUpdates_${_pageRef}" />
	<ps:hidden name="pwsDef.argumentItems"  id="argumentItems_${_pageRef}" />
	
	<ps:hidden name="webServiceExplorerCO.mappingFields"  id="mappingFields_${_pageRef}" />
	<ps:hidden name="webServiceExplorerCO.mappingFieldsUrl"  id="mappingFieldsUrl_${_pageRef}" />
	<ps:hidden id="mapping_grid_url_${_pageRef}" name="webServiceExplorerCO.mappingGridUrl" />

<div id="mainPwsInfo_${_pageRef}" title="<ps:text name="Main_Information_Key"/>">
	<table id="mainPwsInfotbl_<ps:property value="_pageRef" escapeHtml="true"/>"  border="0" cellpadding="2" cellspacing="1" >
		<tr>
			<td colspan="1" class="fldLabelView">
				<ps:label key="service_type_key" id="lbl_serviceTypeId__${_pageRef}"
					for="serviceTypeId_${_pageRef}" />
			</td>
			<td>
				<ps:select id="serviceTypeId_${_pageRef}"
					name="pwsDef.serviceType" list="serviceType"
					listKey="code" listValue="descValue" emptyOption="false"
					disabled="false"
					onchange = "select_onChange()"
					cssStyle="width: 150px;"/>
			</td>			
			<td colspan="1" class="fldLabelView">
				<ps:label key="description_key" id="lbl_mapDescId_${_pageRef}"
					for="mapDescId_${_pageRef}" />
			</td>
			<td colspan="1"  class="fldDataEdit right">
				<ps:textfield id="mapDescId_${_pageRef}"
					name="pwsDef.definitionVO.MAP_DESCRIPTION" required="true"
				    tabindex="-1" maxlength="255"  />
			</td>
			
			
			
			<td id="td_mainContainer" rowspan="8">
				<table id="pws_tbl_rest">
					<tr>
						<td colspan="1" class="fldLabelView restInfo">
							<ps:label key="ws_endpoint_key" id="lbl_wsEndPointId_${_pageRef}"
								for="wsEndPointId_${_pageRef}"/>
						</td>
						<td colspan="1"  class="fldDataEdit right restInfo">
							<ps:textfield id="wsEndPointId_${_pageRef}"
								name="pwsDef.apiDefinitionVO.WS_ENDPOINT"
								required="true"
							    tabindex="-1" maxlength="1000" />
							   
						</td>
					</tr>
					<tr>
						<td colspan="1" class="fldLabelView restInfo">
							<ps:label key="content_type_key" id="lbl_contentTypeId_${_pageRef}" for="contentTypeId_${_pageRef}" />
						</td>
						<td colspan="2" class="fldDataEdit right restInfo">
							<ps:select id="contentTypeId_${_pageRef}" name="pwsDef.apiDefinitionVO.WS_CONTENT_TYPE" list="dataType"
								listKey="code" listValue="descValue" emptyOption="false" disabled="false" />
						</td>
					</tr>
						<tr>
							<td colspan="1" class="fldLabelView restInfo"><ps:label
									key="description_key" id="lbl_acceptTypeId_${_pageRef}"
									for="acceptTypeId_${_pageRef}" /></td>
							<td colspan="1" class="fldDataEdit right restInfo"><ps:select
									id="acceptTypeId_${_pageRef}"
									name="pwsDef.apiDefinitionVO.WS_ACCEPT_TYPE" list="dataType"
									listKey="code" listValue="descValue" emptyOption="false"
									disabled="false" /></td>
						</tr>

					</table>		
			
			
			<!--  soap  -->
				<table id="pws_tbl_soap">
					<tr>
						<td colspan="1" class="fldLabelView soapInfo"><ps:label key="soap_action_key"
									id="lbl_soapAction_${_pageRef}" for="soapAction_${_pageRef}"/></td>
						<td colspan="1" class="fldDataEdit right soapInfo"><ps:textfield
								id="soapAction_${_pageRef}"
								name="pwsDef.apiDefinitionVO.SOAP_ACTION"
								required="" tabindex="-1" maxlength="1000"/></td>
					</tr>
					<tr>
						<td colspan="1" class="fldLabelView soapInfo"><ps:label key="soap_message_prefix_key"
						id="lbl_msgPrefixId_${_pageRef}" for="msgPrefixId_${_pageRef}" /></td>
						<td colspan="2" class="fldDataEdit right soapInfo"><ps:textfield
								id="msgPrefixId_${_pageRef}"
								name="pwsDef.apiDefinitionVO.SOAP_MESSAGE_PREFIX"
								required="" tabindex="-1" maxlength="1000"/></td>
					</tr>
					<tr>
						<td colspan="1" class="fldLabelView soapInfo"><ps:label
								key="soap_namespaces_key" id="lbl_nameSpaceId_${_pageRef}"
								for="nameSpaceId_${_pageRef}" /></td>
						<td colspan="2" class="fldDataEdit right soapInfo"><ps:textfield
								id="nameSpaceId_${_pageRef}"
								name="pwsDef.apiDefinitionVO.SOAP_NAMESPACES" required=""
								tabindex="-1" maxlength="1000" /></td>

					</tr>
					<tr>
						<td colspan="1" class="fldLabelView soapInfo"><ps:label
								key="soap_operation_key" id="lbl_soapOperationId_${_pageRef}"
								for="soapOperationId_${_pageRef}" /></td>
						<td colspan="2" class="fldDataEdit right soapInfo"><ps:textfield
								id="soapOperationId_${_pageRef}"
								name="pwsDef.apiDefinitionVO.SOAP_OPERATION" required=""
								tabindex="-1" maxlength="1000" /></td>
					</tr>
					<tr>
						<td colspan="1" class="fldLabelView soapInfo "><ps:label
								key="soap_operation_local_part_key"
								id="lbl_soapLocalPartId_${_pageRef}"
								for="soapLocalPartId_${_pageRef}" /></td>
						<td colspan="2" class="fldDataEdit right soapInfo"><ps:textfield
								id="soapLocalPartId_${_pageRef}"
								name="pwsDef.apiDefinitionVO.SOAP_OPERATION_LOCAL_PART"
								required="" tabindex="-1" maxlength="1000" /></td>
					</tr>
				</table>		
			</td>
		</tr>
	
		<tr>
			<td colspan="1" class="fldLabelView">
				<ps:label key="endpoint_key" id="lbl_endpointId_${_pageRef}"
					for="endpointId_${_pageRef}" />
			</td>
			<td colspan="1"  class="fldDataEdit right">
				<ps:textfield id="endpointId_${_pageRef}"
					name="pwsDef.mappingVO.WS_NAME"
				    tabindex="-1" maxlength="255" readonly="true"  />
			</td>
			<td colspan="1" class="fldLabelView">
				<ps:label key="operation_key" id="lbl_operationId_${_pageRef}"
					for="operationId_${_pageRef}" />
			</td>
			<td colspan="1"  class="fldDataEdit right">
				<ps:textfield id="operationId_${_pageRef}"
					name="pwsDef.mappingVO.OPER_NAME" readonly="true" 
				    tabindex="-1" maxlength="255"  />
			</td>
			
			<td colspan="1" class="fldLabelView">
				<ps:label key="mappingId_key" id="lbl_mappingId_${_pageRef}"
					for="mappingId_${_pageRef}" />
			</td>
			<td colspan="1"  class="fldDataEdit right">
				<ps:textfield id="mappingId_${_pageRef}"
					name="pwsDef.definitionVO.MAPPING_ID" readonly="true" 
				    tabindex="-1" maxlength="255"  />
			</td>
			
			
		
		</tr>
		
		
		<tr>
			<td rowspan="6"></td>
		</tr>
	</table>

</div>

</ps:form>
<div id="pwsApiInfo_${_pageRef}" style="display: none">

</div>
<div id="pwsApiParamGrid_${_pageRef}" style="display: none">
	<%@include file = "/WEB-INF/pages/commonpwsmapping/pws/apiParamGrid.jsp" %>
</div>
<!-- USER STORY #799705	Control record - PWS mapping screen -->
<div id="pwsApiInfo_explorer_${_pageRef}" style="height:341px;">

	<%@include file = "/WEB-INF/pages/commonpwsmapping/pwswebserviceexplorer/PwsWebServiceExplorerServicesParamsOperations.jsp" %>
	
</div>
<!-- USER STORY #799705	Control record - PWS mapping screen -->

</div>