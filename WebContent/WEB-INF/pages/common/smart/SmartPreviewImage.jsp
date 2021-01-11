<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<html>
	<head>
   		<title> Preview Image </title>
	</head>
	<body>
		<div id="ImageDiv">
			<img src=" <ps:url  action="Smart_loadPreviewImage?progRef=${_parentPageRef}&trxNbr=${auditTrxNbr}&saddTypeCode=${saddTypeCode}&randomNumber=${randomNumber}" namespace="/path/smart"/>" />
		</div>
		
	</body>	
		
</html>
