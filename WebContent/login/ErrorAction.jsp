<%@page import="com.path.lib.common.util.StringUtil"%>
<%
String requestUrl =(String)request.getAttribute("JS_ERROR_ACTION");
if(StringUtil.isNotEmpty(requestUrl))
{
%>
	/* //[PathSolutions] jquery-3.3.1 migration - point 20 - resolve SyntaxError: expected expression, got '<' when javascipt file not found when calling require in js */
	if (typeof _showErrorMsg === "function") 
 	{ 
		_showErrorMsg('<%= requestUrl %>');
	}
	else
	{
		alert('<%= requestUrl %>');	
	}
<%	
}
else
{
%>

<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %> 
<%/* selinuim error is to set a hidden div with specific id so that Selinuim will capture technical errors*/
if(response.getStatus() == 600 )
{%>
<div id="seleniumAutoError" style="display:none" ></div>
<%}
 /*needed to specify meta tag decorator since on JBOSS it is not detected automatically (it is needed in case there is error and the page is not redirected to LoginCompBr.jsp but to ErrorAction.jsp)*/
if("true".equals(request.getAttribute("enableDecorator")))
{%>
<meta name="decorator" content="logincompbr"/>
<%} %>
<TABLE CELLPADDING="0" CELLSPACING="0" width="100%">
		<tr>
			<td colspan=4 CLASS="note" align="center">
				<ps:actionerror/>
		    </td>
		 </tr>
 </TABLE>
 
<% 
}
%>