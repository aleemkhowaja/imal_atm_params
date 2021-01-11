<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


 	<ps:hidden  id="tempTagJSON_${_pageRef}" name="tagGridJSON"></ps:hidden>
	<ps:url id="urlTagValues" action="DynFileGrid_loadTagValues"  namespace="/path/fileMngmt"  escapeAmp="false">	
		<ps:param name="dynFilesSC.fileCode" value="%{dynFilesSC.fileCode}"  ></ps:param>
		<ps:param name="dynFilesSC.structCode" value="%{dynFilesDetCO.dfFileStructVO.STRUCT_CODE}"></ps:param>	
	</ps:url>
	<ps:hidden id="hd_tagNo_${_pageRef}" > </ps:hidden>
	<psjg:grid id="dynFileTag_id_${_pageRef}" 
				href="%{urlTagValues}"
				caption="" 				dataType="json"
				pager="false" filter="false" gridModel="gridModel"
				rowNum="5" rowList="5,10,15,20" viewrecords="true" navigator="false"
				height="75" altRows="true"  
				pagerButtons="false"  
				shrinkToFit="true"	
				editurl="#"						
				editinline="true"
			  	onSelectRowTopics="onDynTagFileSelect"	
			  	loadonce="true"		   		  				 
				 >
				<psjg:gridColumn id="PARENT_TAG_NO_${_pageRef}" colType="number" 
					name="dfFileStructDetailVO.TAG_NO" index="dfFileStructDetailVO.TAG_NO" title="Tag No"
					editable="false" sortable="false" search="true" />
				<psjg:gridColumn id="TAG_DESC_${_pageRef}" colType="text"
					name="dfFileStructDetailVO.TAG_DESC" index="dfFileStructDetailVO.TAG_DESC" title="Tag Description"
					editable="false" sortable="false" search="true" />

					
				<psjg:gridColumn name="dfFileTagInpParamVO.INP_PARAM_DISP_VALUE"
					title="Type" index="dfFileTagInpParamVO.INP_PARAM_DISP_VALUE"
					colType="liveSearch" editable="true" sortable="true"
					id="INP_PARAM_DISP_VALUE_${_pageRef}"
					dataAction="${pageContext.request.contextPath}/pathdesktop/TagValueLookup_tagLookupDef"
					searchElement="INP_PARAM_DISP_VALUE"
					paramList="dynFilesSC.tagNo:dfFileStructDetailVO.TAG_NO,dynFilesSC.structCode:fileStructCode_${_pageRef},dynFilesSC.fileCode:lookuptxt_enqFileCode_${_pageRef}"
					resultList  = "INP_PARAM_DATA_VALUE:dfFileTagInpParamVO.INP_PARAM_DATA_VALUE"
					editoptions="{ readonly: 'readonly'}"
										
					 />
						
				<psjg:gridColumn id="INP_PARAM_DATA_VALUE_${_pageRef}" colType="text"
					name="dfFileTagInpParamVO.INP_PARAM_DATA_VALUE" index="dfFileTagInpParamVO.INP_PARAM_DATA_VALUE"  
					editable="false" sortable="false" search="true" title="INP_PARAM_DATA_VALUE" hidden="true"  />
					
			
					
	</psjg:grid>
	
<script>

$(document).ready(function() {
	$.subscribe('onDynTagFileSelect', function(event, data) {
	var selectedRow = $("#dynFileTag_id_"+_pageRef).jqGrid("getGridParam", 'selrow');	
	$("#hd_tagNo_"+_pageRef).val($("#dynFileTag_id_"+_pageRef).jqGrid('getCell', selectedRow, "dfFileStructDetailVO.PARENT_TAG_NO"));
		 
	});
	
});

	

</script>
	
	
 