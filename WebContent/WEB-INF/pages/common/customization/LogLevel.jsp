<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.lib.log.PathSystemMonitor"%>
<ps:set name="invalid_user_id_key" value="%{getEscText('Invalid_User_ID_Key')}"/>
<ps:form id="tech_det_log_level_change_form">
	<br/>
	<div>
		<table>
			<tr>
				<td>
					<ps:label key="general_log_key"
							id="lbl_general_log_YN"
							for="tech_det_log_level_choice"></ps:label>
				</td>
				<td>
				<ps:radio list="#{'SEVERE':'log_level_error_key','ALL':'log_level_all_key'}"
					id="tech_det_log_level_choice"
					name="currLogLevel" />
				</td>
			</tr>
			<tr>
				<td>
					<ps:label key="enable_log_to_this_user_key"
							id="lbl_logByUser_YN"
							for="logByUser_YN"></ps:label>
				</td>
				<td>
					<table style="border-spacing: 0px;">
						<tr>
							<td>
								<ps:checkbox name="logByLoggedInUser" id="logByUser_YN"
									valOpt="1:0" />
							</td>
							<td>
								${logByUserMsg}
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td>
					<ps:label key="enable_log_to_other_users_key" id="lbl_user" ></ps:label>
				</td>
				<td>
					<table style="border-spacing: 0px;">
						<tr>
							<td>
								<ps:checkbox name="logByOtherUser" id="logByOtherUser_YN" valOpt="1:0"/>
							</td>
							<td>
								<table style="border-spacing: 0px;">
									<tr>
										<td width="60%">
											<psj:livesearch name="logByOtherUserId"
						                      id="logByOtherUserId" autoSearch="true" 
						                      actionName="${pageContext.request.contextPath}/pathdesktop/UserLookup_constructLookup" 
						                      searchElement="USER_ID" resultList="USER_ID:lookuptxt_logByOtherUserId"
						                      dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_logLevelUserDependency"
						                      parameter="user_id:lookuptxt_logByOtherUserId"
						                      dependency="lookuptxt_logByOtherUserId:usrVO.USER_ID,logByUserDesc:usrVO.USER_STS"
						                      afterDepEvent="logLevel_adjustLogByUserDesc()"
						                 	/>
						                 </td>
						              </tr>
						              
						        </table>	
							</td>
						</tr>
				    </table>		
				</td>
		  	</tr>
		  <tr>   
		  	<td>
		  	<p/>
		  	</td>
            <td>
            	<table style="border-spacing: 0px;">
						<tr>
							<td>
								<p/>
							</td>
							<td>
								<table style="border-spacing: 0px;">
									<tr>
										<td width="60%">
											<ps:textfield id="logByUserDesc" cssStyle="display:none"/>
            								<p style="padding-left:20px;margin:0;"><ps:label id="lbl_log_user_desc"></ps:label></p>
						                 </td>
						              </tr>
						              
						        </table>	
							</td>
						</tr>
				    </table>		
             </td>
		  </tr>
		</table>		
	</div>
	
	<br/>
	<div>
	<%=PathSystemMonitor.monitorSystemIndicators().replace("\r\n", "<br/>")%>
	</div>
</ps:form>

<script type="text/javascript">
	var invalid_user_id_key = "${invalid_user_id_key}";
	$.struts2_jquery.require("LogLevel.js" ,null,jQuery.contextPath+"/common/js/log/");
</script>
