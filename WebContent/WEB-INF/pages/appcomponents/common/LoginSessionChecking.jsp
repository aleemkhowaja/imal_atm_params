<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="com.path.vo.common.SessionCO"%>
<ps:if test="openInDialog != true">
	<meta name="decorator" content="logincompbr"/>
</ps:if>
<%
SessionCO sessCO = (SessionCO)request.getSession().getAttribute(ConstantsCommon.SESSION_VO_ATTR);
String appId= request.getParameter("appId") == null ? ((sessCO != null && sessCO.getAppId() != null ) ? sessCO.getAppId() : "") : request.getParameter("appId");
String menuVar= request.getParameter("menuVar") == null ? ((sessCO != null && sessCO.getDirectMenuVar() != null ) ? sessCO.getDirectMenuVar() : "") : request.getParameter("menuVar");
String favoriteId= request.getParameter("favoriteId") == null ? ((sessCO != null && sessCO.getFavoriteId() != null ) ? sessCO.getFavoriteId() : "") : request.getParameter("favoriteId");

String url = "/pathdesktop/loginCompBrAction_checkLoginCompBr";
if((menuVar != null && !menuVar.isEmpty())
	|| (favoriteId != null && !favoriteId.isEmpty()))
{
	url = "/pathdesktop/loadDecorationAction";
}
%>
<script type="text/javascript">
function submitSessionFn() {
	 _showProgressBar(true);
	$('#overrideSession').val("1");
	$('#sessionCheckingForm').attr("action",jQuery.contextPath + '<%=url%>');
	submitEncryptedData('sessionCheckingForm');
}
function onCloseClick()
{
	if("<ps:property value='openInDialog' escapeJavaScript='true'/>" == "true")
	{
		/**
		 * [MarwanMaddah]:in case opened inside a dialog, on close only close the dialog
		 */
		 $.ajax(
			 {
				 url  :jQuery.contextPath + '/pathdesktop/loginCompBrAction_refillOldSessionInfo',
				 type :"post",
				 data :{prevCompCode:"<ps:property value='prevCompCode' escapeJavaScript='true'/>",prevBranchCode:"<ps:property value='prevBranchCode' escapeJavaScript='true'/>",prevHttpSessionId:"<ps:property value='prevHttpSessionId' escapeJavaScript='true'/>"},
				 success :function(data)
				 {
					$("#switchCompDivId").remove(); 
				 }
			 }
		 );
		 
	}
	else
	{
      /**
       * [MarwanMaddah]:in case not in dialog, go back to login screen
       */
	  logoutApp();
	}
}
jQuery(document).ready(function() {
	$('#cancelBtn').focus();
});
</script>
<form id="sessionCheckingForm" action="" method="post">
<table CELLPADDING="0" CELLSPACING="0" height="100%" WIDTH="100%" border="0">
<tr>
   <ps:hidden id="companiesVO.COMP_CODE"  name="companiesVO.COMP_CODE"/>
   <ps:hidden id="branchesVO.BRANCH_CODE" name="branchesVO.BRANCH_CODE"/>
   <ps:hidden id="overrideSession"        name="overrideSession"/>
   <input name="appId" type="hidden" value="<%=appId%>"/>
   <input name="menuVar" type="hidden" value="<%=menuVar%>"/>
   <input name="favoriteId" type="hidden" value="<%=favoriteId%>"/>
</tr>
<tr>
    <ps:if test="openInDialog != true">
	    <td WIDTH="30%"></td>
		<td width="40%">
	</ps:if>
	<ps:else>
	   <td width="100%">
	</ps:else>
		<fieldset class="ui-widget-content ui-corner-all" style="padding-top: 10px; margin-top: 30px;">
			<legend id="legend" style="font-size:  20px;font-style: italic;margin-top:-20px;border:0;" class="ui-widget-content floatRightLeft">
				<ps:text name="session_force_logout_msgkey"></ps:text>
			</legend>
			<TABLE CELLPADDING="0" CELLSPACING="1" border="0" width="100%" class="ui-widget-content path-border-none">
				<TR>
					<TD colspan="3" class="left" style="padding:10px">
						<div>
							<ps:if test="actionErrors != null">
							<br/>
							<ps:iterator  value="actionErrors"  var="theMess"  >
							  <table><tr><td> <image src="${pageContext.request.contextPath}/common/images/warning_icon.png"/></td>
							  <td><ps:property value="theMess" escapeHtml="true"/></td>
							  </tr></table> 
							</ps:iterator>
							</ps:if>
						</div>
					</TD>
				</TR>
				
				<tr>
				    <td width="90%"/>
					<td class="right" style="padding:0px">
					    <br/>
						<psj:a href="#" id="continueBtn" indicator="indicator" button="true"
							onclick="javascript:submitSessionFn()">
							<ps:text name="yes_key"></ps:text></psj:a>
					</td>
					<td class="right" style="padding:0px">
					    <br/>
						<psj:a href="#" id="cancelBtn" indicator="indicator" button="true"
							onclick="javascript:onCloseClick()">
							<ps:text name="no_key"></ps:text></psj:a>
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
</form>