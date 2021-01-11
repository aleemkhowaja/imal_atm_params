<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%
    SimpleDateFormat df = new SimpleDateFormat("dd MMMMM yyyy", com.opensymphony.xwork2.ActionContext.getContext().getLocale());

	SessionCO sessionCO = (SessionCO) session.getAttribute("sesVO");
	String runningDate = null;
	if(sessionCO.getRunningDateRET()!= null)
	 runningDate = df.format(sessionCO.getRunningDateRET());
%>
    <table cellpadding="0" cellspacing="0" border="0">
    <tr>
    <ps:if test='%{#session.sesVO.companyCode!=null}'>
    <td class="header-top-center">
	 		<div>
				<img src=" <ps:url  action="portalDashboardAction_loadEmployeePhoto" namespace="/pathdesktop/portalDashboardAction"/>" 
				 height="50" width="60"
				/>
			</div>
	</td>
     <td width="1" nowrap="nowrap">&nbsp;</td>
     </ps:if>
     <td width="2" nowrap="nowrap" style="width:2px; background-color: orange; " >&nbsp;</td>
     <td width="5">&nbsp;</td>
    <td>
	<table cellpadding="0" cellspacing="0" border="0">
	  	<tr>
  				<td >
  				 <ps:label cssClass="headerStyle headerStyleLabel" key="userKey"/>
  				</td>
			<td class="headerStyle headerStyleValue" nowrap="nowrap">&nbsp;:
			 <ps:property value="%{#session.sesVO.userName}"/>
				
			</td>
			<%/* for FATCA (ITR) there is no running date */ %>
			 <ps:if test='%{#session.sesVO.companyCode!=null && #session.sesVO.runningDateRET!=null && session.sesVO.currentAppName != "SADS" && (session.sesVO.currentAppName != "ITR" || (session.sesVO.currentAppName == "ITR" && enableItrRunningDate=="1")) }'>
			<td colspan="2" class="headerStyle headerStyleLabel"  nowrap="nowrap">
					 &nbsp; &nbsp; &nbsp;<span id="hdr_runn_date" class="headerStyleLabel" onclick="loginInfo_onDateClick()"><%=runningDate+""%></span>
			</td>
			</ps:if>
		  </tr>
				<ps:if test='%{#session.sesVO.companyCode!=null && session.sesVO.appLocationType != "2"}'>
	    <tr>
			<td nowrap="nowrap">
				<ps:label cssClass="headerStyle headerStyleLabel" key="companyKey" />
			</td>
			<td class="headerStyle headerStyleValue" nowrap="nowrap">&nbsp;:&nbsp;<ps:property value="%{#session.sesVO.companyName}" />
			</td>
			<td>
							&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
	    </tr>
		    <ps:if test='%{"1" != session.sesVO.appLocationType}'>
		    <tr>
		  		<td><ps:label cssClass="headerStyle headerStyleLabel" key="branchKey"/></td>
		  		<td class="headerStyle headerStyleValue" nowrap="nowrap">&nbsp;:&nbsp;<ps:property value="%{#session.sesVO.branchName}"/></td>
		  		<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
		    </tr>
	    	</ps:if>
		</ps:if>
 </table>
 </td>
 </tr>
</table>
<!-- style used for auto-complete pop up maximum height -->
<style>
.ui-autocomplete {
	max-height: 180px;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
