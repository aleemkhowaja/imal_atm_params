<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:hidden name="criteria.screenId" id="screen_id_${_pageRef}" ></ps:hidden>

<script type="text/javascript">
	$.struts2_jquery.require("DynScrGridList.js" ,null,"${pageContext.request.contextPath}/common/js/dynamicscreen/");
	
</script>

<div id = "dynamicScreen_<ps:property value="criteria.screenId" escapeHtml="true"/>_GridDiv_<ps:property value="_pageRef" escapeHtml="true"/>" style="width: 100%;">
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:url id="dynamicScreen_GridUrl" namespace="/path/dynamicScreen" action="dynScrGridListAction_loadDynScrGrid" escapeAmp="false">
		<ps:param name="criteria.screenId" value="%{criteria.screenId}"></ps:param>
		<ps:param name="criteria.tableId" value="%{criteria.tableId}"></ps:param>
</ps:url>

	<psjg:grid  id="dynamicScreen_${criteria.screenId}_Grid_${_pageRef}" 
				caption=" "
				href="%{dynamicScreen_GridUrl}"
				dataType="json" 
				pager="true" 
				gridModel="gridModel" 
				rowNum="5"
				rowList="5,10,15,20" 
				navigator="true" 
				viewrecords="true" 
				hiddengrid="false"
				height="110"
				altRows="true" 
				sortable="true" 
				filter="true"
				navigatorAdd="true" 
				navigatorDelete="false"
				navigatorEdit="false" 
				navigatorSearch="true"
    			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	    		ondblclick       ="dynScrGridList_onDbClickedEvent()"
   				addfunc          ="dynScrGridList_onAddEvent()"
   				onGridCompleteTopics="onDynamicScreenGridComplete"
	>
		<ps:iterator value="colsLst">
		<ps:if test="COL_TYPE != 2 && COL_TYPE != 4 && COL_TYPE != 5 && COL_TYPE != 6">
			<psjg:gridColumn id="%{COL_TECH_NAME}"
							 colType="%{COL_TYPE_DESC}"
							 name="%{COL_TECH_NAME}"
							 index="%{COL_TECH_NAME}"
							 title="%{COL_DESC}"
							 hidden="%{HIDDEN}"
							 sortable="true"
			/>
		</ps:if>
		<ps:if test="COL_TYPE == 4">
			<psjg:gridColumn 	id="%{COL_TECH_NAME}"
								name="%{COL_TECH_NAME}" 
								index="%{COL_TECH_NAME}"
								title="%{COL_DESC}"
								hidden="%{HIDDEN}"
								colType="checkbox"
								formatter="checkbox"
								editable="false"
								sortable="true"
								search="true"
								align="center"
								searchoptions="{sopt:['eq']}"
			/>
		</ps:if>
		<ps:if test="COL_TYPE == 2">
			<psjg:gridColumn 	name= "%{COL_TECH_NAME}"
								title="%{COL_DESC}"
								index="%{COL_TECH_NAME}" 
								hidden="%{HIDDEN}"
								colType="date"
								editable="false" 
								sortable="true"
								search="true"
								id="%{COL_TECH_NAME}" 
								sorttype="date"
								searchType="date" 
								formatter="date" 
								formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y'}"
			/>
		</ps:if>
		<ps:if test="COL_TYPE == 5">
			<psjg:gridColumn 	name= "%{COL_TECH_NAME}"
								title="%{COL_DESC}"
								index="%{COL_TECH_NAME}" 
								hidden="%{HIDDEN}"
								colType="date"
								editable="false" 
								sortable="true"
								search="true"
								id="%{COL_TECH_NAME}" 
								sorttype="date"
								searchType="date" 
								formatter="date" 
								formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y  h:i:s A'}"
			/>
		</ps:if>
		</ps:iterator>
	</psjg:grid>
</div>
<div id = "dynamicScreen_<ps:property value="criteria.screenId" escapeHtml="true"/>_main_div_<ps:property value="_pageRef" escapeHtml="true"/>" >
</div>

<script type="text/javascript">
dynScreenId = $("#screen_id_"+ _pageRef).val();
$("#dynamicScreen_"+dynScreenId+"_Grid_"+ _pageRef).subscribe("onDynamicScreenGridComplete",function(){
	dynScrGridList_loadMainDiv();
	});
</script>
