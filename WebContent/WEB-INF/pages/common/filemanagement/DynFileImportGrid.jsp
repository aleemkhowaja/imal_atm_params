<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<!-- The below section will be included initially in an iFrame by ajaxSubmit plugin.
     Since jQuery is not present in the context,setting jQuery reference of parent window.
 -->
<script>
 
 if (typeof(jQuery) == "undefined") { 
   var jQuery = window.parent.$;
}

</script>

 
		<ps:url id="importGridUrl_${_pageRef}" namespace="/path/fileMngmt"
			action="DynFileGrid_loadDynFilesData" escapeAmp="false">
			<ps:param name="dynFilesSC.fileCode"
				value="%{dynFilesDetCO.dfDataFileVO.FILE_CODE}"></ps:param>
			<ps:param name="dynFilesSC.structCode"
				value="%{dynFilesDetCO.dfFileStructVO.STRUCT_CODE}"></ps:param>
			<ps:param name="dynFilesSC.fileType"
				value="%{dynFilesDetCO.dfFileStructVO.FILE_TYPE}"></ps:param>
		</ps:url>
		<ps:if test="dynFilesImportCO.colMap!=null">
			<psjg:grid id="importDataGrid_${_pageRef}"
				caption="%{getText('Imported_Data_key')}" href="%{importGridUrl_${_pageRef}}"
				dataType="json" pager="true" gridModel="gridModel" rowNum="10"
				rowList="5,10,15,20" viewrecords="true" navigator="true"
				altRows="true" sortable="false" filter="false" shrinkToFit="false"
				navigatorRefresh="false" navigatorAdd="false"
				navigatorDelete="false" navigatorEdit="false"
				navigatorSearch="false" rownumbers="true">
				<ps:iterator value="dynFilesImportCO.colMap">
					<psjg:gridColumn id="%{key}" colType="string" name="%{key}"
						index="%{key}" title="%{value}"  sortable="false"/>
				</ps:iterator>
			</psjg:grid>
			<ps:hidden id="batch_no_${_pageRef}" name="dynFilesImportCO.batchNumber"></ps:hidden>
		</ps:if>
		<ps:else>
			<psjg:grid id="importDataGrid_${_pageRef}"
				caption="%{getText('Imported_Data_key')}" href="#" dataType="json"
				pager="true" gridModel="gridModel" rowNum="10" rowList="5,10,15,20"
				viewrecords="true" navigator="true" altRows="true" sortable="false"
				filter="false" shrinkToFit="false" navigatorRefresh="false"
				navigatorAdd="false" navigatorDelete="false" navigatorEdit="false"
				navigatorSearch="false" height="150" rownumbers="true" >
				<ps:iterator value="dynFilesImportCO.colMap">
					<psjg:gridColumn id="%{key}" colType="string" name="%{key}"
						index="%{key}" title="%{value}"  sortable="false"/>
				</ps:iterator>
			</psjg:grid>

		</ps:else>
 


