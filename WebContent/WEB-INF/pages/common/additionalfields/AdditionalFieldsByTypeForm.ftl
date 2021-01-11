<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign psj=JspTaglibs["/WEB-INF/tld/path-struts-jquery-tags.tld"]>
<#assign ptt=JspTaglibs["/WEB-INF/tld/path-toolbar-tags.tld"]>

<@ps.form id="additionalFieldsByTypeForm_${_pageRef}" useHiddenProps="true" >
	<div>
	<#include "AdditionalFieldsByType.ftl" />
	</div>
</@ps.form>
