<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("SendAlertsList.js" ,null,jQuery.contextPath+"/common/js/alerts/");
</script>

<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />

<ps:hidden id="alert_param_trsNo_${_pageRef}" name="trsNo"/>
<ps:hidden id="alert_param_alertType_${_pageRef}" name="alertType"/>
<ps:hidden id="alert_param_reasonCode_${_pageRef}" name="reasonCode"/>
<ps:hidden id="alert_param_amount_${_pageRef}" name="amount"/>
<ps:hidden id="alert_param_status_${_pageRef}" name="status"/>
<ps:hidden id="alert_param_compCode_${_pageRef}" name="compCode"/>
<ps:hidden id="alert_param_trsType_${_pageRef}" name="trsType"/>
<ps:hidden id="alert_param_branchCode_${_pageRef}" name="branchCode"/>
<ps:hidden id="alert_param_todoAlert_${_pageRef}" name="todoAlert"/>
<ps:hidden id="alert_param_alertDesc_${_pageRef}" name="alertDesc"/>

<ps:hidden id="alert_param_briefNameEnglish_${_pageRef}" name="briefNameEnglish"/>	
<ps:hidden id="alert_param_longNameEnglish_${_pageRef}" name="longNameEnglish"/>	
<ps:hidden id="alert_param_briefNameArab_${_pageRef}" name="briefNameArab"/>	
<ps:hidden id="alert_param_longNameArab_${_pageRef}" name="longNameArab"/> 
<ps:hidden id="alert_param_distributionType_${_pageRef}" name="distributionType"/>	
<ps:hidden id="alert_param_distributionTo_${_pageRef}" name="distributionTo"/> 	
<ps:hidden id="alert_param_todoType_${_pageRef}" name="todoType"/>
<ps:hidden id="alert_param_todoPriority_${_pageRef}" name="todoPriority"/>	
<ps:hidden id="alert_param_todoExternal_${_pageRef}" name="todoExternal"/>	
<ps:hidden id="alert_param_allowToSend_${_pageRef}" name="allowToSend"/>	
<ps:hidden id="alert_param_todoChecked_${_pageRef}" name="todoChecked"/> 	
<ps:hidden id="alert_param_todoParam_${_pageRef}" name="todoParam"/> 	
<ps:hidden id="alert_param_todoExecution_${_pageRef}" name="todoExecution"/>	
<ps:hidden id="alert_param_todoExcepEnglish_${_pageRef}" name="todoExcepEnglish"/>	
<ps:hidden id="alert_param_todoExcepArabic_${_pageRef}" name="todoExcepArabic"/> 	
<ps:hidden id="alert_param_todoTellerBranch_${_pageRef}" name="todoTellerBranch"/> 	
<ps:hidden id="alert_param_todoFrBranch_${_pageRef}" name="todoFrBranch"/> 	
<ps:hidden id="alert_param_todoTellerId_${_pageRef}" name="todoTellerId"/> 	
<ps:hidden id="alert_param_actionType_${_pageRef}" name="actionType"/>
<ps:hidden id="alert_param_progRef_${_pageRef}" name="progRef"/>	
<ps:hidden id="alert_param_cifNo_${_pageRef}" name="CIF_NO"/>
<ps:hidden id="alert_param_subTellerCode_${_pageRef}" name="subTellerCode"/>	
<ps:hidden id="alert_param_authOdAcc_${_pageRef}" name="authOdAcc"/>	
<ps:hidden id="alert_param_andOr_${_pageRef}" name="andOr"/>	
<ps:hidden id="alert_param_compSubCode_${_pageRef}" name="compSubCode"/>	
<ps:hidden id="alert_param_branchSubCode_${_pageRef}" name="branchSubCode"/>	
<ps:hidden id="alert_param_branchCodeList_${_pageRef}" name="branchCodeList"/>		
<ps:hidden id="alert_param_tellerLevel_${_pageRef}" name="tellerLevel"/>		
<ps:hidden id="alert_param_amountCV_${_pageRef}" name="amountCV"/>		
<ps:hidden id="alert_param_trxType_${_pageRef}" name="trxType"/>		
<ps:hidden id="alert_param_glCode_${_pageRef}" name="glCode"/>		
<ps:hidden id="alert_param_cifType_${_pageRef}" name="cifType"/>		
<ps:hidden id="alert_param_ecoSector_${_pageRef}" name="ecoSector"/>		
<ps:hidden id="alert_param_priorityCode_${_pageRef}" name="priorityCode"/>		
<ps:hidden id="alert_param_entityType_${_pageRef}" name="entityType"/>	
<ps:hidden id="alert_param_todoAlertOldStatus_${_pageRef}" name="todoAlertOldStatus"/>
<ps:hidden id="alert_param_todoRemarqs_${_pageRef}" name="todoRemarqs"/>	
<ps:hidden id="alert_param_sendAlertCallBackFunction_${_pageRef}" name="sendAlertCallBackFunction"/>	

