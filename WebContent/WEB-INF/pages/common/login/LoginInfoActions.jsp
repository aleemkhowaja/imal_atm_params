<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.bo.common.PluginsConstants"%>
<ps:hidden type="hidden" id="session_is_now_opened_key_id" value="%{getText('session_is_now_opened_key')}"/>
<ps:hidden type="hidden" id="switch_company_key_id" value="%{getText('switch_company_key')}"/>
<ps:hidden type="hidden" id="switch_branch_key_id" value="%{getText('switch_branch_key')}"/>
<ps:hidden type="hidden" id="closing_session_key_id" value="%{getText('closing_session_key')}"/>
<ps:hidden type="hidden" id="session_is_now_closed_key_id" value="%{getText('session_is_now_closed_key')}"/>
<ps:hidden type="hidden" id="show_btn_key_id" value="%{getText('show_btn_key')}"/>
<ps:hidden type="hidden" id="assign_widget_key_id" value="%{getText('assign_widget_key')}"/>
<ps:hidden type="hidden" id="usr_allowed_portlets_key_id" value="%{getText('usr_allowed_portlets_key')}"/>
<ps:hidden type="hidden" id="dynclientparams_key_id" value="%{getText('dynclientparams_key')}"/>
<ps:hidden type="hidden" id="dynclientparams_approve_key_id" value="%{getText('dynclientparams_approve_key')}"/>
<script type="text/javascript">
var session_is_now_opened_key = document.getElementById("session_is_now_opened_key_id").value;
var switch_company_key = document.getElementById("switch_company_key_id").value;
var switch_branch_key  = document.getElementById("switch_branch_key_id").value;
var closing_session_key = document.getElementById("closing_session_key_id").value;
var session_is_now_closed_key = document.getElementById("session_is_now_closed_key_id").value;
var show_btn_key = document.getElementById("show_btn_key_id").value;
var assign_widget_key= document.getElementById("assign_widget_key_id").value;
var usr_allowed_portlets_key= document.getElementById("usr_allowed_portlets_key_id").value;
var dynclientparams_key= document.getElementById("dynclientparams_key_id").value;
var dynclientparams_approve_key= document.getElementById("dynclientparams_approve_key_id").value;
</script>
 <table width="100%" height="100%" cellpadding="0" cellspacing="1" border="0">
	<tr>
	<td nowrap="nowrap" width="50%"></td>
	<%/*check if CSM application adn Company entered and not in Welcome Message Page*/ %>
	<ps:if test='%{#session.sesVO.companyCode!=null && newSessionRight != null && welcMsg == null}'>
    <td nowrap="nowrap">
      <ps:if test="session.sesVO.scannedCIFNo != null">
         <ps:set name="choose_customer_key" value="%{getText('clear_customer_key')}"/>
       	</ps:if>
       	<ps:if test="session.sesVO.scannedCIFNo == null">
       		<ps:set name="choose_customer_key" value="%{getText('choose_customer_key')}"/>
      	    </ps:if>
					<table title="${choose_customer_key}" width="100%" cellpadding="0"
						cellspacing="0" border="0" class="whiteText"
						onclick="globalOpenCifChoice()">
						<tr>
							<td>
								<%/* setting proper Tooltip Value*/%>
								<a href="#" id="anchor_icon_person_id"
									style="cursor: hand; text-decoration: none;"> <ps:if
										test="session.sesVO.scannedCIFNo != null">
										<img id="icon_person_id" border="0"
											src="${pageContext.request.contextPath}/common/images/icon_person_small_red.png" />
									</ps:if> <ps:if test="session.sesVO.scannedCIFNo == null">
										<img border="0" id="icon_person_id"
											src="${pageContext.request.contextPath}/common/images/icon_person_small.png" />
									</ps:if> </a>
							</td>
							<td nowrap="nowrap">
								<ps:label key="new_session_key"></ps:label>
							</td>
						</tr>
					</table>
			</td> 
	<td nowrap="nowrap" width="1" >
       <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    	  <tr>
    	  <td width="5">&nbsp;</td>
    	  <td>
    	   <div style="height: 14px; background-color: white;width:1px " ></div>
    	  </td>
    	  <td width="5">&nbsp;</td>
    	  </tr>
    	</table>
	</td>
    </ps:if>
    
    
    <%/*check if OMNI ADMIN application and Company entered and not in Welcome Message Page*/ %>
	<ps:if test='%{#session.sesVO.companyCode!=null && session.sesVO.currentAppName == "OADM"}'>
    <td nowrap="nowrap">
    		<ps:set name="inbox_icon_key"       value="%{getText('inbox_icon_key')}"/>
    			<table title="${inbox_icon_key}" width="100%" cellpadding="0"
						cellspacing="0" border="0" class="whiteText">
						<tr>
							<td>
								<a href="#" id="anchor_icon_inbox_id" onclick="javascript:inboxMessagesOpen()"
									style="cursor: hand; text-decoration: none;"> 
										<img border="0" id="icon_person_id"
											src="${pageContext.request.contextPath}/common/images/inbox_icon.png" />
									</a>
							</td>
							<td width="5">&nbsp;</td>
							<td nowrap="nowrap" onclick="document.getElementById('anchor_icon_inbox_id').click()">
								<ps:label key="inbox_icon_key"></ps:label>
							</td>
						</tr>
					</table>
					 <script>
							$.struts2_jquery.require("AdminInboxMaint.js", null,"${pageContext.request.contextPath}/path/js/omni/oadm/omniadmininbox/");
					</script>
			</td> 
		<td nowrap="nowrap" width="1" >
      	 <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    	  <tr>
    	  <td width="5">&nbsp;</td>
    	  <td>
    	   <div style="height: 14px; background-color: white;width:1px " ></div>
    	  </td>
    	  <td width="5">&nbsp;</td>
    	  </tr>
    	</table>
		</td>
    </ps:if>
   
    
    <td nowrap="nowrap">
		    	 <ps:set name="full_screen_icon_key"       value="%{getText('fullscreen_key')}"/>
		    	 <table title="${full_screen_icon_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
		    	  <tr>
		    	  <td>
				  <span id="fullscreen_icon"  onclick="_toggleFullScreen()">
				   <a href="#" id="hder_full_screen_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/fullscreen_icon.png">
				    </a>
				   </span> 
				   </td>
				   <td width="5">&nbsp;</td>
				   <td nowrap="nowrap" onclick="document.getElementById('hder_full_screen_icon_id').click()"> 
				    <ps:label key="fullscreen_key"></ps:label>
				  </td>
				  </tr>
				 </table>
	</td>
	<ps:if test='%{#session.sesVO.companyCode != null}' >
	<td nowrap="nowrap" width="1" >
       <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    	  <tr>
    	  <td width="5">&nbsp;</td>
    	  <td>
    	   <div style="height: 14px; background-color: white;width:1px " ></div>
    	  </td>
    	  <td width="5">&nbsp;</td>
    	  </tr>
    	</table>
	</td>
    <td nowrap="nowrap"  class="right">
       	 <ps:set name="options_icon_key"       value="%{getText('options_key')}"/>
    	 <table id="options_tbl" title="${options_icon_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
    	  <tr>
    	  <td>
		  <span id="options_icon"  onclick="toggleOptionsDiv('header_options_div','options_tbl')">
		   <a href="#" id="hder_options_icon_id" style="text-decoration: none">
		      <img border="0" src="${pageContext.request.contextPath}/common/images/down-icon.png">
		    </a>
		   </span> 
		   </td>
		   <td width="5">&nbsp;</td>
		   <td nowrap="nowrap" onclick="document.getElementById('hder_options_icon_id').click()"> 
		    <ps:label key="options_key"></ps:label>
		  </td>
		  </tr>
		 </table>
	 </td>
	 </ps:if>
 <ps:if test="%{#session.sesVO.companyCode!=null && (usrLabelRight != null || usrSettingRight != null || usrPrntAxsRight != null ||
  dynClntPrmsEditRight != null || dynClntPrmsApproveRight != null || dynClntPrmsColsEditRight != null ||expImpCustRight != null)}">
    <td nowrap="nowrap" width="1" >
       <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    	  <tr>
    	  <td width="5">&nbsp;</td>
    	  <td>
    	   <div style="height: 14px; background-color: white;width:1px " ></div>
    	  </td>
    	  <td width="5">&nbsp;</td>
    	  </tr>
    	</table>
	</td>
    <td nowrap="nowrap"  class="right">
       	 <ps:set name="advanced_options_key" value="%{getText('advanced_options_key')}"/>
    	 <table id="advanced_tbl" title="${advanced_icon_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
    	  <tr>
    	  <td>
		  <span id="advanced_icon"   onclick="toggleOptionsDiv('header_advanced_div','advanced_tbl')">
		   <a href="#" id="hder_advanced_icon_id" style="text-decoration: none">
		      <img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">
		    </a>
		   </span> 
		   </td>
		   <td width="5">&nbsp;</td>
		   <td nowrap="nowrap" onclick="document.getElementById('hder_advanced_icon_id').click()"> 
		    <ps:label key="advanced_options_key"/>
		  </td>
		  </tr>
		 </table>
	 </td>
	 </ps:if>
	<ps:if test='%{#session.sesVO.companyCode != null && switchViewRight != null && session.sesVO.currentAppName != "IBIS"}' >
	<td nowrap="nowrap" width="1" >
       <table width="100%" cellpadding="0" cellspacing="0" border="0" >
    	  <tr>
    	  <td width="5">&nbsp;</td>
    	  <td>
    	   <div style="height: 14px; background-color: white;width:1px " ></div>
    	  </td>
    	  <td width="5">&nbsp;</td>
    	  </tr>
    	</table>
	</td>
    <td nowrap="nowrap">
		    	 <ps:set name="switch_view_icon_key"       value="%{getText('switch_view_key')}"/>
		    	 <table title="${switch_view_icon_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
		    	  <tr>
		    	  <td>
				  <span id="switch_view"  onclick="switchView('${homeURL}')">
				   <a href="#" id="switch_view_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/switch_icon.png">
				    </a>
				   </span> 
				   </td>
				   <td width="5">&nbsp;</td>
				   <td nowrap="nowrap" onclick="document.getElementById('switch_view_id').click()"> 
				    <ps:label key="switch_view_key"></ps:label>
				  </td>
				  </tr>
				 </table>
	</td>
	</ps:if>
    
     <td nowrap="nowrap" style="padding: 1">
   				 <table width="100%" cellpadding="0" cellspacing="0" border="0" >
		    	  <tr>
		    	  <td width="5">&nbsp;</td>
		    	  <td>
		    	   <div style="height: 14px; background-color: white;width:1px " ></div>
		    	  </td>
		    	  <td width="5">&nbsp;</td>
		    	  </tr>
		    	</table>
   	</td>
	<td nowrap="nowrap">
	  <ps:if test="%{#session.sesVO.externalScreen==null}">
		  <ps:set name="home_key"       value="%{getText('home_key')}"/>
		  <table title="${home_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
	   	  <tr>
	   	  <td>
			  <a  id="hder_home_icon_id"  style="text-decoration: none" href="${pageContext.request.contextPath}/${homeURL}">
		      <img border="0" src="${pageContext.request.contextPath}/common/images/home_icon.png">
		    </a>
		   </td>
		   <td width="5">&nbsp;</td>
		   <td nowrap="nowrap" onclick="document.getElementById('hder_home_icon_id').click()"> 
		    <ps:label key="home_key"></ps:label>
		    </td>
		  </tr>
		 </table>
	 </ps:if>
    </td>
    <td nowrap="nowrap"  style="padding: 1">
    			<table width="100%" cellpadding="0" cellspacing="0" border="0">
		    	  <tr>
		    	  <td width="5">&nbsp;</td>
		    	  <td>
		    	   <div style="height: 14px; background-color: white;width:1px " ></div>
		    	  </td>
		    	  <td width="5">&nbsp;</td>
		    	  </tr>
		    	</table>
    </td>
	<td nowrap="nowrap">
		<ps:set name="logout_key"       value="%{getText('logout')}"/>
	  <table title="${logout_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
   	  <tr>
   	  <td>
		 <a id="hder_logout_icon_id" class="" style="text-decoration: none" href="#" onclick="javascript:logoutApp()">
	      <img border="0" src="${pageContext.request.contextPath}/common/images/power_icon.png">
	     </a>
	   </td>
	   <td width="5">&nbsp;</td>
	   <td nowrap="nowrap" onclick="document.getElementById('hder_logout_icon_id').click()">
	    <ps:label key="logout"></ps:label>
	   </td>
	  </tr>
	 </table> 
    </td>
    <td nowrap="nowrap"  style="padding: 1">
    			<table width="100%" cellpadding="0" cellspacing="0" border="0">
		    	  <tr>
		    	  <td width="5">&nbsp;</td>
		    	  <td>
		    	   <div style="height: 14px; background-color: white;width:1px " ></div>
		    	  </td>
		    	  <td width="5">&nbsp;</td>
		    	  </tr>
		    	</table>
    </td>
	<td nowrap="nowrap">
	  <ps:set name="help_key" value="%{getText('help_key')}"/>
	  <table title="${help_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
   	  <tr>
   	  <td>
		 <a onclick="callHelpWindow();" id="hder_help_icon_id" class="" style="text-decoration: none" href="#">
	      <img border="0" src="${pageContext.request.contextPath}/common/images/help_icon.png">
	     </a>
	   </td>
	   <td width="5">&nbsp;</td>
	   <td onclick="document.getElementById('hder_help_icon_id').click()">
	    <ps:label key="help_key"></ps:label>
	   </td>
	    <td width="5">&nbsp;</td>
	  </tr>
	 </table> 
	</td>
    </tr>
    <tr>
    <td nowrap="nowrap" colspan="20">
	   <ps:set name="language_key"  value="%{getText('language_key')}"/>
       <table   width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
		    <td width="90%" ></td>
		    <ps:if test='%{#session.sesVO.companyCode != null && showHeaderOptions != null}' >
		    <td>
			   	<table id="hdr_layout_tbl_link" title="${layout_options_key}" width="100%" cellpadding="0" cellspacing="0" border="0" class="right whiteText">
		    	  <tr>
				   	<td nowrap="nowrap" onclick="document.getElementById('hder_layout_icon_id').click()"> 
				   		 <ps:label key="layout_options_key"></ps:label>
				  	</td>
				  	<td width="5">&nbsp;</td>
				  	<td>
				  		<span id="options_icon"  onclick="toggleOptionsDiv('layout_advanced_div','hdr_layout_tbl_link')">
				   			<a href="#" id="hder_layout_icon_id" style="text-decoration: none">
				      			<img border="0" src="${pageContext.request.contextPath}/common/images/layout_edit.png">
				    		</a>
				   		</span> 
				   </td>
				  </tr>
				 </table>
				</td>				 
			</ps:if>		  
			<td width="5">&nbsp;</td>  	
		    <td nowrap="nowrap"  class="right">
		        <table title="${language_key}" id="hdr_languages_link" width="100%" cellpadding="2" cellspacing="0" border="0" class="whiteText">
			   	  <tr>
			   	  
			   	  <td nowrap="nowrap">
		       			<ps:label key="language_key"></ps:label>
		          </td>
			   		<td nowrap="nowrap" >
				 	<a href="#" style="text-decoration: none" >
			      <img border="0" src="${pageContext.request.contextPath}/common/images/languages_icon.png">
			    </a>
			     </td>
			  </tr>
			 </table>  
			    <script>
			    $.struts2_jquery.require("AppMainHeader.js", null, "${pageContext.request.contextPath}/common/js/customization/");
			     </script>
		    </td>
		    <td nowrap="nowrap" class="floatLeftRight"  style="display:none">
		   		<ps:menu id="menuHeader" list="${lstMenu}"></ps:menu>
		   	</td>
		    <ps:if test="%{#session.sesVO.companyCode!=null && (techDetailsRight != null || techLogsRight != null)}">
		     <td nowrap="nowrap">
		       	 <table id="tech_details_tbl" title="Technial Details" width="100%" cellpadding="0" cellspacing="0" border="0" class="whiteText">
		    	  <tr>
		    	  <td>
				  <span id="tech_details_icon_icon"   onclick="toggleOptionsDiv('tech_details_tbl_div','tech_details_tbl')">
				    <a href="#" id="tech_details_icon_id" style="text-decoration: none">
				    	<span id="tech_details_icon" title="Technical Details"  class="ui-icon ui-icon-carat-1-se"></span> 
				    </a>
				   </span> 
				   </td>
				  </tr>
				 </table>
		    </td>
		    </ps:if>
		    </tr>
		    </table>
		  </td>  
    </tr>
