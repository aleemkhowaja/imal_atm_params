<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$(document).ready(
		function(){
			$("div#isoMessageValuesList_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
			$("div#isoMessageSample_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
		}
	);
	
$.subscribe('loadSubGridValues', function(event, data) 
{
	//removing green color
	$('td').removeClass("path-subgrd-hdr");
});

$.subscribe('afterSubGridLoad', function(event, data) 
{
	loadMessageValuesForInnerFields();
});
</script>

<ps:form id="iso_msg_dialog_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" namespace="/path/atmInterface" method="post" enctype="multipart/form-data" >
	<table>
		<tr>
			<td width="43%" style="vertical-align: top;">
			<div id="isoMessageSample_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="isoMessageSampleInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="ISO Message" />">
						<ps:textarea id="iso_message_${_pageRef}" cols="80" rows="30" name="ISO_MSG" cssClass="jqte-dialogDynamicEditor"></ps:textarea>
					</div>
				</div>
			</td>
			<td width="14%" style="text-align: center">
				<psj:a id="testISOMessage_${_pageRef}" button="true" onclick="testISOMessage()">
					<ps:text name='test_message_key' />
				</psj:a>
			</td>
			<td width="44%" style="vertical-align: top;">
				<div id="isoMessageValuesList_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="isoMessageValuesListInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="Message Values" />">
						<psjg:grid id		="isoMessageValuesGridTbl_Id_${_pageRef}" 
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
					      	subGridOptions	="{reloadOnExpand:false,selectOnExpand:true}"
					      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					      	shrinkToFit		="true"
					      	onCompleteTopics="loadSubGridValues"
					      	onSelectRowTopics="afterSubGridLoad"
					      	pagerButtons	="true"
					      	height			="345"
					      	autowidth		="false"
					      	width="395" >
							<!-- start Sub Grid -->
						    <psjg:grid
								id               ="subFieldsValuesGridTbl_Id_${_pageRef}"
							    subGridUrl       =" "
							    dataType         ="json"
								pager            ="false"
								sortable         ="true"
								filter           ="false"
								gridModel        ="gridModel"
								rowNum           ="5"
								rowList          ="5,10,15,20"
							    viewrecords      ="false"
							    navigator        ="true"
							    editinline		 ="true"
							    editurl			 =" "
							    navigatorDelete  ="false"
							    navigatorEdit    ="false"
							    navigatorRefresh ="false"
							    navigatorAdd     ="false"
							    navigatorSearch  ="false"
							    disableEditableFocus="true"
							    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
							    altRows          ="true"
							    shrinkToFit      ="true" >
							        
							    <psjg:gridColumn id="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE" colType="number" index="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE" name="sub_FLDSVO.ATM_ISO_SUB_FLDS_CODE" key="true"
									title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="7" />
														
								<psjg:gridColumn id="sub_FLDSVO.SUB_FIELD_NAME" colType="text" index="sub_FLDSVO.SUB_FIELD_NAME" name="sub_FLDSVO.SUB_FIELD_NAME"
									title="%{getText('fieldName')}" editable="false" sortable="true" search="true" width="13" />
														
								<psjg:gridColumn id="data" colType="text" index="data" name="data" 
									title="%{getText('Value')}" editable="false" sortable="true" search="true" width="20" />
								</psjg:grid>
						    <!-- End Sub Grid -->
						
							<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_CODE" colType="number" index="iso_INT_FLDSVO.FIELD_CODE" name="iso_INT_FLDSVO.FIELD_CODE" key="true"
								title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="7" />
												
							<psjg:gridColumn id="iso_INT_FLDSVO.FIELD_NAME" name="iso_INT_FLDSVO.FIELD_NAME" index="iso_INT_FLDSVO.FIELD_NAME" colType="text" 
								title="%{getText('fieldName')}" sortable="false" search="true" editable="false" width="13" />
											
							<psjg:gridColumn id="data" colType="text" index="data" name="data"
								title="%{getText('Value')}" width="20"/>
								
							<psjg:gridColumn id="subGridData" colType="text" hidden="true" index="subGridData" name="subGridData"
								title="%{getText('Value')}" width="20"/>
						</psjg:grid>
					</div>
				</div>
			</td>
		</tr>
	</table>
	<ps:hidden name="messageRowId" id="messageRowId_${_pageRef}"></ps:hidden>
</ps:form>