<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<ps:url id="urliSOMessagesDefinitionListGrid" escapeAmp="false" action="ISOMessagesDefinitionListAction_loadISOMessagesDefinitionGrid" 
		namespace="/path/iSOMessagesDefinition">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
		<table width="100%" cellpadding="2" cellspacing="2">
			<tr>
				<td>
					<psjg:grid
							id               ="iSOMessagesDefinitionListGridTbl_Id_${_pageRef}"
							caption          =" "
						    href             ="%{urliSOMessagesDefinitionListGrid}"
						    dataType         ="json"
						    hiddengrid       ='%{iv_crud== "R"}'
							pager            ="true"
							sortable         ="true"
							filter           ="true"
							gridModel        ="gridModel"
							rowNum           ="5"
							rowList          ="5,10,15,20"
						    viewrecords      ="true"
						    navigator        ="true"
						    navigatorDelete  ="false"
						    navigatorEdit    ="false"
						    navigatorRefresh ="false"
						    navigatorAdd     ="false"
						    navigatorSearch  ="false"
						    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
						    altRows          ="true"
						    ondblclick       ="iSOMessagesDefinitionList_onDbClickedConform()"
						    addfunc          ="iSOMessagesDefinitionList_onNewClickedConform"
						    shrinkToFit      ="true"
						    height			 ="130"
						    autowidth		 ="true" >
		
							<psjg:gridColumn id="gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID" colType="number"
								name="gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID" index="gtw_ATM_ISO_MSG_DEF.ISO_MSG_DEF_ID"
								title="%{getText('iso_message_definition_code_key')}" editable="false" sortable="true"
								search="true" width="20" />
								
							
							<psjg:gridColumn id="gtw_ATM_ISO_MSG_DEF.DESCRIPTION" colType="text"
								name="gtw_ATM_ISO_MSG_DEF.DESCRIPTION" index="gtw_ATM_ISO_MSG_DEF.DESCRIPTION"
								title="%{getText('description_key')}" editable="false" sortable="true" hidden="false"
								search="true" width="40" />
							
							<psjg:gridColumn id="atmInterfaceCode" colType="number"
								name="gtw_ATM_ISO_MSG_DEF.INTERFACE_CODE" index="INTERFACE_CODE"
								title="%{getText('interface_code_key')}" editable="false" sortable="true"
								search="true" width="20" />
								
							<psjg:gridColumn id="atmInterfaceDescription" colType="text"
								name="atmInterfaceDescription" index="atmInterfaceDescription"
								title="%{getText('interface_key')}" editable="false" sortable="true"
								search="true" width="20" />
		
						</psjg:grid>
			
					</td>
				</tr>
		</table>

<div id="iSOMessagesDefinitionMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
    	<%@include file="ISOMessagesDefinitionMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">

    $("#gview_iSOMessagesDefinitionListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
    
</script>