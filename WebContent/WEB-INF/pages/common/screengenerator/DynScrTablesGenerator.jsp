<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>
<ps:form id="dynScrTablesFrmId" useHiddenProps="true" style="padding-top: 10px;">
<fieldset class="ui-widget-content ui-corner-all">
<table>
  <tr>
     <td width="20%" style = "    vertical-align: top;">
        <ps:label id="lbl_tableName" for="dynScrTblCreator_tableName" key="table_tech_name_key">
        </ps:label>
     </td>
     <td>
        <ps:hidden id="dynScrTblCreator_tableId" name="dynScrTablesCO.TABLE_ID"></ps:hidden>
        <ps:textfield id="dynScrTblCreator_tableName" 
                      required="true" 
                      size="35px" 
                      maxlength="30"
                      txtFormat=""
                      onkeyup=" $(this).val($(this).val().toUpperCase());"
                      parameter="criteria.tableName:dynScrTblCreator_tableName"
                      dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/ScreenGeneratorMaintAction_checkTableName"
                      dependency="dynScrTblCreator_tableName:criteria.tableName"
                      name="dynScrTablesCO.TABLE_TECH_NAME"/>
                <small style="margin-top: 1px;display: block;">
					<ps:text name="Table Name Start:" /> DS_ 
					<br>
					<ps:text name="allowed_char_key" /> A-Z , 0-9 , _ 
				</small>
     </td>
  </tr>
  <tr>
     <td width="20%">
        <ps:label id="lbl_tableDesc" for="dynScrTblCreator_tableDesc" key="tabledesc_key">
        </ps:label>
     </td>
     <td>
        <ps:textfield id="dynScrTblCreator_tableDesc" cssStyle="width:255px;" name="dynScrTablesCO.TABLE_DESC" maxlength="100"/>
     </td>  
  </tr>
</table>
<ps:url id="dynScrTablesURL"
	    action="dynScrTablesListAction_loadDynScrTablesGrid" 
	    escapeAmp="false"
	    namespace="/path/screenGenerator">
	<ps:param name="tableId" value="%{dynScrTablesCO.TABLE_ID}"/>    
