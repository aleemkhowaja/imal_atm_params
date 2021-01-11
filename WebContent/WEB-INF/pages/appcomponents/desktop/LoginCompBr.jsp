<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%
    //read the language of the user in case performed login, by default the method will return english
	String login_appversion = ConstantsCommon.returnAppNumericVersion();
%>
<ps:if test="openInDialog != true">
<% /* needed to specify meta tag decorator since on wildfly it is not detected automatically*/ %>
<meta name="decorator" content="logincompbr"/>
</ps:if>
<ps:if test="openInDialog != true">
	<title>
		<ps:if test="welcMsg == null">
			<ps:if test='%{session.sesVO.currentAppName == "OADM" || session.sesVO.appLocationType == "1"}'>
				<ps:text name="complogin_msg_key"></ps:text>
			</ps:if>
			<ps:else>
				<ps:text name="login.CoBrlogin"></ps:text>
			</ps:else>
		</ps:if>
		<ps:else>
			<ps:text name="welcome_comp_branch_key"/>
		</ps:else>
	</title>
</ps:if>
<% /* Path Solutions [Libin]  adjusted the page and changed page structure to handle alignment issues in Chrome/Firefox/IE and prevent unwanted growth of fields*/ %>
<script type="text/javascript">
 var company_branch_required_key = "<ps:text name='company_branch_required_key'/>";
