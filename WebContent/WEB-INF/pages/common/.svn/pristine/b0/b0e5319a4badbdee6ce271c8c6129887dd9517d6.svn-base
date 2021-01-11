<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="menu"  uri="/path-menu-tags"%>
<html>
<head>

 <link href="${pageContext.request.contextPath}/common/style/layout/layout-default-latest.css" rel="stylesheet" type="text/css">
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/pageComponentStyles.css" />	<%--Common component styles--%>
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/jQuery-collapsiblePanel.css" /> <%--Collapsible panel styles--%>
 <link rel="stylesheet" type="text/css" href="${base}/common/dashboard/themes/css/widgetPageCommon.css" />
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/validation/validationEngine.jquery.css" />
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/msgbox/jquery.msgbox.css" />
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/layout/layout-default-latest.css" >
 <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/common/style/themeroller/themes/redmond/jquery-ui-1.8.14.custom.css"/>
  
 <script type="text/javascript" src="${pageContext.request.contextPath}/common/jquery/js/plugins/jquery.layout-latest.js"></script>
 <script type="text/javascript" src="${pageContext.request.contextPath}/common/jquery/js/base/jquery.cookie.js"></script>
</head>
 <body >
 	    <div id="form_div">
 	       <table>
 	            <tr>
 	               <td class="ui-widget ui-helper-reset">
 	                   <ps:text  name="TEMPLATE_LIST_key"/>
 	               </td>
 	               <td>
 	                 <!-- 
 	                 <psj:livesearch name="TEMPLATE_NAME"
 	                                 id="TEMPLATE_NAME"
 	                                 resultList="TEMPLATE_NAME:lookuptxt_TEMPLATE_NAME,TEMPLATE_ID:TEMPLATE_ID"
 	                                 parameter="TEMPLATE_ID:TEMPLATE_ID"
 	                                 dependencySrc="${pageContext.request.contextPath}/path/screenGenerator/generatorLookup_refreshDestList?"
 	                                 dependency="sectionIds:sectionList"
 	                                 actionName="${pageContext.request.contextPath}/path/screenGenerator/generatorLookup_drawingGrid" 
 	                                 searchElement="TEMPLATE_ID"  autoSearch="true">
 	                 </psj:livesearch>
 	                  -->
                   </td>                   
 	            </tr>
 	            <tr>
 	            	<td   class="ui-widget ui-helper-reset">
                     <ps:text  name="Screen List"/>
                     </td>
                     <td>
                     <ps:select id="sectionIds" name="sectionIds" list="sectionList" listKey="TEMPLATE_LOACTION_ID" listValue="REPOSITORY_LOCATION"></ps:select>
                   </td>
 	            </tr>
 	       </table>
	    </div>
 </body>
</html> 