<ps:hidden id="alert_param_sendAlertCallBackOnChkPwd_${_pageRef}" name="sendAlertCallBackOnChkPwd"/>	
<ps:hidden id="alert_param_sendAlertCallBackOnChkPwdSuccess_${_pageRef}" name="sendAlertCallBackOnChkPwdSuccess"/>
<ps:hidden id="alert_param_sendAlertCallBackOnItemClose_${_pageRef}" name="sendAlertCallBackOnItemClose"/>	
<ps:hidden id="alert_param_highLightMap_${_pageRef}" name="highLightMap"/>
<ps:hidden id="alert_param_additionalParams_${_pageRef}" name="additionalParams"/>	
<ps:hidden id="alert_param_accessRightsOptList_${_pageRef}" value="${customAccessRightsOptList}"/>
		
		
<ps:set name="trsNo_${_pageRef}" value="trsNo"/>
<ps:set name="alertType_${_pageRef}" value="alertType"/>
<ps:set name="reasonCode_${_pageRef}" value="reasonCode"/>
<ps:set name="amount_${_pageRef}" value="amount"/>
<ps:set name="status_${_pageRef}" value="status"/>
<ps:set name="compCode_${_pageRef}" value="compCode"/>
<ps:set name="trsType_${_pageRef}" value="trsType"/>
<ps:set name="branchCode_${_pageRef}" value="branchCode"/>
<ps:set name="todoAlert_${_pageRef}" value="todoAlert"/>
<ps:set name="alertDesc_${_pageRef}" value="alertDesc"/>
<ps:set name="todoParam_${_pageRef}" value="todoParam"/>
<ps:set name="subTellerCode_${_pageRef}" value="subTellerCode"/>
<ps:set name="progRef_${_pageRef}" value="progRef"/>
<ps:set name="authOdAcc_${_pageRef}" value="authOdAcc"/>
<ps:set name="compSubCode_${_pageRef}" value="compSubCode"/>
<ps:set name="branchSubCode_${_pageRef}" value="branchSubCode"/>
<ps:set name="branchCodeList_${_pageRef}" value="branchCodeList"/>
<ps:set name="tellerLevel_${_pageRef}" value="tellerLevel"/>
<ps:set name="amountCV_${_pageRef}" value="amountCV"/>
<ps:set name="trxType_${_pageRef}" value="trxType"/>
<ps:set name="glCode_${_pageRef}" value="glCode"/>
<ps:set name="cifType_${_pageRef}" value="cifType"/>
<ps:set name="ecoSector_${_pageRef}" value="ecoSector"/>
<ps:set name="priorityCode_${_pageRef}" value="priorityCode"/>
<ps:set name="todoTellerId_${_pageRef}" value="todoTellerId"/>
<ps:set name="entityType_${_pageRef}" value="entityType"/>
<ps:set name="todoTellerBranch_${_pageRef}" value="todoTellerBranch"/>
<ps:set name="todoTellerId_${_pageRef}" value="todoTellerId"/>
<ps:set name="allowOffline_${_pageRef}" value="allowOffline"/>
<ps:set name="allowLocalApproveOnly_${_pageRef}" value="allowLocalApproveOnly"/>
<ps:set name="todoRemarqs_${_pageRef}" value="todoRemarqs"/>
<ps:set name="andOr_${_pageRef}" value="andOr"/>
<ps:set name="accessRightOptString_${_pageRef}" value="accessRightOptString"/>
<ps:set name="additionalParams_${_pageRef}" value="additionalParams"/>

  <div style="width: 100%; height: 100%;">
  	
  	<ps:url id="urlAlertsGrid" action="AlertsGrid_loadAlertsGrid?_pageRef=${_pageRef}&iv_crud=${iv_crud}"	namespace="/path/alerts" escapeAmp="false">
	  <ps:param name="trsNo" value="trsNo_${_pageRef}"></ps:param>
	  <ps:param name="reasonCode" value="reasonCode_${_pageRef}"></ps:param>
	  <ps:param name="alertType" value="alertType_${_pageRef}"></ps:param>
	  <ps:param name="amount" value="amount_${_pageRef}"></ps:param>
	  <ps:param name="status" value="status_${_pageRef}"></ps:param>
	  <ps:param name="trsType" value="trsType_${_pageRef}"></ps:param>
	  <ps:param name="alertDesc" value="alertDesc_${_pageRef}"></ps:param>
	  <ps:param name="compCode" value="compCode_${_pageRef}"></ps:param>
	  <ps:param name="branchCode" value="branchCode_${_pageRef}"></ps:param>
	  <ps:param name="todoAlert" value="todoAlert_${_pageRef}"></ps:param>
	  <ps:param name="todoParam" value="todoParam_${_pageRef}"></ps:param>
	  <ps:param name="subTellerCode" value="subTellerCode_${_pageRef}"></ps:param>
	  <ps:param name="progRef" value="progRef_${_pageRef}"></ps:param>
	  <ps:param name="authOdAcc" value="authOdAcc_${_pageRef}"></ps:param>
	  <ps:param name="compSubCode" value="compSubCode_${_pageRef}"></ps:param>
	  <ps:param name="branchSubCode" value="branchSubCode_${_pageRef}"></ps:param>
	  <ps:param name="branchCodeList" value="branchCodeList_${_pageRef}"></ps:param>
	  <ps:param name="tellerLevel" value="tellerLevel_${_pageRef}"></ps:param>
	  <ps:param name="amountCV" value="amountCV_${_pageRef}"></ps:param>
	  <ps:param name="trxType" value="trxType_${_pageRef}"></ps:param>
	  <ps:param name="glCode" value="glCode_${_pageRef}"></ps:param>
	  <ps:param name="cifType" value="cifType_${_pageRef}"></ps:param>
	  <ps:param name="ecoSector" value="ecoSector_${_pageRef}"></ps:param>
	  <ps:param name="priorityCode" value="priorityCode_${_pageRef}"></ps:param>
	  <ps:param name="todoTellerId" value="todoTellerId_${_pageRef}"></ps:param>
	  <ps:param name="entityType" value="entityType_${_pageRef}"></ps:param>
	  <ps:param name="todoTellerBranch" value="todoTellerBranch_${_pageRef}"></ps:param>
	  <ps:param name="todoTellerId" value="todoTellerId_${_pageRef}"></ps:param>
	  <ps:param name="allowOffline" value="allowOffline_${_pageRef}"></ps:param>
	  <ps:param name="allowLocalApproveOnly" value="allowLocalApproveOnly_${_pageRef}"></ps:param>
	  <ps:param name="todoRemarqs" value="todoRemarqs_${_pageRef}"></ps:param>
	  <ps:param name="andOr" 	   value="andOr_${_pageRef}"></ps:param>
	  <ps:param name="accessRightOptString" 	   value="accessRightOptString_${_pageRef}"></ps:param>
	  <ps:param name="additionalParams" 	   value="additionalParams_${_pageRef}"></ps:param>
	</ps:url>

	 <psjg:grid id="alertsGrid_Id_${_pageRef}"					
		caption=" "	
		height="70"
		href="%{urlAlertsGrid}" 
		dataType="json"  
		hiddengrid="false" 
		pager="true" 
		filter="true" 
		sortable="true" 
		gridModel="gridModel" 
		rowNum="5" 
		rowList="5,10,15,20"
		viewrecords="true" 
		navigator="true"   
		altRows="true"
		navigatorRefresh="false" 
		navigatorSearch="true"
    	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
		navigatorAdd="false" 
		navigatorDelete="false" 
		navigatorEdit="false" 
		shrinkToFit="false"  
		ondblclick="SEND_ALERTS_MAINT_sendAlert()"
		onGridCompleteTopics="onSendAlertScreenLoad"  
		onCompleteTopics="onSendAlertScreenComplete"
		>
		
		<ps:if test='allowOffline == "1"'>
			<psjg:gridColumn id="USER_STATUS" colType="text"
				name="alertsParamCO.userStatus" index="USER_STATUS"
				title="%{getText('user_status_key')}"
				editable="false" sortable="true" search="true" value="" 
			/>
		</ps:if>
		
		<psjg:gridColumn id="USER_ID" colType="text"
			name="alertsParamCO.userId" index="USER_ID"
			title="%{getText('User_Id_key')}"
			editable="false" sortable="true" search="true" value="" 
			/>
		<psjg:gridColumn id="CODE" colType="number" name="alertsParamCO.userCode" 
			index="CODE" title="%{getText('Code_key')}"  	
			editable="false" sortable="true" search="true"  
			/>
		<psjg:gridColumn id="BRANCH_CODE" colType="number" name="alertsParamCO.branchCode"
			index="BRANCH_CODE"
			title="%{getText('Branch_code_key')}"
			editable="false" sortable="true" search="true" 
			/>
		<psjg:gridColumn id="BRIEF_NAME_ENG" colType="text"
			name="alertsParamCO.briefNameEnglish" index="BRIEF_NAME_ENG"
			title="%{getText('Brief_Name_eng_key')}"
			editable="false" sortable="true" search="true" 
			/>
		<psjg:gridColumn id="LONG_NAME_ENG" colType="text" name="alertsParamCO.longNameEnglish"
			index="LONG_NAME_ENG" title="%{getText('Long_Name_eng_key')}"
			editable="false" sortable="true" search="true"								
			/>					
		<psjg:gridColumn id="BRIEF_NAME_ARAB" colType="text" name="alertsParamCO.briefNameArab"
			index="BRIEF_NAME_ARAB" title="%{getText('Brief_Name_Arab_key')}"
			editable="false" sortable="true" search="true"
			/>
		<psjg:gridColumn id="LONG_NAME_ARAB" colType="text" name="alertsParamCO.longNameArab"
			index="LONG_NAME_ARAB"
			title="%{getText('Long_Name_Arab_key')}"
			editable="false" sortable="true" search="true" 
			/>
		<psjg:gridColumn id="STATUS" colType="text"
			name="alertsParamCO.status" index="STATUS"
			title="%{getText('status_key')}"
			editable="false" sortable="true" search="true" 
			/>
	 </psjg:grid>
	
  </div>		


<script type="text/javascript">
var userLevelMsg = decodeURIComponent("<%= java.net.URLEncoder.encode((String)request.getAttribute("userLevelMessage") , "UTF-8") %>".replace(/\+/g, '%20'));
$("#alertsGrid_Id_" + _pageRef).subscribe("onSendAlertScreenLoad",function(){
		SEND_ALERTS_LIST_alertAftertblLoad();
	});

$("#alertsGrid_Id_" + _pageRef).subscribe("onSendAlertScreenComplete",function(){
		SEND_ALERTS_LIST_onGridComplete();
	});

</script>


