<%@taglib uri="/path-struts-tags" prefix="ps"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<script type="text/javascript">

function callGridAddFunc(gridId)
{
	var $grid = $("#"+gridId);
	var _addfunc = $grid.jqGrid("getGridParam","addfunc");
	if(typeof _addfunc != "undefined" && _addfunc != "")
		jQuery.globalEval(_addfunc + "()" );
}
</script>
<div id="infoBar">
	<table width="100%"
		class="ui-widget-header ui-state-focus ui-corner-all">
		<tr>
			<td nowrap="nowrap">
				<ps:property value="_pageRef" escapeHtml="true"/>
			</td>
			<td width="95%" class="right">
				<ps:if test="%{_showPrintSwiftBtn =='true'}">
					<span class ="collapsibleIcon"> 
						<a class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						   id   ="PrintSwiftBtn_<ps:property value="_pageRef" escapeHtml="true"/>"
						   href="#"
						   onclick="javascript:openPrintSwift('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>');">
						   <span class="ui-icon ui-icon-note"></span>
						   <ps:text name="printSwift_key"></ps:text>
						</a> 
					</span>
				</ps:if>
				<ps:if test="%{_showSmartInfoBtn == null || _showSmartInfoBtn =='true'}">
				<span class="collapsibleIcon"> <a
					class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
					id="smartButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
					onclick="javascript:showSMARTDetails('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>');"><span
						class="ui-icon ui-icon-note"></span>
						<ps:text name="infoBar_smart_key"></ps:text>
					</a> </span>
				</ps:if>
				
				<ps:if test='%{session.sesVO.currentAppName == "REP"}'>
				  	<ps:if test="%{checkAuditEnabled('${appName}')}">
					<script type="text/javascript">
					$.struts2_jquery.require("AuditReport.js" ,null,jQuery.contextPath+"/common/js/audit/");
					</script>
					    <span class="collapsibleIcon"> <a
						class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						id="auditButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
						onclick="javascript:showAuditReport('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<ps:property value="appName" escapeJavaScript="true"/>');"><span
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
						onclick="javascript:showAuditReport('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>');"><span
							class="ui-icon ui-icon-note"></span>
							<ps:text name="infoBar_audit_key"></ps:text>
						</a> </span>
					</ps:if>
				</ps:else>						
					
				<ps:if test="%{_showTrackChngBtn =='true'}">
				<ps:set name="amended_val_key"	value="%{getEscText('amended_val_key')}" />
				<script type="text/javascript">
				var amended_val_key = "${amended_val_key}";
				$.struts2_jquery.require("AuditReport.js" ,null,jQuery.contextPath+"/common/js/audit/");
				</script>
				    <span class="collapsibleIcon"> <a
					class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
					id="trackButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
					onclick="javascript:showTrackReport('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>', '<ps:property value="_custScrElemProgRef" escapeJavaScript="true"/>');"><span
						class="ui-icon ui-icon-note"></span>
						<ps:text name="infoBar_track_key"></ps:text>
					</a> </span>
				</ps:if>

				<ps:if test="%{showDocumentMngmntSys()}">
				<ps:set name="documents_name_key"	value="%{getEscText('documents_name_key')}" />
				<ps:set name="document_mngmnt_but_key"	value="%{getEscText('documents_name_key')}" />
				<script type="text/javascript">
				var documents_name_key = "${documents_name_key}";
				var document_mngmnt_but_key = "${document_mngmnt_but_key}";
				$.struts2_jquery.require("Integration.js" ,null,jQuery.contextPath+"/common/js/integrations/");
				</script>
				    <span class="collapsibleIcon"> <a
					class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
					id="showDocumentMngmntSysButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
					onclick="javascript:loadDocumentMngmntSys('<ps:property value="_pageRef"  escapeHtml="false" escapeJavaScript="true"/>');"><span
						class="ui-icon ui-icon-note"></span>
						<ps:text name="documents_name_key"></ps:text>
					</a> </span>
				</ps:if>
				<%
				    if(ConstantsCommon.ENABLE_RECORDS_LOG_FEATURE == 1)
				    {
				%>
				<ps:if
					test="%{_showRecordLogsBtn == null || _showRecordLogsBtn =='true'}">
					<ps:set name="print_preview_key"
						value="%{getEscText('print_preview_key')}" />
					<ps:set name="Send_email_key"
						value="%{getEscText('Send_email_key')}" />
					<script type="text/javascript">
						$.struts2_jquery.require("RecordLogsMaint.js", null, jQuery.contextPath
								+ "/common/js/recordlogs/");
						var print_preview_key = "${print_preview_key}";
						var Send_email_key = "${Send_email_key}";
					</script>


					<div id="header_record_div_<ps:property value="_pageRef" escapeHtml="true"/>" class="ui-corner-all"
						onmouseout="popup_close(event, this)"
						style="display: none; background-color: white; border: 1px solid #000000;">
						<table width="100%" cellpadding="0"
							cellspacing="5" border="0">
							<tr>
								<td nowrap="nowrap">
									<ps:set name="record_key" value="%{getText('record_key')}" />
									<table title="${record_key}" cellpadding="0" cellspacing="0"
										border="0" class="blackText">
										<tr>
											<td>
												<span id="recordButton_<ps:property value="_pageRef" escapeHtml="true"/>" class="ui-icon ui-icon-info"
													onclick="javascript:showRecordLogs('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<%=ConstantsCommon.OPEN_RECORD%>');">
												</span>
											</td>
											<td class="labelTd"
												onclick="document.getElementById('recordButton_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').click()">
												<ps:label key="record_key"></ps:label>
											</td>
										</tr>
									</table>
								</td>
								<td nowrap="nowrap">
									<ps:set name="record_log_key"
										value="%{getText('record_log_key')}" />
									<table title="${record_log_key}" cellpadding="0"
										cellspacing="0" border="0" class="blackText">
										<tr>
											<td>
												<span class="ui-icon ui-icon-clock" id="recordLogButton_<ps:property value="_pageRef" escapeHtml="true"/>"
													onclick="javascript:showRecordLogs('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<%=ConstantsCommon.OPEN_RECORD_LOG%>');">
												</span>
											</td>
											<td class="labelTd"
												onclick="document.getElementById('recordLogButton_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').click()">
												<ps:label key="record_log_key"></ps:label>
											</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td nowrap="nowrap">
									<ps:set name="entity_key" value="%{getText('entity_key')}" />
									<table title="${entity_key}" cellpadding="0" cellspacing="0"
										border="0" class="blackText">
										<tr>
											<td>
												<span id="entityButton_<ps:property value="_pageRef" escapeHtml="true"/>"
													class="ui-icon ui-icon-info"
													onclick="javascript:showRecordLogs('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<%=ConstantsCommon.OPEN_ENTITY%>');">
												</span>
											</td>
											<td class="labelTd"
												onclick="document.getElementById('entityButton_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').click()">
												<ps:label key="entity_key"></ps:label>
											</td>
										</tr>
									</table>
								</td>
								<td nowrap="nowrap">
									<ps:set name="entity_log_key"
										value="%{getText('entity_log_key')}" />
									<table title="${entity_log_key}" cellpadding="0"
										cellspacing="0" border="0" class="blackText">
										<tr>
											<td>
												<span  id="entityLogButton_<ps:property value="_pageRef" escapeHtml="true"/>"
													class="ui-icon ui-icon-clock"
													onclick="javascript:showRecordLogs('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','<%=ConstantsCommon.OPEN_ENTITY_LOG%>');">
												</span>
											</td>
											<td class="labelTd"
												onclick="document.getElementById('entityLogButton_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>').click()">
												<ps:label key="entity_log_key"></ps:label>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</div>
					<span class="collapsibleIcon">
					 <a id="recordsLogButton_<ps:property value="_pageRef" escapeHtml="true"/>" 
					 	onclick="toggleOptionsDiv('header_record_div_<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>','recordsLogButton_<ps:property value="_pageRef" escapeJavaScript="true"/>')"
					 		class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						 href="#"
						><span
							class="ui-icon ui-icon-triangle-1-s"></span> <ps:text
								name="infoBar_recordLogs_key"></ps:text> </a> </span>
				</ps:if>
				<%
				    }
				%>
				<ps:if test="%{_searchGridId != null}">							
					<span class="collapsibleIcon"> <a
						class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
						id="infoBarSearchButton_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
						onclick="javascript:showHideSrchGrid('<ps:property value="_searchGridId" escapeHtml="false" escapeJavaScript="true"/>_<ps:property value="_pageRef" escapeJavaScript="true"/>');"><span
							class="ui-icon ui-icon-search"></span>
								<ps:text name="infoBar_search_key"></ps:text>
						</a> </span>
					
					<ps:if test="%{_showNewInfoBtn != null && _showNewInfoBtn=='true'}">
						<span class="collapsibleIcon"> 
							<a
								class="fg-button ui-state-default  ui-corner-all fg-button-icon-left"
								id="addNewGridRec_<ps:property value="_pageRef" escapeHtml="true"/>" href="#"
								onclick="javascript:callGridAddFunc('<ps:property value="_searchGridId" escapeHtml="false" escapeJavaScript="true"/>_<ps:property value="_pageRef" escapeJavaScript="true"/>');">
									<span class="ui-icon ui-icon-plus"></span>
								<ps:text name="infoBar_new_key" ></ps:text>
							</a> 
						</span>
					</ps:if>
				</ps:if>
			</td>
		</tr>
	</table>
</div>
