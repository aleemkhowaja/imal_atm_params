<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<style>
	.ui-autocomplete {
		max-height: 180px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>

<ps:form   id="argConstrFrmId_${_pageRef}" namespace="/path/designer" 	useHiddenProps="true">
	<table cellspacing="2">
		<tr>
			<td width="50%" style="vertical-align: top;">
				<div id="expression_form_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="expressionInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="expression_key" />">
						<ps:textarea id="comparisonId_${_pageRef}" name="CONDITION" maxlength="1000" cols="58" rows="10"/>
					</div>
				</div>
			</td>
			<td width="50%" style="vertical-align: top;">
				<div id="dialogElements_form_${_pageRef}" class="connectedSortable ui-helper-reset">
					<div id="dialogElementsInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="Data Elements" />">
						<psjg:grid id		="dataElementsGridTbl_Id_${_pageRef}" 
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
					      	subGridOptions	="{reloadOnExpand:false}"
					      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					      	shrinkToFit		="true"
					      	pagerButtons	="true"
					      	height			="272"
					      	ondblclick		="elementDialogGridClicked()"
					      	autowidth		="false"
					      	width			="250"
						>
							<psjg:gridColumn id="DATA_ELEMENT" colType="text" index="DATA_ELEMENT" name="DATA_ELEMENT" 
								title="%{getText('field_key')}" editable="false" sortable="true" search="true" />
						</psjg:grid>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<ps:hidden name="rowId" id="rowId_${_pageRef}"></ps:hidden>
</ps:form>

<script type="text/javascript">
$(document).ready(function() 
{                        
   	$("div#expression_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	$("div#dialogElements_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
   	
   	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
   	if(checkDisable == "true")
   	{
   		$("#comparisonId_"+_pageRef).attr('readonly','readonly');
   		$("#comparisonId_"+_pageRef).attr('tabindex', '-1');
   	}
});

</script>