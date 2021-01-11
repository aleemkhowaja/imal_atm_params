<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

	<!-- <div class="ui-state-active "></div> -->
	
	<ptt:toolBar id="webServiceGuiToolBar_${_pageRef}" hideInAlert="true">
			<psj:submit id="webServiceGuiShowWSDL_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon = "ui-icon-folder-open"
				onclick="WebServiceGui_openWSDL()">
				<ps:label key="show_wsdl_key" for="webServiceGuiShowWSDL_${_pageRef}" />
			 </psj:submit> 
			
			<psj:submit id="webServiceGuiShowRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon ="ui-icon-triangle-1-s"
				onclick="WebServiceGui_processRequest('show')">
				<ps:label key="show_request_key" for="webServiceGuiShowRequest_${_pageRef}" />
			 </psj:submit> 
		 
			 <psj:submit id="webServiceGuiShowProcessRequest_${_pageRef}" button="true"
				freezeOnSubmit="true"
				buttonIcon = "ui-icon-play" 
				onclick="WebServiceGui_processRequest('process')">
				<ps:label key="process_request_key" for="webServiceGuiProcessRequest_${_pageRef}" />
			 </psj:submit> 
			 <!-- 
			 <psj:submit id="webServiceGuiShowSavedConfiguration_${_pageRef}" button="true"
				freezeOnSubmit="true"
				buttonIcon ="ui-icon-arrowthickstop-1-s"
				onclick="WebServiceGui_processRequest('show_saved_cofiguration')">
				<ps:label key="show_saved_configuration_key" for="webServiceGuiShowSavedConfiguration_${_pageRef}" />
			 </psj:submit> 		
			 
			<psj:submit id="open_Saved_Config_${_pageRef}" button="true"
					freezeOnSubmit="true" 
					buttonIcon="ui-icon-folder-collapsed"
					onclick="webServiceGuiOpenSavedConfiguration()" >
					<ps:label key="open_saved_config_key" for="open_Saved_Config_${_pageRef}" />
			</psj:submit> 		
	 -->
	 		 <psj:submit id="webServiceGuiSaveRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="WebServiceGui_processRequest('save')">
				<ps:label key="save_request_key" for="webServiceGuiSaveRequest_${_pageRef}" />
			 </psj:submit> 
			 
			 <psj:submit id="webServiceGuiUpdateRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="WebServiceGui_processRequest('update')">
				<ps:label key="update_request_key" for="webServiceGuiUpdateRequest_${_pageRef}" />
			 </psj:submit> 
	</ptt:toolBar>
		
	<psj:dialog id="save_configuration_dialog_${_pageRef}" width="400" height="400" href="%{saveConfigurationDialog}" title="" autoOpen="false">
		<div id = "configNameDiv_${_pageRef}">
			<ps:label key="config_name_key" id="lbl_config_name_${_pageRef}" for="configName_${_pageRef}" />
			<ps:textfield id="configName_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_NAME" cssStyle="width:100px"/>						
		</div>
	</psj:dialog>
	
