<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:form id="usrDefPrinterForm">

		<ps:hidden id="userDefPrntr" name="userDefPrntr" />
	<div class="col_3">
		<h2>
			<ps:text name="user_prntr_select_key"></ps:text>
		</h2>
	</div>
	<div class="floatRightLeft col">
		<table>
			<ps:iterator value="usrPrinters" status="stat" var="prntr">
				<ps:hidden id="usrPrinterItemID${stat.index}" name="#prntr.PRINTER_NAME" />
				<ps:if test="%{#prntr.PRINTER_NAME == userDefPrntr}">
					<ps:set id="userChosenPrinterID" value="#stat.index" />
				</ps:if>
				<ps:if test="${usrPrinterCount} > 3 && ${usrPrinterCount} < 7">
					<ps:if test="#stat.index%2==0">
						<tr>
					</ps:if>
					<td>
						<ps:radio id="usrPrntrDefaultID" name="usrPrntrDefaultName"
							list="#prntr.PRINTER_NAME" listKey="#stat.index" onchange="prntrChange(this.value)"
							value="userChosenPrinterID" cssClass="radioDown" />
					</td>

					<ps:if test="#stat.index%2==1">
						</tr>
					</ps:if>
				</ps:if>
				<ps:if test="${usrPrinterCount} < 4">
					<ps:if test="#stat.index%3==0">
						<tr>
							<td>
					</ps:if>
					<ps:radio id="usrPrntrDefaultID" name="usrPrntrDefaultName"
						list="#prntr.PRINTER_NAME" listKey="#stat.index" onchange="prntrChange(this.value)"
						value="userChosenPrinterID" cssClass="radioDown" />
					<ps:if test="#stat.index%3==2">
						</td>
						</tr>
					</ps:if>
				</ps:if>
				<ps:if test="${usrPrinterCount} > 6">
					<ps:if test="#stat.index%3==0">
						<tr>
					</ps:if>
					<td>
						<ps:radio id="usrPrntrDefaultID" name="usrPrntrDefaultName"
							list="#prntr.PRINTER_NAME" listKey="#stat.index" onchange="prntrChange(this.value)"
							value="userChosenPrinterID" cssClass="radioDown" />
					</td>
					<ps:if test="#stat.index%3==2">
						</tr>
					</ps:if>
				</ps:if>
			</ps:iterator>
		</table>
	</div>
</ps:form>
