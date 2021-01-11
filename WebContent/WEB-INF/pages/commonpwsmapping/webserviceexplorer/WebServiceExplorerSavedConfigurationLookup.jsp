<div id = "WebServiceExplorerConfigLookup_${_pageRef}" style="width: 100%;display: none">
								<table>
									<tr>
										<td width = "10%">
												<ps:label key="saved_configuration_key" id="lbl_saved_configuration_${_pageRef}" for="config_service_id_${_pageRef}" />
										</td>
										<td width="5%">
												<psj:livesearch  id="config_service_id_${_pageRef}" 
															name="webServiceExplorerConfigVO.CONFIG_ID"
															paramList="ivcrud:iv_crud_${_pageRef}"
															resultList="CONFIG_ID:lookuptxt_config_service_id_${_pageRef},CONFIG_NAME:config_service_name_${_pageRef},APPLICATION_NAME : application_name_desc_${_pageRef},ENDPOINT_NAME : webservice_name_desc_${_pageRef},OPERATION_NAME :operation_name_lkp_desc_${_pageRef}"
															actionName="${pageContext.request.contextPath}/path/common/WebserviceExplorer/WSDLParsingLookup_constructConfigLookup"
															dependencySrc="${pageContext.request.contextPath}/path/common/WebserviceExplorer/WebServiceExplorerMaint_configLookupDependency"
															dependency = "lookuptxt_config_service_id_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID,config_service_name_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_NAME,application_name_desc_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.APPLICATION_NAME,webservice_name_desc_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.ENDPOINT_NAME,operation_name_lkp_desc_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.OPERATION_NAME,serviceDataId_${_pageRef}:webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID,soaprequest:webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_REQUEST,soapresponse:webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_RESPONSE"
															parameter = "webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID:lookuptxt_config_service_id_${_pageRef},webServiceExplorerCO.webServiceExplorerConfigVO.APPLICATION_NAME : application_name_desc_${_pageRef},webServiceExplorerCO.webServiceExplorerConfigVO.OPERATION_NAME : operation_name_lkp_desc_${_pageRef},webServiceExplorerCO.webServiceExplorerConfigVO.ENDPOINT_NAME : webservice_name_desc_${_pageRef}"
															afterDepEvent = "config_Lookup_Dep()"
															searchElement = "CONFIG_ID" 
													/>
													
												
											</td>	
											<td>		
													<ps:textfield id="config_service_name_${_pageRef}" name="webServiceExplorerConfigVO.CONFIG_NAME" mode="text"
																readonly="true" cssStyle="width:120px" />
											</td>
										</tr>
										
									</table>
</div>