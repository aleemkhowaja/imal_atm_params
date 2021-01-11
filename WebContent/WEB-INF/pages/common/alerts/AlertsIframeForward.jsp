<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<script type="text/javascript">
		_showProgressBar(true);
		var alertsPageRef = '<ps:property value="_pageRef" escapeHtml="false" escapeJavaScript="true"/>';
		$.struts2_jquery.require("TrsAckTOutAlertsMaint.js,TrsAckTOutAlertsList.js" ,null,"${pageContext.request.contextPath}/common/js/alerts/");
		var forwardMethodUrl = '<ps:property value="alertCO.forwardMethodUrl" escapeHtml="false" escapeJavaScript="true"/>'; 
		var openItemParams = '<ps:property value="alertCO.openItemParams" escapeHtml="false" escapeJavaScript="true"/>';
		
		var todoCode = <ps:property value="alertCO.alertsParamCO.todoCode" escapeHtml="false" escapeJavaScript="true"/>;
		var todoLine = <ps:property value="alertCO.alertsParamCO.todoLine" escapeHtml="false" escapeJavaScript="true"/>;
		var todoStatusCode = '<ps:property value="alertCO.sTodoDet.TODO_STATUS" escapeHtml="false" escapeJavaScript="true"/>';
		
		var forwardParamJson = JSON.parse(openItemParams);
		$.ajax({url:  jQuery.contextPath + forwardMethodUrl,
		type:"post",
		dataType:"json", 
		data: forwardParamJson, 
		success: function(data)
				 {
					if(data["_error"] == undefined || data["_error"] == null)
					{	
							var forwardList = data["alertCO"]["alertsParamCO"]["forwardList"];
							var loadSrc = jQuery.contextPath	+   "/path/alerts/AlertsForwardMaint_loadForwardAlertsPage?_pageRef="+alertsPageRef;
							var curParams = {"todoLine" : todoLine, 
						        			 "todoCode" : todoCode,
						        			 "statusCode" : todoStatusCode,
						        			 "buildGridOnLoad" : 'true',
						        			 "forwardList" : forwardList
						        			 };
							
							var forwardAlertDivElement = $('<div>',{id:"forward_alert_div_" + alertsPageRef});
							$('body').append(forwardAlertDivElement);
							$(forwardAlertDivElement).css('height', '100%');
							$(forwardAlertDivElement).css('width', '100%');
							$(forwardAlertDivElement).load(
								loadSrc,curParams,
								function() {
								_showProgressBar(false);
								});
					}
					else
					{
						_showProgressBar(false);
					}
				 }
		});
									
</script>
