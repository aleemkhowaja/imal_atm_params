<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>


<script type="text/javascript">
	$.struts2_jquery.require("BpmMaint.js,BpmList.js" ,null,"${pageContext.request.contextPath}/common/js/bpm/");
</script>
<ps:url id="bpmProcessVariablesUrl" action="BpmGrid_loadProcessVariablesGrid"	namespace="/path/bpm" escapeAmp="false">
	<ps:param name="bpmSC.processId" value="%{bpmCO.processId}"/>
</ps:url>

<ps:form id="bpmProcessVariablesForm_Id" useHiddenProps="true" cssStyle="width:100%;">	
	
	<ps:hidden id="bpmProcessVariablesGrid_processId" name="bpmCO.processId" ></ps:hidden>
	
	<psjg:grid id="bpmProcessVariablesGrid_Id"					
			href="%{bpmProcessVariablesUrl}" 
			dataType="json"
			hiddengrid="false"
			pager="true"
			pagerButtons="false"
			altRows="false"
			filter="true"
			gridModel="gridModel"
			viewrecords="false"
			navigator="true"
			height="120"
			navigatorRefresh="true"
			navigatorEdit="false"
			navigatorSearch="false"
			navigatorAdd="false"
			navigatorDelete="false"
			sortable="true"
			editinline="true"
			editurl="dummy"
			onEditInlineBeforeTopics="bpmProcessVariablesGrid_onRowSelTopic"
			>
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_VARIABLE_ID" colType="number"
				name="processVariablesVO.VARIABLE_ID" index="VARIABLE_ID"
				title="%{getText('ID_key')}" editable="false"
			/>
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_VARIABLE_NAME" colType="text"
				name="processVariablesVO.VARIABLE_NAME" index="VARIABLE_NAME"
				title="%{getText('var_key')}" editable="false"
			/>
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_VARIABLE_TYPE" colType="text"
				name="processVariablesVO.VARIABLE_TYPE" index="VARIABLE_TYPE"
				title="%{getText('type_key')}" editable="false"
			/>
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_BUSINESS_NAME" colType="text"
				name="processVariablesVO.BUSINESS_NAME" index="BUSINESS_NAME"
				title="%{getText('Name_key')}" editable="true"
			/>
				
			<psjg:gridColumn id="bpmProcessVariablesGrid_DESCRIPTION" colType="text"
				name="processVariablesVO.DESCRIPTION" index="DESCRIPTION"
				title="%{getText('Desc_key')}" editable="true"
			/>	
				
			<psjg:gridColumn id="bpmProcessVariablesGrid_DEFAULT_TYPE"
					name="processVariablesVO.DEFAULT_TYPE"
					index="DEFAULT_TYPE"
					formatter="select"
					title="%{getText('defaulted_key')}"
					editable="true"
					sortable="false" edittype="select" colType="select" 
					editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/bpm/BpmMaint_loadProcVarDefaultTypeSelect','procVarDefaultTypeList', 'code', 'descValue');}
					,dataEvents: [{ type: 'change', fn: function() { bpmProcessVariablesGrid_defaultTypeChanged(true) } }]}"
					search="true" />
				
				
			<psjg:gridColumn id="bpmProcessVariablesGrid_DEFAULT_VALUE_CONSTANT" colType="text"
				name="variableValue" index="DEFAULT_VALUE"
				title="%{getText('def_val_key')}" editable="true"
			/>
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_DEFAULT_VALUE" colType="liveSearch"
				name="processVariablesVO.DEFAULT_VALUE" index="DEFAULT_VALUE"
				title="%{getText('session_key')}" editable="true" sortable="true"
				search="true" reConstruct="true" 
				dataAction="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationLookupAction_constructSessionElementLookup"
				resultList="propertyName:processVariablesVO.DEFAULT_VALUE_lookuptxt,description:fieldDesc"
				searchElement="DEFAULT_VALUE"
				dependencySrc="${pageContext.request.contextPath}/path/buttoncustomization/ButtonCustomizationMaint_dependencyBySessionElementMap.action"
				params="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:processVariablesVO.DEFAULT_VALUE_lookuptxt"
				dependency="buttonCustomizationCO.sysParamActionArgMapVO.MAP_VALUE:processVariablesVO.DEFAULT_VALUE_lookuptxt,buttonCustomizationCO.fieldDesc:fieldDesc" 
				/>		
		
			<psjg:gridColumn id="bpmProcessVariablesGrid_DEFAULT_VALUE_DESC" title="%{getText('Description_key')}" index="DESCRIPTION" colType="text"
				search="true" editable="false" sortable="true" name="fieldDesc" />
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_IS_MANDATORY_YN"
				name="processVariablesVO.IS_MANDATORY_YN" index="IS_MANDATORY_YN"
				title="%{getText('mandatory_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>		
			
			<psjg:gridColumn id="bpmProcessVariablesGrid_SHOW_ON_STARTUP_YN"
				name="processVariablesVO.SHOW_ON_STARTUP_YN" index="SHOW_ON_STARTUP_YN"
				title="%{getText('on_startup_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="true" 
				search="true" 
				width="50" 
				editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:false}"
			/>				    
				
	</psjg:grid>	
	
	<table>
		<tr>
			<td>
				<psj:submit button="true" onclick="bpmProcessVariables_saveVariables()" type="button" buttonIcon="ui-icon-play">
					<ps:label key="Save_key" />
				</psj:submit>
			</td>
		</tr>
	</table>		

</ps:form>
<script type="text/javascript">
	$.subscribe("bpmProcessVariablesGrid_onRowSelTopic",function(rowObj){bpmProcessVariablesGrid_onRowSelTopic(rowObj);});
</script>
