<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
			<ps:url id="urlOptSeriesGrid" escapeAmp="false" action="seriesListAction_loadSeriesOptsListGrid" namespace="/path/customization">
			   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
			   <ps:param name="_pageRef" value="_pageRef"></ps:param>
			</ps:url>
		    <psjg:grid
		    	id               ="optSeriesGridTbl_Id_${_pageRef}"
    	        href             ="%{urlOptSeriesGrid}"
                dataType         ="json"
		    	pager            ="false"
		    	sortable         ="false"
				filter           ="false"
		    	gridModel        ="gridModel"
		        viewrecords      ="true"
		        navigator        ="false"
		        navigatorDelete  ="false"
		        navigatorEdit    ="false"
		        navigatorRefresh ="false"
		        navigatorAdd     ="false"
		        navigatorSearch  ="false"
		        altRows          ="true"
		        shrinkToFit      ="true">
				<psjg:gridColumn id="PROG_REF"       colType="text" name="PROG_REF"       index="PROG_REF"       title="%{getText('progRef')}"         editable="false" sortable="true" search="true"/>
				<psjg:gridColumn id="MENU_TITLE_ENG" colType="text" name="MENU_TITLE_ENG" index="MENU_TITLE_ENG" title="%{getText('Description_key')}" editable="false" sortable="true" search="true"/>
			</psjg:grid>