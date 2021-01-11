<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.PluginsConstants"%>

<html>

<ps:set name="trsNo_${_pageRef}" value="trsNo"/>
<ps:set name="alertType_${_pageRef}" value="alertType"/>
<ps:set name="reasonCode_${_pageRef}" value="reasonCode"/>
<ps:set name="amount_${_pageRef}" value="amount"/>
<ps:set name="status_${_pageRef}" value="status"/>

  <div style="width:1150px;">
	<ps:url id="urlTrsAckTOutGrid" action="TrsAckTOutAlertsGrid_loadTrsAckTOutAlertsGrid?_pageRef=${_pageRef}&iv_crud=${iv_crud}"	namespace="/path/alerts" escapeAmp="false">
	  <ps:param name="trsNo" value="trsNo_${_pageRef}"></ps:param>
	  <ps:param name="reasonCode" value="reasonCode_${_pageRef}"></ps:param>
	  <ps:param name="alertType" value="alertType_${_pageRef}"></ps:param>
	  <ps:param name="amount" value="amount_${_pageRef}"></ps:param>
	  <ps:param name="status" value="status_${_pageRef}"></ps:param>
	  <ps:param name="appName" value="alertsSC.appName"></ps:param>
	  <ps:param name="enableLoginAlert" value="isLoginAlertEnabled"></ps:param>
	</ps:url>
	 <psjg:grid id="trsAckTOutAlertGrid_Id_${_pageRef}"		 					
		caption=" "			
		height="200"								
		href="%{urlTrsAckTOutGrid}" 
		dataType="json"  
		hiddengrid="false" 
		filter="true" 
		sortable="true" 
		pagerButtons="true"
		gridModel="gridModel" 
		viewrecords="true" 
		altRows="true" 
		cssClass=""
		navigatorRefresh="false" 
		navigatorSearch="true"
    	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
		navigatorAdd="false" 
		navigatorDelete="false" 
		navigatorEdit="false" 
		shrinkToFit="true"
		multiselect="true"
		multiboxonly="false" 
		onGridCompleteTopics="trsAckTOutAlertGrid_Id_CompleteTopics" 
		>
		
		<psjg:gridColumn id="JOB_ID" colType="text" name="sTodoDet.JOB_ID"
			index="JOB_ID"
			title="%{getText('JobId_key')}"  hidden="false"
			editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="TODO_LINE" colType="text" name="sTodoDet.TODO_LINE"
			index="TODO_LINE"
			title=""  hidden="true"
			editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="TODO_CODE" colType="text" name="sTodoDet.TODO_CODE"
			index="TODO_CODE"
			title=""  hidden="true"
			editable="false" sortable="true" search="true"/>     
		<psjg:gridColumn id="TODO_STATUS" colType="text" name="sTodoDet.TODO_STATUS"
			index="TODO_STATUS"
			title=""  hidden="true"
			editable="false" sortable="true" search="true"/>     
		<psjg:gridColumn id="ALERT_SUB_TYPE" colType="text" name="ALERT_SUB_TYPE"
			index="ALERT_SUB_TYPE" hidden="true"
			title="SUBTYPE" 
			editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="TODO_ALERT" colType="text" name="sTodoDet.TODO_ALERT"
			index="TODO_ALERT"
			title="%{getText('AlertType')}"
			editable="false" sortable="true" search="true"/>
		<psjg:gridColumn id="alertDescription" colType="text" name="alertDescription" cssStyle=""
			index="alertDescription"
			title="%{getText('Alert_desc')}"
			editable="false" sortable="true" search="true" />
		<psjg:gridColumn id="alertCode" colType="text" name="alertCode"
			index="alertCode"
			title="%{getText('Alert_code')}"
			editable="false" sortable="true" search="true" hidden="true"/>
		<psjg:gridColumn id="alertType" colType="text" name="alertType"
			index="alertType"
			title="%{getText('Alert_type')}"
			editable="false" sortable="true" search="true" hidden="true"/>
			
		<psjg:gridColumn id="TODO_PARAM" colType="text" name="sTodoDet.TODO_PARAM" 
			index="TODO_PARAM" title="%{getText('Trx_No_key')}"  	
			editable="false" sortable="true" search="true" 
			/>
		<psjg:gridColumn id="TRX_DESC" colType="text" name="sTodoDet.TRX_DESC"
			index="TRX_DESC"
			title="%{getText('trxDesc')}"
			editable="false" sortable="false" search="false" 
			formatter="trsAckTOutAlertGrid_Id_AlertDescBtnFormatter"/>
		
		<psjg:gridColumn id="FROM_USER" colType="text" name="sTodoDet.RECEIVED_FROM"
			index="RECEIVED_FROM" title="%{getText('received_from')}"
			editable="false" sortable="true" search="true"								
			/>					
		<psjg:gridColumn id="SET_TO_USER" colType="text" name="sTodoDet.USER_ID"
			index="USER_ID" title="%{getText('sentToUser')}"
			editable="false" sortable="true" search="true"
			
			/>
		<psjg:gridColumn id="TODO_TYPE" colType="number" name="sTodoDet.TODO_TYPE"
			index="TODO_TYPE" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />

		<psjg:gridColumn id="TODO_PROG_REF" colType="text" name="sTodoDet.TODO_PROG_REF"
			index="TODO_PROG_REF" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />
			
		<psjg:gridColumn id="TRX_NUMBER" colType="text" name="sTodoDet.TRX_NUMBER"
			index="TRX_NUMBER" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />	
	
		<psjg:gridColumn id="TODO_FR_BRANCH" colType="text" name="sTodoDet.TODO_FR_BRANCH"
			index="TODO_FR_BRANCH" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />	
		
		<psjg:gridColumn id="TODO_REASON" colType="text" name="sTodoDet.TODO_REASON"
			index="TODO_REASON" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />					
		
		<psjg:gridColumn id="TODO_EXCEP_ENG" colType="text" name="sTodoDet.TODO_EXCEP_ENG"
			index="TODO_EXCEP_ENG" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />		
		
		<psjg:gridColumn id="TODO_EXCEP_ARABIC" colType="text" name="sTodoDet.TODO_EXCEP_ARABIC"
			index="TODO_EXCEP_ARABIC" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />		
				
		<psjg:gridColumn id="TODO_ALERT_OLD_STATUS" colType="text" name="sTodoDet.TODO_ALERT_OLD_STATUS"
			index="TODO_ALERT_OLD_STATUS" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />		
			
		<psjg:gridColumn id="COMP_CODE" colType="text" name="sTodoDet.COMP_CODE"
			index="COMP_CODE" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />
			
		<psjg:gridColumn id="BRANCH_CODE" colType="text" name="sTodoDet.BRANCH_CODE"
			index="BRANCH_CODE" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />
			
		<psjg:gridColumn id="BRIEF_NAME_ENG" colType="text" name="sTodoDet.BRIEF_NAME_ENG"
			index="BRIEF_NAME_ENG" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />		
			
		<psjg:gridColumn id="TODO_ALERT_DESC" colType="text" name="sTodoDet.ALERT_DESC"
			index="TODO_ALERT_DESC" hidden="true"
			title=""
			editable="false" sortable="true" search="true" />										
			
       <psjg:gridColumn name="" 
       				    index="" 
       				    title="" 
       				    id="btnId"
       				    align="center"
					    colType="text"        
					    editable="false"       
					    sortable="false" 
					    search="false" 
					    formatter="trsAckTOutAlertGrid_Id_AlertTypeBtnFormatter" width="200"/>

		
	 </psjg:grid>
  </div>		

<script type="text/javascript">
 	var iMAL_Notifications_key = "<ps:text name='iMAL_Notifications_key'/>";
 	var You_have_recieved = "<ps:text name='You_have_recieved'/>";
 	var messages_key = "<ps:text name='messages_key'/>";
	var Forward_Alert_key 	= "<ps:text name='Forward_Alert_key' />";
	var alertGridFirstLoad = true; 
	var pthCtrlvrsnNb = '<%=PluginsConstants.PATHCTRL_EX_VERSION%>';
	//$(document).ready(trsAckTOutAlertGrid_Id_afterTblLoad);
	$.struts2_jquery.require("CommonExtensions.js" ,null,"${pageContext.request.contextPath}/common/jquery/");
	$('#trsAckTOutAlertGrid_Id_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').subscribe("trsAckTOutAlertGrid_Id_CompleteTopics",function(){
		 alertGrid_Id_CompleteTopics();
	});
</script>