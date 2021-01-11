<div id="PwsMappingExpressionDialog_${_pageRef}">
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<!--  USER STORY #862852 Adding Expressions to Mapping parameters in PWS dialog -->

<ps:form useHiddenProps="true" id="pwsExpressionFormId_${_pageRef}">
	<ps:hidden id="selectedBodyTextareaId_${_pageRef}" name="pwsMappingExpressionCO.selectedBodyTextarea"  />
	<ps:hidden id="selectedBodyTextareaLength_${_pageRef}" name="pwsMappingExpressionCO.selectedBodyTextareaLength"  />
	<ps:hidden id="mappingField_${_pageRef}" value="" />
	
<div id="mainPwsExpressionInfo_${_pageRef}" title="<ps:text name="Main_Information_Key"/>">
	<table id="mainPwsExpressionInfotbl_<ps:property value="_pageRef" escapeHtml="true"/>"  border="0" cellpadding="2" cellspacing="1" >
		
		<tr>
				<td valign="top" nowrap="nowrap">
					<ps:label key="pws_expression_key" id="lbl_PwsExpression_${_pageRef}" for="pwsExpressionBody_${_pageRef}" />
				</td>
		</tr>
		<tr>
			<td width="70%" valign="top" colspan="6" class= "">   
					<ps:textarea
						id="pwsExpressionBody_${_pageRef}" 
						name="pwsMappingExpressionCO.messageBody" 
						mode="text"
						required="" 
						rows="6.5" 
						tabindex="6" 
						maxlength="4000"
						cssStyle="height: 195px;white-space: pre-wrap;"
						onclick="pwsMappingExpressionGetId(this);"
						onkeydown="pwsMappingExpression_expressionShowHideData(this)"
					/>
				</td>
				<td style="vertical-align: top;" width="25%" colspan="6" class= "">   
					<div id="pwsMappingFieldsTagsDetails_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px; margin-top: 3px;">
						<div id="pwsMappingFieldsTagsDetails_Inner_${_pageRef}" class="collapsibleContainer collapsed" title="<ps:text name='mapping_field_tag_key'/>">
						<ps:url id="pwsMappingFieldsGridUrl" action="PwsMappingFieldsList_loadMappingFields" namespace="/path/common/mappingexpression" escapeAmp="false">
							<ps:param name="iv_crud" value="iv_crud" />
							<ps:param name="_pageRef" value="_pageRef" />
							<ps:param name="fieldName" value="fieldName" />
							<ps:param name="webServiceExplorerCO.mappingFields" value="webServiceExplorerCO.mappingFields" />
						</ps:url>
							<psjg:grid 	
								id               		="pwsMappingFieldsTagsGridId_${_pageRef}"
								href="%{pwsMappingFieldsGridUrl}" 
								dataType         		="json"
								pager            		="false"
								sortable         		="false"
								filter           		="false"
								gridModel        		="gridModel"
								rowNum           		="5"
								rowList          		="5,10,15,20"
								viewrecords      		="false"
								navigator       	 	="false"
								navigatorDelete 	    ="false"
								navigatorEdit    		="false"
								navigatorRefresh 		="false"
								navigatorAdd     		="false"
								navigatorSearch  		="false"
								editurl			 		=" " 
								editinline		 		="false" 
								navigatorSearchOptions	="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
								altRows          		="true"
								ondblclick       		="pwsMappingExpression_addTagsInTextArea(this)"
								autowidth				="false"
								height					="145" 
								width					="190">
													
								<psjg:gridColumn 
									search="true" 
									searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}" 
									name="mappingGridFields" 
									sortable="true" 
									id="tagName" 
									title="%{getText('mapping_field_tag_name_key')}" 
									colType="text" 
									editable="true" />
							 </psjg:grid>
							</div>
						</div>
				</td >
			</tr>
	
		<tr>
			<td rowspan="6"></td>
			<td rowspan="6"></td>
			<td rowspan="6"></td>
		</tr>
	</table>

</div>


</ps:form>



</div>
<script type="text/javascript">
	$.struts2_jquery.require("PwsMappingExpressionDialog.js" ,null,jQuery.contextPath+"/path/js/commonpwsmapping/mappingexpression/");
	$.struts2_jquery.require("CommonExpressionJs.js" ,null,jQuery.contextPath+"/path/js/commonexpression/");
		
$(function() {
	//addMappingGridRow($("#pwsMappingFieldsTagsGridId_"+_pageRef));
});
</script>
