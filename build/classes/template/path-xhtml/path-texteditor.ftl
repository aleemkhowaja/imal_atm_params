<textarea id="${parameters.id?html}"
	<#if parameters.required?default(false)>
		required = "true"<#rt/>
	</#if>
>
<#if parameters.nameValue??>
<@s.property value="parameters.nameValue"/><#t/>
</#if>
</textarea>
<script type="text/javascript">
$(document).ready(function() 
{	
	$.struts2_jquery.requireCss("/js/plugins/texteditor/jquery.cleditor.css");
	$.struts2_jquery.require("jquery.cleditor.js", null,
						jQuery.contextPath + "/common/jquery/js/plugins/texteditor/");
	$("#"+"${parameters.id}").cleditor({id:'cleditor_${parameters.id?html}', width:${parameters.width?default('500')}, height:${parameters.height?default('250')}, disabled:${parameters.readonly?default('false')}});
});
</script>