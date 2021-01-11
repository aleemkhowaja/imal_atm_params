<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
 <html>
<body>
		<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
		<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />
       <div id="merchantMgntDiv_id">
	    <ps:url id="urlMerchantMgntGrid"
				action="merchantMgntList_loadMerchantMgntGrid" namespace="/path/merchants"
				escapeAmp="false">
				<ps:param name="iv_crud" value="iv_crud"></ps:param>
				<ps:param name="_pageRef" value="_pageRef"></ps:param>
			</ps:url>
			
			<psjg:grid
				id="merchantMgntGridTbl_Id_${_pageRef}"
				caption=" "
				href="%{urlMerchantMgntGrid}"
				dataType="json"
				hiddengrid='%{iv_crud == "R"}'
				pager="true"
				filter="true"
				gridModel="gridModel"
				viewrecords="true"
				rowNum="5"
				navigator="true"
				rowList="5,10,15,20"
				altRows="true"
				navigatorRefresh="false"
				navigatorDelete="false"
				navigatorEdit="false"
				navigatorAdd="false"
				navigatorSearch="true"
				shrinkToFit="false"
				sortorder="desc"
				ondblclick="merchantMgnt_onDbClickedEvent()"
				addfunc   ="merchantMgnt_onAddClicked" >
				
								
				<psjg:gridColumn name="gtwAtmMerchantVO.MERCHANT_CODE"			title="%{getText('Code_key')}"	  				index="MERCHANT_CODE"		 colType="number" editable="false" sortable="true" search="true"	id="MERCHANT_CODE_${_pageRef}" />
				<psjg:gridColumn name="gtwAtmMerchantVO.IBAN_ACC_NO"			title="%{getText('iban_key')}"	  				index="IBAN_ACC_NO"			 colType="text"   editable="false" sortable="true" search="true"	id="IBAN_ACC_NO_${_pageRef}" />
				<psjg:gridColumn name="gtwAtmMerchantVO.ADDITIONAL_REFERENCE"	title="%{getText('Additional_ref_key')}"	  	index="ADDITIONAL_REFERENCE" colType="text"   editable="false" sortable="true" search="true" 	id="ADDITIONAL_REFERENCE_${_pageRef}" />
				<psjg:gridColumn name="gtwAtmMerchantVO.REMARK"		            title="%{getText('remarks_key')}"	  	        index="REMARK"               colType="text"   editable="false" sortable="true" search="true"	id="REMARK_${_pageRef}" />
				<psjg:gridColumn name="statusDesc"							    title="%{getText('vaultLookup.status')}"		index="statusDesc"		     colType="text"   editable="false" sortable="true" search="true"	id="STATUS_${_pageRef}" />
				<psjg:gridColumn name="statusTime"		    					
					title="%{getText('status.status_date')}"			
					id="STATUS_TIME_${_pageRef}"
					index="statusTime"		 	 
					colType="date"   
					editable="false" 
					sortable="true" 
					sorttype="date"
					search="true"	
					searchType="date"
					formatter="date"				 
					searchoptions="{sopt:['eq']}" 
				 formatoptions="{srcformat:'Y-m-d H:i:s.u',newformat:'d/m/Y H:i:s' }"
				/>
								
			</psjg:grid>
		</div>

		<div id="merchantDetailsDiv_id_${_pageRef}" class="collapsibleContainer">
			<ps:if test='iv_crud == "R"'>
				<%@include file="MerchantMgntMaint.jsp"%>
			</ps:if>
		</div>
		<ps:hidden type="hidden" id="record_was_canceled_successfully_key" value="%{getText('record_was_canceled_successfully_key')}"/>
</body>
<script type="text/javascript">
    $.struts2_jquery.require("MerchantMgntList.js", null, jQuery.contextPath+ "/path/js/atm/merchants/merchantmgnt/");
	$(document).ready(merchantMgnt_ListLoad);
	var record_was_canceled_successfully_key = document.getElementById("record_was_canceled_successfully_key").value;
</script>
</html> 


