<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:set name="please_select_one_row_key_value"  value="%{getEscText('please_select_one_row_key')}"/>
<ps:set name="non_deleted_duplicated_parents_key_value"  value="%{getEscText('non_deleted_duplicated_parents_key')}"/>
<ps:set name="Confirm_Delete_key_var"  value="%{getEscText('Confirm_Delete_key')}"/>
<ps:set name="delete_saved_screens_key_var"  value="%{getEscText('delete_saved_screens_key')}"/>

<script type="text/javascript"> 
       var please_select_one_row_key_var = '<ps:property value="please_select_one_row_key_value" escapeHtml="false" escapeJavaScript="true"/>';
       var non_deleted_duplicated_parents_key_var = '<ps:property value="non_deleted_duplicated_parents_key_value" escapeHtml="false" escapeJavaScript="true"/>';
       var Confirm_Delete_key = '<ps:property value="Confirm_Delete_key_var" escapeHtml="false" escapeJavaScript="true"/>';   
       var delete_saved_screens_key = '<ps:property value="delete_saved_screens_key_var" escapeHtml="false" escapeJavaScript="true"/>'; 
</script>

<input id="toPageUponFlip_DeleteSvdScrns" type="hidden"/>
<input id="toReloadAfterFlip_DeleteSvdScrns" type="hidden"/>


<ps:form id="deleteSvdScnsFormID">		
	<ps:url id="urlTag"
		action="seriesListAction_populateDeleteSvdScrnsGrid"
		namespace="/path/customization">
	</ps:url>

	<table>
		<tr>
			<td><psjg:grid caption="%{getText('SavedScreens_key')}"
					id="deleteSavedScreensGridID" href="%{urlTag}"
					dataType="json" hiddengrid="false" pager="true" filter="true"
					gridModel="gridModel" rowNum="9" height="225" rowList="9,18,27,36"
					navigator="true" altRows="true" navigatorEdit="false"
					navigatorSearch="true"
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="abc" editinline="true"
					navigatorAdd="false" navigatorDelete="false"
					navigatorRefresh="false" pagerButtons="true" rownumbers="false"
					shrinkToFit="false" viewrecords="true" multiselect="true"
					autowidth="false"  onSelectRowTopics="custOnRowSelTopic"
					disableEditableFocus="true" onPagingTopics="confirmDeleteRowsBeforeFlip" 
					onGridCompleteTopics="continueFlippingAfterLoad" onSelectAllTopics="deleteSvdScrns_OnSelectAll">

					<psjg:gridColumn id="deleteSeries" name="deleteSeries"
						index="deleteSeries" colType="checkbox" edittype="checkbox"
						formatter="checkbox" title="%{getText('Delete_series_key')}"
						editable="true" sortable="false" search="false" width="50"
						editoptions="{value:'1:0',dataEvents: [{ type: 'click', fn: function(e) {callSetSelection(e);}}]}"
						align="center" />

					<psjg:gridColumn id="deleteParent" name="deleteParent"
						index="deleteParent" colType="checkbox" edittype="checkbox"
						formatter="checkbox" title="%{getText('Delete_parent_key')}"
						editable="true" sortable="false" search="false" width="50"
						editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'click', fn: function(e) {callSetSelection(e);}}]}"
						align="center" />
					<psjg:gridColumn name="PROG_REF" index="PROG_REF"
						title="%{getText('prog_ref_key')}" colType="text" editable="false"
						sortable="true" search="true" />

					<psjg:gridColumn name="PROG_DESC" index="PROG_DESC"
						title="%{getText('prog_ref_desc_key')}" colType="text"
						editable="false" sortable="true" search="true" />


					<psjg:gridColumn name="PARENT_REF" index="PARENT_REF"
						title="%{getText('parent_ref_key')}" colType="text"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn name="APP_NAME" index="APP_NAME"
						title="%{getText('app_name_key')}" colType="text" editable="false"
						sortable="true" search="true" />
						
				</psjg:grid>

				</div></td>
		</tr>
	</table>


	<br/>
	<table border="0" align="center" width="100%">
		<tr align="center">
			<td width="90%" />
			<td nowrap="nowrap">
			<psj:submit
					id="submitButtonForDeleteSvdScrnsID" button="true"
					onclick="deleteSavedScreens(0)" type="button"
					freezeOnSubmit="true">
					<ps:text name="%{getText('delete_key')}"></ps:text>
				</psj:submit></td>
			<td nowrap="nowrap">
			<psj:submit
					id="closeButtonForDeleteSvdScrnsID" button="true"
					onclick="cust_closeDeleteSvdScrnsWindow()" type="button"
					freezeOnSubmit="true">
					<ps:text name="%{getText('close_key')}"></ps:text>
				</psj:submit>
			</td>
		</tr>
	</table>



</ps:form>



<script type="text/javascript">	
	$("#deleteSavedScreensGridID").unsubscribe("custOnRowSelTopic");
	$("#deleteSavedScreensGridID").subscribe("custOnRowSelTopic", function(rowObj){
			custOnRowSelTopic(rowObj);
	});
	

	$("#deleteSavedScreensGridID").subscribe("confirmDeleteRowsBeforeFlip", function(obj) {
	         checkToDeleteRowsBeforeFlip(obj);
	});


	$("#deleteSavedScreensGridID").unsubscribe("continueFlippingAfterLoad");
	$("#deleteSavedScreensGridID").subscribe("continueFlippingAfterLoad", function(obj) {
	         resumeFlippingAfterLoad();
	})


	$("#deleteSavedScreensGridID").unsubscribe("deleteSvdScrns_OnSelectAll");
	$("#deleteSavedScreensGridID").subscribe("deleteSvdScrns_OnSelectAll", function(objEvent, selectedRowsTable){
	         onSelectAllSavedScreens(objEvent, selectedRowsTable);
	})

</script>





