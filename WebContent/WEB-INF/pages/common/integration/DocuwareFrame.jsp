<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<html>
	<head>
   		<title><ps:text name="documents_name_key"/></title>
	</head>
	<body>
		<div id="DocuwareDialogDiv">
			<iframe id="DocuwareDialogIFrame" onload="docuwareDialogDivLoaded('${theURL}')" width="610"height="530"/>
		</div>
		
	</body>	
		
</html>
