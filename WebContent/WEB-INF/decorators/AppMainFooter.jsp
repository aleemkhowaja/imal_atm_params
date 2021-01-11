<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.ConstantsCommon"%>
<%@page import="java.util.Calendar"%>
<%
	Calendar cal = Calendar.getInstance();
	int year = cal.get(Calendar.YEAR);
%>

	 	<table width="100%" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td width="2%"  class="header-top-right">
				</td>
				<td width="38%"  class="header-top-right">
					<div id='scrollingMarquee' class='marquee' >
					<ps:iterator  value="marqueeMessages"  var="theMess"  >
					&nbsp;
					  <img src="${pageContext.request.contextPath}/login/images/favicon.ico"/>
					  &nbsp;
					  <ps:property value="theMess" escapeHtml="true"/>
					  &nbsp;
					</ps:iterator>
					</div> 
					<script type="text/javascript">
						$.struts2_jquery.require("jquery.marquee.js", null,
								jQuery.contextPath + "/common/jquery/js/marquee/");
						$.struts2_jquery.require("jquery.pause.js", null,
								jQuery.contextPath + "/common/jquery/js/marquee/");
								
					if($('#scrollingMarquee'))
						{
					$(function () {
				    $('#scrollingMarquee').marquee({duration: 5000});
					});
					}
					</script>
				</td>
				<td width="60%" class="header-top-right">
					<table width="100%" border="0">
						<tr>
							<td nowrap="nowrap" width="90%" id="page-footer" class="left" class="path_page_footer"> 
					             <span class="footerStyle"><span><ps:label cssClass="path_btn_lbl_theme" id="copyrightLbl" key="copyright_key"></ps:label></span><span>&copy;<%=year+""%></span>Path Solutions<span>&reg;</span><span><ps:label cssClass="path_btn_lbl_theme" id="allRightsLbl" key="allRights_key"></ps:label></span></span>
					             <span class="footerStyle" style="font-size: 9;font-style: italic">&nbsp;&nbsp;<span title="<%=ConstantsCommon.returnAppInterBuildVersion() + " / " + ConstantsCommon.COMMON_COMP_VERSION%>"><%=ConstantsCommon.returnAppDisplayVersion()%></span></span>
				             </td> 
				             <td width="5%" nowrap="nowrap"> 
					             <span class="footerStyle"><ps:label id="poweredByLbl" key="poweredBy_key"></ps:label></span>
					          </td> 
				             <td  width="5%" style="background-image: url(${pageContext.request.contextPath}/common/images/pathSmallLogo.png);background-repeat: no-repeat;">
						</tr>
					</table>
				</td>
			</tr>
		</table>
	

