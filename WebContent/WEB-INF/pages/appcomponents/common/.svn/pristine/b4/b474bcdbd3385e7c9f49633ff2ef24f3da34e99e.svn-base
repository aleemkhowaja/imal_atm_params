<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@page import="com.path.bo.common.CommonMethods"%>

<%
   String browser = request.getHeader("User-Agent");
//the browser variable defined in AppMain.jsp
	String ieVerStr = CommonMethods.returnIEVersion(browser);
	boolean isIE = false;
	float ieVer = 0; // use on AppCommonTrans
	if(ieVerStr != null)
	{
		ieVer = Float.parseFloat(ieVerStr);
		isIE = true;
	}
   if(isIE) {
%>
<!DOCTYPE html>
<% } %>

<html>
	<head>
	<%@include file="../../../pages/appcomponents/common/AppMainCommon.jsp"%>
	<script type="text/javascript">
		jQuery.contextPath = '${pageContext.request.contextPath}';
		var _pageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
		var globalThemeName = '<ps:property value="themeName" escapeHtml="false" escapeJavaScript="true"/>'; 
    </script>
	</head>

	<body>
		<div id="frameContainerDiv_<ps:property value="_pageRef" escapeHtml="true"/>"></div>
	</body>
	
	<jsp:include page="../../../pages/appcomponents/common/AppCommonTrans.jsp"></jsp:include><%/*Path Solutions [Libin] added a jsp holding trans message script global variables*/%>
	
	<script type="text/javascript" >
		
		
	  	var screenUrl = $('#AppFrameLoader_screenUrl_' + _pageRef, window.parent.document).val();
	  	var screenParams = $('#AppFrameLoader_screenParams_' + _pageRef, window.parent.document).val();
	  	
	  	if(screenUrl != undefined && screenUrl != null && screenUrl != ''
	  			&& screenParams != undefined && screenParams != null)
	  	{	
	  			$(document).ready(function ()
				{
	  				//Load JQuery JS
					$.struts2_jquery.require("jqgrid/i18n/grid.locale-" + $.struts2_jquery.gridLocal + ".js",
					function() {
						$.jgrid.no_legacy_api = true;
						$.jgrid.useJSON = true;
					});
					$.struts2_jquery.require("jqgrid/grid.base.js");
					$.struts2_jquery.require("jqgrid/jquery.fmatter.js");
					$.struts2_jquery.require("jqgrid/grid.custom.js");
					$.struts2_jquery.require("jqgrid/grid.common.js");
					$.struts2_jquery.require("jqgrid/plugins/grid.setcolumns.js");
					$.struts2_jquery.require("jqgrid/grid.subgrid.js");
					$.struts2_jquery.require("jqgrid/plugins/grid.postext.js");
					$.struts2_jquery.require("jqgrid/grid.jqueryui.js");
					$.struts2_jquery.require("jqgrid/plugins/jquery.searchFilter.js");
					$.struts2_jquery.require("jqgrid/grid.formedit.js");
					$.struts2_jquery.require("jqgrid/grid.treegrid.js");
					$.struts2_jquery.require("jqgrid/grid.tbltogrid.js");
					$.struts2_jquery.require("jqgrid/grid.import.js");
					$.struts2_jquery.require("jqgrid/JsonXml.js");
					$.struts2_jquery.require("jqgrid/grid.filter.js");
					$.struts2_jquery.requireCss("jqgrid/style/ui.jqgrid.css",jQuery.scriptPath );
					//End Load JQuery JS								
					
					$.ajax( {
						url : screenUrl,
						type : "post",
						dataType : "html",
						data : JSON.parse(screenParams),
						success : function(html) 
							{
								if (html != undefined && html != null) 
								{
									var isHTML = true;
									var jsonObj = null;
									try
									{
										jsonObj = JSON.parse(html);
										isHTML = false;
									}
									catch(e)
									{
										isHTML = true;
									}
									
									if(isHTML == false)
									{
										parent._showProgressBar(false);
										//modified for bug:682741 in case of warning from boexception
										var error = jsonObj._error; 
										if( ( typeof error == 'undefined' || error == undefined || error == null )
												&& jsonObj._warning != undefined && jsonObj._warning != null && jsonObj._warning != '' )
										{
											error = jsonObj._warning;
										}
										
										parent.closeFrameLoader(_pageRef,error, jsonObj._msgTitle);
									}
									else
									{	
										parent.openFrameDialog(_pageRef);
										$("#frameContainerDiv_" + _pageRef).html(html);
										parent._showProgressBar(false);
									}	
									
								}
							}
						});
			  	});
		}
	</script>

</html>
