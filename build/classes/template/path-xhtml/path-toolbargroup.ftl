<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]/>
<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]/>

<#if buttonIcon?if_exists != "">
	<@psj.submit id="toolbarGrpBtn_${id?html}" buttonIcon="${buttonIcon?html}" onclick="" button="true" type="button" disabled="false" freezeOnSubmit="true">
		<@ps.text name="${buttonLabel?html}"></@ps.text>
	</@psj.submit>
<#else>
	<@psj.submit id="toolbarGrpBtn_${id?html}" onclick="" button="true" type="button" disabled="false" freezeOnSubmit="true">
		<@ps.text name="${buttonLabel?html}"></@ps.text>
	</@psj.submit>
</#if>
<div id="toolbarGrpDiv_${id}" style="display:none;" class="ui-state-default i-widget-content">