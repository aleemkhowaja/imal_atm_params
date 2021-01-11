<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%> 

<%@page import="com.path.vo.common.dashboard.DashPortalAlertCO"%>
<%@page import="java.util.List"%>
<%@page import="java.math.BigDecimal"%>
  <%
  List<DashPortalAlertCO> alertLst = (List<DashPortalAlertCO>)request.getAttribute("alertLst");
  int lstSize = alertLst.size();
  Integer alertRefreshTime = (Integer)request.getAttribute("alertRefreshTime"); 
  %>
      <table cellpadding="1" cellspacing="0" width="100%">
      <%
        if(lstSize == 0)
        {
      %>
         <tr>
            <td align="center"><ps:label id="lbl_No_alert" key="no_alert_found_key"/></td>
         </tr>
      <%      
        }
        else
        {
	        for(int i=0;i<lstSize;i++)
	     	{
	     	  DashPortalAlertCO dashPortalAlertCO = alertLst.get(i);
	     	  String     appDesc     = dashPortalAlertCO.getAppDesc();
	     	  String     appName     = dashPortalAlertCO.getAppName();
	     	  BigDecimal alertsCount = dashPortalAlertCO.getAlertsCount();
	     	%>
	        	          
	       	   <tr id="alert_<%=appName%>_<%=i%>" appName="<%=appName%>">
	       	       <td width="95%" class="borderBottom"><span id="alert_desc_<%=appName%>_<%=i%>" style="cursor: pointer" onclick="alrt_openAlertGrid('<%=appName%>')"><%=appDesc%></span></td>
	       	       <td class="borderBottom"><span id="alert_count_<%=appName%>_<%=i%>" class="required" style="cursor: pointer" onclick="alrt_openAlertGrid('<%=appName%>')">(<%=alertsCount%>)</span></td>
	       	   </tr>
	     	<%
	     	}
        }
      %>
      </table> 
      
      <% 
      if(alertRefreshTime != null)
      {
      %>
      	 <script type="text/javascript"> 	
      		
      	 	var alertWidgetRefreshTime = cachePathData('alertWidgetRefreshTime');
      	 	if(alertWidgetRefreshTime == undefined)
      		{	
	      		alertWidgetRefreshTime = '<%=alertRefreshTime%>';
				if(alertWidgetRefreshTime != '' && !isNaN(alertWidgetRefreshTime))
				{
					var alertWidgetRefreshTime = parseInt(alertWidgetRefreshTime);
					if(alertWidgetRefreshTime > 0)
					{
						var alertWidgetRefreshObj  = $.data(document,"alertWidgetRefreshObj");
						if(alertWidgetRefreshObj != undefined && alertWidgetRefreshObj != null)
						{ 
							clearInterval(alertWidgetRefreshObj);
						}
						
						alertWidgetRefreshObj = setInterval(function(){
							 var wi = dashboard.getWidget("ALERTS");
							 if(wi != undefined && wi != null)
							 {
								 wi.refreshContent();
							 }							 
						}, alertWidgetRefreshTime * 1000);
						
						$.data(document,"alertWidgetRefreshObj",alertWidgetRefreshObj);
						
						cachePathData('alertWidgetRefreshTime',alertWidgetRefreshTime);
					}
				}
      		}
		</script>
      
      <% 
      }
      %>