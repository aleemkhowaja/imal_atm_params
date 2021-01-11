<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:set name="emails_List_Key" value="%{getEscText('Emails_List_Key')}" />
<ps:set name="mail_success_key"
	value="%{getEscText('mail_success_key')}" />
<ps:set name="mail_select_key" value="%{getEscText('mail_select_key')}" />

<ps:form useHiddenProps="true"
	id="recordLogsMaintFormId_${recordSC.pageRef}"
	namespace="/path/recordlogs">
	<table width="100%" cellpadding="0" cellspacing="0">
		<ps:if
			test='%{recordSC.recordsType == "L" || recordSC.recordsType == "O"}'>
			<tr>
				<td>
					<table cellpadding="0" cellspacing="0">
						<tr>
							<td>
								<div id='recordLogEditor' Style="background-color: white;	width: 600px;	height: 150px;	overflow:auto; padding-left: 5px">
									${recordSC.theRecord}
								</div>
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<ps:texteditor id='recordEditor' width='600' height='300' />
				</td>
			</tr>
		</ps:if>
		<ps:else>
			<tr>
				<td>
					<ps:texteditor id='recordEditor' name="recordSC.theRecord"
						width='600' height='450' />
				</td>
			</tr>
		</ps:else>
	</table>

</ps:form>
<script type="text/javascript">
var emails_List_Key = "${emails_List_Key}";
var mail_success_key = "${mail_success_key}";
var mail_select_key = "${mail_select_key}";
</script>