</table>


<ps:if test='%{#session.sesVO.companyCode != null}' >
<ps:hidden type="hidden" id="saveLabel_id" value="%{getText('btn.save')}"/>
<ps:hidden type="hidden" id="log_level_key_id" value="%{getText('log_level_key')}"/>
<ps:hidden type="hidden" id="record_was_Updated_Successfully_key_id" value="%{getText('Record_was_Updated_Successfully_key')}"/>
<ps:hidden type="hidden" id="info_msg_title_id" value="%{getEscText('info_title_key')}"/>
<ps:hidden type="hidden" id="system_properties_key" value="%{getText('system_properties_key')}"/>
<script type="text/javascript">
var tech_det_log_level_key = document.getElementById("log_level_key_id").value;
var saveLevelLabel 	= document.getElementById("saveLabel_id").value;
var record_was_Updated_Successfully_tech_key= document.getElementById("record_was_Updated_Successfully_key_id").value;
var info_msg_tech_title_key= document.getElementById("info_msg_title_id").value;
var tech_det_system_properties_key = document.getElementById("system_properties_key").value;
</script>	 
 <div id="tech_details_tbl_div" class="ui-corner-all" onmouseout="popup_close(event, this)" style="display:none;background-color:white;border:1px solid #000000;" >
	<table width="100%" cellpadding="0" cellspacing="1" border="0">
	<ps:if test="%{techDetailsRight != null}">
		<tr>
			<%/* Technical details Layout*/ %>
		    <td nowrap="nowrap">
			    <table cellpadding="0" cellspacing="5" border="0" class="blackText">
			    	  <tr style="cursor: pointer">
				    	  <td>
						 	 <span id="clear_cache_icon"  onclick="clearCache()"  class="ui-icon ui-icon-trash" >
						   	</span> 
						   </td>
						   <td width="80%" nowrap="nowrap" class="labelTd"  onclick="document.getElementById('clear_cache_icon').click()"> 
						   	 <ps:label key="clear_cache_key"/>
						  </td>
						  <% /* Audit for clear cache*/ %>
						  			<ps:if test="%{checkAuditEnabled('${appName}','TECHDETAILS')}">
										<script type="text/javascript">
											$.struts2_jquery.require("AuditReport.js" ,null,jQuery.contextPath+"/common/js/audit/");
										</script>
										<td class="right">
													<input type="hidden"
														id="auditTrxNbr_<%=ConstantsCommon.TECH_DETAILS_OPT%>"
														value="<%=ConstantsCommon.TECH_DETAILS_OPT%>" />
													<span id="audit_icon" title="<ps:text name="infoBar_audit_key"></ps:text>" 
														onclick="javascript:showAuditReport('<%=ConstantsCommon.TECH_DETAILS_OPT%>','${appName}','<%=ConstantsCommon.TECH_DETAILS_OPT%>');"
														class="ui-icon ui-icon-note ui-icon-carat-1-se"> </span>
										</td>
									</ps:if>
					  </tr>
				 </table>
			</td>
		</tr>
		</ps:if>
		<ps:if test="%{techLogsRight != null}">
			<tr>
		    <td nowrap="nowrap">
	    	    <table cellpadding="0" cellspacing="5" border="0" class="blackText">
			    	  <tr style="cursor: pointer">
				    	  <td>
						 	 <span id="change_log_level" onclick="changeLoglevel()"  class="ui-icon ui-icon-transfer-e-w" >
						   	</span> 
						   </td>
						   <td width="80%" nowrap="nowrap" class="labelTd" onclick="document.getElementById('change_log_level').click()"> 
						   	 <ps:label key="log_level_key"></ps:label>
						  </td>
						  <% /* TP 820336 audit for log level */ %>
						  			<ps:if test="%{checkAuditEnabled('${appName}','TECHLOGSAXS')}">
										<script type="text/javascript">
										$.struts2_jquery.require("AuditReport.js",null,jQuery.contextPath+"/common/js/audit/");
										</script>
										<td  class="right">
													<input type="hidden"
														id="auditTrxNbr_<%=ConstantsCommon.TECH_LOGS_OPT%>"
														value="<%=ConstantsCommon.TECH_LOGS_OPT%>" />
													<span id="audit_icon" title="<ps:text name="infoBar_audit_key"></ps:text>" 
														onclick="javascript:showAuditReport('<%=ConstantsCommon.TECH_LOGS_OPT%>','${appName}','<%=ConstantsCommon.TECH_LOGS_OPT%>');"
														class="ui-icon ui-icon-note ui-icon-carat-1-se"> </span>
										</td>
									</ps:if>
					  </tr>
				 </table>
		    	</td>
			</tr>
			<tr>
			    <td nowrap="nowrap">
		    	    <table cellpadding="0" cellspacing="5" border="0" class="blackText">
						<tr style="cursor: pointer">
					    	  <td>
							 	 <span id="system_properties" onclick="showSystemProp()"  class="ui-icon ui-icon-gear" >
							   	</span> 
							   </td>
							   <td width="80%" nowrap="nowrap" class="labelTd" onclick="document.getElementById('system_properties').click()"> 
							   	 <ps:label key="system_properties_key"></ps:label>
							  </td>
						  </tr>
					</table>
					<script type="text/javascript">
						$.struts2_jquery.require("ConfigurationValidation.js",null,jQuery.contextPath+"/common/js/configuration/");
					</script>
				</td>
			</tr>
		</ps:if>
	</table>
