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
     <td width="2" nowrap="nowrap" style="width:2px; background-color: orange; " >&nbsp;</td>
     <td width="5">&nbsp;</td>
    <td>
	<table cellpadding="0" cellspacing="0" border="0">
	  	<tr>
  				<td class="headerStyle">
  				<span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass=".headerStyleLabel"
						title="<ps:text name='desktop_header_style_labels_key'/>"
						onclick="themeCustomization_customizeClass(this)"/>
  				 <ps:label cssClass="headerStyleLabel" key="userKey"/>
  				</td>
			<td class="headerStyle headerStyleValue" nowrap="nowrap"><span class="ui-icon ui-icon-wrench customization-icon floatRightLeft"
						customClass=".headerStyleValue"
						title="<ps:text name='desktop_header_style_values_key'/>"
						onclick="themeCustomization_customizeClass(this)" />&nbsp;:
			 <ps:property value="%{#session.sesVO.userName}"/>
				
			</td>
			<%/* for FATCA (ITR) there is no running date */ %>
			<ps:if test='%{#session.sesVO.companyCode!=null && #session.sesVO.runningDateRET!=null && session.sesVO.currentAppName != "ITR" }'>
			<td colspan="2" class="headerStyle headerStyleValue"  nowrap="nowrap">
					 &nbsp; &nbsp; &nbsp;<span id="hdr_runn_date" ><%=runningDate+""%></span>
			</td>
			</ps:if>
		  </tr>
				<ps:if test='%{#session.sesVO.companyCode!=null}'>
	    <tr>
			<td nowrap="nowrap" class="headerStyle">
				<ps:label cssClass="headerStyleLabel" key="companyKey" />
			</td>
			<td class="headerStyle headerStyleValue" nowrap="nowrap">&nbsp;:&nbsp;<ps:property value="%{#session.sesVO.companyName}" />
			</td>
			<td>
							&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
	    </tr>
	    <tr>
	  		<td class="headerStyle" ><ps:label cssClass="headerStyleLabel" key="branchKey"/></td>
	  		<td class="headerStyle headerStyleValue" nowrap="nowrap">&nbsp;:&nbsp;<ps:property value="%{#session.sesVO.branchName}"/></td>
	  		<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
	    </tr>
		</ps:if>
 </table>
 </td>
 </tr>
	</table>
