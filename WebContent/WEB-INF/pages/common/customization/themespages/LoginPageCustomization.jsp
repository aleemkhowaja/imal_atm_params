<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>

<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/login/images/favicon.ico"
	type="image/x-icon" />
<!-- used to take highest available compatibility mode for IE -->
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/login/style/ImalBranding.css" />
<%/*coloring management*/%>
<LINK REL="stylesheet" TYPE="text/css"
	HREF="${pageContext.request.contextPath}/login/style/LoginPage.css">

<STYLE TYPE="text/css">
.footer {
	font-size: 7pt;
}
.loginPage {
	background-color: #005A80;
}

.loginPage TD {
	color: #FFFFFF;
	font-family: Trebuchet MS;
	font-size: 10pt;
}

.pathLoginImage {
	background-image: url('${pageContext.request.contextPath}/login/images/path-logo.png');
	background-repeat: no-repeat;
	background-size: 90px 60px;
}

.portal-top-left {
	background:
		url('${pageContext.request.contextPath}/login/images/img/top_lef.gif');
}

.portal-top-center {
	background:
		url('${pageContext.request.contextPath}/login/images/img/top_mid.gif')
		repeat-x;
}

.portal-top-right {
	background:
		url('${pageContext.request.contextPath}/login/images/img/top_rig.gif');
}

.portal-left {
	background:
		url('${pageContext.request.contextPath}/login/images/img/cen_lef.gif')
		repeat-y;
}

.portal-right {
	background:
		url('${pageContext.request.contextPath}/login/images/img/cen_rig.gif')
		repeat-y;
}

.portal-bottom-left {
	background:
		url('${pageContext.request.contextPath}/login/images/img/bot_lef.gif');
}

.portal-bottom-center {
	background:
		url('${pageContext.request.contextPath}/login/images/img/bot_mid.gif');
}

.portal-bottom-right {
	background:
		url('${pageContext.request.contextPath}/login/images/img/bot_rig.gif');
}

.keyboardInputInitiator {
	display: none;
	cursor: auto;
}
</STYLE>


