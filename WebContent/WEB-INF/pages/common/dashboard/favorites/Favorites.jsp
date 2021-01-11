<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@page import="com.path.lib.common.util.StringUtil"%>
<%@page import="com.path.vo.common.dashboard.FavoriteCO"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.List"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="com.path.lib.remote.PathRemotingPropertiesProvider" %>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="com.path.lib.common.util.DateUtil"%>
<%@page import="com.path.vo.common.SessionCO"%>
<%@page import="com.path.bo.common.CommonMethods"%>

    <%
      HashMap<String,List<FavoriteCO>> favoritesMap = (HashMap<String,List<FavoriteCO>>)request.getAttribute("favoritesMap");
      int mapSize  = favoritesMap.size();
      Iterator it = favoritesMap.keySet().iterator();
      FavoriteCO favorite;
      while(it.hasNext())
      {
	     String keyVal        = (String) it.next();
	     List<FavoriteCO> lst = (List<FavoriteCO>)favoritesMap.get(keyVal);
	     String appDesc       = (lst.get(0)).getAppDesc();
	     %>
	       <div id="<%=keyVal%>" class="collapsibleContainer path-double-header" title="<%=appDesc%>"> 
	         <table cellpadding="1" cellspacing="0" border="0" width="100%">
	         <%
	            for(int i=0;i<lst.size();i++)
	        	{
	        	  favorite           = lst.get(i);
	        	  BigDecimal favId   = favorite.getUserFavorites().getID();
	        	  String     progRef = favorite.getUserFavorites().getPROG_REF(); 
	        	  String     appUrl  = favorite.getAppUrl();
	        	  String     optUrl  = favorite.getOpt_url();
	        	  BigDecimal openInDialog = favorite.getUserFavorites().getOPEN_IN_DIALOG_YN();
	        	  Boolean    externalLink = favorite.getExternalLink();
	        	  String favDesc = StringUtil.nullToEmpty(favorite.getUserFavorites().getDESCRIPTION());
	        	  String screenTitle = favDesc.replace("'","\\'").replace("\"","&quot;"); 
	        	  String appName = keyVal;
	        	  if(StringUtil.isNotEmpty(favorite.getTargetAppName()))
	        	  {
	        	      appName = favorite.getTargetAppName();
	        	  }
	        	%>
	        	   <tr id="rec_<%=favId%>_<%=i%>" appName="<%=keyVal%>">
	        	       <td width="90%" class="borderBottom"><span id="fav_desc_<%=keyVal%>_<%=i%>" onclick="fav_openScreen('<%=appName%>','<%=appUrl%>','<%=favId%>','<%=externalLink%>','<%=screenTitle %>','<%=optUrl%>','<%=progRef%>',<%=openInDialog%>)" style="cursor: pointer"><%=favDesc%></span></td>
	        	       <td class="borderBottom"><span id="fav_edit_<%=keyVal%>_<%=i%>"   style="cursor: pointer" class="ui-icon ui-icon-pencil"       onclick="fav_onEditClick('<%=keyVal%>','<%=favId%>')"/></td>
	        	       <td class="borderBottom"><span id="fav_delete_<%=keyVal%>_<%=i%>" style="cursor: pointer" class="ui-icon ui-icon-circle-minus" onclick="fav_deleteFromFavorite('<%=keyVal%>','<%=favId%>')"/></td>
	        	   </tr>
	        	<%
	        	}
	         %>
	         </table> 
	       </div>
	     <%
      }
      String credentials = CommonMethods.returnEncryptedJpassword((String) SecurityContextHolder.getContext().getAuthentication().getCredentials());
      String principal   = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		SessionCO sessionCO = (SessionCO) request.getSession().getAttribute("sesVO");
    %>
<script type="text/javascript">
$(document).ready(function (){
	$("div[id='FAVORITES'] div.collapsibleContainer").collapsiblePanel();
	$("div[id='FAVORITES'] div.collapsibleContainer div.collapsibleContainerTitle").addClass("path-collapsable-header");
	var addIcon = "<span id='addSpan' class='ui-icon ui-icon-circle-plus floatLeftRightOverride' onclick='fav_onAddClick()'></span>"
	var addIconExist = $("div[id='FAVORITES'] div.ui-widget-header span[id='addSpan']").hasClass('ui-icon-circle-plus');
	if(!addIconExist)
	{
	   $("div[id='FAVORITES'] div.ui-widget-header span.widgettitle").after(addIcon);
	}
}
);
</Script>

<form  id="myForm" method="post">	  
	<ps:hidden  id="j_username" name="j_username" value="<%=principal%>"></ps:hidden>
	<ps:hidden id="j_password" name="j_password" value="<%=credentials%>"></ps:hidden>
	<ps:hidden name="login_comp_code" id="login_comp_code" value="%{#session.sesVO.companyCode}"></ps:hidden>
	<ps:hidden name="login_bra_code" id="login_bra_code" value="%{#session.sesVO.branchCode}"></ps:hidden>
	<ps:hidden name="language" id="language" value="%{#session.sesVO.language}"></ps:hidden>
	<ps:hidden name="scannedCIFNo" id="scannedCIFNo" value="%{#session.sesVO.scannedCIFNo}"></ps:hidden>
	<input type="hidden" name="screenTitle" id="favScreenTitle"/>
</form>

