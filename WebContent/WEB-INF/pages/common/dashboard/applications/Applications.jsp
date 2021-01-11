<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<%@page import="com.path.vo.common.dashboard.ApplicationCO"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.path.lib.remote.PathRemotingPropertiesProvider" %>
<%@page import="com.path.lib.common.util.StringUtil" %>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="com.path.lib.common.util.DateUtil"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.bo.common.CommonMethods"%>


    <%
      HashMap<BigDecimal,List<ApplicationCO>> appMap = (HashMap<BigDecimal,List<ApplicationCO>>)request.getAttribute("appMap");
      int mapSize = appMap.size();
      Iterator it = appMap.keySet().iterator();
      ApplicationCO applicationCO;
      while(it.hasNext())
      {
	     BigDecimal keyVal = (BigDecimal) it.next();
	     List<ApplicationCO> lst  = (List<ApplicationCO>)appMap.get(keyVal);
	     String groupDesc = StringUtil.nullToEmpty((lst.get(0)).getGroupDesc());
	     
	     %>
	       <div id="group_<%=keyVal%>" class="collapsibleContainer" title="<%=groupDesc%>" type='apps'> 
	         <table cellpadding="1" cellspacing="0" border="0" width="100%">
	         <%
	            for(int i=0;i<lst.size();i++)
	        	{
	        	  applicationCO  = lst.get(i);
	        	  String appDesc = applicationCO.getAppVO().getLONG_DESC();
	        	  String appName = applicationCO.getAppVO().getAPP_NAME();
	        	  String appUrl  = applicationCO.getAppUrl();
	        	%>
	        	   <tr id="app_<%=appName%>_<%=i%>" appName="<%=appName%>">
	        	       <td width="95%" class="borderBottom"><span id="app_desc_<%=appName%>_<%=i%>" style="cursor: pointer" onclick="openApplication('<%=appName%>','<%=appUrl%>')"><%=appDesc%></span></td>
	        	       <td class="borderBottom"><span id="app_infos_<%=appName%>_<%=i%>" style="cursor: pointer" class="ui-icon ui-icon-info" onclick="apps_openAppsInfos('<%=appName%>')"/></td>
	        	   </tr>
	        	<%
	        	}
	         %>
	         </table> 
	       </div>
	     <%
      }
      
      String credentials = CommonMethods.returnEncryptedJpassword((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
      String principal   = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		SessionCO sessionCO = (SessionCO) request.getSession().getAttribute("sesVO");
    %>
    
<form  id="appForm" method="post">	  
	<ps:hidden  id="j_username" name="j_username" value="<%=principal%>"></ps:hidden>
	<ps:hidden id="j_password" name="j_password" value="<%=credentials%>"></ps:hidden>
	<ps:hidden name="login_comp_code" id="login_comp_code" value="%{#session.sesVO.companyCode}"></ps:hidden>
	<ps:hidden name="login_bra_code" id="login_bra_code" value="%{#session.sesVO.branchCode}"></ps:hidden>
	<ps:hidden name="language" id="language" value="%{#session.sesVO.language}"></ps:hidden>
	<ps:hidden name="scannedCIFNo" id="scannedCIFNo" value="%{#session.sesVO.scannedCIFNo}"></ps:hidden>
</form>
<script type="text/javascript">
//TP 500032 W A S automatic login Issue
var currentServer = "<%=CommonMethods.returnServerType()%>";
$(document).ready(function (){
	$("div[id='APPS'] div.collapsibleContainer").collapsiblePanel();
	$("div[id='APPS'] div.collapsibleContainer div.collapsibleContainerTitle").addClass("path-collapsable-header");
}
);
</Script>