</div>	
</ps:if>


<ps:if test='%{#session.sesVO.companyCode != null }'>
<div id="customization_options_div" class="ui-corner-all" onmouseout="popup_close(event, this)" style="display:none;background-color:white;border:1px solid #000000;" >
</div>
<div id="header_options_div" class="ui-corner-all" onmouseout="popup_close(event, this)" style="display:none;background-color:white;border:1px solid #000000;" >
	<table width="100%" cellpadding="0" cellspacing="1" border="0">
	<tr>
		<td nowrap="nowrap">
			<ps:set name="change_pwd_key"       value="%{getText('change_pwd_key')}"/>
			<table title="${change_password_key}" cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
					<td>
					<span id="" onclick="changePassword(this);"> <a href="#"
						id="change_password" style="text-decoration: none"> <img
								border="0"
								src="${pageContext.request.contextPath}/common/images/change-pwd-icon.png">
					</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('change_password').click()">
					<ps:label key="change_pwd_key"></ps:label>
				</td>
				</tr>
			</table>
		</td>
	</tr>
	   <ps:if test='%{session.sesVO.appLocationType != "2"}'>
				<tr>
					<td nowrap="nowrap">
						<ps:set name="switch_company_key"
							value="%{getText('switch_company_key')}" />
						<table title="${switch_branch_key}" cellpadding="0"
							cellspacing="5" border="0" class="blackText">
							<tr>
								<td>
									<span id="" onclick="switchCompanyBranchMgnt(this,false)"> <a
										href="#" id="switch_company" style="text-decoration: none">
											<img border="0"
												src="${pageContext.request.contextPath}/common/images/switch-icon.png">
									</a> </span>
								</td>
								<td class="labelTd"
									onclick="document.getElementById('switch_company').click()">
									<ps:label key="switch_company_key"></ps:label>
								</td>
							</tr>
						</table>
					</td>
				</tr>
		
	   <ps:if test='%{"1" != session.sesVO.appLocationType}'>
		<tr>
			<td nowrap="nowrap">
				<ps:set name="switch_branch_key"
					value="%{getText('switch_branch_key')}" />
				<table title="${switch_branch_key}" cellpadding="0"
					cellspacing="5" border="0" class="blackText">
					<tr>
						<td>
							<span id="" onclick="switchCompanyBranchMgnt(this,true)"> <a
								href="#" id="switch_branch" style="text-decoration: none">
									<img border="0"
										src="${pageContext.request.contextPath}/common/images/switch-icon.png">
							</a> </span>
						</td>
						<td class="labelTd"
							onclick="document.getElementById('switch_branch').click()">
							<ps:label key="switch_branch_key"></ps:label>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		</ps:if>
	</ps:if>
	<ps:if test='%{showMgrOptions == "true" }' >
	<ps:hidden type="hidden" id="forceClosure_id" value="%{getText('force_closure_key')}"/>
	<tr>
		<td nowrap="nowrap">
			<ps:set name="openBranch_key"       value="%{getText('openBranch_key')}"/>
			<table title="${open_branch_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
	    	  <tr>
				<td>
					<span id="" onclick="openBranch(this);"> <a href="#"
					id="open_branch" style="text-decoration: none"> <img border="0"
							src="${pageContext.request.contextPath}/common/images/open-branch-icon.png">
				</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('open_branch').click()">
					<ps:label key="openBranch_key"></ps:label>
				</td>
			</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td nowrap="nowrap">
			<ps:set name="closeBranch_key"       value="%{getText('closeBranch_key')}"/>
			<table title="${close_branch_key}"   cellpadding="0" cellspacing="5" border="0" class="blackText">
	    	  <tr>
				<td>
					<span id="" onclick="closeBranch(this);"> <a href="#"
						id="close_branch" style="text-decoration: none"> <img border="0"
								src="${pageContext.request.contextPath}/common/images/close-branch-icon.png">
					</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('close_branch').click()">
					<ps:label key="closeBranch_key"></ps:label>
				</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td nowrap="nowrap">
			<ps:set name="openSession_key"       value="%{getText('openSession_key')}"/>
			<table title="${open_session_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
			<tr>		
				<td>
				<span id="" onclick="openSession(this);"> <a href="#"
					id="open_session" style="text-decoration: none"> <img border="0"
							src="${pageContext.request.contextPath}/common/images/open-session-icon.png">
				</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('open_session').click()">
					<ps:label key="openSession_key"></ps:label>
				</td>
				</tr>
		</table>
		</td>
	</tr>
	<tr>
		<td nowrap="nowrap">
			<ps:set name="close_session_key"       value="%{getText('close_session_key')}"/>
			<table title="${close_session_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
			<tr>
				<td>
					<span id="" onclick="closeSession(this);"> <a href="#"
						id="close_session" style="text-decoration: none"> <img
								border="0"
								src="${pageContext.request.contextPath}/common/images/close-session-icon.png">
					</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('close_session').click()">
					<ps:label key="close_session_key"></ps:label>
				</td>
			</tr>
			</table>
		</td>
	</tr>
