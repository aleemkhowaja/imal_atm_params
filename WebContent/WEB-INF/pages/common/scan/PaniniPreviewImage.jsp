<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<html>
	<head>
   		<title> Preview Image </title>
	</head>
	<body>
		<div id="ImageDivFront">
			<img src=" <ps:url  action="loadPaniniImages?imgName=${imgNameFront}" namespace="/path/scan"/>" style="width:100%" />
		</div>
		<div id="ImageDivRear">
			<img src=" <ps:url  action="loadPaniniImages?imgName=${imgNameRear}" namespace="/path/scan"/>" style="width:100%" />
		</div>
	</body>	
		
</html>
