<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td>
		<ps:url id="irisCifDetailsGridTblUrl" action="IrisApplicationDetails_searchCIF" namespace="/path/irisapplication">
	    </ps:url>
			<psjg:grid  id="irisCifDetailsGridTbl_Id_${_pageRef}" caption=" "
				href="%{irisCifDetailsGridTblUrl}" dataType="json" hiddengrid="false" pager="true" shrinkToFit="false"
				altRows="false" filter="true" gridModel="gridModel"
				viewrecords="true" navigator="false" height="140"
				navigatorRefresh="false" navigatorEdit="false"
				ondblclick="iris_populateSelectedCif()" navigatorSearch="false"
				navigatorAdd="false" navigatorDelete="false"
				sortable="true"
				rowNum="5" 
		    	rowList="5,10,15,20"
				>
				<psjg:gridColumn id="cifNo_${_pageRef}" colType="number"
					name="CIF_NO" leadZeros="6" 
					index="CIF_NO" title="%{getText('CIF_No_key')}"
					editable="false" sortable="true" search="true" />
				<psjg:gridColumn id="shortName_${_pageRef}" colType="text"
					name="SHORT_NAME_ENG"
					index="SHORT_NAME_ENG" title="%{getText('Short_name_eng_key')}"
					editable="false" sortable="false" search="true" />
				<psjg:gridColumn id="longName_${_pageRef}" colType="text"
					name="LONG_NAME_ENG"
					index="LONG_NAME_ENG" title="%{getText('Long_Name_eng_key')}"
					editable="false" sortable="true" search="true" />
				<psjg:gridColumn id="shortNameArab_${_pageRef}" colType="text"
					name="SHORT_NAME_ARAB"
					index="SHORT_NAME_ARAB"
					title="%{getText('Short_Name_Arab_key')}" editable="false"
					sortable="true" search="true" hidden="session.sesVO.hideArabicColumns" />
				<psjg:gridColumn id="longNameArab_${_pageRef}" colType="text"
					name="LONG_NAME_ARAB"
					index="LONG_NAME_ARAB"
					title="%{getText('Long_Name_Arab_key')}" editable="false"
					sortable="true" search="true" hidden="session.sesVO.hideArabicColumns" />
			</psjg:grid>
		</td>
	</tr>
</table>
<script type="text/javascript">

$('#gview_irisCifDetailsGridTbl_Id_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/> div.ui-jqgrid-titlebar')
		.hide();
</script>