</ps:if>
<ps:if test='%{finalSignOffOption == "true" }' >
	<tr>
		<td nowrap="nowrap">
			<ps:set name="final_sign_off_key"       value="%{getText('final_sign_off_key')}"/>
			<table title="${final_sign_off_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
			<tr>
				<td>
					<span id="" onclick="finalSignOff(false);"> <a href="#"
						id="final_signoff" style="text-decoration: none"> <img
								border="0"
								src="${pageContext.request.contextPath}/common/images/final-signoff-icon.png">
					</a> </span>
				</td>
				<td class="labelTd"
					onclick="document.getElementById('final_signoff').click()">
					<ps:label key="final_sign_off_key"></ps:label>
				</td>
				</tr>
			</table>
		</td>
	</tr>
</ps:if>
</table>
     <script type="text/javascript">
    	$.struts2_jquery.require("PortalHeaderOptions.js", null, "${pageContext.request.contextPath}/common/js/portaloptions/");
    </script>	
</div>	
</ps:if>
<ps:if test="%{#session.sesVO.companyCode!=null && (usrLabelRight != null || usrSettingRight != null || usrPrntAxsRight != null ||
  dynClntPrmsEditRight != null || dynClntPrmsApproveRight != null || dynClntPrmsColsEditRight != null || dynScrGenRight != null || expImpCustRight != null)}">
