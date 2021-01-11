<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="java.util.Calendar"%>
<%
	Calendar cal = Calendar.getInstance();
	int year = cal.get(Calendar.YEAR);
%>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td width="14%" class="header-top-left"></td>
		<td width="5%" class="header-top-center">
			<div style="width: 60px;"></div>
		</td>
		<td width="81%" class="header-top-right">
			<table width="100%" border="0">
				<tr>
					<td nowrap="nowrap" width="90%" id="page-footer" align="center">
						<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
							customClass=".footerStyle"
							title="<ps:text name='desktop_footer_style_labels_key'/>"
							onclick="themeCustomization_customizeClass(this)" /> <span
							class="headerStyle footerStyle">Copyright &copy; <%=year+""%>
								Path Solutions &reg; . All rights reserved.</span> <span
							class="headerStyle footerStyle"
							style="font-size: 9; font-style: italic">&nbsp;&nbsp;<span
									title="<%=ConstantsCommon.returnAppInterBuildVersion() + " / " + ConstantsCommon.COMMON_COMP_VERSION%>"><%=ConstantsCommon.returnAppDisplayVersion()%></span>
						</span>
					</td>
					<td width="5%" nowrap="nowrap">
						<span class="headerStyle footerStyle">Powered by </span>
					</td>
					<td width="5%"
						style="background-image: url(${pageContext.request.contextPath}/common/images/pathSmallLogo.png); background-repeat: no-repeat;">
				</tr>
			</table>
		</td>
	</tr>
</table>