</script>
<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/login/LoginCompBr.js?_=<%=login_appversion%>"></script>
<table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%" border="0">
	<tr>
		<td>
			<ps:hidden id="app_location_type" name="session.sesVO.appLocationType"/>
			<ps:form id="compBrForm" action="loginCompBrAction_checkLoginCompBr" namespace="/pathdesktop">
			<ps:hidden id="openInDialog" name="openInDialog"/>
			<ps:if test="welcMsg == null">
				<ps:set value="%{readOnlyProp}" var="readOnlyProp" />
				<table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%" border="0">
					<tr>
					    <ps:if test="openInDialog != true">
						    <td WIDTH="30%"></td>
							<td width="40%">
						</ps:if>
						<ps:else>
						   <td width="100%">
						</ps:else>
							<fieldset class="ui-widget-content ui-corner-all">
								<legend id="legend" class="ui-widget-content ui-corner-all">
									<ps:if test='%{session.sesVO.currentAppName == "OADM" || session.sesVO.appLocationType == "1"}'>
										<ps:text name="complogin_msg_key"></ps:text>
									</ps:if>
									<ps:else>
										<ps:text name="login.CoBrlogin"></ps:text>
									</ps:else>
								</legend>
								<TABLE CELLPADDING="0" CELLSPACING="1" border="0" width="100%" class="ui-widget-content path-border-none">
									<TR>
										<TD colspan="4" style="padding:10px">
											<div class="note">
												<ps:actionerror theme="simple" />
											</div>
										</TD>
									</TR>
									<ps:if test='%{session.sesVO.appLocationType != "2"}'>
										<tr>
									</ps:if>
									<ps:else>
									 	<tr style="display:none;">
									</ps:else>
										<td width="50"></td>
										<td class="fldLabelView right" >
										  <ps:label key="compCode" for="lookuptxt_COMP_CODE"></ps:label>
										</td>
										<td width="70px" class="fldDataEdit center" >
											<psj:livesearch
												actionName="${pageContext.request.contextPath}/pathdesktop/CompaniesByUsrLookup_constructLookup"
												id="COMP_CODE" name="companiesVO.COMP_CODE"
												resultList="COMP_CODE:lookuptxt_COMP_CODE,BRIEF_DESC_ENG:companies"
												searchElement="BRIEF_DESC_ENG"
												parameter="COMP_CODE:lookuptxt_COMP_CODE,branchesVO.BRANCH_CODE:lookuptxt_BRANCH_CODE" mode="number"
												maxlength="4" maxValue="9999" size="5"
												dependency="lookuptxt_COMP_CODE:companiesVO.COMP_CODE,companies:companiesVO.BRIEF_DESC_ENG,lookuptxt_BRANCH_CODE:branchesVO.BRANCH_CODE:branchesCO.BRANCH_CODE_READONLY,branches:branchesVO.BRIEF_DESC_ENG:branchesCO.BRIEF_DESC_ENG_READONLY"
												dependencySrc="${pageContext.request.contextPath}/pathdesktop/CompaniesDependencyAction_dependencyByCompanies"
												>
											</psj:livesearch> 
										</td>
										<td  class="fldDataEdit center">
											<ps:textfield id="companies" name="companiesVO.BRIEF_DESC_ENG"
												readonly="true" tabindex="-1" cssStyle="height:20px"
												/>
										</td>
									</tr>
									<ps:if test='%{session.sesVO.appLocationType != "2" && session.sesVO.appLocationType != "1"}'>
										<tr>
									</ps:if>
									<ps:else>
									 	<tr style="display:none;">
									</ps:else>
										<td></td>
										<td class="fldLabelView right">
										  <ps:label key="branchCode" for="lookuptxt_BRANCH_CODE"></ps:label>
										</td>
										<td width="70" class="fldDataEdit center">
										<psj:livesearch
												actionName="${pageContext.request.contextPath}/pathdesktop/BranchesByUsrLookup_constructLookup"
												id="BRANCH_CODE" name="branchesVO.BRANCH_CODE"
												paramList="compCode:lookuptxt_COMP_CODE"
												mode="number" size="5"
												maxlength="4" maxValue="9999" 
												parameter="COMP_CODE:lookuptxt_COMP_CODE,BRANCH_CODE:lookuptxt_BRANCH_CODE"
												dependency="lookuptxt_BRANCH_CODE:branchesVO.BRANCH_CODE,branches:branchesVO.BRIEF_DESC_ENG"
												dependencySrc="${pageContext.request.contextPath}/pathdesktop/BranchesDependencyAction_dependencyByBranches"
												resultList="BRANCH_CODE:lookuptxt_BRANCH_CODE,BRIEF_DESC_ENG:branches"
												searchElement="BRIEF_DESC_ENG" >
											</psj:livesearch>
										</td>
										<td  class="fldDataEdit center">
											<ps:textfield id="branches" name="branchesVO.BRIEF_DESC_ENG"
												readonly="true" tabindex="-1" cssStyle="height:20px"
												/>
										</td>
									</tr>
									<ps:if test='%{#session.sesVO.tokenVerification != null && #session.sesVO.tokenVerification == "1"}'>
										<tr>
											<td></td>
											<td class="fldLabelView right">
												<ps:label id="pwdTokenLbl" for="pwdTokenId" key="token_key"></ps:label>
											</td>
											<td colspan="2" class="fldDataEdit center">
												<ps:password id="pwdTokenId" autocomplete="off" name="pwdToken"></ps:password>
											</td>
										</tr>
									</ps:if>
									<tr>
										<td class="right" colspan="4" >
										<br/>
											<psj:a href="#" id="ajaxlink" indicator="indicator" button="true"
												onclick="javascript:submitFn()">
												<ps:text name="btn.continue"></ps:text>
											</psj:a>
											<ps:if test="openInDialog == true">
												<psj:a href="#" id="cancelLink" indicator="indicator" button="true"
													onclick="javaScript:$('#switchCompDivId').remove();">
													<ps:text name="Cancel_key"></ps:text>
												</psj:a>											
											</ps:if>
										</td>
									</tr>
								</TABLE>
							</fieldset>
						</td>
						<ps:if test="openInDialog != true">
						   <td WIDTH="30%"></td>
						</ps:if>
					</tr>
				</TABLE>
				</ps:if>
				<ps:else>
				  <table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%" border="0">
					<tr>
					<ps:if test="openInDialog != true">
					    <td WIDTH="30%"></td>
						<td width="40%">
					</ps:if>
					<ps:else>
					   <td width="100%">
					</ps:else>
						<TABLE CELLPADDING="0" CELLSPACING="0" border="0" width="653">
							<tr>
								<td class="path-welcome-left-pane" align="center">
									<table>
										<tr>
											<td class="path-welcome-left-pane" align="center">
												<div style="width: 90px; height: 60px;"
													class="pathLogoImage" />
											</td>
										</tr>
										<tr>
											<td class="path-welcome-left-pane" align="center">
												<ps:label key="welcome_details_key"
													name="welcome_details_key"
													cssClass="path-welcome-wlc-font"></ps:label>
											</td>
										</tr>
									</table>
								</td>
								<td class="path-welcome-right-pane">
									<table>
										<tr>
											<td class="path-welcome-right-pane">
												<ps:iterator value="actionMessages" var="theMess">
													<table>
														<tr>
															<td>
																<img
																	src="${pageContext.request.contextPath}/common/images/new_info_icon.png" />
															</td>
															<td class="path-welcome-msg-font">
																<ps:property value="theMess" escapeHtml="true"/>
															</td>
														</tr>
													</table>
												</ps:iterator>
												<ps:if test="actionErrors != null">
													<br />
													<ps:iterator value="actionErrors" var="theMess">
														<table>
															<tr>
																<td>
																	<image
																		src="${pageContext.request.contextPath}/common/images/new_warning_icon.png" />
																</td>
																<td class="path-welcome-msg-font">
																	<ps:property value="theMess" escapeHtml="true"/>
																</td>
															</tr>
														</table>
													</ps:iterator>
												</ps:if>
											</td>
										</tr>
										<tr>
											<td class="right path-welcome-right-pane"
												style="padding-right: 10px; padding-bottom: 5px; background-color: #E4E9ED">
												<br />
												<psj:a href="#" id="continueWelcBtn" indicator="indicator"
													button="true" onclick="javascript:submitWelcomeFn()">
													<ps:text name="btn.continue"></ps:text>
												</psj:a>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</TABLE></td>
						<ps:if test="openInDialog != true">
						   <td WIDTH="30%"></td>
						</ps:if>
					</tr>
				</TABLE>
				</ps:else>
				
			</ps:form>
		</td>
	</tr>
</TABLE>