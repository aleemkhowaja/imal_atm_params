<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>

<ps:hidden id="userRunningDateOPT_${_pageRef}"		name="userRunningDateOPT"/>
<ps:hidden id="appRunningDateOPT_${_pageRef}"		name="appRunningDateOPT"/>


<ps:if test='${userRunningDateOPT != "true" && appRunningDateOPT != "true"}'>
	<table CELLPADDING="1" CELLSPACING="1" border="0" width="100%">
		<tr>
			<td align="center">
	    		<ps:label key="access_denied_key" cssClass="required"></ps:label>
			</td>
		</tr>
	</table>
</ps:if>
<ps:else>
	<table CELLPADDING="1" CELLSPACING="1" border="0">
		<ps:if test='${userRunningDateOPT == "true"}'>
			<tr>
				<td>
					<ps:label key="User_Running_Date_key"/>
				</td>
				<td>
					<psj:datepicker id="global_user_run_date" name="newUserRunDate" showOn="both" buttonImageOnly="true" required="true"></psj:datepicker>		
				</td>
				<td>
					<psj:submit button="true" onclick="globalSaveUserRunningDate()" freezeOnSubmit="true">
						<ps:text name="use_key"></ps:text>
					</psj:submit>
				</td>
			</tr>
		</ps:if>
		
		<ps:if test='${appRunningDateOPT == "true"}'>
			<tr>
				<td>
					<ps:label key="Application_Running_Date_key"/>
				</td>
				<td>
					<psj:datepicker id="global_app_run_date" name="newAppRunDate" showOn="both" buttonImageOnly="true" required="true"></psj:datepicker>		
				</td>
				<td>
					<psj:submit button="true" onclick="globalSaveAppRunningDate()" freezeOnSubmit="true">
						<ps:text name="use_key"></ps:text>
					</psj:submit>
				</td>
			</tr>
		</ps:if>
	</table>
</ps:else>