<div id="header_advanced_div" class="ui-corner-all" style="display:none;background-color:white;border:1px solid #000000;" >
	<table width="100%" cellpadding="0" cellspacing="1" border="0">
   	 <ps:if test="%{#session.sesVO.companyCode!=null && usrSettingRight != null}">
    	<% if(ConstantsCommon.SCREEN_CONFIG == 1)
			{ %>
			<ps:if test="%{usrSaveAsRight != null}">
			  <tr>
			    <td nowrap="nowrap">
			    	 <ps:set name="screen_mgnt_key"       value="%{getText('screen_mgnt_key')}"/>
			    	 <table id="screen_mgnt_tbl" title="${screen_mgnt_key}" cellspacing="0" cellspacing="0" border="0" class="blackText">
			    	  <tr>
				    	  <td>
							  <span id="screen_mgnt_hdr"  onclick="toggleOptionsDiv('save_as_and_linkDynScreen','advanced_tbl')">
							    <a href="#" id="screen_mgnt_hdr_id" style="text-decoration: none">
							      <img border="0" src="${pageContext.request.contextPath}/common/images/screensMgnt.png">
							    </a>
							  </span> 
						  </td>
						  <td class="labelTd" onclick="document.getElementById('screen_mgnt_hdr_id').click()" style="width: 80%"> 
						      <ps:label key="screen_mgnt_key"></ps:label>
						  </td>
						  <td class="labelTd" onclick="document.getElementById('screen_mgnt_hdr_id').click()">
						     <span class="ui-icon ui-icon-triangle-1-e"> 
						  </td>
					  </tr>
					 </table>
				</td>
			  </tr>
			</ps:if>
		<tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="config_icon_key"       value="%{getText('enable_config_key')}"/>
		    	 <table title="${config_icon_key}" cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
			    	  <td>
						  <span id="config_icon"  onclick="enableCustConfiguration(this)">
						   <a href="#" id="hder_settings_icon_id" style="text-decoration: none">
						      <img border="0" src="${pageContext.request.contextPath}/common/images/settings_icon.png">
						    </a>
						   </span> 
				   	</td>
				   <td class="labelTd" onclick="document.getElementById('hder_settings_icon_id').click()"> 
				    <ps:label key="settings_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
			</tr>
			 <ps:hidden type="hidden" id="tooltip_icon_key_trns_id" value="%{getText('tooltip_icon_key_trns_key')}"/>
			 <ps:hidden type="hidden" id="customize_icon_key_trns_id" value="%{getText('customize_key')}"/>
			 <ps:hidden type="hidden" id="cust_det_key_trns_id" value="%{getText('cust_det_key')}"/>
		     <script type="text/javascript">
		        var tooltip_icon_key_trns = document.getElementById("tooltip_icon_key_trns_id").value;
		        var cust_det_key_trns = document.getElementById("cust_det_key_trns_id").value;
		        var customize_icon_key_trns = document.getElementById("customize_icon_key_trns_id").value;
		        var cust_view_sql_enable = '<%=ConstantsCommon.SCREEN_CONFIG_VIEW_SQL+""%>';
				$.struts2_jquery.require("FieldCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
			 </script>
			
		    <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="status_cust_icon_key"       value="%{getText('status_cust_key')}"/>
		    	 <table title="${status_cust_icon_key}" cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
			    	  <td>
						  <span id="status_config_icon"  onclick="statusCust_openStatusCustomization()">
						   <a href="#" id="hder_statusCust_icon_id" style="text-decoration: none">
						      <img border="0" src="${pageContext.request.contextPath}/common/images/icon_person_small_red.gif">
						    </a>
						   </span> 
				   	</td>
				   <td class="labelTd" onclick="document.getElementById('hder_statusCust_icon_id').click()"> 
				    <ps:label key="status_cust_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
			</tr>
            <script type="text/javascript">
                $.struts2_jquery.require("StatusCustomizationMaint.js", null, "${pageContext.request.contextPath}/common/js/statuscustomization/");
            </script>
		    <%}%>
        </ps:if>
        <ps:if test="%{dynScrGenRight != null}">
        	<ps:hidden type="hidden" id="create_screen_title_key_id" value="%{getText('create_screen_title_key')}"/>
            <script type="text/javascript">
                var create_screen_title_key = document.getElementById("create_screen_title_key_id").value;
                $.struts2_jquery.require("ScreenGeneratorList.js", null, "${pageContext.request.contextPath}/common/js/screengenerator/");
            </script>
		    <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="create_screen_title_key"       value="%{getText('create_screen_title_key')}"/>
		    	 <table title="${create_screen_title_key}" cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
			    	  <td>
						  <span id="screenGenerator_icon"  onclick="dyn_createScreen()">
						   <a href="#" id="hder_screenGenerator_icon_id" style="text-decoration: none">
						      <img border="0" src="${pageContext.request.contextPath}/common/images/add_page.png">
						    </a>
						   </span> 
				   	</td>
				   <td class="labelTd" onclick="document.getElementById('hder_screenGenerator_icon_id').click()"> 
				    <ps:label key="create_screen_title_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
			</tr>          
        </ps:if>
        
	<!-- Code for label translation --> 
	  <ps:if test="%{usrLabelRight != null}">
	  		<ps:hidden type="hidden" id="same_language_key_id" value="%{getText('same_language_key')}"/>	
	  	      <script type="text/javascript">
		        var same_language_key_trns = document.getElementById("same_language_key_id").value;
				$.struts2_jquery.require("FieldCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
			</script>
	  <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="trans_icon_key"       value="%{getText('trans_key')}"/>
		    	 <table title="${trans_icon_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
		    	  <td>
				  <span id="trans_icon"  onclick="loadLblTransConfiguration()">
				   <a href="#" id="hder_trans_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/translation.png">
				    </a>
				   </span> 
				   </td>
				   <td class="labelTd" onclick="document.getElementById('hder_trans_icon_id').click()"> 
				    <ps:label key="trans_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
		    <script type="text/javascript">
				$.struts2_jquery.require("Translation.js", null, "${pageContext.request.contextPath}/common/js/translation/");
			</script>
		</tr>
    </ps:if>
     <ps:if test="%{usrThemeRight != null}">
    	<tr>
			<td nowrap="nowrap">
				<ps:set name="themes_icon_key" value="%{getText('themes_key')}" />
				<table title="${themes_icon_key}" cellpadding="0" cellspacing="5"
					border="0" class="blackText">
					<tr>
						<td>
							<span id="themes_icon" onclick="loadThemesCustomization()">
								<a href="#" id="hder_themes_icon_id"
								style="text-decoration: none"> 
									<img border="0"
										src="${pageContext.request.contextPath}/common/images/layout_edit.png">
								</a> 
							</span>
						</td>
						<td class="labelTd"
							onclick="document.getElementById('hder_themes_icon_id').click()">
							<ps:label key="themes_key"></ps:label>
						</td>
					</tr>
				</table>
			</td>
			 <script type="text/javascript">
				$.struts2_jquery.require("ThemeCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
			</script>
		</tr>
	</ps:if>
    <!-- Code for setting default printer --> 
	  <ps:if test="%{usrPrntAxsRight != null}">
	  <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="prntr_icon_key"       value="%{getText('prntr_key')}"/>
		    	 <table title="${prntr_icon_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
		    	  <td>
				  <span id="prntr_icon"  onclick="loadUserPrntList()">
				   <a href="#" id="hder_prntr_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/printer.png">
				    </a>
				   </span> 
				   </td>
				   <td class="prntrTd" onclick="document.getElementById('hder_prntr_icon_id').click()"> 
				    <ps:label key="prntr_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
				<ps:hidden type="hidden" id="user_prntr_list_key_var_id" value="%{getText('user_prntr_list_key')}"/>
				<ps:hidden type="hidden" id="user_prntr_select_key_var_id" value="%{getText('user_prntr_select_key')}"/>
				<ps:hidden type="hidden" id="Set_as_default_key_var_id" value="%{getText('Set_as_default_key')}"/>
				<ps:hidden type="hidden" id="usrActvXSelectdPrntr" name="usrActvXSelectdPrntr"/>
				<ps:hidden type="hidden" id="pathActiveXPrintClassId" value="<%=PluginsConstants.PRINT_CLSID%>"/>
				<ps:hidden type="hidden" id="pathActiveXPrintVersion" value="<%=PluginsConstants.PRINT_AX_VERSION%>"/>
				<script type="text/javascript">
				var user_prntr_list_key = document.getElementById("user_prntr_list_key_var_id").value;
				var user_prntr_select_key = document.getElementById("user_prntr_select_key_var_id").value;
				var set_as_default_key = document.getElementById("Set_as_default_key_var_id").value;
				$.struts2_jquery.require("FieldCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
				$.struts2_jquery.require("CommonFuncExtension.js", null, "${pageContext.request.contextPath}/common/jquery/");
			</script>
		</tr>
    </ps:if>
    
	<!-- Code for Dynamic Client's params --> 
	  <ps:if test="%{dynClntPrmsEditRight != null}">
	  	      <script type="text/javascript">
				$.struts2_jquery.require("DynClientParams.js", null, "${pageContext.request.contextPath}/common/js/dynclientparams/");
			</script>
	  <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="dynCltParam_icon_key"       value="%{getText('dynclientparams_key')}"/>
		    	 <table title="${dynclientparams_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
		    	  <td>
				  <span id="dynCltParam_icon"  onclick="loadDynClientParamsDialog('N')">
				   <a href="#" id="hder_dynCltParam_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/translation.png">
				    </a>
				   </span> 
				   </td>
				   <td class="dynClientParamsTd" onclick="document.getElementById('hder_dynCltParam_icon_id').click()"> 
				    <ps:label key="dynclientparams_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
		</tr>
    </ps:if>
	<!-- Code for Dynamic Client's params Approval Screen--> 
	  <ps:if test="%{dynClntPrmsApproveRight != null}">
	  	      <script type="text/javascript">
				$.struts2_jquery.require("DynClientParams.js", null, "${pageContext.request.contextPath}/common/js/dynclientparams/");
			</script>
	  <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="dynCltParam_approve_icon_key"       value="%{getText('dynclientparams_approve_key')}"/>
		    	 <table title="${dynclientparams_approve_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
		    	  <td>
				  <span id="dynCltParam_approve_icon"  onclick="loadDynClientParamsDialog('A')">
				   <a href="#" id="hder_dynCltParam_approve_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/translation.png">
				    </a>
				   </span> 
				   </td>
				   <td class="dynClientParams_approveTd" onclick="document.getElementById('hder_dynCltParam_approve_icon_id').click()"> 
				    <ps:label key="dynclientparams_approve_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
		</tr>
    </ps:if>	<!-- Code for Dynamic Client's params Columns maintenance Screen--> 
	  <ps:if test="%{dynClntPrmsColsEditRight != null}">
		<ps:set name="same_column_key_trns" value="%{getEscText('same_column_key_trns')}"/>
			  <ps:hidden type="hidden" id="same_column_key_trns_id" value="%{getText('same_column_key_trns')}"/>	
	  	      <script type="text/javascript">
				var same_column_key_trns = document.getElementById("same_column_key_trns_id").value;
				$.struts2_jquery.require("DynClientParams.js", null, "${pageContext.request.contextPath}/common/js/dynclientparams/");
			</script>
	  <tr>
		    <td nowrap="nowrap">
		    	 <ps:set name="dynCltParam_columns_icon_key"       value="%{getText('dynclientparams_columns_key')}"/>
		    	 <table title="${dynclientparams_approve_key}"  cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
		    	  <td>
				  <span id="dynCltParam_columns_icon"  onclick="loadDynClientParamsDialog('E')">
				   <a href="#" id="hder_dynCltParam_columns_icon_id" style="text-decoration: none">
				      <img border="0" src="${pageContext.request.contextPath}/common/images/translation.png">
				    </a>
				   </span> 
				   </td>
				   <td class="dynClientParams_columnsTd" onclick="document.getElementById('hder_dynCltParam_columns_icon_id').click()"> 
				    <ps:label key="dynclientparams_columns_key"></ps:label>
				  </td>
				  </tr>
				 </table>
		    </td>
		</tr>
    </ps:if>

	<ps:if test="%{expImpCustRight != null}">
		<tr>
			<td nowrap="nowrap">
			<ps:hidden type="hidden" id="export_screen_cust_key_id"
					value="%{getText('export_screen_cust_key')}" />
			<ps:hidden type="hidden" id="choose_custom_screen_key_id"
					value="%{getText('choose_custom_screen_key')}" />
				<table title="${export_screen_cust_key}" cellpadding="0"
					cellspacing="5" border="0" class="blackText">
					<tr>
						<td><span id="expscr_icon"
							onclick="loadExpImpCustom('<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>')"> <a href="#"
								id="hder_expscr_icon_id" style="text-decoration: none"> <img
									border="0"
									src="${pageContext.request.contextPath}/common/images/translation.png">
							</a>
						</span></td>
						<td class="expscrTd"
							onclick="document.getElementById('hder_expscr_icon_id').click()">
							<ps:label key="export_screen_cust_key"></ps:label>
						</td>
					</tr>
				</table></td>
			<script type="text/javascript">
				var export_screen_cust_key = document.getElementById("export_screen_cust_key_id").value;
				var choose_custom_screen_key = document.getElementById("choose_custom_screen_key_id").value;
				$.struts2_jquery.require("FieldCustomization.js", null,
						jQuery.contextPath
								+ "/common/js/customization/");
			</script>
		</tr>
	</ps:if>

	<ps:if test="%{globalActivitiesRight != null}">
    	<tr>
			<td nowrap="nowrap">
				<ps:hidden type="hidden" id="global_activities_key_id" value="%{getText('global_activities_key')}" />
				<table title="${global_activities_key}" cellpadding="0" cellspacing="5"
					border="0" class="blackText">
					<tr>
						<td>
							<span id="globalop_icon" onclick="buttonCustomizationOpen(null,'IMAL','ROOT','ROOT','true')">
								<a href="#" id="hder_globalop_icon_id"
								style="text-decoration: none"> 
									<img border="0"
										src="${pageContext.request.contextPath}/common/images/search.png">
								</a> 
							</span>
						</td>
						<td class="labelTd"
							onclick="document.getElementById('hder_globalop_icon_id').click()">
							<ps:label key="global_activities_key"></ps:label>
						</td>
					</tr>
				</table>
			</td>
			 <script type="text/javascript">
				$.struts2_jquery.require("FieldCustomization.js", null, "${pageContext.request.contextPath}/common/js/customization/");
				var global_activities_key_trns = document.getElementById("global_activities_key_id").value;
			</script>
		</tr>
	</ps:if>
</table>
<div id="save_as_and_linkDynScreen" class="ui-corner-all" style="display:none;background-color:white;border:1px solid #000000;">
    <table width="100%" cellpadding="0" cellspacing="1" border="0">
            <tr align="center" onclick="document.getElementById('hder_advanced_icon_id').click()">
                <td class="labelTd">
                   <span class="ui-icon ui-icon-triangle-1-n">
                </td>
            </tr>
			<tr>
			    <td nowrap="nowrap">
			    	 <ps:set name="save_as_icon_key"       value="%{getText('save_as_key')}"/>
			    	 <table title="${save_as_icon_key}" cellspacing="5" cellspacing="0" border="0" class="blackText">
			    	  <tr>
			    	  <td>
					  <span id="save_as_hdr"  onclick="cust_saveAsScreen()">
					   <a href="#" id="save_as_hdr_id" style="text-decoration: none">
					      <img border="0" src="${pageContext.request.contextPath}/common/images/save_as_icon.png">
					    </a>
					   </span> 
					   </td>
					   <td class="labelTd" onclick="document.getElementById('save_as_hdr_id').click()"> 
					    <ps:label key="save_as_key"></ps:label>
					  </td>
					  </tr>
					 </table>
				</td>
			</tr>
			<tr>   				
				<td nowrap="nowrap">
						<ps:set name="delete_saved_screens_key_value" value="%{getText('delete_saved_screens_key')}" />
						<table title="${delete_saved_screens_key_value}" cellspacing="5" cellspacing="0" border="0" class="blackText">
								<tr>
									<td>
										<span id="delete_saved_screens_hdr" onclick="cust_deleteSvdScrnsOpen()"> 
											<a href="#" id="delete_saved_screens_hdr_id" style="text-decoration: none"> 
												<img border="0" src="${pageContext.request.contextPath}/common/images/delete.png">
											</a>
										</span>
									</td>
									<td class="labelTd" onclick="document.getElementById('delete_saved_screens_hdr_id').click()">
										<ps:label key="delete_saved_screens_key"></ps:label>
									</td>
								</tr>
						</table>
				</td>
			</tr>
			<tr>
			    <td nowrap="nowrap">
			    	 <ps:hidden type="hidden" id="link_screen_icon_key_id"       value="%{getText('link_screen_key')}"/>
			    	 <table title="${link_screen_icon_key}" cellspacing="5" cellspacing="0" border="0" class="blackText">
			    	  <tr>
			    	  <td>
					  <span id="link_screen_hdr"  onclick="openLinkDynScreenMgnt()">
					   <a href="#" id="link_screen_hdr_id" style="text-decoration: none">
					      <img border="0" src="${pageContext.request.contextPath}/common/images/linkDynToMenu.png">
					    </a>
					   </span> 
					   </td>
					   <td class="labelTd" onclick="document.getElementById('link_screen_hdr_id').click()"> 
					    <ps:label key="link_screen_key"></ps:label>
					  </td>
					  </tr>
					 </table>
				</td>			
			</tr>
			<ps:hidden type="hidden" id="choose_save_as_screen_key_var_id"       value="%{getText('choose_save_as_screen_key')}"/>			
			<script type="text/javascript">					
		        var choose_save_as_screen_key = document.getElementById("choose_save_as_screen_key_var_id").value;
		        var link_screen_key = document.getElementById("link_screen_icon_key_id").value;
			</script>
    </table>
 </div>
</div>	
</ps:if>

 <ps:if test='%{#session.sesVO.companyCode != null && showHeaderOptions != null}' >	 
 <div id="layout_advanced_div" class="ui-corner-all" onmouseout="popup_close(event, this)" style="display:none;background-color:white;border:1px solid #000000;" >
	<table width="100%" cellpadding="0" cellspacing="1" border="0">
		<tr>
			<%/* Save Layout*/ %>
		    <td nowrap="nowrap">
			    <table cellpadding="0" cellspacing="5" border="0" class="blackText">
			    	  <tr>
				    	  <td>
						 	 <span id="trans_icon"  style="cursor: pointer" class="editlayout headerlink ui-icon ui-icon-pencil" >
						   	</span> 
						   </td>
						   <td class="labelTd editlayout headerlink " > 
						   	 <ps:label key="editLayout_key"/>
						  </td>
					  </tr>
				 </table>
			</td>
		</tr>

		<ps:if test='%{session.sesVO.currentAppName != "IBIS" && usrSetAsDefaultPageRight != null}'>
		<tr>
	    <td nowrap="nowrap">
	    
	     <table cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
			    	  <td>
					 	 <span id="layout_default" style="cursor: pointer" class="makelayoutdefault headerlink" >
					 	 	<ps:checkbox valOpt="1:0" id="chk_layout_default" name="defaultDisplayPage" onclick="updateUserDefaultDisplayPage()"></ps:checkbox>
					   	</span> 
					   </td>
					   <td class="labelTd savelayout headerlink" onclick="updateUserDefaultDisplayPage('label')"> 
					   		<ps:label key='make_default_key' />
					  </td>
				  </tr>
			 </table>
	    	</td>
		</tr>
		</ps:if>
		<ps:if test="%{usrAllwdPrtltRight != null}">
		<tr>
	    <td nowrap="nowrap">
    	    <table cellpadding="0" cellspacing="5" border="0" class="blackText">
		    	  <tr>
			    	  <td>
					 	<span id="usr_allowed_portlets" onclick="loadUsrAllwdPortlets()" style="cursor: pointer" class="savelayout headerlink ui-icon ui-icon-disk" >
					   	</span> 
					   </td>
					   <td class="labelTd savelayout headerlink " onclick='loadUsrAllwdPortlets()'> 
					   	 <ps:label key="usr_allowed_portlets_key"></ps:label>
					  </td>
				  </tr>
			 </table>
	    	</td>
		</tr>
		</ps:if>
	</table>
</div>	
</ps:if>

<ps:if test="%{usrBtnCustRight != null}">
	<ps:hidden type="hidden" id="btn_cust_key_trns_id" value="%{getText('button_customize_key')}"/>
	<script type="text/javascript">
			var btn_cust_key_trns = document.getElementById("btn_cust_key_trns_id").value;
	</script>
	<ps:hidden id="usrBtnCustRight"></ps:hidden>
</ps:if>
