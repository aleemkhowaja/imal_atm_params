<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/atm/atmcommon/ATMAppTrans.jsp"%>

<div id="so_message_response_div_${_pageRef}"
	class="isoMessageDialogCollapsble"
	title="<ps:text name="atm_eng_interface_message_details_key"/>"
	style="margin-bottom: 5px;">
	<table>
		<tr>
			<td width="30%" style="vertical-align: top;">
				<p>
					${atmEngineControlCO.atm_ENG_INTERFACEVO.MESSAGE}
				</p>
			</td>
		</tr>
	</table>