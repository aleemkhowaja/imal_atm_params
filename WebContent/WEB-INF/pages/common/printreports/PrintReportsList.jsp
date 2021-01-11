<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<div style ="width:465px">
    <psjg:grid
    	id="printReportsGridTbl_Id_${_pageRef}" caption=" "
  	    href="%{printReportsGridUrl}" dataType="json" 
  	    sortable="true" filter="true"
    	gridModel="gridModel" rowList="5,10,15,20" rowNum="20"
    	pager="false" viewrecords="true" 
        altRows="true" 
        navigatorRefresh="false" 
        navigatorSearch="false"
        shrinkToFit="true" 
        multiselect="true"
        pagerButtons="false">
		<psjg:gridColumn id="REP_ID" colType="number" name="ctsRepFileTypeVO.REP_ID" index="REP_ID" title="%{getText('reportReference_key')}" editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="ARG_ID" colType="number" name="ctsRepFileTypeVO.ARG_ID" index="ARG_ID" title="hidden_Column" editable="false" sortable="true" search="true" hidden="true"/>
		<psjg:gridColumn id="TITLE"  colType="text" name="repInfoVO.TITLE" index="TITLE" title="%{getText('Description_key')}" editable="false" sortable="true" search="true"/>
	</psjg:grid>
</div>	
	<script type="text/javascript">
	$(document).ready(
		function()
		{
			printReportListLoad();
		}
	
	);
		//$("#gview_trxTypeGridTbl_Id_" + _pageRef + " div.ui-jqgrid-titlebar").hide();
	</script>	
