<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign sec=JspTaglibs["http://www.springframework.org/security/tags"]>
<#attempt>
<style><#t/>
.big-button span
{
	padding-top: 3em !important;
	padding-bottom: 3em !important;
	padding-left: 6em !important;
	padding-right: 6em !important;
	font-size: 12px !important;
}
</style><#t/>
<#assign index=0/>
<table width="100%" border="0" ><#t/>
   <tr><#t/>
<@s.iterator value="lstWorkspaceDet">
<#if index %3 == 0>
	</tr><#t/>
</#if> 	
<#assign display_style=lstWorkspaceDet.get(index).userWorkspaceVO.DISPLAY_STYLE />
<#assign appUrl="">
<#if lstWorkspaceDet.get(index).appUrl??>
	<#assign appUrl=lstWorkspaceDet.get(index).appUrl />
</#if>
<#assign appName=lstWorkspaceDet.get(index).userWorkspaceVO.APP_NAME />
<#assign progRef=lstWorkspaceDet.get(index).userWorkspaceVO.PROG_REF />
<#assign display_caption_key=lstWorkspaceDet.get(index).userWorkspaceVO.DISPLAY_CAPTION_KEY/>
<#assign screenTitle=display_caption_key?replace("'","\\'")/>
		<td style="text-align: center;"><#t/>
		<#if display_style == 0><#t/>
			<@psj.a button="true"  href="#" onclick="openWorkspaceLink('${appUrl}','${appName}' ,'${progRef}','${screenTitle}')" cssClass="big-button"><@ps.label key='${display_caption_key}'/></@psj.a>
		<#else> 
			<@psj.a href="#" onclick="openWorkspaceLink('${appUrl}','${appName}' ,'${progRef}','${screenTitle}')" ><@ps.label key='${display_caption_key}'/></@psj.a>
		</#if>
		</td>	<#t/>	
<#assign index=index+1 />
</@s.iterator>	
</tr><#t/>
</table><#t/>
<form  id="userWkspaceForm" method="post">	  <#t/>
	<input type="hidden" name="j_username" id="j_username" value="<@sec.authentication property='principal'/>" /><#t/>
	<input type="hidden" name="j_password" id="j_password" value="${encryptedPassword}" /><#t/>
	<input type="hidden" name="login_comp_code" id="login_comp_code" value="<@s.property value='%{#session.sesVO.companyCode}'/>" /><#t/>
	<input type="hidden" name="login_bra_code" id="login_bra_code" value="<@s.property value='%{#session.sesVO.branchCode}'/>" /><#t/>
	<input type="hidden" name="language" id="language" value="<@s.property value='%{#session.sesVO.language}'/>" /><#t/>
	<input type="hidden" name="screenTitle" id="screenTitle"/><#t/>
</form><#t/>
<#recover>
${_error?default('Error FR Occurred Please Contact Administrator')}
</#attempt>