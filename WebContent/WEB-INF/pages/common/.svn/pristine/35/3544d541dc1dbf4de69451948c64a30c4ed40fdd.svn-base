<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@include file="/WEB-INF/pages/appcomponents/common/AppCommonTrans.jsp"%>
<ps:if test="openInDialog != true">
<%/*needed to specify meta tag decorator since on wildfly it is not detected automatically*/ %>
<meta name="decorator" content="desktop"/>
</ps:if>

<head>
	<title><ps:text name="pwdchange_key" />
	</title>
</head>

<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/pwdchange/ChangePwd.js"></script>

<ps:form id="changePwdForm" namespace="/pwdchange" action="updatePwdAction"  autocomplete="off">
<ps:if test="successMessage == null">

	<table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%"
		border="0">
		<tr>
			<ps:if test="showHeaderOptions == null">
				<td WIDTH="30%"></td>
				<td width="40%">
			</ps:if>
			<ps:else>
				<td>
			</ps:else>
				<fieldset class="ui-widget-content ui-corner-all">
					<legend id="legend" class="ui-widget-content ui-corner-all">
						<ps:text name="change_pwd_key"></ps:text>
					</legend>
					<TABLE CELLPADDING="0" CELLSPACING="1" border="0" width="100%"  class="ui-widget-content path-border-none">
						<TR>
							<td></td>
							<TD colspan="2">
								<ps:actionmessage theme="simple" />
								<div class="note">
									<ps:actionerror theme="simple" />
								</div>
							</TD>
						</TR>
						<%/* 3 corresponds old Password, 
							 4 means password Expiry Reset 
							 5 means pwd set by admin 
							 while 2 means no old password available ConstantsCommon.OLD_PWD_UPON_LOGIN_EXSTS */%>
						<ps:if test="allowAccess == 3 || allowAccess == 4 || allowAccess == 5 || showHeaderOptions != null" >
							<tr>
								<td width="50"></td>
								<td class="fldLabelView right">
									<ps:label key="old_pwd_key" id="lbl_old_pwd" for="old_pwd_txt_fake" />
								</td>
								<td width="150px" class="fldDataEdit">
									<input type="hidden" id="old_pwd_txt" name="oldPwd"  />
									<ps:password autocomplete="off" id="old_pwd_txt_fake" maxlength="15" onchange="checkOldPwd()" ></ps:password>
								</td>
							</tr>
						</ps:if>
						<tr>
							<td></td>
							<td class="fldLabelView right">
								<ps:label key="new_pwd_key" id="lbl_new_pwd" for="new_pwd_txt_fake" />
							</td>
							<td class="fldDataEdit">
							<input type="hidden" id="new_pwd_txt" name="newPwd"  />
							<ps:password autocomplete="off" id="new_pwd_txt_fake" maxlength="15"></ps:password>
							</td>
						</tr>
						
						<tr>
							<td></td>
							<td class="fldLabelView right">
								<ps:label key="confirm_pwd_key" id="lbl_confirm_pwd" for="confirm_pwd_txt_fake" />
							</td>
							<td class="fldDataEdit">
							<input type="hidden" id="confirm_pwd_txt" name="confirmPwd"  />
							<ps:password autocomplete="off"   id="confirm_pwd_txt_fake" maxlength="15" ></ps:password>
							</td>
						</tr>
							<ps:set name="showSecurityCodeValue" value='%{ ( !((allowAccess == 3 || allowAccess == 4 || allowAccess == 5 || showHeaderOptions != null) && "1".equals(captchaEnabled)) ) ? "hidden=\'false\' style=\'display:none\'" : "" }'/>
							<tr <ps:property value="showSecurityCodeValue" escapeHtml="true"/> id="captchaTR">
								<td width="50"></td>
								<td class="fldLabelView right">
									<ps:label key="securitycode_key" id="captcha_id" for="captchaText_id" />
								</td>
								<td>
									<ps:textfield name="captchUserText" id="captchaText_id"/>
								</td>
							</tr>
							<tr <ps:property value="showSecurityCodeValue" escapeHtml="true"/> id="captchaImageTR">
								<td width=50></td>
								<td width=50></td>
								<td class="right">
									<img id="captchaImage_id" src="${pageContext.request.contextPath}/login/unSecureAction_loadCaptcha" />
								</td>
								<TD width="50">										 	
									<span id="refresh_icon" title="refresh_key"  onclick="reloadCaptcha()" class="ui-icon ui-icon-refresh"></span>
								</TD>
							</tr>
						<tr>
										<td class="right" colspan="4" >
										<br/>
											<psj:submit id="ajaxlink" button="true" type="button" onclick="javascript:submitFn()">
												<ps:text name="btn.continue"></ps:text>
											</psj:submit>
										</td>
									</tr>
					</TABLE>
				</fieldset>
			</td>
			<ps:if test="showHeaderOptions == null">
				<td WIDTH="30%"></td>
			</ps:if>
		</tr>
	</TABLE>
	</ps:if>
	<ps:else>
	 <table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%" border="0">
					<tr>
					    <td WIDTH="30%"></td>
						<td width="40%">
							<fieldset class="ui-widget-content ui-corner-all">
								<legend id="legend" class="ui-widget-content ui-corner-all">
									<ps:text name="thank_you_key"></ps:text>
								</legend>
								<TABLE CELLPADDING="0" CELLSPACING="1" border="0" width="100%" class="ui-widget-content path-border-none">
									<TR>
										<TD class="left">
											<div>
												<ps:actionmessage theme="simple" />
											</div>
										</TD>
									</TR>
									
									<tr>
										<td class="right" >
										<br/>
											<psj:a href="#" id="continueLoginBtn" indicator="indicator" button="true"
												onclick="javascript:relogin()">
												<ps:text name="relogin_key"></ps:text>

											</psj:a>
										</td>
									</tr>
								</TABLE>
							</fieldset>
						</td>
						<td WIDTH="30%"></td>
					</tr>
				</TABLE>
		</ps:else>
</ps:form>
<ps:if test="%{showHeaderOptions == null}">
<LINK id="appMainThemeCustomizationLink_LoginA" REL="stylesheet" TYPE="text/css" HREF="${pageContext.request.contextPath}/pwdchange/changePwdTheme?fromChangePwd=1">
</ps:if>
<ps:hidden name="showHeaderOptions" id="showHeaderOptions"></ps:hidden>		
<script type="text/javascript">
		if ($.browser.chrome)
		{
			preparePassChrome();
		}
		preventPasteOnPass();
</script>