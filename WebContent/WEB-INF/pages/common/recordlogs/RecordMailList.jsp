<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:hidden id="selUserMail_${_pageRef}"></ps:hidden>
<ps:hidden id="selRecLog_${_pageRef}"></ps:hidden>
<ps:hidden id="all_rows_${_pageRef}"></ps:hidden>
				<ps:url id="recordUserMailURL" action="RecordLogsListAction_loadRecordUserMailGridData" escapeAmp="false" namespace="/path/recordlogs"></ps:url>
				<psjg:grid id="recordUserMailTbl_Id_${_pageRef}" href="%{recordUserMailURL}"
					dataType="json" hiddengrid="false" pager="true" filter="true"
					gridModel="gridModel" rowNum="9" height="225" rowList="9,18,27,36"
					navigator="true" altRows="true" navigatorDelete="false"
					navigatorEdit="false" navigatorSearch="true"  
					navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true}"
					sortable="true" editurl="1234" editinline="true"
					navigatorAdd="false" navigatorRefresh="false" pagerButtons="true"
					rownumbers="false" autowidth="false" width="545"
					shrinkToFit="false" viewrecords="true" multiselect="true" onSelectRowTopics="mailListSelectRowFunc">


					<psjg:gridColumn id="USER_ID" colType="text"
						name="USER_ID" title="%{getText('User_Id_key')}"
						index="USER_ID" editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="USER_NAME" colType="text"
						name="USER_NAME" title="%{getText('User_Name__key')}"
						index="USER_NAME" editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="EMAIL_ID" colType="text" name="EMAIL_ID"
						title="%{getText('Email_Id_key')}" index="EMAIL_ID"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="EMAIL_SERVER"
						colType="text" name="EMAIL_SERVER"
						title="%{getText('EMAIL_SERVER')}" index="EMAIL_SERVER"
						editable="false" sortable="true" search="true" hidden="true"/>

					<psjg:gridColumn id="MAIL_TO"
						colType="text" name="MAIL_TO" hidden="true"
						title="%{getText('MAIL_TO')}" index="MAIL_TO"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="MAIL_RESULT"
						colType="text" name="MAIL_RESULT" hidden="true"
						title="%{getText('MAIL_RESULT')}" index="MAIL_RESULT"
						editable="false" sortable="true" search="true" />

					<psjg:gridColumn id="REPLY" name="REPLY" index="REPLY" title="%{getText('REPLY_key')}"
						colType="checkbox" formatter="checkbox" edittype="checkbox" 
						align="center" 
						width="50" editable="true" sortable="false" search="false" 
						editoptions="{value:'Y:N',dataEvents:[{type:'click',fn: function(e){ replyChecked(e)}}]}"/>
				</psjg:grid>
				
<script type="text/javascript">
    $(document).ready(
    	mailListListLoad
    	);
</script>