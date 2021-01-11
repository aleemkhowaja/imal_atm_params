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
    function imgClick()
    {
    	alert("image clicked");
    	$('#link').click();
    }
  </script>
  </head>
  
  <body>
    <ps:a href="javascript:usrSecCsmCustOnClck('userSecurity')">
    <img src="${pageContext.request.contextPath}/common/images/finance4.jpg" />
   </ps:a>
  </body>
</html>
