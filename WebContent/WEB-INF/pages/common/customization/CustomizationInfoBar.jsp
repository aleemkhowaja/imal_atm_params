<%@taglib uri="/path-struts-tags" prefix="ps"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<div id="customizationInfoBar">
	<table width="100%"
		class="ui-widget-header ui-state-focus ui-corner-all">
		<tr>
			<td nowrap="nowrap">
				${_pageRef}
			</td>
			<td width="95%" class="right">				
				<ps:if test='%{session.sesVO.currentAppName == "REP"}'>
				  	<ps:if test="%{checkAuditEnabled('${appName}')}">
					<script type="text/javascript">
					$.struts2_jquery.require("AuditReport.js" ,null,jQuery.contextPath+"/common/js/audit/");
					</script>
					    <span class="collapsibleIcon"> <a
						class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						id="auditButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
						onclick="javascript:showAuditReport('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<ps:property value="appName" escapeHtml="false" escapeJavaScript="true"/>');"><span
							class="ui-icon ui-icon-note"></span>
							<ps:text name="infoBar_audit_key"></ps:text>
						</a> </span>
					</ps:if>
				</ps:if>
				<ps:else>	
					<ps:if test="%{checkAuditEnabled()}">
					<script type="text/javascript">
					$.struts2_jquery.require("AuditReport.js" ,null,jQuery.contextPath+"/common/js/audit/");
					</script>
					    <span class="collapsibleIcon"> <a
						class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						id="auditButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
						onclick="javascript:showAuditReport('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>',null,'CUST');"><span
							class="ui-icon ui-icon-note"></span>
							<ps:text name="infoBar_audit_key"></ps:text>
						</a> </span>
					</ps:if>
				</ps:else>
			</td>
		</tr>
	</table>
</div>
