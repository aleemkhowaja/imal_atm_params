<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
		
<div class="Dash_accountsListDiv_${_pageRef}"> 	
	<ps:url id="generalAccountsGrid" action="GeneralAccountsList_loadGeneralAccountsGrid" namespace="/path/generalAccounts">
		<ps:param name="iv_crud"   value="'U'"></ps:param>
		<ps:param name="_pageRef" value="'A002MA'"></ps:param>
	</ps:url>

    <psjg:grid
    	id="generalAccountsGridTbl_Id_${_pageRef}" 	caption="%{getText('General_Accounts_key')}"	dataType="json" 
    	href="%{generalAccountsGrid}" 			pager="true" 										filter="true"
    	gridModel="gridModel" 					rowNum="5" 											rowList="5,10,15,20"
        viewrecords="true" 						multiselect="false"									multiboxonly="false"
        navigator="true"  						height="130"										altRows="true"
        navigatorAdd     ="false"				navigatorDelete  ="false"							navigatorEdit    ="false"
        navigatorRefresh ="false" 				navigatorSearch="true"								rownumbers="false"
        navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
        shrinkToFit="false"						
         >
    
		<psjg:gridColumn name="BRIEF_NAME_ENG" 			title="%{getText('brief_name_en_key')}" 	    index="BRIEF_NAME_ENG" 			colType="text" 		editable="false" 	sortable="true" 	search="true"	id="BRIEF_NAME_ENG"/>
		<psjg:gridColumn name="ADDITIONAL_REFERENCE" 	title="%{getText('Additional_Reference_key')}" 	index="ADDITIONAL_REFERENCE" 	colType="text" 		editable="false" 	sortable="true" 	search="true"	id="ADDITIONAL_REFERENCE" />
		<psjg:gridColumn name="CURRENCY_CODE"			title="%{getText('CY_key')}" 					index="CURRENCY_CODE" 			colType="number" 	editable="false" 	sortable="true" 	search="true"	id="CURRENCY_CODE"/>
		<psjg:gridColumn name="GL_CODE" 				title="%{getText('G_L_Code_key')}" 				index="GL_CODE" 				colType="number" 	editable="false" 	sortable="true" 	search="true"	id="GL_CODE" />
		<psjg:gridColumn name="CIF_SUB_NO" 				title="%{getText('CIF_SUB_key')}" 				index="CIF_SUB_NO" 				colType="number" 	editable="false" 	sortable="true" 	search="true"	id="CIF_SUB_NO" />
		<psjg:gridColumn name="SL_NO" 					title="%{getText('S_L_No_key')}" 				index="SL_NO" 					colType="number" 	editable="false" 	sortable="true" 	search="true"	id="SL_NO" />
		<psjg:gridColumn name="STATUS" 					title="%{getText('Status_key')}" 				index="STATUS" 					colType="text" 		editable="false" 	sortable="true" 	search="true"	id="STATUS" />
	</psjg:grid>
</div>
	

