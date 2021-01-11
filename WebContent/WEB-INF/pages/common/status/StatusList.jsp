<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<div id="status_div_grid" style ="width:465px">
    <psjg:grid
    	id="statusGridTbl_Id" loadonce="true"
  	    href="%{url}" 
        dataType="json"
        pager="true"
        sortable="true"
		filter="true"
    	gridModel="gridModel" 
        viewrecords="true" 
        altRows="true"
        height="180"
        navigatorRefresh="false" sortname="status_date" sortorder="desc"
        navigatorSearch="false" onCompleteTopics="reSortGrid" 
        shrinkToFit="false">
		<psjg:gridColumn id="userName"    colType="text" name="userName"    index="userName"    title="%{getText('status.userName')}"    editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		<psjg:gridColumn id="status_desc"  colType="text" name="status_desc" index="status_desc" title="%{getText('status.status_desc')}" editable="false" sortable="true" search="true" searchoptions="{sopt:['cn']}"/>
		<psjg:gridColumn id="status_date" colType="date" name="status_date" index="status_date" title="%{getText('status.status_date')}" editable="false" sortable="true" sorttype="date" searchType="date"  search="true" formatter="date" searchoptions="{sopt:['eq']}" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"/>
		 <ps:if test="addFields != null">
		 	  <ps:iterator value="addFields" var="eachCO" status="status" >
		 	  	<ps:if test='"${eachCO.colType}" == "date"'>
		 	  		<psjg:gridColumn id="addFieldMap.DYN_COL_%{#status.index}" colType="${eachCO.colType}" name="addFieldMap.DYN_COL_%{#status.index}" index="addFieldMap.DYN_COL_%{#status.index}" title="%{getText('${eachCO.colTitleKey}')}" editable="false" searchoptions="{sopt:['eq']}" sortable="true" searchType="date" sorttype="date" search="true" formatter="date" formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"/>
		 	  	</ps:if>
		 	  	<ps:else>
		 	  		<psjg:gridColumn id="addFieldMap.DYN_COL_%{#status.index}" colType="${eachCO.colType}" name="addFieldMap.DYN_COL_%{#status.index}" index="addFieldMap.DYN_COL_%{#status.index}" title="%{getText('${eachCO.colTitleKey}')}" editable="false" sortable="true" search="true"/>
		 	  	</ps:else>
		 	  </ps:iterator>
		 </ps:if>
	</psjg:grid>
</div>	
	<script type="text/javascript">
		function gridSorting()
		{
			$("#statusGridTbl_Id").jqGrid('sortGrid',"status_date",true,"desc")
		}
		$.subscribe("reSortGrid",function(){
			$.unsubscribe("reSortGrid")
		  window.setTimeout(gridSorting,0);
		})
	</script>
	<ps:if test="addFields != null">
		<script type="text/javascript">
		 var addParamsCount = ${addFields.size()};// number of additional columns
		 var statusGridDivWidth = 465; // width of parent div of grid
		 var addColWidth = 155*addParamsCount;// width to be added for all column 
		 // div of the dialog which is the parent of grid div.
		 $("#status_div_grid").parent().dialog({minWidth:returnMaxWidth(469+addColWidth),modal:true});
		 $("#status_div_grid").css("width",(statusGridDivWidth+addColWidth));
		 resizeSingleGrid("statusGridTbl_Id");
		 </script>
	</ps:if>	
