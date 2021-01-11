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

<script type="text/javascript">
function MsgJob_openServiceDialog(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openCommonMultiMapping(200020)">'+servive_map_key+'</a>';
}
</script>

<ps:url id="urlLoadMsgJobGrid" escapeAmp="false" action="ATMInterfaceListAction_loadMsgJobGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.interfaceId" value="atmInterfaceCO.iso_INTERFACESVO.CODE"></ps:param>
</ps:url>

<ps:form   id="argConstrFrmId_${_pageRef}" namespace="/path/designer" 	useHiddenProps="true">
	<div id="dialogJobDialog_form_${_pageRef}" class="connectedSortable ui-helper-reset">
		<div id="dialogJobDialogInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name="message_job_key" />">
			<psjg:grid id		="dataJobDialogGridTbl_Id_${_pageRef}" 
		      	altRows       	="true"
		 	  	editinline 		="true"
		 	  	editurl			="%{urlLoadMsgJobGrid}"
		 	  	href			="%{urlLoadMsgJobGrid}"
		      	dataType   		="json"
		   	  	pager      		="true"
		   	  	sortable   		="true"
			  	filter         	="false"
		   	  	gridModel   	="gridModel"
		   	  	rowNum    		="10"
		   	  	rowList        	="5,10,15,20"
		      	viewrecords 	="true"
		      	navigator    	="true"
		      	navigatorAdd    ="true"
		      	navigatorRefresh="true"
		      	navigatorEdit	="false"
		      	navigatorDelete	="true"
		      	navigatorSearch	="false"
		      	subGridOptions	="{reloadOnExpand:false}"
		      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
		      	shrinkToFit		="true"
		      	pagerButtons	="false"
		      	height			="272"
		      	autowidth		="false"
		      	width			="540"
		      	addfunc			="addJobForMessage()"
		      	delfunc			="deleteJobMessage()"
			>
				<psjg:gridColumn id="PROCES_CODE" colType="number" index="PROCES_CODE" name="PROCES_CODE" width="10"
					title="%{getText('proccessing_code_key')}" editable="true" sortable="true" search="true" />
					
				<psjg:gridColumn id="EXPRESSION_DETAILS" name="EXPRESSION_DETAILS" index="EXPRESSION_DETAILS" width="8" colType="text"
			    	formatter="ATMInterfaceMaint_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
			    	editable="false" tabindex = "6" align="center" />
			    	
			    <psjg:gridColumn id="SERVICE_DETAILS" name="SERVICE_DETAILS" index="SERVICE_DETAILS" width="8" colType="text"
			    	formatter="MsgJob_openServiceDialog" title="%{getText('service_key')}" sortable="false" search="false" 
			    	editable="false" tabindex = "6" align="center" />
						 
				<psjg:gridColumn id="EXPRESSION" colType="text" index="EXPRESSION" width="5" name="EXPRESSION" title="%{getText('EXPRESSION')}" hidden="true"
					editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '100'}" />
			</psjg:grid>
		</div>
	</div>
	<ps:hidden name="rowId" id="rowId_${_pageRef}"></ps:hidden>
</ps:form>

<script type="text/javascript">
$(document).ready(function() 
{                        
   	$("div#dialogJobDialog_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
});

</script>