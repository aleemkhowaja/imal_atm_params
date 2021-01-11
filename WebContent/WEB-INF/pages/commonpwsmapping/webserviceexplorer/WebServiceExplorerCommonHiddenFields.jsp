<ps:form id="webServiceGuiDefFormId_${_pageRef}" useHiddenProps="true" namespace="/path/common/WebserviceExplorer">
	<ps:hidden id="nameSpaceUri_${_pageRef}" name="webServiceExplorerCO.nameSpaceUri" />
	<ps:hidden id="nameSpacePrefix_${_pageRef}" name="webServiceExplorerCO.nameSpacePrefix" />
	<ps:hidden id="soapAction_${_pageRef}" name="webServiceExplorerCO.soapAction" />
	<ps:hidden id="wsdlUrl_${_pageRef}" name="webServiceExplorerCO.wsdlUrl" />
	<ps:hidden id="webServiceExplorerGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerGridUpdates" />
	<ps:hidden id="webServiceExplorerSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerSubGridUpdates" />	
	<ps:hidden id="webServiceExplorerResponseGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerResponseGridUpdates" />
	<ps:hidden id="webServiceExplorerHashMapSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerHashGridListUpdates" />	
	<ps:hidden id="application_name_desc_${_pageRef}" name="webServiceExplorerCO.applicationName" />	
	<ps:hidden id="webservice_name_desc_${_pageRef}" name="webServiceExplorerCO.webServiceName" />	
	<ps:hidden id="operation_name_lkp_desc_${_pageRef}" name="webServiceExplorerCO.operationName" />	
	<ps:hidden id="serviceDataId_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />		
	<ps:hidden id="genratedXmlRequest_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_REQUEST" />		
	<ps:hidden id="generatedXmlResponse_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_RESPONSE" />		
	<ps:hidden id="gridCheckedParams_${_pageRef}" />		
	<ps:hidden id="webServiceExplorerGrid_${_pageRef}" name="webServiceExplorerGridParamCO.mainGridActionRef" />
	<ps:hidden id="webServiceExplorerSubGrid_${_pageRef}" name="webServiceExplorerGridParamCO.subGridActionRef" />
	<ps:hidden id="webServiceExplorerListGrid_${_pageRef}" 	name="webServiceExplorerGridParamCO.listSubGridRef" />
	<ps:hidden id="webServiceExplorerHashGrid_${_pageRef}" 	name="webServiceExplorerGridParamCO.hashSubGridRef" />
	<ps:hidden id="webServiceExplorerScreenName_${_pageRef}" name="webServiceExplorerGridParamCO.screenName" />
	<ps:hidden id="webServiceExplorerScreenNameSpace_${_pageRef}" name="webServiceExplorerGridParamCO.screenNameSpace" />
	<ps:hidden id="webServiceExplorerMappingParams_${_pageRef}" name="WebServiceExplorerGridParamCO.mappingFields" />
	<ps:hidden id="webServiceExplorerMappingIds_${_pageRef}" name="WebServiceExplorerGridParamCO.mappingId" />
	<ps:hidden id="pws_generation_type_${_pageRef}" name="webServiceExplorerCO.adapterType" />
	<ps:hidden id="pws_generation_bpel_file_name_${_pageRef}" name="webServiceExplorerCO.bpelFileName" />
	<ps:hidden id="pws_generation_bpel_full_path_${_pageRef}" name="webServiceExplorerCO.bpelFullPath" />
	<ps:hidden id="argument_${_pageRef}" name="pwsDef.argumentItems" />
	<ps:hidden id="mapping_grid_url_${_pageRef}" name="webServiceExplorerCO.mappingGridUrl" />
	<ps:hidden id="webServiceExplorerIsFromLoad_${_pageRef}" name="webServiceExplorerCO.isFromLoad" />		
</ps:form>

<script>
$.struts2_jquery.require("WebServiceExplorerMaint.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
$.struts2_jquery.require("WebServiceExplorerList.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
$.struts2_jquery.require("WebServiceExplorerListSubGrid.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
$.struts2_jquery.require("WebServiceExplorerSubGridList.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
$.struts2_jquery.require("WebServiceExplorerHashGridList.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/webserviceexplorer/");	
</script>