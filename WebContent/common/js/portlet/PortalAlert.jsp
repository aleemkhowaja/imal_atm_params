<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
  
  <script type="text/javascript">
	function usrSecCsmCustOnClck(method)
	{
		window.open('${pageContext.request.contextPath}/pathdesktop/DesktopAction_'+method+'.action');
	}
  </script>
  </head>
  
  <body>
    <ps:a href="javascript:usrSecCsmCustOnClck('csmCustomer')"  ><ps:text name="csmCustomer"></ps:text>
   </ps:a>
  </body>
</html>
