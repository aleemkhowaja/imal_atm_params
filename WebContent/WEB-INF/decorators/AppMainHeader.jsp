<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.lib.common.util.NumberUtil"%>
<%@page import="com.path.lib.common.util.StringUtil"%>
<%
    
	SessionCO sessionCO = (SessionCO) session.getAttribute("sesVO");
	String appmainheader_appversion = ConstantsCommon.returnAppNumericVersion(); 
	String scannedCIF =  NumberUtil.addLeadingZeros(sessionCO.getScannedCIFNo(),8) ;
	String scannedCIFName = StringUtil.nullToEmpty(sessionCO.getScannedCIFName());
	String className = "red_person";
	if(sessionCO.getScannedCIFNo() == null)
	 {
	    scannedCIF = scannedCIFName= "-";
	    className = "";
	 }
	

%>

<script type="text/javascript" src="${pageContext.request.contextPath}/common/jquery/js/plugins/jquery.nicescroll.js?_=<%=appmainheader_appversion%>"></script>
<!-- 
	<script type="text/javascript" src="${pageContext.request.contextPath}/common/js/themeSwitcher.js"></script>
	 -->
		 <script type="text/javascript">
	  var globalThemeName = '<ps:property value="themeName" escapeHtml="false" escapeJavaScript="true"/>';
	  $(document).ready(function(){
	  // To check whether themes are already loaded 
	 // loadTheme($('#switcher'),"${themeName}");
	  // change the height to 100% after loading not to make blue screen upon laod
	  $("#ui_bar_div").css("height","100%");
	  $("#ui_bar_div").niceScroll();
	 // $('#menuHeader > li').bind('click', jsddm_open);
	  
	  });
	  
	 </script>
	<div id="ui_bar_div" class="ui-bar-b" style="height:60">
		 	 <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
				 <tr>
				 	<td  width="14%" class="header-top-left">
				 		 <div style="width: 90px; height: 60px;"  class="pathLogoImage"/>
				 	</td>
				 	<td class="header-top-right">
						<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
					    <tr>
					    
					    	<td nowrap="nowrap" width="20%">
									<jsp:include page="/WEB-INF/pages/common/login/LoginInfoUsr.jsp"/>
							</td>
							<ps:if test='%{#session.sesVO.companyCode!=null && newSessionRight != null}'>
							<td width="5%" ></td>
							 <td width="2" nowrap="nowrap" style="width:2px; background-color: orange; " ></td>
							 <td width="5">&nbsp;</td>
							 </ps:if>
							<td  >
			   			 	<table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
			   			 	 <tr>
			   			 	    <td  class="right" nowrap="nowrap">
			   			 	      <ps:if test='%{#session.sesVO.companyCode!=null && newSessionRight != null}'>
										  <table cellpadding="0" cellspacing="0" border="0">
											<tr>
							    				<td nowrap="nowrap" class="headerStyle"><ps:label cssClass="headerStyleLabel" key="customer_id_key"/>&nbsp;:&nbsp;</td>
												<td class="headerStyle headerStyleValue" nowrap="nowrap"><span class="<%=className%>" id="hdr_scanned_cif_no"><%=scannedCIF%></span></td>
											</tr>
											<tr>
												<td class="headerStyle " nowrap="nowrap"><ps:label cssClass="headerStyleLabel" key="customer_name_key"/>&nbsp;:&nbsp;</td>
												<td class="headerStyle headerStyleValue" nowrap="nowrap"><span id="hdr_scanned_cif_name"><%=scannedCIFName%></span></td>
							  				</tr>
						  				</table>	
			   			 	    </ps:if>
			   			 	 </td>
			   			 	 <td width="50%">
			   			 	 </td>
		   			 		 <td>
		   			 		 <jsp:include page="/WEB-INF/pages/common/login/LoginInfoActions.jsp"/>
		   			 		 </td>
		   			 		</tr>
		   			 		</table>
			   			 	</td>
					    </tr>
		 	</table>
	 	</td>
  	</tr>
</table>
</div>
	 	