<DIV id="loginId" style="margin: 0; overflow: auto;">


	<table height="100%" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
		<TR>
			<td>
				&nbsp;
			</td>
		</TR>

		<tr height="50%">
			<td align="center" nowrap="nowrap" >
				<TABLE height="100%" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">

					<TR height="100%">
						<TD>

							<TABLE CELLPADDING="0" CELLSPACING="0" height="100%" width="100%"
								border="0" align="center">
								<TR>
									<TD VALIGN="TOP" WIDTH="37.5%"></TD>
									<TD nowrap="nowrap" WIDTH="25%" align="center" HEIGHT="80"
										VALIGN="middle" class="display-icons">
										<table border="0" class="loginPage" width="100%" border="0"
											align="center" cellpadding="0" cellspacing="0" css-builder="">
											<tr height="16">
												<td width="16" class="portal-top-left">&nbsp;</td>
												<td class="portal-top-center">&nbsp;</td>
												<td width="10" class="portal-top-right">&nbsp;</td>
											</tr>
											<tr>
												<td class="portal-left">&nbsp;</td>
												<td><span style="margin-left: 10px;" class="ui-icon ui-icon-wrench customization-icon" customClass=".loginPage" title="<ps:text name='login_background_color_key'/>" onclick="themeCustomization_customizeClass(this)"/></td>
											</tr>
											<tr>
												<td class="portal-left">&nbsp;</td>
												<td>

													<TABLE border="0" height="100%" CELLPADDING="0"
														CELLSPACING="0" border="0" width="100%">

														<tr>
															<td>
																&nbsp;
															</td>
														</tr>
														<tr>
															<td  align="left">
																<div align="middle" style="width:96px; height: 40px; background-image: url(${pageContext.request.contextPath}/login/images/path-logo-login.png);background-repeat: no-repeat;"/>
															</td> 
														</tr>
														<tr>
															<td align="center">
															<span class="ui-icon ui-icon-wrench customization-icon" customClass=".pathLoginImage" title="<ps:text name='path_login_image_key'/>" onclick="themeCustomization_customizeClass(this)"/>
																<div style="width: 90px; height: 60px;" align="middle"
																	class="pathLoginImage"/>
															</td>
														</tr>
														<tr>
															<td>
																&nbsp;
																<br />
																&nbsp;
															</td>
														</tr>
														<TR>
															<TD>
																<div class="note">
																	
																</div>
															</TD>
														</TR>

														<TR>
															<TD class="fldDataLeft">
																<span class="ui-icon ui-icon-wrench customization-icon" customClass=".loginPage .user" title="<ps:text name='login_screen_labels_key'/>" onclick="themeCustomization_customizeClass(this)"/>
																<ps:label theme="simple" value="%{'Login Name'}"
																	name="Login_Name" cssClass="user"></ps:label></TD>
														</TR>
														<TR>
															<TD class="fldDataLeft">
																<span class="ui-icon ui-icon-wrench customization-icon" customClass=".texta" title="<ps:text name='login_text_area_key'/>" onclick="themeCustomization_customizeClass(this)"/>
																<ps:textfield theme="simple" id="j_username"
																	name="j_username" tabindex="1" value=""
																	cssStyle="text-transform:uppercase; height: 25px !important"
																	onblur="this.value=this.value.toUpperCase()"
																	cssClass="texta" />
															</TD>
														</TR>

														<TR>
															<TD id="test1" class="fldDataLeft">
																<ps:label theme="simple" value="%{'Password'}"
																	name="password" cssClass="user"></ps:label>
															</TD>

														</TR>
														<TR>
															<TD class="fldDataLeft">
																<ps:password value="" name="j_password" tabindex="2"
																	theme="simple" id="passwordInp" autocomplete="off"
																	cssClass="texta" />
															</TD>
														</TR>
														<tr>
															<td>
																<table border="0" width="100%">
																	<tr>
																		<td>
																			<input id="enableVKeyboard" type="checkbox"
																				 />
																			<span class="user">Virtual Keyboard</span>
																		</td>
																		<td align="right">
																			<div id="roll"
																				style="padding-top: 5px; padding-right: 9px">
																				<a style="" href="#"><img style="border: none"
																						src="${pageContext.request.contextPath}/login/images/img/loginButton.png"
																						alt="Log in" /> </a>
																			</div>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
														<tr>
															<td>
																<div style="display: none;" id="vk_div"
																	style="top: 0px;"></div>
															</td>
														</tr>
														<% /*
														<tr>

															<td>

																<img src="${pageContext.request.contextPath}/login/images/verisign_logo.jpg">
														</tr>
														<tr>
															<td align="center" class="footer">
															<span class="ui-icon ui-icon-wrench customization-icon" customClass=".loginPage .footer" title="<ps:text name='login_screen_footer_key'/>" onclick="themeCustomization_customizeClass(this)"/>
																This site is certified by verisign as a secured and
																trusted site.
														</tr>
														*/ %>
														<tr>

															<td align="center" class="footer">
															<span class="ui-icon ui-icon-wrench customization-icon" customClass=".loginPage .footer"  onclick="themeCustomization_customizeClass(this)" title="<%=ConstantsCommon.returnAppInterBuildVersion() + " / " + ConstantsCommon.COMMON_COMP_VERSION%>"><%=ConstantsCommon.returnAppDisplayVersion()%></span>
															<span
																	title="<%=ConstantsCommon.returnAppInterBuildVersion() + " / " + ConstantsCommon.COMMON_COMP_VERSION%>"><%=ConstantsCommon.returnAppDisplayVersion()%></span>
																
														</tr>

													</TABLE>

												</td>

												<td width="16" class="portal-right">&nbsp;</td>
											</tr>
											<tr height="16">
												<td width="16" class="portal-bottom-left">&nbsp;</td>
												<td class="portal-bottom-center">&nbsp;</td>
												<td class="portal-bottom-right">&nbsp;</td>



											</tr>

										</table>

									</TD>


									<td width="37.5%" nowrap="nowrap"></td>


								</TR>

							</TABLE>
						</TD>

					</TR>
				</TABLE>
			</td>
		</tr>
		<TR>
			<td>
				&nbsp;
			</td>
		</TR>
	</table>



</DIV>
<ps:set name="file_ext_png_key_var" value="%{getEscText('file_ext_png_key')}"/>
<script>
$(document).ready(function () {
	
	$('#loginId span.customization-icon').hide();
	
	$( "#loginId td.display-icons" )
	.mouseover(function() {
  		$('#loginId span.customization-icon').show();
  	})
  	.mouseout(function() {
  		$('#loginId span.customization-icon').hide();
  	});
});
var file_ext_png_key = "${file_ext_png_key_var}";
</script>
