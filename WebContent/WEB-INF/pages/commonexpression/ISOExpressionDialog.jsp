<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:set name="parameters_key" value="%{getText('parameters_key')}" />

<style>
	.ui-autocomplete {
		max-height: 180px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>

<ps:hidden id="interfaceIdForExpression_${_pageRef}"  name ="customExpressionCO.interfaceId" />
<ps:hidden id="errorMessage_${_pageRef}"  name ="customExpressionCO.interfaceId"  />

	<ps:form useHiddenProps="true" id="customExpressionFormId_${_pageRef}" namespace="/path/acquirer">
		<ps:hidden id="isofieldsGrid_${_pageRef }" name="customExpressionCO.expressionIsofields"> </ps:hidden>
		<table cellspacing="2">
		
			<tr>
				<td nowrap="nowrap">
					<ps:label id="lbl_isGlobal_${_pageRef}"
							key="add_to_expression_list_key" for="isGlobal_${_pageRef}">
					</ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:checkbox id="isGlobal_${_pageRef}"
					name="customExpressionCO.isGlobalYN" valOpt="Y:N"
					dependencySrc="${pageContext.request.contextPath}/path/customexpression/CustomExpressionMaintAction_applyVisiblityOnCustomExpressionFields"
					parameter="customExpressionCO.isGlobalYN:isGlobal_${_pageRef }"
					dependency="shortName_${_pageRef }:customExpressionCO.custom_EXPRESSIONVO.SHORT_NAME"
					tabindex="1" />
				</td>
			</tr>
			<tr class="is_global_${_pageRef}">
				<td colspan="1" width="13%;" nowrap="nowrap">
					<ps:label key="shortname_key"
						for="shortName_${_pageRef }" id="shortName_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="5">
					<ps:textfield id="shortName_${_pageRef }"
						name="customExpressionCO.custom_EXPRESSIONVO.SHORT_NAME" maxlength="40"
						tabindex="2"
						dependencySrc="${pageContext.request.contextPath}/path/customexpression/CustomExpressionMaintAction_validateCustomExpressionByShortName"
						parameter="customExpressionSC.shortName:shortName_${_pageRef }"
						dependency="shortName_${_pageRef }:customExpressionSC.shortName" required="true"
						cssStyle="width: 92%"
						>
					</ps:textfield>
				</td>
			</tr>
			<tr class="is_global_${_pageRef}">
				<td colspan="1" width="13%;" nowrap="nowrap">
					<ps:label key="Description_key"
						for="description_${_pageRef }" id="description_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="5">
					<ps:textfield id="description_${_pageRef }"
						name="customExpressionCO.custom_EXPRESSIONVO.DESCRIPTION" maxlength="255"
						tabindex="3" required="true" cssStyle="width: 92%">
					</ps:textfield>
				</td>
			</tr>
				
		</table>
		<table cellspacing="2">	
			<tr>
				<td style="vertical-align: top;">
					<div id="expression_form_${_pageRef}" class="connectedSortable ui-helper-reset" >
						<div id="expressionInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="expression_key" />">
							<ps:textarea id="expressionTextArea_${_pageRef}" name="customExpressionCO.custom_EXPRESSIONVO.EXPRESSION" required="true" maxlength="3999" cols="65" rows="15"/>
						</div>
					</div>
				</td>
				<td style="vertical-align: top;">
					<div id="dialogElements_form_${_pageRef}" class="connectedSortable ui-helper-reset">
						<div id="dialogElementsInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="parameters_key" />">
						
							<psjg:grid 
								id				="dialogGridTbl_Id_${_pageRef}" 
						      	altRows       	="true"
						 	  	editinline 		="true"
	 	  						href			='${customExpressionCO.gridUrl}'
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
						      	subGridOptions	="{reloadOnExpand:false}"
						      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
						      	shrinkToFit		="true"
						      	pagerButtons	="true"
						      	height			="150"
						      	ondblclick		="common_dialogGridDBClick(this, 'parameterValue');"
						      	width			="310">
						      	
								<psjg:gridColumn id="parameterName" colType="text" index="parameterName" name="parameterName" 
									title="%{getText('parameter_name_key')}" editable="false" sortable="true" search="true" />
									
								<psjg:gridColumn id="parameterValue" colType="text" index="parameterValue" name="parameterValue" 
									title="%{getText('parameter_value_key')}" editable="false" sortable="true" search="true" hidden="true" />
									
							</psjg:grid>
						</div>
					</div>
				</td>
			</tr>
		</table>
		<ps:hidden name="rowId" id="rowId_${_pageRef}"></ps:hidden>
		<ps:hidden name="customExpressionCO.customExpressionAutoCompleteData" id="operators_${_pageRef}"></ps:hidden>
		<ps:hidden name=" customExpressionCO.customExpressionList" id="globalExpression_${_pageRef}"></ps:hidden>
		
	</ps:form>

<script type="text/javascript">
$(document).ready(function() 
{                   
	$("#customExpressionFormId_"+_pageRef).processAfterValid("common_expression_save",{});
   	$("div#expression_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	$("div#dialogElements_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
});

var parameters_key = "${parameters_key}";

</script>