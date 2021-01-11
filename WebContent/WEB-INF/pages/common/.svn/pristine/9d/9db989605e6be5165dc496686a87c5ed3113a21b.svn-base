<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
		<div id="trackReportDiv<ps:property value="param.theGrid" escapeHtml="true"/>"> 	
		    <psjg:grid
		    	id="trackActionsGrid_Id${param.theGrid}"
		    	loadonce="true" 
                dataType="json"
		    	pager="true" 
				filter="true"
		    	gridModel="gridModel" 
		    	rowNum="5" 
		    	rowList="5,10,15,20"
		        viewrecords="true" 
		        navigator="true" 
		        height="230"
		        altRows="true"
		        navigatorRefresh="false"
		        navigatorSearch="true"
		        navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
		        navigatorAdd="false"
		        navigatorEdit="false"
		        navigatorDelete="false"
		        hidegrid="false"
		        autowidth="true">
		        
		        <psjg:gridColumn name="fieldLocation"  title="%{getText('Location_key')}" index="fieldLocation" colType="text" editable="false" sortable="true" search="true" id="fieldLocation" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn name="fieldLabel"  title="%{getText('Label_key')}" index="fieldLabel" colType="text" editable="false" sortable="true" search="true" id="fieldLabel" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn name="oldValue"  title="%{getText('oldValue')}" index="oldValue" colType="text" editable="false" sortable="true" search="true" id="oldValue" searchoptions="{sopt:['cn']}"/>
		        <psjg:gridColumn name="newValue"  title="%{getText('newValue')}" index="newValue" colType="text" editable="false" sortable="true" search="true" id="newValue"  searchoptions="{sopt:['cn']}"/>
			</psjg:grid>	
		</div>

<ps:hidden id="amendmentTrackSelectedGrid"></ps:hidden>
<ps:hidden id="amendmentTrackAGridLoaded"></ps:hidden>
<ps:hidden id="amendmentTrackDGridLoaded"></ps:hidden>
<ps:hidden id="amendmentTrackUGridLoaded"></ps:hidden>
	<script type="text/javascript">
		function gridSorting()
		{
			$("#trackActionsDetailsGrid_Id").jqGrid('sortGrid',"fieldLabel",true,"asc")
		}
		$.subscribe("reSortGrid",function(){
			$.unsubscribe("reSortGrid")
		  window.setTimeout(gridSorting,0);
		})

	</script>