</ps:url>
<div style="width: 100%">
<psjg:grid id="dynScrTableColsGridId" 
		altRows="false" 
		addfunc="defineScrTables_addNewColumn" 
		delfunc="defineScrTables_delRowData"
		dataType="json" 
		editurl="abc"
		editinline="true"
		filter="true" 
		gridModel="gridModel" 
		href="%{dynScrTablesURL}" 
		navigator="true" 
		navigatorAdd="true"
		navigatorEdit="false" 
		navigatorDelete="true"
		navigatorRefresh="false" 
		navigatorSearch="true"
		pager="true" 
		pagerButtons="true"
		rowNum="7"
		sortable="false"
		shrinkToFit="false" 
		viewrecords="true"
		hiddengrid="false"
		navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
		multiselect="false"
		rownumbers="false"
		onEditInlineBeforeTopics="onSelectRowComplete">
	<psjg:gridColumn id="COL_ID"           colType="number" name="COL_ID"          index="COL_ID"          title="" hidden="true"/>
	<psjg:gridColumn id="TABLE_ID"         colType="number" name="TABLE_ID"        index="TABLE_ID"        title="" hidden="true"/>
	<psjg:gridColumn id="COL_TYPE"         colType="text"   name="COL_TYPE"        index="COL_TYPE"        title="" hidden="true"/>
	<psjg:gridColumn id="TABLE_TECH_NAME"  colType="text"   name="TABLE_TECH_NAME" index="TABLE_TECH_NAME" autoSearch="true" title="%{getText('table_tech_name_key')}" editable="false" sortable="true" search="true"/>
	<psjg:gridColumn id="COL_TECH_NAME"    
	                 colType="text"   
	                 name="COL_TECH_NAME"   
	                 index="COL_TECH_NAME"   
	                 autoSearch="true"
	                 editoptions="{style:'text-transform:uppercase;',maxlength:'100',dataEvents:[{type:'change',fn:function(){dynScrTablesList_colNameChanged()}}
	                 							,{type:'keydown',fn:function(){ dynScrTablesList_onTechNameKeyPress()}}]}" 
	                 title="%{getText('col_tech_name_key')}"
	                 editable="true"  
	                 sortable="true" 
	                 search="true"/>
	<psjg:gridColumn id="COL_DESC" colType="text" name="COL_DESC" index="COL_DESC"
	                 autoSearch="true" title="%{getText('col_desc_key')}" 
	                 editable="true"  
	                 editoptions="{maxlength:'100'}"
	                 sortable="true" search="true"/>
	<psjg:gridColumn id="COL_TYPE_DESC"      colType="select" name="COL_TYPE_DESC"     index="COL_TYPE_DESC"     autoSearch="true" title="%{getText('col_type_key')}"        editable="true"  sortable="true" search="true"
	                 edittype="select" align="center"
				     editoptions="{value:function() {return loadCombo('${pageContext.request.contextPath}/path/screenGenerator/dynScrTablesListAction_loadColumnTypeSelect','columnTypeList','code','descValue');}
									,dataEvents: [{type: 'change', fn: function(){dynScrTablesList_colTypeChanged()}}]}"
	                 />
	<psjg:gridColumn id="COL_LENGTH" colType="number" name="COL_LENGTH" index="COL_LENGTH" autoSearch="true" title="%{getText('col_length_key')}" editable="true" sortable="true" search="true" 
					  editoptions="{maxlength:'4',dataEvents:[{type:'change',fn:function(){dynScrTablesList_colLengthChanged()}}]}" />
	<psjg:gridColumn id="DECIMAL_VALUE" colType="number" name="DECIMAL_VALUE" index="DECIMAL_VALUE" autoSearch="true" title="%{getText('decimal_value_key')}" editable="true" sortable="true" search="true" editoptions="{ maxlength:'2',readonly:'readonly'}"/>
	<psjg:gridColumn id="PRIMARY_KEY"     
	                 colType="checkbox"
	                 edittype="checkbox" formatter="checkbox"
	                 editable="true" sortable="true" search="true" align="center"
				     editoptions="{value:'1:0',align:'center', dataEvents: [{ type: 'change', fn: function(e) {}}]}"	                  
	                 name="PRIMARY_KEY" index="PRIMARY_KEY" autoSearch="true" title="%{getText('primarykey_key')}"/>
    <psjg:gridColumn id="VISIBLE_YN"     
	                 colType="checkbox"
	                 edittype="checkbox" formatter="checkbox"
	                 editable="true" sortable="true" search="true" align="center"
				     editoptions="{value:'1:0',align:'center', dataEvents: [{ type: 'change', fn: function(e) {}}]}"	                  
	                 name="VISIBLE_YN" index="VISIBLE_YN" autoSearch="true" title="%{getText('visible_key')}"/>
</psjg:grid>

<div id="dynScrTblCreator_del_div" style = "display:none">
		<ptt:toolBar id="dynScrTblCreator_del_ToolBar" hideInAlert="true">
		
			<psj:submit button="true" freezeOnSubmit="true"  id="dynScrTableDelTblBtn"
				onclick="screenGeneratorList_onDelDynTableClicked()">
				<ps:text name="delete_key"></ps:text>
			</psj:submit>
			</ptt:toolBar>
</div>
</div>
<ps:hidden name="dynScrTableGridUpdates" id="dynScrTableGridUpdates"></ps:hidden>
</fieldset>
</ps:form>

<script type="text/javascript">
dynScreenId = $("#screen_id_"+ _pageRef).val();
$("#dynScrTableColsGridId").subscribe("onSelectRowComplete",function(){
	defineScrTables_selectColumn();
	});
</script>
