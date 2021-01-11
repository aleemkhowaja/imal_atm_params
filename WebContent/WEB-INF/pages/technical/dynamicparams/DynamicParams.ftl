<#assign ps=JspTaglibs["/WEB-INF/tld/path-struts-tags.tld"]>
<#assign contentDivRelative = formVO.absoluteElements?default('false')/>
<#if contentDivRelative != 'true'>
   <div>
<#else>
   <#--* [MarwanMaddah]
       * Used in case the screen is a dynamic screen with absolute elements 
       * to avoid conflict in the position with the tab header-->
   <div id="dyn_div_${formVO.formId}" style="position:relative">
</#if>
    <#assign applyChangeTrack=formVO.applyChangeTrack?default("false")/>
    <#assign useHiddenProps=formVO.useHiddenProps?default("false")/>
    <#assign onLoadScript=formVO.onLoadScript?default("")/>
	<#assign changeTrack=formVO.changeTrack?default("false")/>
	
    <@ps.form	id="${formVO.formId}" 
    			action="${formVO.action}" 
    			target="${formVO.target}" 
    			applyChangeTrack="${applyChangeTrack}" 
    			useHiddenProps="${useHiddenProps}"
    >
	    <#if changeTrack!= "false">
	    <#--* [PeterAbouNader]
	        * Used in case the screen is a dynamic screen with a passed parameters 
	        * to set the form as changed in case of submit button-->
		    <script type="text/javascript">
		    	$.data(${formVO.formId} , 'changeTrack',${changeTrack}); 
		    </script>
	    </#if>

		<#include "/WEB-INF/pages/common/dynamicparams/DynamicParamsContent.ftl" />
		<#if onLoadScript?default('') != ''>
			<script type="text/javascript">
				$(document).ready(
				function() {
					${onLoadScript}
				});
			</script>
		</#if>
    </@ps.form>

</div>
