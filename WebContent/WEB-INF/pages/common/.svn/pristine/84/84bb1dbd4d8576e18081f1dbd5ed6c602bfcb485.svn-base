<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<script type="text/javascript">
	$.struts2_jquery.require("ForwardAlertsList.js" ,null,jQuery.contextPath+"/common/js/alerts/");
</script>

<ps:hidden id="forwardList_${_pageRef}" name="forwardList" />

<ps:set name="todoLine_${_pageRef}" value="todoLine"/>
<ps:set name="autoIncr_${_pageRef}" value="autoIncr"/>
<ps:set name="todoCode_${_pageRef}" value="todoCode"/>

 
  <div>
	<ps:url id="urlForwardAlertsGrid" action="AlertsForwardGrid_loadForwardAlertsGrid?_pageRef=${_pageRef}&iv_crud=${iv_crud}"	namespace="/path/alerts" escapeAmp="false">
	  <ps:param name="todoLine" value="todoLine_${_pageRef}"></ps:param>
	  <ps:param name="autoIncr" value="autoIncr_${_pageRef}"></ps:param>
	  <ps:param name="todoCode" value="todoCode_${_pageRef}"></ps:param>
	   
	</ps:url>
	 <psjg:grid id="alertsForwardGrid_Id_${_pageRef}"							
		caption=" "			
		height="70"											 				 
		href='%{ ( buildGridOnLoad != null && "true".equals(buildGridOnLoad) ) ? "" : #urlForwardAlertsGrid}'
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
		ondblclick="FORWARD_ALERT_MAINT_forwardAlert()" 
		onGridCompleteTopics="onForwardAlertScreenLoad" 
		>
		<psjg:gridColumn id="USER_ID" colType="text"
			name="alertsParamCO.userId" index="USER_ID"
			title="%{getText('User_Id_key')}"
			editable="false" sortable="true" search="true" value="" />
		<psjg:gridColumn id="CODE" colType="number" name="alertsParamCO.userCode" 
			index="CODE" title="%{getText('Code_key')}"  	
			editable="false" sortable="true" search="true"  
			/>
		<psjg:gridColumn id="BRANCH_CODE" colType="number" name="alertsParamCO.branchCode"
			index="BRANCH_CODE"
			title="%{getText('Branch_code_key')}"
			editable="false" sortable="true" search="true" />
		<psjg:gridColumn id="BRIEF_NAME_ENG" colType="text"
			name="alertsParamCO.briefNameEnglish" index="BRIEF_NAME_ENG"
			title="%{getText('Brief_Name_eng_key')}"
			editable="false" sortable="true" search="true" />
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
			editable="false" sortable="true" search="true" />
		<psjg:gridColumn id="STATUS" colType="text"
			name="alertsParamCO.status" index="STATUS"
			title="%{getText('status_key')}"
			editable="false" sortable="true" search="true" />
	 </psjg:grid>
  </div>		

<script type="text/javascript">
$('#alertsForwardGrid_Id_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').subscribe("onForwardAlertScreenLoad",function(){
		FORWARD_ALERTS_LIST_alertForwardAftertblLoad('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>');
	});


$(document).ready(function (){
	var buildGridOnLoad = '<ps:property value="buildGridOnLoad" escapeHtml="false" escapeJavaScript="true"/>';
	if(buildGridOnLoad == 'true')
	{
		FORWARD_ALERTS_LIST_buildAlertForwardGrid('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>')
	}
});

</script>
